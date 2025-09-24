// Formatim determinist i valutës (pa Intl) për të shmangur gabimet e hidratimit
export function formatCurrency(value: number, currency: string = 'EUR'): string {
  const amount = Number.isFinite(value) ? value : 0;
  // Përdorim pikë si ndarës dhjetor dhe prefiksim me simbol/ISO për qëndrueshmëri SSR/CSR
  const symbol = currency === 'EUR' ? '€' : currency + ' ';
  return `${symbol}${amount.toFixed(2)}`;
}

export function formatDateTime(iso: string): string {
  try {
    const date = new Date(iso);
    return new Intl.DateTimeFormat('sq-AL', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return iso;
  }
}

export function multiplyOdds(odds: number[]): number {
  return odds.reduce((acc, v) => acc * v, 1);
}

// Formatim determinist (UTC) për të shmangur gabimet e hidratimit SSR/CSR
export function formatDateTimeUTC(iso: string): string {
  try {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    const y = d.getUTCFullYear();
    const m = pad(d.getUTCMonth() + 1);
    const day = pad(d.getUTCDate());
    const hh = pad(d.getUTCHours());
    const mm = pad(d.getUTCMinutes());
    return `${y}-${m}-${day} ${hh}:${mm} UTC`;
  } catch {
    return iso;
  }
}


