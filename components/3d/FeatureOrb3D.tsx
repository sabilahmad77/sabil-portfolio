"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FeatureOrb3DProps {
  className?: string;
}

/* ── Pure CSS animated orb — no WebGL, no context conflict ── */
export default function FeatureOrb3D({ className = "" }: FeatureOrb3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.92]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: 320, height: 320,
          background: "radial-gradient(circle, #C9A655 0%, #45E3D3 50%, transparent 80%)",
        }}
      />

      {/* Scene container — CSS 3D perspective */}
      <div style={{ perspective: "900px", width: 280, height: 280, position: "relative" }}>

        {/* ── Orbit ring 1 — gold, fast ── */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "1.5px solid rgba(201,166,85,0.55)",
            transformStyle: "preserve-3d",
            transform: "rotateX(72deg) rotateY(10deg)",
          }}
        >
          {/* Particle on ring 1 */}
          <div style={{
            position: "absolute", top: "50%", left: "100%",
            width: 9, height: 9, marginTop: -4.5, marginLeft: -4.5,
            borderRadius: "50%",
            background: "#C9A655",
            boxShadow: "0 0 10px 3px rgba(201,166,85,0.7)",
          }} />
        </motion.div>

        {/* ── Orbit ring 2 — teal, medium ── */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: -20,
            borderRadius: "50%",
            border: "1px solid rgba(69,227,211,0.4)",
            transformStyle: "preserve-3d",
            transform: "rotateX(55deg) rotateY(-25deg)",
          }}
        >
          {/* Particle on ring 2 */}
          <div style={{
            position: "absolute", top: 0, left: "50%",
            width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5,
            borderRadius: "50%",
            background: "#45E3D3",
            boxShadow: "0 0 8px 2px rgba(69,227,211,0.65)",
          }} />
        </motion.div>

        {/* ── Orbit ring 3 — violet, slow ── */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: -40,
            borderRadius: "50%",
            border: "1px solid rgba(147,117,181,0.3)",
            transformStyle: "preserve-3d",
            transform: "rotateX(20deg) rotateY(60deg)",
          }}
        >
          {/* Particle on ring 3 */}
          <div style={{
            position: "absolute", bottom: 0, left: "30%",
            width: 6, height: 6, marginLeft: -3, marginBottom: -3,
            borderRadius: "50%",
            background: "#9375B5",
            boxShadow: "0 0 7px 2px rgba(147,117,181,0.6)",
          }} />
        </motion.div>

        {/* ── Core sphere ── */}
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 110, height: 110,
            marginTop: -55, marginLeft: -55,
            borderRadius: "50%",
            background: "radial-gradient(circle at 38% 35%, #E8C97A 0%, #C9A655 30%, #8B6820 60%, #3D2E10 100%)",
            boxShadow: "0 0 30px 6px rgba(201,166,85,0.3), inset 0 0 20px rgba(0,0,0,0.4)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* ── Inner glow on sphere ── */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 110, height: 110,
          marginTop: -55, marginLeft: -55,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* ── Wireframe overlay ring on sphere ── */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 130, height: 130,
          marginTop: -65, marginLeft: -65,
          borderRadius: "50%",
          border: "1px solid rgba(201,166,85,0.15)",
          transform: "rotateX(65deg)",
        }} />
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 130, height: 130,
          marginTop: -65, marginLeft: -65,
          borderRadius: "50%",
          border: "1px solid rgba(201,166,85,0.1)",
          transform: "rotateY(65deg)",
        }} />

        {/* ── Floating outer particles ── */}
        {[
          { x: -115, y: -60,  size: 7,  color: "#C9A655", dur: 3.1, delay: 0 },
          { x:  105, y: -80,  size: 6,  color: "#45E3D3", dur: 4.0, delay: 0.8 },
          { x:  120, y:  40,  size: 5,  color: "#9375B5", dur: 3.5, delay: 1.5 },
          { x: -100, y:  70,  size: 6,  color: "#6B7FE8", dur: 4.5, delay: 0.4 },
          { x:   20, y: -120, size: 5,  color: "#C9A655", dur: 3.8, delay: 2.0 },
          { x:  -30, y:  115, size: 6,  color: "#45E3D3", dur: 4.2, delay: 1.1 },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: p.size, height: p.size,
              marginTop: p.y - p.size / 2,
              marginLeft: p.x - p.size / 2,
              borderRadius: "2px",
              background: p.color,
              boxShadow: `0 0 6px 2px ${p.color}80`,
              transform: "rotate(45deg)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
