import React from 'react';

function Features() {
  return (
    <section id="about" className="section services">
      <div className="section-label">How it works</div>
      <h2 className="section-title" style={{ color: 'var(--ink)' }}>Seamless Card Scanning</h2>
      <p className="about-text" style={{ maxWidth: '600px' }}>
        Capture contact details instantly with our AI-powered OCR technology. Simply upload or take a photo of the visiting card to digitize and save it to the Mavio Global CRM.
      </p>

      <div className="service-grid">
        <div className="service-card">
          <div className="service-code">STEP 01</div>
          <h3>Capture</h3>
          <p>Scan or upload a photo of the business card using your device.</p>
        </div>
        <div className="service-card">
          <div className="service-code">STEP 02</div>
          <h3>Extract</h3>
          <p>Our intelligent OCR system reads the name, email, phone, and company.</p>
        </div>
        <div className="service-card">
          <div className="service-code">STEP 03</div>
          <h3>Verify</h3>
          <p>Review the extracted information and make any necessary edits.</p>
        </div>
        <div className="service-card">
          <div className="service-code">STEP 04</div>
          <h3>Save</h3>
          <p>Instantly sync the contact to your Mavio Global address book.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
