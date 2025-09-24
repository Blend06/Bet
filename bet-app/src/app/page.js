import { formatDateTimeUTC } from "@/lib/utils/format";
import BetSlip from "@/app/components/BetSlip";
import AddToSlipButton from "@/app/components/AddToSlipButton";

// Data statike për të shmangur mospërputhje SSR/CSR gjatë hidratimit
const demoMatches = [
  {
    id: "m1",
    sport: "football",
    league: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    startTime: "2025-12-31T18:00:00.000Z",
    odds: { homeWin: 1.9, draw: 3.4, awayWin: 3.8, over25: 1.95, under25: 1.85 },
  },
  {
    id: "m2",
    sport: "basketball",
    league: "EuroLeague",
    homeTeam: "Real Madrid",
    awayTeam: "Fenerbahçe",
    startTime: "2025-12-31T20:00:00.000Z",
    odds: { homeWin: 1.6, awayWin: 2.4 },
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold">Ndeshje të disponueshme</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <section className="md:col-span-2 space-y-4">
          {demoMatches.map((m) => (
            <article key={m.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-800">{m.league} • {m.sport}</p>
                  <h2 className="text-lg font-medium text-neutral-900">{m.homeTeam} vs {m.awayTeam}</h2>
                  <p className="text-xs text-neutral-700">{formatDateTimeUTC(m.startTime)}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {"homeWin" in m.odds && (
                  <AddToSlipButton selection={{ matchId: m.id, description: `${m.homeTeam} fiton`, market: '1x2', odds: m.odds.homeWin }}>
                    <span>1 • {m.odds.homeWin}</span>
                  </AddToSlipButton>
                )}
                {"draw" in m.odds && (
                  <AddToSlipButton selection={{ matchId: m.id, description: `Barazim`, market: '1x2', odds: m.odds.draw }}>
                    <span>X • {m.odds.draw}</span>
                  </AddToSlipButton>
                )}
                {"awayWin" in m.odds && (
                  <AddToSlipButton selection={{ matchId: m.id, description: `${m.awayTeam} fiton`, market: '1x2', odds: m.odds.awayWin }}>
                    <span>2 • {m.odds.awayWin}</span>
                  </AddToSlipButton>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {"over25" in m.odds && (
                  <AddToSlipButton selection={{ matchId: m.id, description: `Over 2.5`, market: 'over_under', odds: m.odds.over25 }}>
                    <span>Over 2.5 • {m.odds.over25}</span>
                  </AddToSlipButton>
                )}
                {"under25" in m.odds && (
                  <AddToSlipButton selection={{ matchId: m.id, description: `Under 2.5`, market: 'over_under', odds: m.odds.under25 }}>
                    <span>Under 2.5 • {m.odds.under25}</span>
                  </AddToSlipButton>
                )}
              </div>
            </article>
          ))}
        </section>
        <aside className="md:col-span-1">
          <div className="sticky top-6 border rounded-lg p-4 bg-white shadow-sm">
            <BetSlip />
          </div>
        </aside>
      </div>
    </main>
  );
}
