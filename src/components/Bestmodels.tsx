import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = {
  panel: '#111111',
  border: '#f5c400',
  yellow: '#f5c400',
  yellow2: '#d9a800',
  white: '#f5f5f5',
  gray: '#8a8a8a',
  grid: '#2a2a2a',
  red: '#ff5c5c',
  green: '#61ff7b',
};

const playerColors: Record<string, string> = {
  'ChatGPT 4.1 Mini': COLORS.yellow,
  'Llama3 90B': COLORS.white,
  'Claude Haiku': COLORS.yellow2,
  Random: COLORS.gray,
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

function Panel({ title, children, wide = false }: { title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <section className={`panel${wide ? ' panel-wide' : ''}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ChartFrame({ children }: { children: React.ReactNode }) {
  return <div className="chart-frame">{children}</div>;
}

export default function Bestmodels() {
  return (
    <main className="dashboard-page">
      <section className="page-intro">
        <div>
          <p className="eyebrow">Four unique simulations</p>
          <h2>Best Model Comparison</h2>
        </div>
        <p>
          Llama3 90B is the most stable player, while ChatGPT 4.1 Mini is the highest-variance
          boom-or-bust player by a wide margin.
        </p>
      </section>

      <section className="metric-grid">
        <Panel title="Dataset">
          <dl className="stat-list">
            <div><dt>Unique simulations</dt><dd>4</dd></div>
            <div><dt>Duplicate CSVs ignored</dt><dd>2</dd></div>
            <div><dt>Starting bankroll</dt><dd>100</dd></div>
            <div><dt>Players</dt><dd>4</dd></div>
          </dl>
        </Panel>
        <Panel title="Stability Leader">
          <p className="headline-value">Llama3 90B</p>
          <p className="muted">Lowest elimination rate, longest survival, and best median ending balance.</p>
        </Panel>
        <Panel title="Highest Variance">
          <p className="headline-value accent">ChatGPT 4.1 Mini</p>
          <p className="muted">Most aggressive bettor and the source of the biggest single-run upside.</p>
        </Panel>
        <Panel title="Key Read">
          <p className="muted">ChatGPT 4.1 Mini produced one outlier run at 825 chips after frequent busts.</p>
        </Panel>
      </section>

      <section className="chart-grid">
        <Panel title="Average Bet Size">
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={avgBetData}>
                <CartesianGrid stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="player_name" stroke={COLORS.white} tick={{ fill: COLORS.white, fontSize: 12 }} />
                <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.border}`, color: COLORS.white }} />
                <Bar dataKey="avg_bet" radius={[8, 8, 0, 0]}>
                  {avgBetData.map((entry) => (
                    <Cell key={entry.player_name} fill={playerColors[entry.player_name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Panel>

        <Panel title="Rounds Survived" wide>
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roundsData}>
                <CartesianGrid stroke={COLORS.grid} />
                <XAxis dataKey="name" stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.border}`, color: COLORS.white }} />
                <Legend />
                {Object.keys(playerColors).map((player) => (
                  <Line key={player} type="monotone" dataKey={player} stroke={playerColors[player]} strokeWidth={3} dot={{ r: 4 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Panel>

        <Panel title="Ending Balance" wide>
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={endingData}>
                <CartesianGrid stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="name" stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.border}`, color: COLORS.white }} />
                <Legend />
                {Object.keys(playerColors).map((player) => (
                  <Bar key={player} dataKey={player} fill={playerColors[player]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Panel>

        <Panel title="Win Rate">
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={winRateData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2} label>
                  {winRateData.map((entry) => (
                    <Cell key={entry.name} fill={playerColors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.border}`, color: COLORS.white }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Panel>
      </section>

      <Panel title="Summary Across Simulations" wide>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Avg Rounds</th>
                <th>Avg Bet</th>
                <th>Median End</th>
                <th>Win Rate</th>
                <th>Elim Rate</th>
                <th>Mean ROI</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={row.player}>
                  <td style={{ color: playerColors[row.player] }}>{row.player}</td>
                  <td>{row.avgRounds}</td>
                  <td>{row.avgBet}</td>
                  <td>{row.medianEnd}</td>
                  <td className={row.winRate > 0 ? 'positive' : 'negative'}>{row.winRate}%</td>
                  <td className={row.elimRate >= 75 ? 'negative' : ''}>{row.elimRate}%</td>
                  <td className={row.meanROI >= 0 ? 'positive' : 'negative'}>{row.meanROI}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </main>
  );
}
