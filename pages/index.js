import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const TRANSACTIONS = [
  { id: 1, name: "Salary Credit", date: "May 7, 2025", amount: "+Rs. 85,000", type: "credit", icon: "💼" },
  { id: 2, name: "eSewa Transfer", date: "May 5, 2025", amount: "-Rs. 3,200", type: "debit", icon: "📱" },
  { id: 3, name: "Electricity Bill", date: "May 3, 2025", amount: "-Rs. 1,450", type: "debit", icon: "⚡" },
  { id: 4, name: "Interest Credit", date: "May 1, 2025", amount: "+Rs. 620", type: "credit", icon: "🏦" },
  { id: 5, name: "ATM Withdrawal", date: "Apr 29, 2025", amount: "-Rs. 10,000", type: "debit", icon: "🏧" },
];

function TransactionChart() {
  const points = [
    [0, 85], [2, 72], [4, 68], [6, 75], [8, 40], [10, 15],
    [12, 8], [14, 35], [16, 80], [18, 88], [20, 88],
    [22, 88], [24, 88], [26, 88], [28, 88], [30, 88],
  ];
  const w = 300, h = 120;
  const toX = (d) => (d / 30) * w;
  const toY = (v) => h - (v / 100) * h;
  const pathD = points.map(([d, v], i) =>
    `${i === 0 ? "M" : "L"} ${toX(d).toFixed(1)} ${toY(v).toFixed(1)}`
  ).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="110" style={{ overflow: "visible" }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <line key={v} x1="0" y1={toY(v)} x2={w} y2={toY(v)} stroke="#E5EAF0" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 15 }, (_, i) => (i + 1) * 2).map((d) => (
        <line key={d} x1={toX(d)} y1="0" x2={toX(d)} y2={h} stroke="#E5EAF0" strokeWidth="0.5" />
      ))}
      <path d={pathD} fill="none" stroke="#007BE5" strokeWidth="2" strokeLinejoin="round" />
      {points.map(([d, v], i) => (
        <circle key={i} cx={toX(d)} cy={toY(v)} r="2.5" fill="#007BE5" />
      ))}
      <rect x={toX(12) - 18} y={toY(8) - 22} width="36" height="18" rx="3" fill="#007BE5" />
      <text x={toX(12)} y={toY(8) - 9} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">LOW</text>
    </svg>
  );
}

const MENU_ITEMS = [
  { label: "Load Wallet", icon: "💳" },
  { label: "My Account", icon: "👤" },
  { label: "Fund Transfer", icon: "↗️" },
  { label: "Schedule Pay", icon: "📅" },
  { label: "Payments", icon: "⚡" },
  { label: "Fixed Deposit", icon: "🔒" },
  { label: "Favourites", icon: "⭐" },
  { label: "Settings", icon: "⚙️" },
  { label: "Scan to Pay", icon: "📷" },
];

export default function Home() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [balanceVisible, setBalanceVisible] = useState(false);

  async function handleVerify() {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/get-kyc-url", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Could not get verification link.");
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
        <title>TF Demo Wallet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="root">
        <div className="phone">

          {/* Header */}
          <header className="header">
            <button className="menu-btn" aria-label="Menu">
              <span /><span /><span />
            </button>
            <div className="header-title">Welcome DEMO USER</div>
            <div className="header-right">
              <div className="hdr-icon">🏅</div>
              <div className="hdr-icon">⊞</div>
            </div>
          </header>

          {/* Account Card */}
          <div className="account-card">
            <div className="acct-avatar">SS</div>
            <div className="acct-info">
              <div className="acct-type">SAVINGS ACCOUNT</div>
              <div className="acct-number">XXXX XXXX XXXX</div>
              <div className="acct-balance">
                {balanceVisible ? "Rs. 2,48,500.00" : "Rs. XXX.XX"}
                <button className="eye-btn" onClick={() => setBalanceVisible(v => !v)}>
                  {balanceVisible ? "🙈" : "👁"}
                </button>
              </div>
            </div>
          </div>

          {/* KYC Banner */}
          <div className={`kyc-banner${status === "error" ? " kyc-error" : ""}`}>
            <div className="kyc-banner-left">
              <div className="kyc-shield">🔐</div>
              <div>
                <div className="kyc-banner-title">Identity Verification Required</div>
                <div className="kyc-banner-sub">Complete KYC to unlock all features</div>
              </div>
            </div>
            <button
              className="kyc-verify-btn"
              onClick={handleVerify}
              disabled={status === "loading"}
            >
              {status === "loading" ? <span className="spinner" /> : "Verify Now"}
            </button>
          </div>

          {status === "error" && (
            <div className="error-msg">⚠️ {errorMsg}</div>
          )}

          {/* Chart */}
          <div className="chart-section">
            <div className="chart-title">Transaction Summary of last 30 days</div>
            <div className="chart-wrap">
              <TransactionChart />
              <div className="chart-xaxis">
                {["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30"].map(n => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
            <div className="chart-summary">
              <span>Opening Balance: Rs. 1,74,330.00</span>
              <span>Closing Balance: Rs. 2,48,500.00</span>
            </div>
            <div className="chart-dots">
              <span className="dot dot-active" />
              <span className="dot" />
            </div>
          </div>

          {/* Menu Grid */}
          <div className="menu-grid">
            {MENU_ITEMS.map((item) => (
              <button key={item.label} className="menu-item" disabled>
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Transactions */}
          <div className="txn-section">
            <div className="txn-header">
              <span className="txn-title">Recent Transactions</span>
              <button className="txn-see-all">View All</button>
            </div>
            {TRANSACTIONS.map((t) => (
              <div key={t.id} className="txn-row">
                <div className="txn-icon-wrap">{t.icon}</div>
                <div className="txn-info">
                  <div className="txn-name">{t.name}</div>
                  <div className="txn-date">{t.date}</div>
                </div>
                <div className={`txn-amt ${t.type}`}>{t.amount}</div>
              </div>
            ))}
          </div>

          {/* Footer with TF Logo */}
          <footer className="footer">
            <Image src="/tf-logo.png" alt="thirdfactor.ai" width={140} height={40}
              style={{ objectFit: "contain" }} />
            <div className="footer-tag">Powered by ThirdFactor KYC</div>
          </footer>

        </div>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #E8EDF3; font-family: 'Geist', 'Inter', sans-serif; min-height: 100vh; }
      `}</style>

      <style jsx>{`
        .root { width: 100%; max-width: 420px; margin: 0 auto; }
        .phone { background: #F2F5F9; min-height: 100vh; padding-bottom: 32px; }

        .header {
          background: #007BE5;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .menu-btn {
          background: none; border: none; cursor: pointer;
          display: flex; flex-direction: column; gap: 4px; padding: 4px;
        }
        .menu-btn span { display: block; width: 22px; height: 2px; background: white; border-radius: 2px; }
        .header-title { font-size: 15px; font-weight: 600; color: white; flex: 1; text-align: center; }
        .header-right { display: flex; gap: 8px; }
        .hdr-icon { font-size: 20px; }

        .account-card {
          background: white;
          margin: 16px 16px 0;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 1px 4px rgba(0,39,74,0.08);
        }
        .acct-avatar {
          width: 52px; height: 52px;
          background: #BDE5FF;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; color: #00274A; flex-shrink: 0;
        }
        .acct-type { font-size: 11px; color: #6B7A8D; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 2px; }
        .acct-number { font-size: 13px; color: #00274A; letter-spacing: 1px; margin-bottom: 4px; }
        .acct-balance { font-size: 20px; font-weight: 700; color: #00274A; display: flex; align-items: center; gap: 8px; }
        .eye-btn { background: none; border: none; cursor: pointer; font-size: 16px; padding: 0; }

        .kyc-banner {
          margin: 12px 16px 0;
          background: #00274A;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .kyc-error { border: 1.5px solid #ef4444; }
        .kyc-banner-left { display: flex; align-items: center; gap: 10px; flex: 1; }
        .kyc-shield { font-size: 22px; }
        .kyc-banner-title { font-size: 12px; font-weight: 700; color: white; line-height: 1.3; }
        .kyc-banner-sub { font-size: 11px; color: #54AFFF; margin-top: 2px; }
        .kyc-verify-btn {
          background: #007BE5; color: white; border: none;
          border-radius: 8px; padding: 10px 16px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          white-space: nowrap; min-width: 88px; min-height: 40px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Geist', sans-serif;
        }
        .kyc-verify-btn:hover:not(:disabled) { background: #0069c9; }
        .kyc-verify-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite; display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error-msg {
          margin: 8px 16px 0;
          background: #fff0f0; border: 1px solid #fca5a5;
          border-radius: 8px; padding: 10px 14px;
          font-size: 12px; color: #dc2626;
        }

        .chart-section {
          background: white; margin: 12px 16px 0;
          border-radius: 12px; padding: 16px;
          box-shadow: 0 1px 4px rgba(0,39,74,0.06);
        }
        .chart-title { font-size: 12px; color: #6B7A8D; text-align: center; margin-bottom: 12px; font-weight: 500; }
        .chart-xaxis { display: flex; justify-content: space-between; margin-top: 4px; padding: 0 2px; }
        .chart-xaxis span { font-size: 8px; color: #9BAAB8; }
        .chart-summary { display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid #EEF1F5; }
        .chart-summary span { font-size: 11px; color: #9BAAB8; }
        .chart-dots { display: flex; justify-content: center; gap: 6px; margin-top: 10px; }
        .dot { width: 24px; height: 5px; border-radius: 3px; background: #D1D9E2; }
        .dot-active { background: #007BE5; }

        .menu-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          margin: 12px 16px 0; background: white;
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,39,74,0.06);
        }
        .menu-item {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; padding: 18px 8px; background: none; border: none;
          border-right: 1px solid #EEF1F5; border-bottom: 1px solid #EEF1F5;
          cursor: not-allowed; opacity: 0.75;
        }
        .menu-item:nth-child(3n) { border-right: none; }
        .menu-item:nth-last-child(-n+3) { border-bottom: none; }
        .menu-icon { font-size: 26px; }
        .menu-label { font-size: 11px; font-weight: 600; color: #00274A; text-align: center; line-height: 1.3; }

        .txn-section {
          margin: 12px 16px 0; background: white;
          border-radius: 12px; padding: 16px;
          box-shadow: 0 1px 4px rgba(0,39,74,0.06);
        }
        .txn-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .txn-title { font-size: 13px; font-weight: 700; color: #00274A; }
        .txn-see-all { background: none; border: none; color: #007BE5; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Geist', sans-serif; }
        .txn-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #EEF1F5; }
        .txn-row:last-child { border-bottom: none; }
        .txn-icon-wrap {
          width: 38px; height: 38px; background: #EEF6FF;
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .txn-info { flex: 1; }
        .txn-name { font-size: 13px; font-weight: 600; color: #00274A; }
        .txn-date { font-size: 11px; color: #9BAAB8; margin-top: 2px; }
        .txn-amt { font-size: 13px; font-weight: 700; }
        .txn-amt.credit { color: #007BE5; }
        .txn-amt.debit { color: #00274A; }

        .footer {
          margin: 24px 16px 0; display: flex; flex-direction: column;
          align-items: center; gap: 6px; padding-top: 16px; border-top: 1px solid #D1D9E2;
        }
        .footer-tag { font-size: 11px; color: #9BAAB8; font-weight: 500; }
      `}</style>
    </>
  );
}
