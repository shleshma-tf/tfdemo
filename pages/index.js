import { useState } from "react";
import Head from "next/head";

const DEMO_TRANSACTIONS = [
  { id: 1, name: "Netflix", date: "May 7", amount: "-$15.99", icon: "🎬", color: "#ef4444" },
  { id: 2, name: "Salary Deposit", date: "May 1", amount: "+$4,200.00", icon: "💼", color: "#22c55e" },
  { id: 3, name: "Amazon", date: "Apr 29", amount: "-$89.32", icon: "📦", color: "#f59e0b" },
  { id: 4, name: "Coffee Shop", date: "Apr 28", amount: "-$6.50", icon: "☕", color: "#a78bfa" },
  { id: 5, name: "Freelance", date: "Apr 25", amount: "+$750.00", icon: "💻", color: "#22c55e" },
];

const QUICK_ACTIONS = [
  { label: "Send", icon: "↑" },
  { label: "Receive", icon: "↓" },
  { label: "Pay", icon: "⚡" },
  { label: "Top Up", icon: "+" },
];

export default function Home() {
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");
  const [lastUser, setLastUser] = useState(null);

  async function handleVerify() {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/get-kyc-url", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Could not get KYC link.");
      setLastUser({ id: data.identifier, label: data.label });
      setStatus("idle");
      window.location.href = data.url;
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <>
      <Head>
        <title>Referro Wallet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="page">
        {/* ── Top bar ── */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="avatar">R</div>
            <div>
              <div className="greeting">Good morning 👋</div>
              <div className="username">Referro User</div>
            </div>
          </div>
          <button className="notif-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
        </header>

        {/* ── Balance card ── */}
        <div className="balance-card">
          <div className="card-inner">
            <div className="card-label">Total Balance</div>
            <div className="card-balance">$12,480.50</div>
            <div className="card-row">
              <span className="card-pill income">↑ +$4,950 this month</span>
              <span className="card-pill loss">↓ -$2,340 spent</span>
            </div>
            <div className="card-number">•••• •••• •••• 4291</div>
          </div>
          <div className="card-glow" />
        </div>

        {/* ── Quick actions ── */}
        <div className="quick-actions">
          {QUICK_ACTIONS.map((a) => (
            <button key={a.label} className="qa-btn" disabled>
              <span className="qa-icon">{a.icon}</span>
              <span className="qa-label">{a.label}</span>
            </button>
          ))}
        </div>

        {/* ── KYC banner ── */}
        <div className="kyc-banner">
          <div className="kyc-left">
            <div className="kyc-icon">🔐</div>
            <div>
              <div className="kyc-title">Verify Your Identity</div>
              <div className="kyc-sub">Required to unlock full wallet access</div>
            </div>
          </div>
          <button
            className={`kyc-btn ${status === "loading" ? "kyc-btn--loading" : ""}`}
            onClick={handleVerify}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="spinner" />
            ) : (
              "Start KYC →"
            )}
          </button>
        </div>

        {status === "error" && (
          <div className="error-toast">⚠️ {errorMsg}</div>
        )}

        {lastUser && (
          <div className="debug-pill">Last session: {lastUser.label} ({lastUser.id})</div>
        )}

        {/* ── Transactions ── */}
        <div className="section">
          <div className="section-header">
            <span className="section-title">Recent Transactions</span>
            <button className="see-all">See all</button>
          </div>
          <div className="txn-list">
            {DEMO_TRANSACTIONS.map((t) => (
              <div key={t.id} className="txn-row">
                <div className="txn-icon" style={{ background: t.color + "22" }}>
                  <span style={{ fontSize: 18 }}>{t.icon}</span>
                </div>
                <div className="txn-info">
                  <div className="txn-name">{t.name}</div>
                  <div className="txn-date">{t.date}</div>
                </div>
                <div className={`txn-amount ${t.amount.startsWith("+") ? "pos" : "neg"}`}>
                  {t.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f172a; font-family: 'Inter', sans-serif; color: #f1f5f9; min-height: 100vh; }
      `}</style>

      <style jsx>{`
        .page {
          max-width: 420px;
          margin: 0 auto;
          padding: 0 0 40px;
          min-height: 100vh;
        }

        /* Top bar */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 12px;
        }
        .topbar-left { display: flex; align-items: center; gap: 12px; }
        .avatar {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 18px;
        }
        .greeting { font-size: 12px; color: #64748b; }
        .username { font-size: 15px; font-weight: 600; color: #e2e8f0; }
        .notif-btn {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          color: #94a3b8;
          cursor: pointer;
        }

        /* Balance card */
        .balance-card {
          margin: 8px 20px 20px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #9333ea 100%);
          border-radius: 24px;
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
        }
        .card-glow {
          position: absolute;
          top: -40px; right: -40px;
          width: 180px; height: 180px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
          pointer-events: none;
        }
        .card-label { font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 8px; }
        .card-balance { font-size: 36px; font-weight: 800; letter-spacing: -1px; margin-bottom: 16px; }
        .card-row { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .card-pill {
          font-size: 12px; font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .income { background: rgba(34,197,94,0.25); color: #86efac; }
        .loss { background: rgba(239,68,68,0.25); color: #fca5a5; }
        .card-number { font-size: 14px; color: rgba(255,255,255,0.5); letter-spacing: 2px; }

        /* Quick actions */
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 0 20px 20px;
        }
        .qa-btn {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 16px 8px;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          cursor: not-allowed;
          opacity: 0.6;
        }
        .qa-icon { font-size: 20px; color: #a78bfa; font-weight: 700; }
        .qa-label { font-size: 12px; color: #94a3b8; }

        /* KYC Banner */
        .kyc-banner {
          margin: 0 20px 12px;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border: 1.5px solid #6366f1;
          border-radius: 18px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .kyc-left { display: flex; align-items: center; gap: 12px; }
        .kyc-icon { font-size: 26px; }
        .kyc-title { font-size: 14px; font-weight: 700; color: #e2e8f0; }
        .kyc-sub { font-size: 12px; color: #64748b; margin-top: 2px; }
        .kyc-btn {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 90px;
          min-height: 44px;
          transition: opacity 0.2s;
        }
        .kyc-btn:hover { opacity: 0.85; }
        .kyc-btn--loading { cursor: not-allowed; opacity: 0.7; }

        /* Spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Error toast */
        .error-toast {
          margin: 0 20px 12px;
          background: #450a0a;
          border: 1px solid #ef4444;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 13px;
          color: #fca5a5;
        }

        /* Debug pill */
        .debug-pill {
          margin: 0 20px 12px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 11px;
          color: #475569;
          font-family: monospace;
        }

        /* Transactions */
        .section { padding: 0 20px; }
        .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .section-title { font-size: 16px; font-weight: 700; color: #e2e8f0; }
        .see-all { background: none; border: none; color: #6366f1; font-size: 13px; font-weight: 600; cursor: pointer; }
        .txn-list { display: flex; flex-direction: column; gap: 4px; }
        .txn-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px;
          background: #1e293b;
          border-radius: 16px;
          border: 1px solid #1e293b;
          transition: border-color 0.15s;
        }
        .txn-row:hover { border-color: #334155; }
        .txn-icon {
          width: 44px; height: 44px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .txn-info { flex: 1; }
        .txn-name { font-size: 14px; font-weight: 600; color: #e2e8f0; }
        .txn-date { font-size: 12px; color: #64748b; margin-top: 2px; }
        .txn-amount { font-size: 15px; font-weight: 700; }
        .pos { color: #22c55e; }
        .neg { color: #f1f5f9; }
      `}</style>
    </>
  );
}
