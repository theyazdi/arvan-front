export function formatToToman(amount: string | number): string {
  const numericAmount = typeof amount === 'string'
    ? Number(amount.toString().replace(/,/g, ''))
    : amount;

  if (Number.isNaN(numericAmount)) {
    return '0';
  }

  // If backend provides IRR (rial), convert to toman by dividing by 10
  const toman = Math.floor(numericAmount / 10);
  return toman.toLocaleString('fa-IR');
}

export function currencyLabelToToman(currency?: string): string {
  return currency === 'IRR' || currency === 'ریال' ? 'تومان' : 'تومان';
}

export function formatPriceWithToman(amount: string | number): string {
  return `${formatToToman(amount)} تومان`;
}


