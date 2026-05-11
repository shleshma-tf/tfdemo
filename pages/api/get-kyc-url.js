import jwt from "jsonwebtoken";

/**
 * Generates a random animal-based demo user ID
 * to ensure every click creates a unique session.
 */
function generateDemoUser() {
  const adjectives = ["swift", "brave", "clever", "quiet", "bold"];
  const animals = ["falcon", "tiger", "fox", "owl", "bear"];
  const num = Math.floor(Math.random() * 9000) + 1000;
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  
  return `demo-${adj}-${animal}-${num}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const demoUserId = generateDemoUser();
    
    // 1. Prepare the JWT Payload 
    const payload = {
      token: process.env.TF_REQUESTING_TOKEN, // From .env.local 
      iss: process.env.TF_ISSUER,             // Should be "app200" 
      identifier: demoUserId,                 // Unique user ID 
      is_sdk: true,                           // Flags this as an SDK integration 
      callback: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/callback`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/kyc-complete`,
      label: "Demo User",
      secondary_label: "Standard Verification"
    };

    // 2. Sign the JWT using HS256 
    const jwtToken = jwt.sign(payload, process.env.TF_JWT_SECRET);

    // 3. POST to the ThirdFactor Verify API 
    const response = await fetch(`${process.env.TF_BASE_URL}/tfauth/get-kyc-url/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ jwt_token: jwtToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch KYC URL");
    }

    const data = await response.json();

    // 4. Return the one-time URL to the frontend 
    return res.status(200).json({ url: data.url });

  } catch (error) {
    console.error("KYC Generation Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
