'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import '../styles/header.css';

const teams = [
  { name: 'India', flag: '🇮🇳' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'West Indies', flag: '🏝️' },
  { name: 'Sri Lanka', flag: '\u{1F1F1}\u{1F1F0}' }
];

const eventTypes = [
  'ODI',
  'Test',
  'T20',
  'World Cup',
  'Champions Trophy',
  'IPL',
  'Bilateral Series',
];

interface HeaderProps {
  onFilterChange: (team: string, eventType: string) => void;
}

export default function Header({ onFilterChange }: HeaderProps) {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedEventType, setSelectedEventType] = useState('All Events');
  const [scrolled, setScrolled] = useState(false);
  
  const teamDropdownRef = useRef<HTMLDivElement>(null);
  const eventTypeDropdownRef = useRef<HTMLDivElement>(null);

  const getTeamWithFlag = (teamName: string) => {
    if (teamName === 'All Teams') return '🌏 All Teams';
    const team = teams.find(t => t.name === teamName);
    return team ? `${team.flag} ${team.name}` : teamName;
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target as Node)) {
        setIsTeamOpen(false);
      }
      if (eventTypeDropdownRef.current && !eventTypeDropdownRef.current.contains(event.target as Node)) {
        setIsEventTypeOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
    setIsTeamOpen(false);
    onFilterChange(team, selectedEventType);
  };

  const handleEventTypeChange = (type: string) => {
    setSelectedEventType(type);
    setIsEventTypeOpen(false);
    onFilterChange(selectedTeam, type);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <nav className="header-nav">
            {/* Left - Brand */}
            <div className="header-brand">
              <div className="logo-container">
                <svg 
                  width="180" 
                  height="40" 
                  viewBox="0 0 180 40" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="brand-logo"
                >
                  {/* Cricket Ball with Leather Texture */}
                  <defs>
                    <radialGradient id="ball-texture" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
                      <stop offset="0%" stopColor="#E53E3E" />
                      <stop offset="70%" stopColor="#C53030" />
                      <stop offset="100%" stopColor="#9B2C2C" />
                    </radialGradient>
                    <filter id="ball-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                      <feOffset dx="0" dy="2" result="offsetblur" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Main Ball */}
                  <g className="cricket-ball">
                    {/* Ball Body */}
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="18" 
                      fill="url(#ball-texture)"
                      filter="url(#ball-shadow)"
                    />

                    {/* Stitching */}
                    <g className="stitching">
                      {/* Main horizontal stitching */}
                      <path 
                        d="M5 20h30" 
                        stroke="#FFFFFF" 
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="2 2"
                      />
                      {/* Upper parallel stitch */}
                      <path 
                        d="M8 15h24" 
                        stroke="#FFFFFF" 
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="2 2"
                        strokeOpacity="0.7"
                      />
                      {/* Lower parallel stitch */}
                      <path 
                        d="M8 25h24" 
                        stroke="#FFFFFF" 
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="2 2"
                        strokeOpacity="0.7"
                      />
                    </g>
                  </g>
                  
                  {/* Text Cricket */}
                  <text x="45" y="25" className="logo-text-cricket">Cricket</text>
                  
                  {/* Text Chronicles */}
                  <text x="45" y="35" className="logo-text-chronicles">CHRONICLES</text>
                </svg>
              </div>
            </div>

            {/* Center - Navigation */}
            <div className="header-nav-center">
              {/* Teams Dropdown */}
              <div className="relative" ref={teamDropdownRef}>
                <button
                  onClick={() => setIsTeamOpen(!isTeamOpen)}
                  className={`nav-item ${isTeamOpen ? 'active' : ''}`}
                >
                  <span>{getTeamWithFlag(selectedTeam)}</span>
                  <ChevronDownIcon className="icon" />
                </button>
                
                <div className={`dropdown-menu ${isTeamOpen ? 'active' : ''}`}>
                  <div className="dropdown-content">
                    <div 
                      className={`dropdown-item ${selectedTeam === 'All Teams' ? 'selected' : ''}`}
                      onClick={() => handleTeamChange('All Teams')}
                    >
                      🌏 All Teams
                    </div>
                    {teams.map((team) => (
                      <div
                        key={team.name}
                        className={`dropdown-item ${selectedTeam === team.name ? 'selected' : ''}`}
                        onClick={() => handleTeamChange(team.name)}
                      >
                        {team.flag} {team.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Types Dropdown */}
              <div className="relative" ref={eventTypeDropdownRef}>
                <button
                  onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                  className={`nav-item ${isEventTypeOpen ? 'active' : ''}`}
                >
                  <span>{selectedEventType}</span>
                  <ChevronDownIcon className="icon" />
                </button>
                
                <div className={`dropdown-menu ${isEventTypeOpen ? 'active' : ''}`}>
                  <div className="dropdown-content">
                    <div 
                      className={`dropdown-item ${selectedEventType === 'All Events' ? 'selected' : ''}`}
                      onClick={() => handleEventTypeChange('All Events')}
                    >
                      All Events
                    </div>
                    {eventTypes.map((type) => (
                      <div
                        key={type}
                        className={`dropdown-item ${selectedEventType === type ? 'selected' : ''}`}
                        onClick={() => handleEventTypeChange(type)}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Podcast Button */}
            <div className="header-youtube">
              <Link 
                href="https://www.youtube.com/@thegradecricketer9633" 
                target="_blank"
                className="podcast-link"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5"
                >
                  <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
                </svg>
                <span>Listen to Podcast</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Spacer div */}
      <div style={{ height: '48px' }} />
    </>
  );
} 