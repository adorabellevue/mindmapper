let nodeIdCounter = 1;

export function convertTreeToReactFlow(tree, startX = 0, startY = 0, levelGap = 150, siblingGap = 200) {
  const nodes = [];
  const edges = [];

  function traverse(node, parentId = null, depth = 0, xOffset = 0) {
    const id = `${nodeIdCounter++}`;
    const x = xOffset;
    const y = depth * levelGap;

    nodes.push({
      id,
      data: { label: node.name },
      position: { x, y },
      draggable: true,
    });

    if (parentId) {
      edges.push({
        id: `e${parentId}-${id}`,
        source: parentId,
        target: id,
      });
    }

    if (node.children && node.children.length > 0) {
      const totalWidth = (node.children.length - 1) * siblingGap;
      node.children.forEach((child, i) => {
        const childX = x - totalWidth / 2 + i * siblingGap;
        traverse(child, id, depth + 1, childX);
      });
    }
  }

  traverse(tree, null, 0, startX);
  return { nodes, edges };
}