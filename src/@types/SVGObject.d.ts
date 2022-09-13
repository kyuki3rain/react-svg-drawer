type SvgId = string & { _brand: "SvgId" };

type SvgObject =
  | LineObject
  | TextObject
  | PolylineObject
  | RectObject
  | CircleObject;

type SvgObjectStyle = {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
};

type SvgObjectCommon = {
  id?: SvgId | "preview";
  style: SvgObjectStyle;
  configMap?: Map<string, string>;
  fixedPoint?: VirtualPoint;
};

type LineObject = {
  type: "line";
  point1?: VirtualPoint;
  point2?: VirtualPoint;
} & SvgObjectCommon;

type PolylineObject = {
  type: "polyline";
  points: VirtualPoint[];
  previewPoint?: VirtualPoint;
} & SvgObjectCommon;

type TextObject = {
  type: "text";
  point?: VirtualPoint;
} & SvgObjectCommon;

type RectObject = {
  type: "rect";
  upperLeft: VirtualPoint;
  size?: VirtualPoint;
  rx?: number;
} & SvgObjectCommon;

type CircleObject = {
  type: "circle";
  c?: VirtualPoint;
  r?: VirtualPoint;
} & SvgObjectCommon;
