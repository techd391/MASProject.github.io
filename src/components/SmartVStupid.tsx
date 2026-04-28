import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = {
  yellow: '#f5c400',
  white: '#f5f5f5',
  gray: '#8a8a8a',
  grid: '#2a2a2a',
  red: '#ff5c5c',
  green: '#61ff7b',
  blue: '#6fb7ff',
};

const agentColors: Record<string, string> = {
  'Conservative red': COLORS.green,
  'Number bettor': COLORS.yellow,
  'High-risk cheater': COLORS.red,
  Random: COLORS.gray,
};

const agentData = [
  {
    agent: 'Conservative red',
    label: 'Conservative',
    roundsPlayed: 10,
    totalWagered: 50,
    cheatAttempts: 0,
    detectedCheats: 0,
    finalBalance: 110,
    riskScore: 12,
  },
  {
    agent: 'Number bettor',
    label: 'Number',
    roundsPlayed: 10,
    totalWagered: 50,
    cheatAttempts: 0,
    detectedCheats: 0,
    finalBalance: 230,
    riskScore: 38,
  },
  {
    agent: 'High-risk cheater',
    label: 'Cheater',
    roundsPlayed: 3,
    totalWagered: 30,
    cheatAttempts: 3,
    detectedCheats: 1,
    finalBalance: 0,
    riskScore: 100,
  },
  {
    agent: 'Random',
    label: 'Random',
    roundsPlayed: 10,
    totalWagered: 301,
    cheatAttempts: 0,
    detectedCheats: 0,
    finalBalance: 3,
    riskScore: 82,
  },
];

const balancePath = [
  { round: 'Start', Conservative: 100, Number: 100, Cheater: 100, Random: 100 },
  { round: 'R1', Conservative: 105, Number: 95, Cheater: 130, Random: 82 },
  { round: 'R2', Conservative: 100, Number: 130, Cheater: 160, Random: 41 },
  { round: 'R3', Conservative: 105, Number: 95, Cheater: 0, Random: 64 },
  { round: 'R6', Conservative: 100, Number: 160, Cheater: 0, Random: 21 },
  { round: 'R10', Conservative: 110, Number: 230, Cheater: 0, Random: 3 },
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

export default function SmartVStupid() {
  return (
    <main className="dashboard-page">
      <section className="page-intro">
        <div>
          <p className="eyebrow">Deterministic behavior test</p>
          <h2>Smart vs Stupid Risk Behavior</h2>
        </div>
        <p>
          This page visualizes the report scenario: disciplined legal play survived the full run,
          while reckless cheating and unbounded random betting collapsed the bankroll.
        </p>
      </section>

      <section className="metric-grid">
        <Panel title="Best Finish">
          <p className="headline-value accent">Number bettor</p>
          <p className="muted">Finished at 230 after ten rounds, showing high upside from legal number betting.</p>
        </Panel>
        <Panel title="Most Stable">
          <p className="headline-value">Conservative red</p>
          <p className="muted">Played every round with small wagers and finished slightly ahead.</p>
        </Panel>
        <Panel title="Fastest Bust">
          <p className="headline-value danger">High-risk cheater</p>
          <p className="muted">Detection eliminated the agent after only three played rounds.</p>
        </Panel>
        <Panel title="Worst Bankroll Control">
          <p className="headline-value danger">Random</p>
          <p className="muted">Wagered 301 total and ended with only 3 chips.</p>
        </Panel>
      </section>

      <section className="chart-grid">
        <Panel title="Final Balance by Agent">
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentData}>
                <CartesianGrid stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="label" stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.yellow}`, color: COLORS.white }} />
                <Bar dataKey="finalBalance" radius={[8, 8, 0, 0]}>
                  {agentData.map((entry) => (
                    <Cell key={entry.agent} fill={agentColors[entry.agent]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Panel>

        <Panel title="Balance Trajectory" wide>
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balancePath}>
                <CartesianGrid stroke={COLORS.grid} />
                <XAxis dataKey="round" stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.yellow}`, color: COLORS.white }} />
                <Legend />
                <Line type="monotone" dataKey="Conservative" stroke={COLORS.green} strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Number" stroke={COLORS.yellow} strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Cheater" stroke={COLORS.red} strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Random" stroke={COLORS.gray} strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Panel>

        <Panel title="Risk Indicators" wide>
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentData}>
                <CartesianGrid stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="label" stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.yellow}`, color: COLORS.white }} />
                <Legend />
                <Bar dataKey="totalWagered" name="Total wagered" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
                <Bar dataKey="riskScore" name="Risk score" fill={COLORS.red} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Panel>

        <Panel title="Cheat Attempts">
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentData}>
                <CartesianGrid stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="label" stroke={COLORS.white} tick={{ fill: COLORS.white }} />
                <YAxis stroke={COLORS.white} tick={{ fill: COLORS.white }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: `1px solid ${COLORS.yellow}`, color: COLORS.white }} />
                <Legend />
                <Bar dataKey="cheatAttempts" name="Attempts" fill={COLORS.yellow} radius={[4, 4, 0, 0]} />
                <Bar dataKey="detectedCheats" name="Detected" fill={COLORS.red} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Panel>
      </section>

      <Panel title="Scenario Data" wide>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Agent</th>
                <th>Rounds Played</th>
                <th>Total Wagered</th>
                <th>Cheat Attempts</th>
                <th>Detected Cheats</th>
                <th>Final Balance</th>
              </tr>
            </thead>
            <tbody>
              {agentData.map((row) => (
                <tr key={row.agent}>
                  <td style={{ color: agentColors[row.agent] }}>{row.agent}</td>
                  <td>{row.roundsPlayed}</td>
                  <td>{row.totalWagered}</td>
                  <td>{row.cheatAttempts}</td>
                  <td>{row.detectedCheats}</td>
                  <td className={row.finalBalance >= 100 ? 'positive' : 'negative'}>{row.finalBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </main>
  );
}
