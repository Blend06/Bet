import { formatDateTimeUTC } from "@/lib/utils/format";
import BetSlip from "@/app/components/BetSlip";
import AddToSlipButton from "@/app/components/AddToSlipButton";

// Data statike me odds IDs për të punuar me API
const demoMatches = [
  {
    id: "m1",
    sport: "football",
    league: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    startTime: "2025-12-31T18:00:00.000Z",
    odds: [
      { id: 1, description: "Arsenal fiton", oddValue: 1.9 },
      { id: 2, description: "Barazim", oddValue: 3.4 },
      { id: 3, description: "Chelsea fiton", oddValue: 3.8 },
      { id: 4, description: "Over 2.5 gola", oddValue: 1.95 },
      { id: 5, description: "Under 2.5 gola", oddValue: 1.85 },
    ]
  },
  {
    id: "m2",
    sport: "basketball",
    league: "EuroLeague",
    homeTeam: "Real Madrid",
    awayTeam: "Fenerbahçe",
    startTime: "2025-12-31T20:00:00.000Z",
    odds: [
      { id: 6, description: "Real Madrid fiton", oddValue: 1.6 },
      { id: 7, description: "Fenerbahçe fiton", oddValue: 2.4 },
      { id: 8, description: "Over 160.5 pikë", oddValue: 1.9 },
      { id: 9, description: "Under 160.5 pikë", oddValue: 1.9 },
    ]
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {m.odds.map((odd) => (
                  <AddToSlipButton 
                    key={odd.id}
                    selection={{ 
                      oddId: odd.id,
                      matchId: m.id, 
                      description: odd.description, 
                      odds: odd.oddValue 
                    }}
                  >
                    <span className="text-sm">{odd.description} • {odd.oddValue}</span>
                  </AddToSlipButton>
                ))}
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
