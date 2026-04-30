/**
 * Lesezeit-Schätzer — neutraler 200-Wörter-pro-Minute-Standard für DE.
 * Gibt mindestens 1 Minute aus.
 */
export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
