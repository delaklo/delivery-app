export function normalizePhone(raw: string): string {

  const digits = raw.replace(/\D/g, '');


  if (digits.length === 10 && digits.startsWith('0')) {
    return '38' + digits;
  }

  if (digits.length === 12 && digits.startsWith('380')) {
    return digits;
  }

  if (digits.length === 11 && digits.startsWith('80')) {
    return '3' + digits;
  }


  return digits;
}


export function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return false;
  const normalized = normalizePhone(raw);

  if (normalized.startsWith('380')) return normalized.length === 12;
  return true;
}
