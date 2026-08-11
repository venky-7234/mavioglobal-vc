import React from 'react';

export default function VisitingCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className={`bg-gradient-to-r ${profile.gradient} p-8 flex flex-col items-center`}>
          <div className={`w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold ${profile.textColor} mb-4 shadow-lg`}>
            {profile.initial}
          </div>
          <h1 className="text-3xl font-extrabold text-white">{profile.name}</h1>
          <p className="text-white/80 mt-1 font-medium tracking-wide">{profile.company}</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
            <svg className={`w-5 h-5 ${profile.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
          </div>
          
          <button className={`w-full mt-6 py-3 px-4 ${profile.btnColor} text-white font-bold rounded-lg transition-colors duration-300 shadow-md`}>
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}
