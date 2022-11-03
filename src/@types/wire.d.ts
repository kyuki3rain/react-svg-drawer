type NodeId = SvgId;
type NodeObject = {
  type: "node";
  id: NodeId | "preview";
  point: VirtualAbsolute;
  beforeNodeId?: NodeId;
} & SvgObjectCommon;

type NodeIdList = Set<NodeId>;

type PointToNodeIdMap = Map<string, NodeId>;

type EdgeId = SvgId;
type EdgeObject = {
  type: "edge";
  id: EdgeId | "preview";
  node1: NodeId;
  node2: NodeId;
} & SvgObjectCommon;

type EdgeIdList = Set<EdgeId>;

type NodeIdToEdgeIdMap = Map<NodeId, EdgeId>;
