'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';

const defaultImage = 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop';

const sampleEvents = [
  // 2023-2024
  
  {
    id: '2',
    title: 'IPL 2023 Final',
    date: 'May 29, 2023',
    teams: ['Gujarat Titans', 'Chennai Super Kings'],
    type: 'IPL',
    description: 'In a rain-affected final that stretched past midnight, MS Dhoni\'s Chennai Super Kings claimed their fifth IPL title. Ravindra Jadeja emerged as the hero, hitting a last-ball boundary off Mohit Sharma. Devon Conway\'s consistent batting and Matheesha Pathirana\'s yorkers were crucial throughout CSK\'s campaign.',
    result: 'Chennai Super Kings won by 5 wickets',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    imageUrl: 'https://i.pinimg.com/736x/f2/d5/2c/f2d52ce4028d92b8432b0985c7849ca1.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/2023_Indian_Premier_League_Final'
  },
  // 2020-2022
  {
    id: '3',
    title: 'T20 World Cup 2022 Final',
    date: 'November 13, 2022',
    teams: ['England', 'Pakistan'],
    type: 'World Cup',
    description: 'England created history by becoming the first team to hold both ODI and T20 World Cup titles simultaneously. Ben Stokes (52*) anchored the chase while Sam Curran\'s bowling excellence (3/12) earned him Player of the Tournament. Pakistan\'s pace attack, led by Shaheen Afridi, tested England but couldn\'t prevent their victory.',
    result: 'England won by 5 wickets',
    venue: 'Melbourne Cricket Ground',
    imageUrl: 'https://i.pinimg.com/736x/84/dc/a6/84dca6b116e796ec1d7bd6e9e4f5d7f4.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/2022_ICC_Men%27s_T20_World_Cup_Final'
  },
  {
    id: '4',
    title: 'India\'s Historic Gabba Breach',
    date: 'January 19, 2021',
    teams: ['India', 'Australia'],
    type: 'Test',
    description: 'A young Indian team, led by Ajinkya Rahane, breached Australia\'s 32-year fortress at the Gabba. Rishabh Pant\'s unbeaten 89, Shubman Gill\'s 91, and crucial contributions from Washington Sundar and Shardul Thakur helped India chase down 328. This victory sealed a remarkable 2-1 series win despite India missing several key players.',
    result: 'India won by 3 wickets',
    venue: 'The Gabba, Brisbane',
    imageUrl: 'https://i.pinimg.com/736x/36/89/2c/36892c78dd0523cbcac73f88211e2433.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/2020%E2%80%9321_India_tour_of_Australia#Fourth_Test'
  },
  // 2015-2019
  {
    id: '5',
    title: '2019 World Cup Final',
    date: 'July 14, 2019',
    teams: ['England', 'New Zealand'],
    type: 'World Cup',
    description: 'The greatest ODI ever played ended in England\'s favor via boundary count after a Super Over tie. Ben Stokes\' heroic 84*, the controversial overthrow incident, and Jimmy Neesham\'s Super Over batting created unforgettable drama. Martin Guptill\'s run-out off the last ball decided England\'s maiden World Cup victory.',
    result: 'England won on boundary count after Super Over tie',
    venue: 'Lord\'s Cricket Ground, London',
    imageUrl: 'https://i.pinimg.com/736x/30/5f/ca/305fcaf3adf5f6e7ed9ff66b20098886.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/2019_Cricket_World_Cup_Final'
  },
  {
    id: '6',
    title: 'Steve Smith\'s Comeback Century',
    date: 'August 1, 2019',
    teams: ['Australia', 'England'],
    type: 'Test',
    description: 'In his first Test since the ball-tampering ban, Steve Smith scored a magnificent 144 at Edgbaston. He followed it with 142 in the second innings, marking one of cricket\'s greatest comeback stories. His batting masterclass against a strong English attack set up Australia\'s Ashes campaign.',
    result: 'Australia won by 251 runs',
    venue: 'Edgbaston, Birmingham',
    imageUrl: 'https://i.pinimg.com/736x/90/7e/ca/907eca4544fc2a4d8213910c81d5b5a7.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/2019_Ashes_series#First_Test'
  },
  // 2010-2014
  {
    id: '7',
    title: 'Sachin\'s 100th International Century',
    date: 'March 16, 2012',
    teams: ['India', 'Bangladesh'],
    type: 'ODI',
    description: 'Sachin Tendulkar achieved an unprecedented milestone - 100 international centuries. His 114 against Bangladesh in the Asia Cup marked this historic achievement. The journey spanning 23 years included 51 Test centuries and 49 ODI centuries, a record that stands unmatched.',
    result: 'Bangladesh won by 5 wickets',
    venue: 'Shere Bangla Stadium, Dhaka',
    imageUrl: 'https://i.pinimg.com/736x/05/84/b9/0584b9dd1109972257f30aa6f691c52b.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/Sachin_Tendulkar%27s_100th_international_century'
  },
  {
    id: '8',
    title: "India's 2011 World Cup Victory",
    date: 'April 2, 2011',
    teams: ['India', 'Sri Lanka'],
    type: 'World Cup',
    description: "MS Dhoni's iconic six sealed India's second World Cup victory after 28 years. Chasing 275, Gautam Gambhir's 97 and Dhoni's unbeaten 91 orchestrated the chase. The win marked Sachin Tendulkar's first World Cup trophy in his sixth attempt, carried on teammates' shoulders in his home ground.",
    result: 'India won by 6 wickets',
    venue: 'Wankhede Stadium, Mumbai',
    imageUrl: 'https://i.pinimg.com/736x/7a/5c/5e/7a5c5e3c3bd3fd70197e5b19a056faf2.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/2011_Cricket_World_Cup_Final'
  },
  // 2000-2009
  {
    id: '9',
    title: 'T20 World Cup 2007 Final',
    date: 'September 24, 2007',
    teams: ['India', 'Pakistan'],
    type: 'World Cup',
    description: 'India won the inaugural T20 World Cup in a nail-biting finish. Gautam Gambhir\'s 75 and Rohit Sharma\'s crucial 30* set up a challenging target. The match is remembered for Misbah-ul-Haq\'s scoop shot to Joginder Sharma, caught by Sreesanth, sparking wild celebrations.',
    result: 'India won by 5 runs',
    venue: 'Wanderers Stadium, Johannesburg',
    imageUrl: 'https://i.pinimg.com/736x/40/92/dc/4092dc49128386bfe0b22d3cb583db1d.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/2007_ICC_World_Twenty20_Final'
  },
  {
    id: '10',
    title: '434 vs 438: The Greatest ODI',
    date: 'March 12, 2006',
    teams: ['South Africa', 'Australia'],
    type: 'ODI',
    description: 'South Africa achieved the impossible by chasing down Australia\'s 434. Ricky Ponting\'s 164 was overshadowed by Herschelle Gibbs\' 175 and Graeme Smith\'s 90. Mark Boucher hit the winning runs in the greatest ODI chase ever, redefining what was possible in cricket.',
    result: 'South Africa won by 1 wicket',
    venue: 'Wanderers Stadium, Johannesburg',
    imageUrl: 'https://i.pinimg.com/736x/bc/d4/9a/bcd49adfa2096b8f17607bfff54019d9.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/438_match'
  },
  {
    id: '12',
    title: 'Anil Kumble\'s Perfect 10',
    date: 'February 7, 1999',
    teams: ['India', 'Pakistan'],
    type: 'Test',
    description: 'Anil Kumble became only the second bowler in Test history to take all 10 wickets in an innings. His 10/74 against Pakistan included a spell of 4 wickets in 5.3 overs after tea. This remains India\'s most memorable bowling performance in Tests.',
    result: 'India won by 212 runs',
    venue: 'Feroz Shah Kotla, Delhi',
    imageUrl: 'https://i.pinimg.com/736x/5e/ba/b2/5ebab24ebd102eabb985a8159b67f1f3.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/Anil_Kumble%27s_10_wickets_in_an_innings'
  },
  {
    id: '13',
    title: 'Shane Warne\'s Ball of the Century',
    date: 'June 4, 1993',
    teams: ['Australia', 'England'],
    type: 'Test',
    description: 'Shane Warne\'s first ball in Ashes cricket dismissed Mike Gatting with a delivery that turned sharply from outside leg to hit off stump. This "Ball of the Century" announced Warne\'s arrival and revived the art of leg spin bowling.',
    result: 'Australia won by 179 runs',
    venue: 'Old Trafford, Manchester',
    imageUrl: 'https://i.pinimg.com/736x/3d/eb/67/3deb67e4d884d49a1b7f87b456d4b2a0.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/Ball_of_the_Century'
  },
  {
    id: '14',
    title: 'Desert Storm: Sachin\'s Masterclass',
    date: 'April 22, 1998',
    teams: ['India', 'Australia'],
    type: 'ODI',
    description: 'In the Coca-Cola Cup, Sachin Tendulkar\'s 143 against Australia came during a sandstorm in Sharjah. Though India lost, his innings qualified them for the final. Two days later, on his 25th birthday, he scored 134 to win India the trophy, dominating Shane Warne and company.',
    result: 'Australia won by 26 runs',
    venue: 'Sharjah Cricket Stadium',
    imageUrl: 'https://i.pinimg.com/736x/d2/af/33/d2af332f11323dcfd8d1dc8e34a7af92.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/Desert_Storm_(cricket)'
  },
  {
    id: '15',
    title: 'Wasim and Waqar\'s Debut Series',
    date: 'November 15, 1989',
    teams: ['Pakistan', 'India'],
    type: 'Test',
    description: 'The series marked the debut of both Wasim Akram and Waqar Younis, who would go on to become cricket\'s most feared fast bowling pair. Their reverse swing mastery and yorkers revolutionized fast bowling. The series also saw the debut of 16-year-old Sachin Tendulkar.',
    result: 'Series Drawn 0-0',
    venue: 'Multiple venues in Pakistan',
    imageUrl: 'https://i.pinimg.com/736x/38/ae/d7/38aed754a3c9d845fbe5adb2a7608c3e.jpg',
    wikiUrl: 'https://en.wikipedia.org/wiki/Indian_cricket_team_in_Pakistan_in_1989%E2%80%9390'
  }
];

export default function Home() {
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);

  const handleFilterChange = (team: string, eventType: string) => {
    let filtered = [...sampleEvents];

    if (team !== 'All Teams') {
      filtered = filtered.filter(event => event.teams.includes(team));
    }

    if (eventType !== 'All Events') {
      filtered = filtered.filter(event => event.type === eventType);
    }

    setFilteredEvents(filtered);
  };

  return (
    <main className="min-h-screen bg-black">
      <Header onFilterChange={handleFilterChange} />
      <Timeline events={filteredEvents} />
      </main>
  );
}
