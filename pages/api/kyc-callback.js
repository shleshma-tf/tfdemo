// ThirdFactor posts the verification result here after the KYC journey completes.
// In a real integration you'd update your DB. For demo, we just log and return 200.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  console.log("[ThirdFactor Callback]", JSON.stringify(req.body, null, 2));
  return res.status(200).json({ received: true });
}
