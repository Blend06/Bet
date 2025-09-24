export type Sport = 'football' | 'basketball';

export type MarketType = '1x2' | 'over_under';

export interface Match {
  id: string;
  sport: Sport;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string; // ISO string
  odds: {
    // 1x2 market odds
    homeWin?: number;
    draw?: number;
    awayWin?: number;
    // over/under example odds
    over25?: number;
    under25?: number;
  };
}

export interface Selection {
  matchId: string;
  description: string; // e.g. "Home Win", "Over 2.5"
  market: MarketType;
  odds: number;
}

export interface BetSlipItem {
  id: string; // uuid
  selection: Selection;
  stake: number; // amount risked for this leg (single). For multiples, use combined.
}

export interface Bet {
  id: string; // uuid
  createdAt: string; // ISO
  type: 'single' | 'acca';
  items: BetSlipItem[];
  totalStake: number;
  potentialReturn: number;
  status: 'pending' | 'won' | 'lost' | 'cashed_out';
}

export interface BetHistoryEntry extends Bet {
  settledAt?: string; // ISO if settled
}


