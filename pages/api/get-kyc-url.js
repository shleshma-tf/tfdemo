import jwt from "jsonwebtoken";

// Each call generates a fresh unique demo user so KYC sessions never collide
function generateDemoUser() {
  const adjectives = ["swift", "bright", "calm", "bold", "keen", "wise", "fair", "pure"];
  const nouns = ["falcon", "river", "summit", "cedar", "maple", "stone", "wave", "ember"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return { id: `demo-${adj}-${noun}-${num}`, label: `${adj} ${noun} ${num}`.replace(/\b\w/g, l => l.toUpperCase()) };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    TF_JWT_SECRET,
    TF_REQUESTING_TOKEN,
    TF_BASE_URL,
    TF_ISSUER,
  } = process.env;

  if (!TF_JWT_SECRET || !TF_REQUESTING_TOKEN) {
    return res.status(500).json({ error: "Server misconfiguration: missing ThirdFactor credentials." });
  }

  try {
    const { id: identifier, label } = generateDemoUser();

    const payload = {
      token: TF_REQUESTING_TOKEN,
      iss: TF_ISSUER || "referro",
      identifier,
      label,
      secondary_label: "Demo KYC",
      is_sdk: true,
      callback: `${req.headers.origin || "https://tfdemo.thirdfactor.ai"}/api/kyc-callback`,
      return_url: `${req.headers.origin || "https://tfdemo.thirdfactor.ai"}/kyc-complete`,
    };

    const jwtToken = jwt.sign(payload, TF_JWT_SECRET, { algorithm: "HS256" });

    const tfResponse = await fetch(`${TF_BASE_URL}/tfauth/get-kyc-url/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt_token: jwtToken }),
    });

    if (!tfResponse.ok) {
      const errText = await tfResponse.text();
      console.error("ThirdFactor API error:", errText);
      return res.status(502).json({ error: "Failed to get KYC URL from ThirdFactor.", detail: errText });
    }

    const tfData = await tfResponse.json();

    return res.status(200).json({
      url: tfData.url,
      identifier,
      label,
    });
  } catch (err) {
    console.error("KYC URL generation error:", err);
    return res.status(500).json({ error: err.message });
  }
}
