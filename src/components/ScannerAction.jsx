import React from 'react';

function ScannerAction() {
  return (
    <section id="scan" className="section connect" style={{ paddingBottom: '60px', paddingTop: '60px' }}>
      <div className="section-label">Scanner</div>
      <div className="connect-top">
        <div>
          <h2>Ready to Scan?</h2>
          <p className="connect-sub" style={{ color: '#9FB1C3' }}>
            The scanner module will be integrated here. For now, you can upload a visiting card image to begin.
          </p>
        </div>
        <div className="channel-flow">
          <button className="btn btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
            Upload Image
          </button>
          <button className="btn btn-ghost" style={{ cursor: 'pointer' }}>
            Open Camera
          </button>
        </div>
      </div>
      <div className="manifest-card" style={{ textAlign: 'center', padding: '40px 20px', borderStyle: 'dashed' }}>
        <p style={{ color: '#9FB1C3' }}>Scanner Integration Placeholder</p>
      </div>
    </section>
  );
}

export default ScannerAction;
