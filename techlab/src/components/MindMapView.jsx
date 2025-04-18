"use client";

import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { useMemo } from "react";
import { convertTreeToReactFlow } from "@/utils/convertTreeToReactFlow";

export default function MindMapView({ jsonTree }) {
  const { nodes, edges } = useMemo(() => {
    try {
      return convertTreeToReactFlow(jsonTree);
    } catch (err) {
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