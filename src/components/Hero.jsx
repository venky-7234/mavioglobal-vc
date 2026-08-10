import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <header className="nav-row" style={{ paddingTop: '20px' }}>
          <div className="brand">
            <div className="brand-mark">M</div>
            <span>Mavio Global</span>
          </div>
          <div className="manifest-tag">VC SCANNER</div>
        </header>
        
        <div style={{ marginTop: '80px', marginBottom: '80px' }}>
          <div className="hero-eyebrow">Smart Connect</div>
          <h1 className="hero-title">
            Digital <em>Business Card</em> <br />
            Scanner
          </h1>
          <p className="hero-sub">
            Effortlessly digitize visiting cards and connect your network directly to the Mavio Global ecosystem.
          </p>
          <div className="hero-cta-row">
            <a href="#scan" className="btn btn-primary">Start Scanning</a>
            <a href="#about" className="btn btn-ghost">Learn More</a>
          </div>
        </div>
      </div>

      <div className="stat-strip">
        <div className="stat-strip-inner" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="stat">
            <div className="num">OCR</div>
            <div className="lbl">Powered</div>
          </div>
          <div className="stat">
            <div className="num">Instant</div>
            <div className="lbl">Sync</div>
          </div>
          <div className="stat">
            <div className="num">Secure</div>
            <div className="lbl">Storage</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
