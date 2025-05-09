'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  teams: string[];
  type: string;
  description: string;
  result?: string;
  venue: string;
  imageUrl: string;
  wikiUrl?: string;
}

interface TimelineProps {
  events: Event[];
}

export default function Timeline({ events }: TimelineProps) {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            const section = entry.target as HTMLElement;
            const content = section.querySelector('.event-content');
            const allSections = document.querySelectorAll('.event-section');
            const index = parseInt(section.getAttribute('data-index') || '0');
            
            // Update timeline dot
            document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
              if (i === index) {
                dot.classList.add('scale-150', 'bg-purple-400');
                const year = dot.querySelector('.timeline-year');
                if (year) year.classList.remove('opacity-0');
              } else {
                dot.classList.remove('scale-150', 'bg-purple-400');
                const year = dot.querySelector('.timeline-year');
                if (year) year.classList.add('opacity-0');
              }
            });
            
            allSections.forEach(s => {
              s.classList.remove('active');
              const c = s.querySelector('.event-content');
              if (c) {
                c.classList.remove('opacity-100', 'translate-y-0');
                c.classList.add('opacity-0', 'translate-y-4');
              }
            });

            section.classList.add('active');
            if (content) {
              content.classList.remove('opacity-0', 'translate-y-4');
              content.classList.add('opacity-100', 'translate-y-0');
            }
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    document.querySelectorAll('.event-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      {/* Modern Timeline Line */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center h-[70vh]">
        <div className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-between py-8">
          {sortedEvents.map((event, index) => (
            <div key={index} className="relative group">
              <div className="timeline-dot w-4 h-4 bg-white/30 rounded-full transform transition-all duration-500 ease-out group-hover:scale-150 group-hover:bg-purple-400">
                <div className="timeline-year absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-light text-white/80 whitespace-nowrap opacity-0 transition-opacity duration-300">
                  {new Date(event.date).getFullYear()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sortedEvents.map((event, index) => (
        <section
          key={event.id}
          data-index={index}
          className="event-section min-h-screen relative flex items-center justify-center snap-start overflow-hidden"
        >
          {/* Background Image with enhanced overlay */}
          <Link 
            href={event.wikiUrl || '#'} 
            target="_blank" 
            className="absolute inset-0 w-full h-full cursor-pointer group/image transition-transform duration-700 hover:scale-105"
          >
            {/* Multi-layer gradient overlay for stronger fading */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black group-hover/image:opacity-75 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent group-hover/image:opacity-75 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black group-hover/image:opacity-75 transition-opacity duration-700"></div>
            
            {/* Enhanced vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.9)_100%)] group-hover/image:opacity-75 transition-opacity duration-700"></div>
            
            {/* Noise texture for better blending */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
            
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover/image:opacity-50 transition-opacity duration-700"
            />

            {/* Hover indicator */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-white/70"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c-.564-1.789-1.632-1.023-2.335-1.023l.158-.903c1.197 0 1.907.752 2.177 1.926zm6.823-4.101c-.392 2.855-2.193 3.511-4.393 3.511-1.693 0-2.632-.744-2.632-2.632 0-2.855 2.632-3.511 4.393-3.511.752 0 1.628.188 1.628 1.036 0 .752-.564 1.413-1.413 1.413-.376 0-.752-.188-.94-.564.188-.188.188-.376.188-.564 0-.564-.94-.94-1.816-.94-1.413 0-2.632.94-2.632 2.632 0 1.504.94 2.632 2.632 2.632 2.193 0 3.699-1.036 4.393-3.511l.188-1.036c.376-1.413 1.413-2.632 2.632-2.632.564 0 1.036.188 1.413.564l-.564.94c-.188-.188-.564-.376-.94-.376-.752 0-1.413.564-1.628 1.926l-.188 1.036z"/>
              </svg>
            </div>
          </Link>

          {/* Content with enhanced text visibility */}
          <div className={`relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-white opacity-0 translate-y-4 transition-all duration-700 ease-out event-content ${
            index % 2 === 0 ? 'text-right ml-auto mr-32' : 'text-left mr-auto ml-32'
          }`}>
            <div className="space-y-12">
              {/* Event Type Badge */}
              <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <span className="inline-flex items-center px-8 py-3 rounded-full text-xl font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white tracking-wide uppercase transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                  {event.type}
                </span>
              </div>

              {/* Title with enhanced visibility */}
              <div className="flex items-center justify-between">
                <h2 className="text-8xl sm:text-9xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 leading-tight drop-shadow-2xl text-shadow-lg">
                  {event.title}
                </h2>
                {event.wikiUrl && (
                  <Link 
                    href={event.wikiUrl}
                    target="_blank"
                    className="ml-8 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm group"
                    title="Read on Wikipedia"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300"
                    >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c-.564-1.789-1.632-1.023-2.335-1.023l.158-.903c1.197 0 1.907.752 2.177 1.926zm6.823-4.101c-.392 2.855-2.193 3.511-4.393 3.511-1.693 0-2.632-.744-2.632-2.632 0-2.855 2.632-3.511 4.393-3.511.752 0 1.628.188 1.628 1.036 0 .752-.564 1.413-1.413 1.413-.376 0-.752-.188-.94-.564.188-.188.188-.376.188-.564 0-.564-.94-.94-1.816-.94-1.413 0-2.632.94-2.632 2.632 0 1.504.94 2.632 2.632 2.632 2.193 0 3.699-1.036 4.393-3.511l.188-1.036c.376-1.413 1.413-2.632 2.632-2.632.564 0 1.036.188 1.413.564l-.564.94c-.188-.188-.564-.376-.94-.376-.752 0-1.413.564-1.628 1.926l-.188 1.036z"/>
                    </svg>
                  </Link>
                )}
              </div>

              {/* Teams with enhanced visibility */}
              <div className={`flex items-center text-5xl sm:text-6xl font-medium ${
                index % 2 === 0 ? 'justify-end' : 'justify-start'
              }`}>
                <div className="flex items-center space-x-10">
                  <span className="hover:text-purple-300 transition-colors duration-300 drop-shadow-lg text-shadow-sm">
                    {event.teams[0]}
                  </span>
                  <span className="text-gray-400 font-light drop-shadow-lg">vs</span>
                  <span className="hover:text-purple-300 transition-colors duration-300 drop-shadow-lg text-shadow-sm">
                    {event.teams[1]}
                  </span>
                </div>
              </div>

              {/* Date and Venue with enhanced visibility */}
              <div className="space-y-4">
                <p className="text-4xl font-light tracking-wide text-white drop-shadow-lg text-shadow-sm">
                  {event.date}
                </p>
                <p className="text-3xl font-light tracking-wide text-gray-200 drop-shadow-lg text-shadow-sm">
                  {event.venue}
                </p>
              </div>

              {/* Description with enhanced visibility */}
              <p className="text-4xl sm:text-5xl leading-relaxed font-light text-gray-100 max-w-4xl drop-shadow-lg text-shadow-sm">
                {event.description}
              </p>

              {/* Result with enhanced visibility */}
              {event.result && (
                <div className="text-5xl sm:text-6xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mt-12 drop-shadow-2xl text-shadow-lg">
                  {event.result}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Add global styles for enhanced effects */}
      <style jsx global>{`
        .text-shadow-sm {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3),
                       0 4px 8px rgba(0,0,0,0.2);
        }
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0,0,0,0.5),
                       0 8px 16px rgba(0,0,0,0.4),
                       0 16px 32px rgba(0,0,0,0.3);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
    </div>
  );
} 