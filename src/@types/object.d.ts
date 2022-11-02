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
  configMap?: Map<string, string>;
  fixedPoint?: VirtualAbsolute;
  area: Area;
};

type LineObject = {
  type: "line";
  point1?: VirtualAbsolute;
  point2?: VirtualAbsolute;
  style: SvgObjectStyle;
} & SvgObjectCommon;

type PolylineObject = {
  type: "polyline";
  points: VirtualAbsolute[];
  previewPoint?: VirtualAbsolute;
  style: SvgObjectStyle;
} & SvgObjectCommon;

type TextObject = {
  type: "text";
  point?: VirtualAbsolute;
  style: SvgObjectStyle & {
    fontSize: number;
  };
} & SvgObjectCommon;

type RectObject = {
  type: "rect";
  upperLeft: VirtualAbsolute;
  size?: VirtualRelative;
  rx?: number;
  style: SvgObjectStyle;
} & SvgObjectCommon;

type CircleObject = {
  type: "circle";
  c?: VirtualAbsolute;
  r?: VirtualRelative;
  style: SvgObjectStyle;
} & SvgObjectCommon;

type GroupObject = {
  type: "group";
  objectIds: SvgId[];
  firstFixedPoint: VirtualAbsolute;
} & SvgObjectCommon;
