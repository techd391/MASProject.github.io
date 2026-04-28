import { useEffect, useState } from 'react';
import Bestmodels from './components/Bestmodels';
import SmartVStupid from './components/SmartVStupid';

type Page = 'best-models' | 'smart-v-stupid';

const pages: Array<{ id: Page; label: string; description: string }> = [
  {
    id: 'best-models',
    label: 'Best Models',
    description: 'Aggregate model comparison across roulette simulations',
  },
  {
    id: 'smart-v-stupid',
    label: 'Smart vs Stupid',
    description: 'Risk behavior comparison from the MAS report scenario',
  },
];

function getPageFromHash(): Page {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return pages.some((page) => page.id === hash) ? (hash as Page) : 'best-models';
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>(() => getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => setActivePage(getPageFromHash());

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">MAS Roulette Analysis</p>
          <h1>LLM Roulette Dashboard</h1>
        </div>
        <nav className="page-nav" aria-label="Dashboard pages">
          {pages.map((page) => (
            <a
              key={page.id}
              className={activePage === page.id ? 'active' : ''}
              href={`#/${page.id}`}
              aria-current={activePage === page.id ? 'page' : undefined}
              title={page.description}
            >
              {page.label}
            </a>
          ))}
        </nav>
      </header>

      {activePage === 'best-models' ? <Bestmodels /> : <SmartVStupid />}
    </div>
  );
}
