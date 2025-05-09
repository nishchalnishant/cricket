'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const teams = [
  'India',
  'Australia',
  'England',
  'New Zealand',
  'South Africa',
  'Pakistan',
  'West Indies',
  'Sri Lanka',
];

const eventTypes = [
  'ODI',
  'Test',
  'T20',
  'World Cup',
  'Champions Trophy',
  'Bilateral Series',
];

export default function Header() {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedEventType, setSelectedEventType] = useState('All Events');

  return (
    <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white text-xl font-semibold">Cricket Events</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Teams Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsTeamOpen(!isTeamOpen)}
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <span>{selectedTeam}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isTeamOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isTeamOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                       onClick={() => {
                         setSelectedTeam('All Teams');
                         setIsTeamOpen(false);
                       }}>
                    All Teams
                  </div>
                  {teams.map((team) => (
                    <div
                      key={team}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedTeam(team);
                        setIsTeamOpen(false);
                      }}
                    >
                      {team}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Event Types Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <span>{selectedEventType}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isEventTypeOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isEventTypeOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                       onClick={() => {
                         setSelectedEventType('All Events');
                         setIsEventTypeOpen(false);
                       }}>
                    All Events
                  </div>
                  {eventTypes.map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedEventType(type);
                        setIsEventTypeOpen(false);
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 