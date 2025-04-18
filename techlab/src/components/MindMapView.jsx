"use client";

import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import { useMemo, useCallback, useRef, useState } from "react";
import { convertTreeToReactFlow } from "@/utils/convertTreeToReactFlow";
import { toPng, toSvg } from "html-to-image";
import "reactflow/dist/style.css";

function MindMapInner({ jsonTree }) {
  console.log("📥 MindMapView received jsonTree:", jsonTree);

  const wrapperRef = useRef(null);

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

  const handleExport = async (type) => {
    const container = wrapperRef.current;
    if (!container) return;
  
    const node = container.querySelector(".react-flow"); // ⬅️ This is the exportable canvas
    if (!node) {
      console.error("🛑 Could not find .react-flow element");
      return;
    }
  
    const style = {
      width: node.scrollWidth + "px",
      height: node.scrollHeight + "px",
    };
  
    try {
      const imageFunc = type === "png" ? toPng : toSvg;
      const dataUrl = await imageFunc(node);
      const link = document.createElement("a");
      link.download = `mindmap.${type}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("🛑 Export failed:", error);
    }
  };

  return (
    <div>
      {/* Mind map container */}
      <div className="mt-6 border rounded h-[600px]" ref={wrapperRef}>
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
      {/* Floating button container */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => handleExport("png")}
          className="bg-gray-500 text-white text-xs px-2 py-1 rounded"
        >
          Export PNG
        </button>
        <button
          onClick={() => handleExport("svg")}
          className="bg-gray-500 text-white text-xs px-2 py-1 rounded"
        >
          Export SVG
        </button>
      </div>
    </div>
  );
}

export default function MindMapView({ jsonTree }) {
  return (
    <ReactFlowProvider>
      <MindMapInner jsonTree={jsonTree} />
    </ReactFlowProvider>
  );
}