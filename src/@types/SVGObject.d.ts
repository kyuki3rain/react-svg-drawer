type SvgId = string & { _brand: "SvgId" };

type SvgObject = LineObject | TextObject;

type SvgObjectStyle = {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
};

type SvgObjectCommon = {
  id: SvgId;
  style: SvgObjectStyle;
};

type LineObject = {
  type: "line";
  point1: VirtualPoint;
  point2: VirtualPoint;
} & SvgObjectCommon;

type TextObject = {
  type: "text";
  text: string;
  point: VirtualPoint;
} & SvgObjectCommon;
