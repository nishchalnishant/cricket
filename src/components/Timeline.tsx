'use client';

interface Event {
  id: string;
  title: string;
  date: string;
  teams: string[];
  type: string;
  description: string;
  result?: string;
  venue: string;
}

interface TimelineProps {
  events: Event[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <div className="relative">
        <div className="absolute inset-0 h-full w-0.5 bg-gray-200 left-8 ml-0.5"></div>
        <div className="space-y-8 relative">
          {events.map((event) => (
            <div key={event.id} className="relative group">
              <div className="flex items-start group-hover:scale-[1.01] transition-transform duration-200">
                <div className="flex-shrink-0">
                  <div className="h-4 w-4 rounded-full border-4 border-white bg-gray-200 shadow"></div>
                </div>
                <div className="ml-6 w-full">
                  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.teams.map((team) => (
                        <span
                          key={team}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {team}
                        </span>
                      ))}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {event.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    
                    {event.result && (
                      <div className="mb-3">
                        <span className="font-medium text-gray-900">Result: </span>
                        <span className="text-gray-600">{event.result}</span>
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Venue: </span>
                      {event.venue}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 