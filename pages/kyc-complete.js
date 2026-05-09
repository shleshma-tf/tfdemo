import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function KycComplete() {
  return (
    <>
      <Head>
        <title>Verification Complete — TF Demo</title>
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={s.page}>
        <div style={s.card}>
          <Image src="/tf-logo.png" alt="thirdfactor.ai" width={160} height={44}
            style={{ objectFit: "contain", marginBottom: 28 }} />
          <div style={s.iconCircle}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20l9 9L32 12" stroke="#007BE5" strokeWidth="3.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={s.title}>Identity Verified</h1>
          <p style={s.sub}>
            Verification complete. Document authenticated.<br />
            Your account is now fully active.
          </p>
          <Link href="/" style={s.btn}>Back to Wallet</Link>
          <div style={s.poweredBy}>Powered by thirdfactor.ai</div>
        </div>
      </div>
    </>
  );
}

const s = {
  page: {
    minHeight: "100vh", background: "#F2F5F9",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Geist', 'Inter', sans-serif", padding: 20,
  },
  card: {
    background: "white", borderRadius: 20,
    padding: "40px 32px", textAlign: "center",
    maxWidth: 360, width: "100%",
    boxShadow: "0 4px 24px rgba(0,39,74,0.10)",
    display: "flex", flexDirection: "column", alignItems: "center",
  },
  iconCircle: {
    width: 80, height: 80,
    background: "#EEF6FF",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 800, color: "#00274A", marginBottom: 12 },
  sub: { fontSize: 14, color: "#6B7A8D", lineHeight: 1.7, marginBottom: 28 },
  btn: {
    display: "inline-block",
    background: "#007BE5", color: "white",
    textDecoration: "none", padding: "14px 36px",
    borderRadius: 10, fontWeight: 700, fontSize: 15,
    marginBottom: 20,
  },
  poweredBy: { fontSize: 11, color: "#9BAAB8" },
};
