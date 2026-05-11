import jwt from "jsonwebtoken";

// Keeps your unique demo user generation logic
function generateDemoUser() {
  const adjectives = ["swift", "bright", "calm", "bold", "keen", "wise", "fair", "pure"];
  const nouns = ["falcon", "river", "summit", "cedar", "maple", "stone", "wave", "ember"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return { 
    id: `demo-${adj}-${noun}-${num}`, 
    label: `${adj} ${noun} ${num}`.replace(/\b\w/g, l => l.toUpperCase()) 
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // These should be set in your environment variables based on the Demo dashboard
  const {
    TF_JWT_SECRET,      // 6usZpNjZtRPscpjAUbvm1eug19Wx6OfxeRha3M6V
    TF_REQUESTING_TOKEN, // Xig_Ddl6hr5Dy17j82smYk9FJx0MQHPnmpvTL0pO1-g
    TF_BASE_URL,         // https://app200.sdk.thirdfactor.ai
    TF_ISSUER,           // app200
  } = process.env;

  if (!TF_JWT_SECRET || !TF_REQUESTING_TOKEN) {
    return res.status(500).json({ error: "Server misconfiguration: missing Vianet SDK credentials." });
  }

  try {
    const { id: identifier, label } = generateDemoUser();

    const payload = {
      token: TF_REQUESTING_TOKEN,
      iss: TF_ISSUER || "app200", // Defaulting to app200 per Demo docs
      identifier,
      label,
      secondary_label: "Passport", // Updated from your doc example
      is_sdk: true,
      callback: `${req.headers.origin || "https://yourapp.com"}/api/kyc-callback`,
      return_url: `${req.headers.origin || "https://yourapp.com"}/kyc-complete`,
    };

    // Sign with the new Secret
    const jwtToken = jwt.sign(payload, TF_JWT_SECRET, { algorithm: "HS256" });

    // Call the new app200 URL
    const tfResponse = await fetch(`${TF_BASE_URL}/tfauth/get-kyc-url/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt_token: jwtToken }),
    });

    if (!tfResponse.ok) {
      const errText = await tfResponse.text();
      return res.status(502).json({ error: "Failed to get KYC URL from TF Demo.", detail: errText });
    }

    const tfData = await tfResponse.json();

    return res.status(200).json({
      url: tfData.url,
      identifier,
      label,
    });
  } catch (err) {
    console.error("Demo KYC Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
