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
