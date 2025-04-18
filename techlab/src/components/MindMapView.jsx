"use client";

import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { useMemo } from "react";
import { convertTreeToReactFlow } from "@/utils/convertTreeToReactFlow";

export default function MindMapView({ jsonTree }) {
  console.log("📥 MindMapView received jsonTree:", jsonTree);

  const { nodes, edges } = useMemo(() => {
    try {
      console.log("🔄 Converting JSON tree to react-flow format...");
      return convertTreeToReactFlow(jsonTree);
    } catch (err) {
      console.error("❌ Failed to convert JSON:", err);
      return { nodes: [], edges: [] };
    }
  }, [jsonTree]);

  return (
    <div className="mt-6 border rounded h-[600px]">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}