import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import './MavioVC.css';

const FallbackImage = ({ src, alt, className }) => {
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <svg style={{ width: '64px', height: '64px', color: 'rgba(0,0,0,0.1)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

export default function MavioVC({ profile }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Basic fade in animation
    gsap.set('.mvc-fade', { opacity: 0, y: 15 });
    
    gsap.to('.mvc-fade', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Initialize ScrollSmoother if loaded from CDN
    if (window.ScrollSmoother && window.ScrollTrigger && window.gsap) {
      window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollSmoother);
      window.ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
        effects: true
      });
    }
  }, { scope: containerRef, dependencies: [profile] });

  if (!profile) return null;

  return (
    <div id="smooth-wrapper" ref={containerRef}>
      <div id="smooth-content">
        <div className="mvc-page">
      
          {/* Header */}
      <header className="mvc-header">
        <img src={`${import.meta.env.BASE_URL}logo-without-tagline.svg`} alt="Mavio Global" className="mvc-logo mvc-fade" />
        <img src={`${import.meta.env.BASE_URL}template-tagline.svg`} alt="Excellence Beyond Borders" className="mvc-tagline-img mvc-fade" />
      </header>

      {/* Profile Info */}
      <div className="mvc-profile-container mvc-fade">
        <FallbackImage src={profile.profileImage ? (profile.profileImage.startsWith('/') ? `${import.meta.env.BASE_URL}${profile.profileImage.slice(1)}` : profile.profileImage) : null} alt={profile.name} className="mvc-profile-img" />
      </div>

      <div className="mvc-text-container">
        <h1 className="mvc-name mvc-fade">{profile.name}</h1>
        <p className="mvc-designation mvc-fade">{profile.designation}</p>
      </div>

      {/* Contact Icons (Floating Grid) */}
      <div className="mvc-social-float-grid mvc-fade">
        {profile.phone && (
          <a href={`tel:${profile.phone}`} className="mvc-social-icon mvc-fade">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
          </a>
        )}
        {profile.whatsapp && (
          <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g,'')}`} className="mvc-social-icon mvc-fade" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.46 14.19c-.23.64-1.32 1.23-1.83 1.31-.47.07-1.07.13-3.41-.84-2.83-1.17-4.66-4.08-4.8-4.27-.14-.19-1.14-1.51-1.14-2.89 0-1.38.72-2.06.98-2.35.26-.29.56-.36.75-.36.19 0 .38 0 .54.01.17.01.4-.06.63.48.24.55.82 2.01.89 2.16.07.15.12.33.03.52-.1.19-.15.3-.3.48-.15.18-.31.41-.44.54-.14.15-.3.32-.13.61.17.29.77 1.26 1.64 2.04 1.13 1.01 2.08 1.32 2.37 1.47.29.15.46.12.63-.07.17-.19.74-.86.94-1.15.19-.29.39-.24.66-.14.27.1.1.72 1.61.96 1.83.24.48.42.75.54.89.12.14.09.43-.14 1.07z"/></svg>
          </a>
        )}
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="mvc-social-icon mvc-fade">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        )}
        {profile.website && (
          <a href={profile.website} className="mvc-social-icon mvc-fade" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} className="mvc-social-icon mvc-fade" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.1-3.6c-1.5 0-2.3.9-2.6 1.5v-1.3H10v9.7h3V14.3c0-.8.2-1.6 1.2-1.6.9 0 1 .9 1 1.7v4.1h2.8zM6.5 8.2c1 0 1.8-.8 1.8-1.8S7.5 4.6 6.5 4.6 4.7 5.4 4.7 6.4 5.5 8.2 6.5 8.2zm-1.4 10.3h2.9V8.8H5.1v9.7z"/></svg>
          </a>
        )}
        {profile.instagram && (
          <a href={profile.instagram} className="mvc-social-icon mvc-fade" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        )}
        {profile.twitter && (
          <a href={profile.twitter} className="mvc-social-icon mvc-fade" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        )}
        {profile.youtube && (
          <a href={profile.youtube} className="mvc-social-icon mvc-fade" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        )}
      </div>

      {/* Personal About Section */}
      <div className="mvc-about-section mvc-fade">
        <h3 className="mvc-about-title">About</h3>
        <p className="mvc-about-text">
          {profile.bio || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi."}
        </p>
      </div>

      {/* Company About Section */}
      <div className="mvc-about-section mvc-fade">
        <h3 className="mvc-about-title">About Company</h3>
        <p className="mvc-about-text">
          Mavio Global is a dynamic organization committed to delivering excellence beyond borders. We specialize in innovative solutions tailored to our clients' unique needs, driving growth and success across diverse markets.
        </p>
      </div>

      <footer className="mvc-footer">
        <button
          type="button"
          onClick={async () => {
            const vCardData = [
              'BEGIN:VCARD',
              'VERSION:3.0',
              `N:${profile.name.split(' ').reverse().join(';')};;;`,
              `FN:${profile.name}`,
              'ORG:Mavio Global;',
              `TITLE:${profile.designation}`,
              profile.phone
                ? `TEL;TYPE=WORK,VOICE:${profile.phone}`
                : '',
              profile.whatsapp
                ? `TEL;TYPE=CELL,VOICE:${profile.whatsapp}`
                : '',
              profile.email
                ? `EMAIL;TYPE=WORK,INTERNET:${profile.email}`
                : '',
              profile.website
                ? `URL:${profile.website}`
                : '',
              'END:VCARD'
            ]
              .filter(Boolean)
              .join('\r\n');

            try {
              const file = new File(
                [vCardData],
                `${profile.name.replace(/\s+/g, '_')}.vcf`,
                {
                  type: 'text/vcard'
                }
              );

              if (!navigator.share) {
                 alert("Your browser does not support the Web Share API.");
                 return;
              }

              if (navigator.canShare && !navigator.canShare({ files: [file] })) {
                 alert("Your browser supports sharing, but does not allow sharing this specific file type (.vcf).");
                 return;
              }

              await navigator.share({
                files: [file],
                title: `Save ${profile.name}`,
                text: `Save ${profile.name} to your contacts`
              });
              
            } catch (error) {
              if (error?.name !== 'AbortError') {
                alert(`Native share failed: ${error.name} - ${error.message}`);
                console.error('Save contact failed:', error);
              }
            }
          }}
          className="mvc-save-btn mvc-fade"
        >
          Save Contact
        </button>
      </footer>

        </div>
      </div>
    </div>
  );
}
