import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = {
  bg: '#000000',
  panel: '#111111',
  border: '#f5c400',
  yellow: '#f5c400',
  yellow2: '#d9a800',
  white: '#f5f5f5',
  gray: '#8a8a8a',
  grid: '#2a2a2a',
  red: '#ff5c5c',
  green: '#61ff7b'
};

const playerColors = {
  'ChatGPT 4.1 Mini': COLORS.yellow,
  'Llama3 90B': COLORS.white,
  'Claude Haiku': COLORS.yellow2,
  'Random': COLORS.gray,
};

const avgBetData = [
  { player_name: 'ChatGPT 4.1 Mini', avg_bet: 139.79 },
  { player_name: 'Llama3 90B', avg_bet: 33.38 },
  { player_name: 'Claude Haiku', avg_bet: 58.04 },
  { player_name: 'Random', avg_bet: 22.85 },
];

const roundsData = [
  { name: 'Sim 1', 'ChatGPT 4.1 Mini': 1, 'Llama3 90B': 3, 'Claude Haiku': 1, Random: 4 },
  { name: 'Sim 2', 'ChatGPT 4.1 Mini': 10, 'Llama3 90B': 10, 'Claude Haiku': 10, Random: 4 },
  { name: 'Sim 3', 'ChatGPT 4.1 Mini': 6, 'Llama3 90B': 10, 'Claude Haiku': 10, Random: 7 },
  { name: 'Sim 4', 'ChatGPT 4.1 Mini': 3, 'Llama3 90B': 10, 'Claude Haiku': 3, Random: 9 },
];

const endingData = [
  { name: 'Sim 1', 'ChatGPT 4.1 Mini': 0, 'Llama3 90B': 0, 'Claude Haiku': 0, Random: 0 },
  { name: 'Sim 2', 'ChatGPT 4.1 Mini': 825, 'Llama3 90B': 140, 'Claude Haiku': 5, Random: 0 },
  { name: 'Sim 3', 'ChatGPT 4.1 Mini': 0, 'Llama3 90B': 45, 'Claude Haiku': 100, Random: 0 },
  { name: 'Sim 4', 'ChatGPT 4.1 Mini': 0, 'Llama3 90B': 15, 'Claude Haiku': 0, Random: 0 },
];

const winRateData = [
  { name: 'ChatGPT 4.1 Mini', value: 25 },
  { name: 'Llama3 90B', value: 25 },
  { name: 'Claude Haiku', value: 0 },
  { name: 'Random', value: 0 },
];

const summaryRows = [
  { player: 'ChatGPT 4.1 Mini', avgRounds: 5.0, avgBet: 139.79, medianEnd: 0, winRate: 25, elimRate: 75, meanROI: 106.2 },
  { player: 'Llama3 90B', avgRounds: 8.25, avgBet: 33.38, medianEnd: 30, winRate: 25, elimRate: 25, meanROI: -50.0 },
  { player: 'Claude Haiku', avgRounds: 6.0, avgBet: 58.04, medianEnd: 2.5, winRate: 0, elimRate: 50, meanROI: -73.8 },
  { player: 'Random', avgRounds: 6.0, avgBet: 22.85, medianEnd: 0, winRate: 0, elimRate: 100, meanROI: -100.0 },
];

const stats = {
  totalUniqueSimulations: 4,
  filesIgnoredAsDuplicates: 2,
  strongestTakeaway: 'Llama3 90B is still the most stable player, while ChatGPT 4.1 Mini remains the highest-variance boom-or-bust player by a wide margin.',
  anomaly: 'ChatGPT 4.1 Mini produced one huge outlier run, finishing one simulation at 825 chips and peaking at 1,825 chips.',
  significance: 'With only 4 unique simulations, pairwise differences are directional but not statistically persuasive yet.',
};

const panelClass = 'rounded-2xl border shadow-2xl';

function Panel({ title, children, className = '' }) {
  return (
    <Card className={`${panelClass} ${className}`} style={{ background: COLORS.panel, borderColor: COLORS.border }}>
      <CardContent className='p-5'>
        <div className='text-2xl font-black mb-4 tracking-tight' style={{ color: COLORS.yellow }}>{title}</div>
        {children}
      </CardContent>
    </Card>
  );
}

function SummaryCell({ children, color }) {
  return <td className='py-2 px-3 text-sm md:text-base' style={{ color: color || COLORS.white }}>{children}</td>;
}

export default function Dashboard() {
  return (
    <div className='min-h-screen p-6 md:p-8' style={{ background: COLORS.bg, color: COLORS.white }}>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-5xl md:text-7xl font-black leading-none tracking-tight'>LLM Roulette Dashboard</h1>
          <div className='w-40 h-1.5 mt-4 mb-4' style={{ background: COLORS.yellow }} />
          <p className='text-lg md:text-xl max-w-4xl' style={{ color: '#d0d0d0' }}>
            Updated across 4 unique simulations. Two uploaded CSVs were duplicates of earlier runs and were excluded from the aggregate stats.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6'>
          <Panel title='1. Dataset'>
            <div className='space-y-3 text-lg'>
              <div className='flex justify-between'><span>Unique simulations</span><span className='font-bold'>{stats.totalUniqueSimulations}</span></div>
              <div className='flex justify-between'><span>Duplicate CSVs ignored</span><span className='font-bold'>{stats.filesIgnoredAsDuplicates}</span></div>
              <div className='flex justify-between'><span>Starting bankroll</span><span className='font-bold'>100</span></div>
              <div className='flex justify-between'><span>Players</span><span className='font-bold'>4</span></div>
            </div>
          </Panel>

          <Panel title='2. Stability Leader'>
            <div className='text-4xl font-black mb-2' style={{ color: COLORS.white }}>Llama3 90B</div>
            <div className='text-lg' style={{ color: '#d0d0d0' }}>
              Lowest elimination rate, longest survival, and best median ending balance.
            </div>
          </Panel>

          <Panel title='3. Highest Variance'>
            <div className='text-4xl font-black mb-2' style={{ color: COLORS.yellow }}>ChatGPT 4.1 Mini</div>
            <div className='text-lg' style={{ color: '#d0d0d0' }}>
              Most aggressive bettor and the source of the biggest single-run upside and downside.
            </div>
          </Panel>

          <Panel title='4. Key Read'>
            <div className='text-lg leading-relaxed' style={{ color: '#d0d0d0' }}>
              {stats.strongestTakeaway}
            </div>
          </Panel>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6'>
          <Panel title='Average Bet Size by Player'>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={avgBetData}>
                  <CartesianGrid stroke={COLORS.grid} vertical={false} />
                  <XAxis dataKey='player_name' stroke={COLORS.white} tick={{ fill: COLORS.white, fontSize: 12 }} />
                  <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                  <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.border}`, color: COLORS.white }} />
                  <Bar dataKey='avg_bet' radius={[8, 8, 0, 0]}>
                    {avgBetData.map((entry) => (
                      <Cell key={entry.player_name} fill={playerColors[entry.player_name]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title='Rounds Survived (per Simulation)' className='xl:col-span-2'>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={roundsData}>
                  <CartesianGrid stroke={COLORS.grid} />
                  <XAxis dataKey='name' stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                  <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                  <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.border}`, color: COLORS.white }} />
                  <Legend wrapperStyle={{ color: COLORS.white }} />
                  <Line type='monotone' dataKey='ChatGPT 4.1 Mini' stroke={playerColors['ChatGPT 4.1 Mini']} strokeWidth={3} dot={{ r: 4 }} />
                  <Line type='monotone' dataKey='Llama3 90B' stroke={playerColors['Llama3 90B']} strokeWidth={3} dot={{ r: 4 }} />
                  <Line type='monotone' dataKey='Claude Haiku' stroke={playerColors['Claude Haiku']} strokeWidth={3} dot={{ r: 4 }} />
                  <Line type='monotone' dataKey='Random' stroke={playerColors['Random']} strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6'>
          <Panel title='Ending Balance (per Simulation)' className='xl:col-span-2'>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={endingData}>
                  <CartesianGrid stroke={COLORS.grid} vertical={false} />
                  <XAxis dataKey='name' stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                  <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                  <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.border}`, color: COLORS.white }} />
                  <Legend wrapperStyle={{ color: COLORS.white }} />
                  <Bar dataKey='ChatGPT 4.1 Mini' fill={playerColors['ChatGPT 4.1 Mini']} radius={[4, 4, 0, 0]} />
                  <Bar dataKey='Llama3 90B' fill={playerColors['Llama3 90B']} radius={[4, 4, 0, 0]} />
                  <Bar dataKey='Claude Haiku' fill={playerColors['Claude Haiku']} radius={[4, 4, 0, 0]} />
                  <Bar dataKey='Random' fill={playerColors['Random']} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title='Win Rate'>
            <div className='h-80 flex items-center justify-center'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie data={winRateData} dataKey='value' nameKey='name' innerRadius={60} outerRadius={95} paddingAngle={2} label>
                    {winRateData.map((entry) => (
                      <Cell key={entry.name} fill={playerColors[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.border}`, color: COLORS.white }} />
                  <Legend wrapperStyle={{ color: COLORS.white }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6'>
          <Panel title='Summary Across Simulations' className='xl:col-span-2'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <th className='py-2 px-3' style={{ color: COLORS.yellow }}>Player</th>
                    <th className='py-2 px-3' style={{ color: COLORS.yellow }}>Avg Rounds</th>
                    <th className='py-2 px-3' style={{ color: COLORS.yellow }}>Avg Bet</th>
                    <th className='py-2 px-3' style={{ color: COLORS.yellow }}>Median End</th>
                    <th className='py-2 px-3' style={{ color: COLORS.yellow }}>Win Rate</th>
                    <th className='py-2 px-3' style={{ color: COLORS.yellow }}>Elim Rate</th>
                    <th className='py-2 px-3' style={{ color: COLORS.yellow }}>Mean ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryRows.map((row) => (
                    <tr key={row.player} style={{ borderBottom: '1px solid #222' }}>
                      <SummaryCell color={playerColors[row.player]}>{row.player}</SummaryCell>
                      <SummaryCell>{row.avgRounds}</SummaryCell>
                      <SummaryCell>{row.avgBet}</SummaryCell>
                      <SummaryCell>{row.medianEnd}</SummaryCell>
                      <SummaryCell color={row.winRate > 0 ? COLORS.green : COLORS.red}>{row.winRate}%</SummaryCell>
                      <SummaryCell color={row.elimRate >= 75 ? COLORS.red : COLORS.white}>{row.elimRate}%</SummaryCell>
                      <SummaryCell color={row.meanROI >= 0 ? COLORS.green : COLORS.red}>{row.meanROI}%</SummaryCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title='Interpretation Notes'>
            <div className='space-y-4 text-base leading-relaxed' style={{ color: '#d0d0d0' }}>
              <p><span style={{ color: COLORS.yellow, fontWeight: 800 }}>Anomaly:</span> {stats.anomaly}</p>
              <p><span style={{ color: COLORS.yellow, fontWeight: 800 }}>Significance:</span> {stats.significance}</p>
              <p><span style={{ color: COLORS.yellow, fontWeight: 800 }}>Ranking:</span> Llama3 90B for stability, ChatGPT 4.1 Mini for upside, Claude Haiku as a middle-risk weaker finisher, Random last.</p>
            </div>
          </Panel>
        </div>

        <Panel title='Bottom Line'>
          <div className='text-xl md:text-2xl leading-relaxed' style={{ color: '#e4e4e4' }}>
            Llama3 90B still looks like the best bankroll manager. ChatGPT 4.1 Mini is no longer just “bad” — it is now clearly <span style={{ color: COLORS.yellow, fontWeight: 800 }}>boom-or-bust</span>, with one extreme winning run overpowering otherwise frequent busts. Claude Haiku survives more than Random but still converts that survival into wins poorly. Random never finishes ahead.
          </div>
        </Panel>
      </div>
    </div>
  );
}
