export const isOnEdge = (a: VirtualPoint, b: VirtualPoint, c: VirtualPoint) => {
  if (a === c || b === c) return true;

  if (b.vx === a.vx)
    return (
      c.vx === a.vx &&
      (c.vy - a.vy) / (b.vy - a.vy) > 0 &&
      (c.vy - a.vy) / (b.vy - a.vy) < 1
    );
  if (b.vy === a.vy)
    return (
      c.vy === a.vy &&
      (c.vx - a.vx) / (b.vx - a.vx) > 0 &&
      (c.vx - a.vx) / (b.vx - a.vx) < 1
    );

  return (
    (c.vx - a.vx) / (b.vx - a.vx) > 0 &&
    (c.vx - a.vx) / (b.vx - a.vx) < 1 &&
    (c.vx - a.vx) / (b.vx - a.vx) === (c.vy - a.vy) / (b.vy - a.vy)
  );
};
