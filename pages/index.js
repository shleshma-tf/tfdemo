import { useState } from "react";
import Head from "next/head";

/* ─── Modern Icon Set ─────────────────────────────────────── */
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const paths = {
    scan: <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10M12 7v10" />,
    send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />,
    wallet: <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2M16 12h5" />,
    history: <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    user: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
    bell: <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-kyc-url", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Referro Wallet | Digital Banking</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      {/* --- Top Header --- */}
      <header className="main-header">
        <div className="user-info">
          <div className="avatar">JD</div>
          <div className="text-content">
            <span className="greeting">Namaste,</span>
            <span className="user-name">John Doe</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn"><Icon name="bell" size={20} /></button>
          <button className="icon-btn"><Icon name="user" size={20} /></button>
        </div>
      </header>

      <main className="content">
        {/* --- Balance Card --- */}
        <section className="balance-card">
          <div className="card-top">
            <p>Total Balance</p>
            <button onClick={() => setVisible(!visible)} className="hide-toggle">
              {visible ? "Hide" : "Show"}
            </button>
          </div>
          <h1 className="amount">{visible ? "NPR 2,48,500.00" : "NPR XXXXX.XX"}</h1>
          <div className="card-footer">
            <span>A/C: 9841****23</span>
            <span className="tag">Savings Account</span>
          </div>
        </section>

        {/* --- Quick Actions Grid --- */}
        <div className="quick-actions">
          {[
            { label: "Load Fund", icon: "wallet" },
            { label: "Transfer", icon: "send" },
            { label: "Top-Up", icon: "scan" },
            { label: "Bank Transfer", icon: "history" }
          ].map((item) => (
            <div key={item.label} className="action-item">
              <div className="action-icon"><Icon name={item.icon} color="#1a4dbe" /></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* --- KYC Alert Section --- */}
        <div className="kyc-banner">
          <div className="kyc-icon"><Icon name="shield" color="#e63946" /></div>
          <div className="kyc-text">
            <h3>Verify Your Identity</h3>
            <p>KYC is pending. Complete it now to increase your transaction limits.</p>
          </div>
          <button className="verify-btn" onClick={handleVerify} disabled={loading}>
            {loading ? "..." : "Verify"}
          </button>
        </div>

        {/* --- Transactions --- */}
        <section className="transactions">
          <div className="section-header">
            <h2>Recent Activities</h2>
            <button className="view-all">View All</button>
          </div>
          {[
            { title: "Internet Bill", date: "May 10", amt: "-1,500", color: "red" },
            { title: "Salary Credited", date: "May 07", amt: "+85,000", color: "green" },
            { title: "Merchant Payment", date: "May 05", amt: "-450", color: "red" }
          ].map((tx, i) => (
            <div key={i} className="tx-row">
              <div className="tx-lead">
                <div className="tx-avatar">{tx.title[0]}</div>
                <div>
                  <p className="tx-title">{tx.title}</p>
                  <p className="tx-date">{tx.date}</p>
                </div>
              </div>
              <p className={`tx-amt ${tx.color}`}>Rs. {tx.amt}</p>
            </div>
          ))}
        </section>
      </main>

      {/* --- Bottom Navigation --- */}
      <nav className="bottom-nav">
        <button className="nav-item active"><Icon name="wallet" size={24} /><span>Home</span></button>
        <button className="nav-item"><Icon name="history" size={24} /><span>History</span></button>
        <div className="nav-scan">
          <div className="scan-circle"><Icon name="scan" color="#fff" size={28} /></div>
        </div>
        <button className="nav-item"><Icon name="send" size={24} /><span>Send</span></button>
        <button className="nav-item"><Icon name="user" size={24} /><span>Account</span></button>
      </nav>

      <style jsx global>{`
        :root {
          --primary: #1a4dbe;
          --bg: #f2f5f9;
          --text-dark: #2d3436;
          --text-light: #636e72;
          --success: #00b894;
          --danger: #d63031;
        }
        body { background: var(--bg); font-family: 'Inter', sans-serif; margin: 0; color: var(--text-dark); }
        
        .container { max-width: 480px; margin: 0 auto; min-height: 100vh; position: relative; padding-bottom: 90px; }
        
        .main-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #fff; }
        .user-info { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 40px; height: 40px; background: #dfe6e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .greeting { font-size: 12px; color: var(--text-light); display: block; }
        .user-name { font-weight: 700; font-size: 16px; }
        .header-actions { display: flex; gap: 10px; }
        .icon-btn { border: none; background: #f2f5f9; padding: 8px; border-radius: 8px; cursor: pointer; }

        .balance-card { background: var(--primary); margin: 15px; padding: 25px; border-radius: 20px; color: #fff; box-shadow: 0 10px 20px rgba(26,77,190,0.2); }
        .card-top { display: flex; justify-content: space-between; font-size: 14px; opacity: 0.9; }
        .hide-toggle { background: rgba(255,255,255,0.2); border: none; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
        .amount { font-size: 28px; margin: 10px 0; font-weight: 800; letter-spacing: -0.5px; }
        .card-footer { display: flex; justify-content: space-between; font-size: 12px; margin-top: 15px; }
        .tag { background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 10px; }

        .quick-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 15px; }
        .action-item { display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; text-align: center; }
        .action-icon { background: #fff; padding: 15px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }

        .kyc-banner { background: #fff; margin: 15px; padding: 15px; border-radius: 15px; display: flex; align-items: center; gap: 12px; border-left: 4px solid var(--danger); }
        .kyc-text h3 { font-size: 14px; margin: 0; }
        .kyc-text p { font-size: 11px; color: var(--text-light); margin: 4px 0 0; }
        .verify-btn { background: var(--primary); color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 12px; cursor: pointer; }

        .transactions { background: #fff; margin-top: 20px; padding: 20px; border-radius: 25px 25px 0 0; }
        .section-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .section-header h2 { font-size: 16px; font-weight: 800; }
        .view-all { background: none; border: none; color: var(--primary); font-weight: 700; font-size: 13px; }
        
        .tx-row { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #f2f5f9; }
        .tx-lead { display: flex; align-items: center; gap: 12px; }
        .tx-avatar { width: 35px; height: 35px; background: #f2f5f9; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--primary); }
        .tx-title { font-size: 14px; font-weight: 700; margin: 0; }
        .tx-date { font-size: 12px; color: var(--text-light); margin: 2px 0 0; }
        .tx-amt { font-weight: 700; font-size: 14px; }
        .tx-amt.red { color: var(--danger); }
        .tx-amt.green { color: var(--success); }

        .bottom-nav { position: fixed; bottom: 0; width: 100%; max-width: 480px; background: #fff; display: flex; justify-content: space-around; align-items: center; padding: 10px 0 25px; border-top: 1px solid #eee; }
        .nav-item { background: none; border: none; color: #b2bec3; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 10px; cursor: pointer; }
        .nav-item.active { color: var(--primary); }
        .nav-scan { position: relative; top: -20px; }
        .scan-circle { background: var(--primary); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(26,77,190,0.4); border: 4px solid var(--bg); }
      `}</style>
    </div>
  );
}
