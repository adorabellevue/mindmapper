"use client";

import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { useMemo, useCallback } from "react";
import { convertTreeToReactFlow } from "@/utils/convertTreeToReactFlow";
import "reactflow/dist/style.css";

export default function MindMapView({ jsonTree }) {
  console.log("📥 MindMapView received jsonTree:", jsonTree);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    try {
      console.log("🔄 Converting JSON tree to react-flow format...");
      return convertTreeToReactFlow(jsonTree);
    } catch (err) {
      console.error("❌ Failed to convert JSON:", err);
      return { nodes: [], edges: [] };
    }
  }, [jsonTree]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div className="mt-6 border rounded h-[600px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}