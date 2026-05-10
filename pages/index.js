import { useState } from "react";
import Head from "next/head";
import Image from "next/image"; // Import the Next.js Image component

/* ─── SVG Icon Library ─────────────────────────────────────── */
const Icon = ({ name, size = 24, color = "#00274A", strokeWidth = 1.5 }) => {
  const s = { width: size, height: size, display: "block" };
  const paths = {
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    qr: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3z"/><path d="M17 17h3v3h-3z"/><path d="M14 17h.01"/><path d="M17 14h.01"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff: <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    wallet: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><path d="M1 10h22"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    scan: <><polyline points="23 7 23 1 17 1"/><line x1="23" y1="1" x2="16" y2="8"/><polyline points="1 17 1 23 7 23"/><line x1="1" y1="23" x2="8" y2="16"/><polyline points="1 7 1 1 7 1"/><line x1="1" y1="1" x2="8" y2="8"/><polyline points="23 17 23 23 17 23"/><line x1="23" y1="23" x2="16" y2="16"/></>,
    award: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    arrowUp: <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    arrowDown: <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    building: <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></>,
    creditCard: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  };
  return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

/* ─── Chart ─────────────────────────────────────────────────── */
function Chart() {
  const data = [
    { d: 0, v: 38 }, { d: 2, v: 30 }, { d: 4, v: 28 }, { d: 6, v: 34 },
    { d: 8, v: 16 }, { d: 10, v: 6 }, { d: 12, v: 3 }, { d: 14, v: 22 },
    { d: 16, v: 72 }, { d: 18, v: 86 }, { d: 20, v: 88 }, { d: 22, v: 88 },
    { d: 24, v: 88 }, { d: 26, v: 88 }, { d: 28, v: 88 }, { d: 30, v: 88 },
  ];
  // W and H act as internal viewport coordinate systems, not absolute pixels
  const W = 320, H = 110;
  const px = (d) => (d / 30) * W;
  const py = (v) => H - 8 - ((v / 100) * (H - 16));
  const line = data.map((p, i) => `${i === 0 ? "M" : "L"}${px(p.d).toFixed(1)},${py(p.v).toFixed(1)}`).join(" ");
  const area = line + ` L${px(30)},${H} L${px(0)},${H} Z`;
  const lowPt = data[6];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#007BE5" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#007BE5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(v => (
        <line key={v} x1="0" y1={py(v)} x2={W} y2={py(v)} stroke="#E8EDF4" strokeWidth="0.75" />
      ))}
      {/* Area fill */}
      <path d={area} fill="url(#chartGrad)" />
      {/* Line */}
      <path d={line} fill="none" stroke="#007BE5" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {/* Dots */}
      {data.map((p, i) => (
        <circle key={i} cx={px(p.d)} cy={py(p.v)} r="3" fill="#fff" stroke="#007BE5" strokeWidth="1.5" />
      ))}
      {/* Low tooltip */}
      <rect x={px(lowPt.d) - 20} y={py(lowPt.v) - 26} width="40" height="20" rx="4" fill="#007BE5" />
      <text x={px(lowPt.d)} y={py(lowPt.v) - 12} textAnchor="middle" fill="white" fontSize="10" fontFamily="'DM Sans',sans-serif" fontWeight="600">LOW</text>
      <line x1={px(lowPt.d)} y1={py(lowPt.v) - 6} x2={px(lowPt.d)} y2={py(lowPt.v)} stroke="#007BE5" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */
const MENU = [
  { label: "Load Wallet",      icon: "wallet"     },
  { label: "My Account",       icon: "user"       },
  { label: "Fund Transfer",    icon: "send"       },
  { label: "Schedule Pay",     icon: "calendar"   },
  { label: "Payment",          icon: "zap"        },
  { label: "Fixed Deposit",    icon: "lock"       },
  { label: "Favourites",       icon: "star"       },
  { label: "Settings",         icon: "settings"   },
  { label: "Scan to Pay",      icon: "scan"       },
];

const TXN = [
  { id: 1, label: "Salary Credit",    date: "May 7, 2025",  amt: "+Rs. 85,000",  credit: true,  icon: "building"    },
  { id: 2, label: "eSewa Transfer",   date: "May 5, 2025",  amt: "−Rs. 3,200",   credit: false, icon: "send"         },
  { id: 3, label: "Electricity Bill", date: "May 3, 2025",  amt: "−Rs. 1,450",   credit: false, icon: "zap"          },
  { id: 4, label: "Interest Credit",  date: "May 1, 2025",  amt: "+Rs. 620",     credit: true,  icon: "creditCard"  },
  { id: 5, label: "ATM Withdrawal",   date: "Apr 29, 2025", amt: "−Rs. 10,000",  credit: false, icon: "wallet"      },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [visible, setVisible] = useState(false);

  async function handleVerify() {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/get-kyc-url", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Could not generate verification link.");
      window.location.href = data.url;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>TF Demo — Digital Wallet</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="root">
        {/* ── Header ── */}
        <header className="hdr">
          <button className="hdr-btn" aria-label="Menu">
            <Icon name="menu" color="#fff" size={20} />
          </button>
          <span className="hdr-title">Welcome, Demo User</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="hdr-btn" aria-label="Notifications">
              <Icon name="bell" color="#fff" size={18} />
            </button>
            <button className="hdr-btn" aria-label="QR">
              <Icon name="qr" color="#fff" size={18} />
            </button>
          </div>
        </header>

        {/* ── Account Card ── */}
        <div className="acct-card">
          <div className="acct-row">
            <div className="acct-avatar">
              <span>DD</span>
            </div>
            <div className="acct-meta">
              <div className="acct-type">SPECIAL SAVING</div>
              <div className="acct-num">XXXX&nbsp;&nbsp;XXXX&nbsp;&nbsp;XXXX</div>
              <div className="acct-bal-row">
                <span className="acct-bal">
                  {visible ? "Rs. 2,48,500.00" : "Rs. ●●●.●●"}
                </span>
                <button className="eye-btn" onClick={() => setVisible(v => !v)} aria-label="Toggle balance">
                  <Icon name={visible ? "eyeOff" : "eye"} size={16} color="#6B7A8D" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── KYC Banner ── */}
        <div className={`kyc-banner${error ? " kyc-err" : ""}`}>
          <div className="kyc-left">
            <div className="kyc-icon-wrap">
              <Icon name="shield" size={20} color="#007BE5" />
            </div>
            <div className="kyc-meta-wrap"> {/* Flex container for better small screen spacing */}
              <div className="kyc-title">Identity Verification Required</div>
              <div className="kyc-sub">Complete KYC to unlock all wallet features</div>
            </div>
          </div>
          <button className="kyc-btn" onClick={handleVerify} disabled={loading}>
            {loading ? <span className="spin" /> : "Verify Identity"}
          </button>
        </div>

        {error && <div className="err-bar">{error}</div>}

        {/* ── Chart ── */}
        <div className="card">
          <div className="chart-hdr">Transaction Summary of last 30 days</div>
          <div className="chart-wrap">
            <Chart />
          </div>
          <div className="chart-axis">
            {["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30"].map(n => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <div className="chart-footer">
            <span>Opening Balance:&nbsp;<b>Rs. 1,74,330.00</b></span>
            <span>Closing Balance:&nbsp;<b>Rs. 2,48,500.00</b></span>
          </div>
          <div className="dots">
            <span className="dot active" />
            <span className="dot" />
          </div>
        </div>

        {/* ── Menu Grid ── */}
        <div className="grid-card">
          {MENU.map((m) => (
            <button key={m.label} className="grid-item" disabled>
              <div className="grid-icon">
                <Icon name={m.icon} size={22} color="#007BE5" strokeWidth={1.4} />
              </div>
              <span className="grid-label">{m.label}</span>
            </button>
          ))}
        </div>

        {/* ── Transactions ── */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="txn-hdr">
            <span className="txn-title">Recent Transactions</span>
            <button className="link-btn">View All</button>
          </div>
          {TXN.map((t) => (
            <div key={t.id} className="txn-row">
              <div className="txn-icon">
                <Icon name={t.icon} size={18} color="#007BE5" strokeWidth={1.4} />
              </div>
              <div className="txn-info">
                <div className="txn-name">{t.label}</div>
                <div className="txn-date">{t.date}</div>
              </div>
              <div className={`txn-amt ${t.credit ? "cr" : "dr"}`}>{t.amt}</div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <footer className="footer">
          {/* Replaced Inline SVG with actual ThirdFactor Logo Image */}
          <div className="tf-logo-wrap">
            <Image 
              src="/tf-logo.png" // Path assumes file is in the 'public/' directory
              alt="ThirdFactor.ai Logo" 
              width={112} // Adjust dimensions as needed. This width keeps a sleek footer profile.
              height={32}
              quality={100}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="footer-sub">Powered by ThirdFactor KYC · Demo Environment</div>
        </footer>
      </div>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #EDF0F5;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          min-height: -webkit-fill-available; /* Modern responsive approach */
          -webkit-font-smoothing: antialiased;
        }
        button { font-family: inherit; }
      `}</style>

      <style jsx>{`
        .root {
          /* Full screen responsiveness and modern centering */
          width: 100%;
          min-height: 100vh;
          min-height: -webkit-fill-available;
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          background: #F4F6FA;
          padding-bottom: env(safe-area-inset-bottom, 32px); /* Handles iPhone notch/home bar */
        }

        /* Adjustments for tablets and desktops to maintain mobile-like experience */
        @media (min-width: 480px) {
          .root {
            max-width: 420px;
            border-left: 1px solid #E8EDF4;
            border-right: 1px solid #E8EDF4;
            box-shadow: 0 0 40px rgba(0,39,74,0.05);
          }
        }

        /* Header */
        .hdr {
          background: #007BE5;
          padding: calc(14px + env(safe-area-inset-top, 0px)) 20px 14px; /* Adjusts padding for phone notches */
          display: flex;
          align-items: center;
          gap: 12px;
          position: sticky; /* Keep navigation visible when scrolling */
          top: 0;
          z-index: 10;
        }
        .hdr-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 8px;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .hdr-btn:hover { background: rgba(255,255,255,0.25); }
        .hdr-title {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.1px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis; /* Handle overflow on very small devices */
        }

        /* Account Card */
        .acct-card {
          background: #fff;
          margin: 14px 16px 0;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 1px 6px rgba(0,39,74,0.07);
        }
        .acct-row { display: flex; align-items: center; gap: 14px; }
        .acct-avatar {
          width: 54px; height: 54px;
          background: linear-gradient(135deg, #BDE5FF 0%, #54AFFF 100%);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; font-weight: 700; color: #00274A;
          flex-shrink: 0; letter-spacing: 0.5px;
        }
        .acct-meta { flex: 1; min-width: 0; } /* Handle narrow widths gracefully */
        .acct-type {
          font-size: 10px; font-weight: 600;
          color: #9BAAB8; letter-spacing: 1px;
          margin-bottom: 3px;
        }
        .acct-num {
          font-family: 'DM Mono', monospace;
          font-size: 13px; color: #00274A;
          letter-spacing: 1px; margin-bottom: 6px;
          white-space: nowrap;
        }
        .acct-bal-row { display: flex; align-items: center; gap: 10px; }
        .acct-bal {
          font-size: calc(18px + 1vw); /* Fluid typography */
          font-weight: 700;
          color: #00274A; letter-spacing: -0.3px;
          max-width: max-content;
        }
        /* Mobile-first adjustment for balance text */
        @media (max-width: 360px) {
            .acct-bal {
                font-size: 19px; 
            }
        }
        .eye-btn {
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; padding: 4px;
          border-radius: 6px;
        }
        .eye-btn:hover { background: #F0F4F9; }

        /* KYC Banner */
        .kyc-banner {
          margin: 12px 16px 0;
          background: #00274A;
          border-radius: 14px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border: 1.5px solid transparent;
        }
        
        /* Layout adjustment for very narrow phone screens */
        @media (max-width: 360px) {
            .kyc-banner {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
            }
            .kyc-btn {
                width: 100%;
            }
        }

        .kyc-err { border-color: #f87171; }
        .kyc-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .kyc-icon-wrap {
          width: 40px; height: 40px; flex-shrink: 0;
          background: rgba(0,123,229,0.15);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .kyc-meta-wrap { flex: 1; } /* Wrapper to manage text overflow */
        .kyc-title {
          font-size: 12.5px; font-weight: 700;
          color: #fff; line-height: 1.3; margin-bottom: 3px;
        }
        .kyc-sub { font-size: 11px; color: #54AFFF; line-height: 1.4; }
        .kyc-btn {
          background: #007BE5; color: #fff;
          border: none; border-radius: 9px;
          padding: 11px 16px; font-size: 12.5px; font-weight: 700;
          cursor: pointer; white-space: nowrap;
          min-width: 100px; min-height: 42px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, transform 0.1s;
          letter-spacing: 0.1px;
        }
        .kyc-btn:hover:not(:disabled) { background: #0069cc; transform: translateY(-1px); }
        .kyc-btn:active { transform: translateY(0); }
        .kyc-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Spinner */
        .spin {
          display: inline-block; width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Error */
        .err-bar {
          margin: 8px 16px 0;
          background: #FEF2F2; border: 1px solid #FCA5A5;
          border-radius: 10px; padding: 10px 14px;
          font-size: 12px; color: #B91C1C; font-weight: 500;
        }

        /* Card (shared) */
        .card {
          background: #fff;
          margin: 12px 16px 0;
          border-radius: 14px;
          padding: 16px 18px;
          box-shadow: 0 1px 6px rgba(0,39,74,0.06);
        }

        /* Chart */
        .chart-hdr {
          font-size: 12px; font-weight: 500; color: #9BAAB8;
          text-align: center; margin-bottom: 14px; letter-spacing: 0.1px;
        }
        .chart-wrap { margin: 0 -4px; height: auto; }
        .chart-axis {
          display: flex; justify-content: space-between;
          margin-top: 6px; padding: 0 4px;
        }
        .chart-axis span { font-size: 8px; color: #C0CAD6; font-family: 'DM Mono', monospace; }
        .chart-footer {
          display: flex; justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap; /* responsive wrap for small screens */
          margin-top: 12px; padding-top: 12px;
          border-top: 1px solid #F0F3F8;
          font-size: 11px; color: #9BAAB8;
        }
        .chart-footer b { color: #00274A; font-weight: 600; }
        .dots { display: flex; justify(content: center; gap: 6px; margin-top: 12px; }
        .dot { width: 22px; height: 4px; border-radius: 2px; background: #D6DDE8; }
        .dot.active { background: #007BE5; width: 32px; }

        /* Grid Menu */
        .grid-card {
          background: #fff;
          margin: 12px 16px 0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 6px rgba(0,39,74,0.06);
          display: grid;
          /* Flexible columns: minimum of 100px wide, or max possible */
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        }
        /* Mobile first adjustment: on extremely small devices, use fewer columns */
        @media (max-width: 320px) {
            .grid-card {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        .grid-item {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 9px; padding: 20px 8px;
          background: none; border: none;
          border-right: 1px solid #F0F3F8;
          border-bottom: 1px solid #F0F3F8;
          cursor: not-allowed;
          height: 100%;
        }
        
        /* Responsive borders for grid */
        @media (min-width: 321px) {
            .grid-item:nth-child(3n) { border-right: none; }
            .grid-item:nth-last-child(-n+3) { border-bottom: none; }
        }
        @media (max-width: 320px) {
            .grid-item:nth-child(2n) { border-right: none; }
            .grid-item:nth-last-child(-n+2) { border-bottom: none; }
        }

        .grid-icon {
          width: 48px; height: 48px;
          background: #EEF6FF;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .grid-label {
          font-size: 10.5px; font-weight: 600;
          color: #00274A; text-align: center;
          line-height: 1.35; letter-spacing: 0.1px;
        }

        /* Transactions */
        .txn-hdr {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 14px;
        }
        .txn-title { font-size: 14px; font-weight: 700; color: #00274A; }
        .link-btn {
          background: none; border: none;
          color: #007BE5; font-size: 12px;
          font-weight: 600; cursor: pointer;
          padding: 0; font-family: inherit;
        }
        .txn-row {
          display: flex; align-items: center;
          gap: 12px; padding: 11px 0;
          border-bottom: 1px solid #F4F6FA;
        }
        .txn-row:last-child { border-bottom: none; padding-bottom: 0; }
        .txn-icon {
          width: 42px; height: 42px; flex-shrink: 0;
          background: #EEF6FF; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }
        .txn-info { flex: 1; min-width: 0; }
        .txn-name {
          font-size: 13px; font-weight: 600;
          color: #00274A; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .txn-date { font-size: 11px; color: #9BAAB8; margin-top: 2px; }
        .txn-amt { font-size: 13.5px; font-weight: 700; white-space: nowrap; }
        .txn-amt.cr { color: #007BE5; }
        .txn-amt.dr { color: #00274A; }

        /* Footer */
        .footer {
          margin: 24px 16px 0;
          padding: 18px 0 calc(env(safe-area-inset-bottom, 0px) + 32px); /* notch handling */
          border-top: 1px solid #E4E9F0;
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          flex-shrink: 0; /* Ensures footer doesn't get squished */
        }
        .tf-logo-wrap {
          display: flex; align-items: center; justify-content: center;
          width: auto;
          margin-bottom: 4px; /* small space above powered by text */
        }
        .footer-sub {
          font-size: 11px; color: #9BAAB8; font-weight: 400;
          text-align: center;
        }
      `}</style>
    </>
  );
}
