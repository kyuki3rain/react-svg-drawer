type SvgId = string & { _brand: "SvgId" };

type SvgObject =
  | LineObject
  | TextObject
  | PolylineObject
  | RectObject
  | CircleObject
  | GroupObject;

type SvgObjectStyle = {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
};

type SvgObjectCommon = {
  id?: SvgId | "preview";
  style: SvgObjectStyle;
  configMap?: Map<string, string>;
  fixedPoint?: VirtualAbsolute;
};

type LineObject = {
  type: "line";
  point1?: VirtualAbsolute;
  point2?: VirtualAbsolute;
} & SvgObjectCommon;

type PolylineObject = {
  type: "polyline";
  points: VirtualAbsolute[];
  previewPoint?: VirtualAbsolute;
} & SvgObjectCommon;

type TextObject = {
  type: "text";
  point?: VirtualAbsolute;
} & SvgObjectCommon;

type RectObject = {
  type: "rect";
  upperLeft: VirtualAbsolute;
  size?: VirtualRelative;
  rx?: number;
} & SvgObjectCommon;

type CircleObject = {
  type: "circle";
  c?: VirtualAbsolute;
  r?: VirtualRelative;
} & SvgObjectCommon;

type GroupObject = {
  type: "group";
  objectIds: SvgId[];
  isCopy: boolean;
  firstFixedPoint: VirtualAbsolute;
} & SvgObjectCommon;
