export function wrapSlide(index: number, count: number) {
  return ((index % count) + count) % count;
}

/** Shortest circular distance; far slides stay behind the three visible photographs. */
export function slideOffset(index: number, active: number, count: number) {
  const distance = wrapSlide(index - active, count);
  return distance > count / 2 ? distance - count : distance;
}

export function nearbySlides(active: number, count: number) {
  return [wrapSlide(active - 1, count), active, wrapSlide(active + 1, count)];
}
