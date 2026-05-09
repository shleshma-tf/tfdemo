import Link from "next/link";
import Head from "next/head";

export default function KycComplete() {
  return (
    <>
      <Head>
        <title>Verification Complete</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div style={s.page}>
        <div style={s.card}>
          {/* TF Logo */}
          <div style={s.logoRow}>
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <circle cx="12" cy="20" r="12" fill="#54AFFF" />
              <circle cx="20" cy="20" r="12" fill="#007BE5" />
              <circle cx="28" cy="20" r="10" fill="#00274A" />
              <circle cx="28" cy="20" r="5" fill="none" stroke="white" strokeWidth="2.5" />
              <circle cx="28" cy="20" r="1.5" fill="white" />
            </svg>
            <span style={s.wordmark}>thirdfactor.ai</span>
          </div>

          {/* Check icon */}
          <div style={s.iconCircle}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="#007BE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 style={s.title}>Identity Verified</h1>
          <p style={s.sub}>
            Verification complete. Document authenticated.<br />
            Your account is now fully active.
          </p>

          <Link href="/" style={s.btn}>Back to Wallet</Link>

          <div style={s.note}>Demo Environment · thirdfactor.ai</div>
        </div>
      </div>
    </>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#F4F6FA",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    padding: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "40px 32px",
    textAlign: "center",
    maxWidth: 360, width: "100%",
    boxShadow: "0 4px 24px rgba(0,39,74,0.09)",
    display: "flex", flexDirection: "column", alignItems: "center",
  },
  logoRow: {
    display: "flex", alignItems: "center", gap: 8, marginBottom: 32,
  },
  wordmark: {
    fontSize: 18, fontWeight: 700, color: "#00274A", letterSpacing: "-0.3px",
  },
  iconCircle: {
    width: 80, height: 80,
    background: "#EEF6FF",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 22,
  },
  title: {
    fontSize: 24, fontWeight: 800,
    color: "#00274A", marginBottom: 12,
    letterSpacing: "-0.3px",
  },
  sub: {
    fontSize: 14, color: "#6B7A8D",
    lineHeight: 1.75, marginBottom: 28,
  },
  btn: {
    display: "inline-block",
    background: "#007BE5", color: "#fff",
    textDecoration: "none",
    padding: "13px 36px", borderRadius: 10,
    fontWeight: 700, fontSize: 14,
    marginBottom: 20,
    fontFamily: "'DM Sans', sans-serif",
  },
  note: { fontSize: 11, color: "#B0BAC7" },
};
