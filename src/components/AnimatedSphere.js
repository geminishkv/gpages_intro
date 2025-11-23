import React, { useRef, useEffect, useState } from "react";
import "./AnimatedSphere.css";

// Сфера с узлами, вращением и подсветкой узлов.
const NODES = 16;
const RADIUS = 120;

function getNodePos(i, angle) {
  const phi = (2 * Math.PI * i) / NODES;
  return {
    x: 170 + RADIUS * Math.cos(phi + angle),
    y: 170 + RADIUS * Math.sin(phi + angle)
  };
}

export default function AnimatedSphere() {
  const canvasRef = useRef();
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let angle = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Узлы
      const nodes = [];
      for (let i = 0; i < NODES; i++) {
        nodes.push(getNodePos(i, angle));
      }

      // Линии между узлами
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.4;
      for (let i = 0; i < NODES; i++) {
        for (let j = i + 1; j < NODES; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.globalAlpha = 0.18;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Узлы
      for (let i = 0; i < NODES; i++) {
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, i===hoveredNode ? 8 : 5, 0, 2 * Math.PI);
        ctx.fillStyle = i===hoveredNode ? "#ffd700" : "#fff";
        ctx.globalAlpha = i===hoveredNode ? 1 : 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    let frame;
    function animate() {
      angle += 0.012;
      draw();
      frame = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(frame);
  }, [hoveredNode]);

  // Подсветка при курсоре
  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let found = null;
    for (let i = 0; i < NODES; i++) {
      const pos = getNodePos(i, 0);
      const dx = x - pos.x;
      const dy = y - pos.y;
      if (dx * dx + dy * dy < 64) {
        found = i;
        break;
      }
    }
    setHoveredNode(found);
  }

  return (
    <div className="sphere">
      <canvas
        ref={canvasRef}
        width={340}
        height={340}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
      />
    </div>
  );
}
