import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/hero.png';

const profilesList = ['mahendra', 'vinushna', 'varshith'];

const FallbackImage = ({ src, alt, className, type, onClick, style }) => {
  const [error, setError] = React.useState(false);

  // Reset error when src changes
  React.useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    if (type === 'portrait') {
      return (
        <div className={className} style={{ backgroundColor: '#dce1e8', display: 'flex', alignItems: 'center', justifyContent: 'center', ...(onClick ? { cursor: 'zoom-in' } : {}), ...style }} onClick={onClick}>
           <svg style={{ width: '64px', height: '64px', color: 'rgba(0,0,0,0.1)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </div>
      );
    }
    if (type === 'signature') {
      return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', opacity: 0.3, ...(onClick ? { cursor: 'zoom-in' } : {}), ...style }} onClick={onClick}>
          <div style={{ height: '1px', width: '128px', background: 'linear-gradient(to right, rgba(255,255,255,0.4), transparent)' }}></div>
        </div>
      );
    }
    return <div className={className} style={{ backgroundColor: 'rgba(255,255,255,0.05)', ...(onClick ? { cursor: 'zoom-in' } : {}), ...style }} onClick={onClick}></div>;
  }

  return <img src={src} alt={alt} className={className} onError={() => setError(true)} onClick={onClick} style={{ ...(onClick ? { cursor: 'zoom-in' } : {}), ...style }} />;
};

const SocialIcon = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-[#d4af37] transition-colors block"
  >
    {children}
  </a>
);

export default function VisitingCard({ profile }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [modalImage, setModalImage] = React.useState(null);
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.vc-animate');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [profile]); // re-run if profile changes

  if (!profile) return null;

  const currentIndex = profilesList.indexOf(profile.id);
  
  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? profilesList.length - 1 : currentIndex - 1;
    navigate(`/vc/${profilesList[prevIndex]}`);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === profilesList.length - 1 ? 0 : currentIndex + 1;
    navigate(`/vc/${profilesList[nextIndex]}`);
  };

  return (
    <div ref={containerRef} style={{ minHeight: '100vh', backgroundColor: '#050505', color: 'white', display: 'flex', flexDirection: 'column', position: 'relative', width: '100%', overflow: 'hidden' }}>
      
      {/* Premium Animation Styles */}
      <style>{`
        .vc-animate {
          opacity: 0;
          transition-property: opacity, transform;
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Fade Up */
        .vc-fade-up { transform: translateY(30px); }
        .vc-fade-up.is-visible { opacity: 1; transform: translateY(0); }
        
        /* Fade Right (for portrait sliding in slightly) */
        .vc-fade-right { transform: translateX(-30px); }
        .vc-fade-right.is-visible { opacity: 1; transform: translateX(0); }
        
        /* Fade Left (for info panel sliding in slightly) */
        .vc-fade-left { transform: translateX(30px); }
        .vc-fade-left.is-visible { opacity: 1; transform: translateX(0); }
        
        /* Simple Fade */
        .vc-fade.is-visible { opacity: 1; transform: none; }
        
        /* Sequential delays */
        .delay-100 { transition-duration: 0.8s; transition-delay: 0.1s; }
        .delay-200 { transition-duration: 0.8s; transition-delay: 0.2s; }
        .delay-300 { transition-duration: 0.8s; transition-delay: 0.3s; }
        .delay-400 { transition-duration: 0.8s; transition-delay: 0.4s; }
        .delay-500 { transition-duration: 0.8s; transition-delay: 0.5s; }
        .delay-600 { transition-duration: 0.8s; transition-delay: 0.6s; }
        .delay-700 { transition-duration: 0.8s; transition-delay: 0.7s; }
        .delay-800 { transition-duration: 0.8s; transition-delay: 0.8s; }
        .delay-900 { transition-duration: 0.8s; transition-delay: 0.9s; }
        .delay-1000 { transition-duration: 0.8s; transition-delay: 1.0s; }
        
        /* Very slow base layer fade */
        .vc-fade-slow.is-visible { opacity: 1; transition: opacity 1.5s ease-out; }
      `}</style>

      {/* Background Texture Overlay (SpaceX Theme) */}
      <div className="vc-page-bg"></div>
      <div 
        className="vc-page-texture vc-animate vc-fade-slow" 
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      {/* 1. HEADER */}
      <header className="vc-header vc-animate vc-fade-up delay-100">
        <div className="vc-header-inner">
          <img src="/logo.svg" alt="Mavio Global" className="vc-logo" />
        </div>
      </header>

      {/* 2. MAIN PROFILE COMPOSITION */}
      <main className="vc-main">
        
        {/* ONE COMPOSED OBJECT CONTAINER (Matches SpaceX Theme) */}
        <div className="vc-container">
          
          {/* Dark Information Panel (The main floating card) */}
          <div className="vc-card vc-animate vc-fade-left delay-400">
            
            {/* Desktop Vertical Nav (Inside left edge of the dark card) */}
            <nav className="vc-side-nav">
              <div className="vc-side-nav-inner">
                <span className="vc-nav-item">About</span>
                <span className="vc-nav-item active">Team</span>
                <span className="vc-nav-item">Careers</span>
                <span className="vc-nav-item">Shop</span>
              </div>
            </nav>

            <div className="vc-content">
              {/* Gold Accent Line */}
              <div className="vc-gold-line vc-animate vc-fade-up delay-500"></div>
              
              {/* Typography */}
              <h1 className="vc-name vc-animate vc-fade-up delay-600">
                {profile.name}
              </h1>
              <p className="vc-designation vc-animate vc-fade-up delay-700">
                {profile.designation}
              </p>
              
              <p className="vc-bio vc-animate vc-fade-up delay-800">
                {profile.bio || "Leading global operations and strategic initiatives to drive international growth and market expansion. Develops and manufactures high-impact solutions with a focus on advancing the state of the industry."}
              </p>
              
              {/* Signature */}
              <div className="vc-signature vc-animate vc-fade delay-900">
                <FallbackImage 
                  src={profile.signatureImage} 
                  alt={`${profile.name} Signature`} 
                  type="signature"
                  onClick={() => setModalImage(profile.signatureImage)}
                />
              </div>

              {/* Minimal Social Icons (matching the small icons under signature in image) */}
              <div className="vc-social-row vc-animate vc-fade-up delay-1000">
                {profile.twitter && (
                  <SocialIcon href={profile.twitter}>
                    <svg className="vc-social-icon" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </SocialIcon>
                )}
                {profile.facebook && (
                  <SocialIcon href={profile.facebook}>
                    <svg className="vc-social-icon" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </SocialIcon>
                )}
                {profile.instagram && (
                  <SocialIcon href={profile.instagram}>
                    <svg className="vc-social-icon" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </SocialIcon>
                )}
                {/* Dots matching the reference */}
                <div className="vc-dots">
                  <div className="vc-dot"></div>
                  <div className="vc-dot"></div>
                  <div className="vc-dot"></div>
                </div>
              </div>
            </div>

            {/* Nav Buttons (Right edge extending outward) */}
            <div className="vc-nav-controls vc-animate vc-fade-left delay-1000">
              <button 
                onClick={handlePrev} 
                className="vc-nav-btn prev"
                aria-label="Previous Profile"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              </button>
              <button 
                onClick={handleNext} 
                className="vc-nav-btn next"
                aria-label="Next Profile"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>

          {/* Portrait Image - Extends below the card in desktop */}
          <div className="vc-portrait-wrap vc-animate vc-fade-up delay-200">
            <FallbackImage 
              src={profile.profileImage} 
              alt={profile.name} 
              type="portrait"
              onClick={() => setModalImage(profile.profileImage)}
            />
          </div>

        </div>
      </main>

      {/* 3. SECONDARY FOOTER */}
      <section className="vc-sec-footer">
        <style>{`
          @keyframes fadeUpFloating {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-up-floating {
            /* Only animates once the observer adds 'is-visible' */
          }
          .is-visible .animate-fade-up-floating {
            animation: fadeUpFloating 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .is-visible .animate-fade-up-floating.delay-1 { animation-delay: 0.1s; opacity: 0; }
          .is-visible .animate-fade-up-floating.delay-2 { animation-delay: 0.2s; opacity: 0; }
          .is-visible .animate-fade-up-floating.delay-3 { animation-delay: 0.3s; opacity: 0; }
          .is-visible .animate-fade-up-floating.delay-4 { animation-delay: 0.4s; opacity: 0; }
          .is-visible .animate-fade-up-floating.delay-5 { animation-delay: 0.5s; opacity: 0; }
          .is-visible .animate-fade-up-floating.delay-6 { animation-delay: 0.6s; opacity: 0; }
          .is-visible .animate-fade-up-floating.delay-7 { animation-delay: 0.7s; opacity: 0; }
          .is-visible .animate-fade-up-floating.delay-8 { animation-delay: 0.8s; opacity: 0; }
        `}</style>
        
        <div className="vc-sec-footer-inner vc-animate vc-fade">
          <div className="vc-sec-divider vc-animate vc-fade-up delay-100"></div>
          
          <div className="vc-social-float-grid">
            {profile.phone && (
              <a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`} className="vc-social-float-link animate-fade-up-floating delay-1" >
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="vc-social-float-link animate-fade-up-floating delay-2" >
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            )}
            {profile.whatsapp && (
              <a href={profile.whatsapp.startsWith('http') ? profile.whatsapp : `https://wa.me/${profile.whatsapp.replace(/[^\d+]/g, '')}`} className="vc-social-float-link animate-fade-up-floating delay-3" >
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} className="vc-social-float-link animate-fade-up-floating delay-4" >
                <svg viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} className="vc-social-float-link animate-fade-up-floating delay-5" >
                <svg viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            )}
            {profile.facebook && (
              <a href={profile.facebook} className="vc-social-float-link animate-fade-up-floating delay-6" >
                <svg viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            )}
            {profile.instagram && (
              <a href={profile.instagram} className="vc-social-float-link animate-fade-up-floating delay-7" >
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {profile.website && (
              <a href={profile.website} className="vc-social-float-link animate-fade-up-floating delay-8" >
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 4. PRIMARY FOOTER */}
      <footer className="vc-prim-footer vc-animate vc-fade-up delay-100">
        <div className="vc-prim-footer-inner">
          
          {/* Logo */}
          <img src="/logo.svg" alt="Mavio Global" className="vc-prim-logo vc-animate vc-fade delay-300" />
          
          {/* Supporting Text */}
          <p className="vc-prim-supp vc-animate vc-fade-up delay-400">
            Global Trade & Logistics
          </p>
          
          {/* Subtle Gold Divider */}
          <div className="vc-prim-gold vc-animate vc-fade delay-500"></div>
          
          {/* Copyright */}
          <p className="vc-prim-copy vc-animate vc-fade delay-600">
            &copy; {new Date().getFullYear()} MAVIO GLOBAL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* Full Image Modal */}
      {modalImage && (
        <div 
          className="vc-image-modal" 
          onClick={() => setModalImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
            <img 
              src={modalImage} 
              alt="Full size view" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '90vh', 
                objectFit: 'contain', 
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'block'
              }} 
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setModalImage(null);
              }}
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                background: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                color: '#081938',
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: 1
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
