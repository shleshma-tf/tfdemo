import { useRouter } from "next/router";
import Link from "next/link";

export default function KycComplete() {
  const router = useRouter();
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="28" fill="#22c55e22" />
            <circle cx="28" cy="28" r="20" fill="#22c55e33" />
            <path d="M18 28.5l7 7 13-13" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={styles.title}>Identity Verified!</h1>
        <p style={styles.sub}>Your KYC verification was completed successfully. You can now access all wallet features.</p>
        <Link href="/" style={styles.btn}>Back to Wallet</Link>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" },
  card: { background: "#1e293b", border: "1px solid #334155", borderRadius: 24, padding: "48px 40px", textAlign: "center", maxWidth: 400, width: "90%" },
  iconWrap: { marginBottom: 24 },
  title: { color: "#f1f5f9", fontSize: 26, fontWeight: 700, margin: "0 0 12px" },
  sub: { color: "#94a3b8", fontSize: 15, lineHeight: 1.6, margin: "0 0 32px" },
  btn: { display: "inline-block", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 600, fontSize: 15 },
};
