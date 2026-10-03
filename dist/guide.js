// Use the existing menu snapshot without inferring ingredients or spice levels.
export function getGuideChoices(dishes, recommendedIds, spice) {
  if (![null, 0, 1, 2].includes(spice)) return [];
  const recommended = new Set(recommendedIds);
  return dishes.filter(d => !d.seasonal && !['dessert', 'drinks'].includes(d.categoryId)
    && Number.isInteger(d.priceKrw) && d.priceKrw > 0
    && (spice === null || d.spiceLevel === spice))
    .sort((a, b) => Number(recommended.has(b.id)) - Number(recommended.has(a.id)))
    .slice(0, 3);
}
