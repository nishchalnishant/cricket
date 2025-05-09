import Header from '@/components/Header';
import Timeline from '@/components/Timeline';

const sampleEvents = [
  {
    id: '1',
    title: 'ICC Cricket World Cup 2023 Final',
    date: 'November 19, 2023',
    teams: ['India', 'Australia'],
    type: 'World Cup',
    description: 'Australia clinched their sixth World Cup title, defeating India in the final at Ahmedabad.',
    result: 'Australia won by 6 wickets',
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },
  {
    id: '2',
    title: 'India vs England Test Series',
    date: 'January 25, 2024',
    teams: ['India', 'England'],
    type: 'Test',
    description: 'First Test of the five-match series between India and England.',
    result: 'India won by 5 wickets',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
  },
  {
    id: '3',
    title: 'Australia vs West Indies T20I Series',
    date: 'February 9, 2024',
    teams: ['Australia', 'West Indies'],
    type: 'T20',
    description: 'First T20I of the three-match series.',
    result: 'West Indies won by 3 wickets',
    venue: 'Hobart',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Timeline events={sampleEvents} />
    </main>
  );
}
