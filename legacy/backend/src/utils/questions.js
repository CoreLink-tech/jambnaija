export function ensureOptions(options) {
  if (!Array.isArray(options)) return null;
  const cleaned = options.map((item) => String(item || "").trim()).filter(Boolean);
  if (cleaned.length < 2) return null;
  return cleaned;
}

export function randomPick(items, count) {
  const list = items.slice();
  for (let index = list.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = list[index];
    list[index] = list[randomIndex];
    list[randomIndex] = temp;
  }
  return list.slice(0, Math.min(count, list.length));
}

