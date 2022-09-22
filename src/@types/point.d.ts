type RealNumber = number & { _brand: "Real" };

type RealPoint = {
  x: RealNumber;
  y: RealNumber;
};

type VirtualNumber = number & { _brand: "Virtual" };

type VirtualPoint = {
  vx: VirtualNumber;
  vy: VirtualNumber;
};

type VirtualRelative = VirtualPoint & { _brand: "relative" };
type VirtualAbsolute = VirtualPoint & { _brand: "absolute" };
