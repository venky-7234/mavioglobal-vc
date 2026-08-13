import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { profiles } from '../data/profiles';
import MavioVC from '../components/MavioVC';

export default function Profile() {
  const { profile: profileId } = useParams();
  const id = profileId?.toLowerCase();
  const profileData = profiles[id];

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-gray-400">The visiting card you are looking for does not exist.</p>
        <a href="/" className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
          Go Home
        </a>
      </div>
    );
  }

  const profile = { ...profileData, id };

  return <MavioVC profile={profile} />;
}
