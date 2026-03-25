// import { useEffect, useRef, useState } from "react";

// const CONFIG = {
//   sessions: { icon: "◈", color: "#00d4aa", label: "Total Sessions" },
//   cvr:      { icon: "⬡", color: "#0088ff", label: "Conversion Rate" },
//   bounce:   { icon: "⬘", color: "#ffd60a", label: "Bounce Rate" },
//   users:    { icon: "◉", color: "#ff4d6d", label: "Active Users" },
// };

// function useAnimatedNumber(target, duration = 700) {
//   const [display, setDisplay] = useState(target || 0);
//   const prevRef = useRef(target || 0);
//   const rafRef = useRef(null);

//   useEffect(() => {
//     if (target === undefined || target === null) return;
//     const start = prevRef.current || 0;
//     const end = parseFloat(target);
//     const startTime = performance.now();
//     cancelAnimationFrame(rafRef.current);
//     const tick = (now) => {
//       const progress = Math.min((now - startTime) / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setDisplay(start + (end - start) * eased);
//       if (progress < 1) rafRef.current = requestAnimationFrame(tick);
//       else prevRef.current = end;
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [target]);

//   return display;
// }

// export default function KPICard({ value, unit = "", type = "sessions", prev }) {
//   const cfg = CONFIG[type];
//   const animated = useAnimatedNumber(value);
//   const [popped, setPopped] = useState(false);
//   const isLoading = value === undefined || value === null;

//   useEffect(() => {
//     if (prev !== undefined && value !== undefined && value !== prev) {
//       setPopped(true);
//       const t = setTimeout(() => setPopped(false), 400);
//       return () => clearTimeout(t);
//     }
//   }, [value]);

//   const trend = prev !== undefined && value !== undefined
//     ? value > prev ? "up" : value < prev ? "down" : "flat"
//     : "flat";

//   return (
//     <div className="kpi-card glow-card p-5 cursor-default select-none group">
//       {/* Top glow line on hover */}
//       <div
//         className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//         style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }}
//       />

//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <span className="section-label">{cfg.label}</span>
//           <div
//             className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold transition-all duration-300 group-hover:scale-110"
//             style={{ background: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}25` }}
//           >
//             {cfg.icon}
//           </div>
//         </div>

//         <div className="flex items-baseline gap-1 mb-3">
//           {isLoading ? (
//             <div className="shimmer" />
//           ) : (
//             <span
//               className={`mono text-4xl font-semibold tracking-tight ${popped ? "number-pop" : ""}`}
//               style={{ color: cfg.color }}
//             >
//               {unit === "%" ? animated.toFixed(1) : Math.round(animated).toLocaleString()}
//             </span>
//           )}
//           {unit && !isLoading && (
//             <span className="text-slate-500 text-lg mono">{unit}</span>
//           )}
//         </div>

//         <div className="h-1 rounded-full mb-3 overflow-hidden" style={{ background: `${cfg.color}15` }}>
//           <div
//             className="h-full rounded-full transition-all duration-1000"
//             style={{
//               width: `${Math.min(((value || 0) / (type === 'sessions' ? 100 : type === 'users' ? 50 : 100)) * 100, 100)}%`,
//               background: `linear-gradient(90deg, ${cfg.color}80, ${cfg.color})`
//             }}
//           />
//         </div>

//         {trend !== "flat" ? (
//           <span
//             className="text-xs font-medium mono px-2 py-0.5 rounded-md"
//             style={{
//               color: trend === "up" ? "#00d4aa" : "#ff4d6d",
//               background: trend === "up" ? "rgba(0,212,170,0.1)" : "rgba(255,77,109,0.1)"
//             }}
//           >
//             {trend === "up" ? "▲" : "▼"} vs last batch
//           </span>
//         ) : (
//           <span className="text-xs text-slate-600 mono">— stable</span>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useRef, useState } from "react";
// import { Box, Typography, Tooltip } from "@mui/material";
// import { PeopleAlt, TrendingUp, Undo, Speed } from "@mui/icons-material";
// import { motion } from "framer-motion";

// const CONFIG = {
//   sessions: { label: "Total Sessions",   color: "#00d4aa", bg: "rgba(0,212,170,0.08)",   border: "rgba(0,212,170,0.2)",   Icon: PeopleAlt, cls: "kpi-sessions", spark: "#00d4aa" },
//   cvr:      { label: "Conversion Rate",  color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.2)",  Icon: TrendingUp, cls: "kpi-cvr",     spark: "#3b82f6" },
//   bounce:   { label: "Bounce Rate",      color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)",  Icon: Undo,       cls: "kpi-bounce",  spark: "#f59e0b" },
//   users:    { label: "Active Users",     color: "#f43f5e", bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.2)",   Icon: Speed,      cls: "kpi-users",   spark: "#f43f5e" },
// };

// function useAnimatedNumber(target, duration = 800) {
//   const [display, setDisplay] = useState(target || 0);
//   const prevRef = useRef(target || 0);
//   const rafRef = useRef(null);
//   useEffect(() => {
//     if (target === undefined || target === null) return;
//     const start = prevRef.current || 0;
//     const end = parseFloat(target);
//     const startTime = performance.now();
//     cancelAnimationFrame(rafRef.current);
//     const tick = (now) => {
//       const progress = Math.min((now - startTime) / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setDisplay(start + (end - start) * eased);
//       if (progress < 1) rafRef.current = requestAnimationFrame(tick);
//       else prevRef.current = end;
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [target]);
//   return display;
// }

// // Mini sparkline using SVG
// function Sparkline({ data = [], color }) {
//   if (!data.length) return null;
//   const max = Math.max(...data, 1);
//   const min = Math.min(...data, 0);
//   const range = max - min || 1;
//   const w = 80, h = 28;
//   const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
//   return (
//     <svg width={w} height={h} style={{ overflow: "visible" }}>
//       <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} opacity={0.8} />
//       <polyline fill={`${color}20`} stroke="none"
//         points={`0,${h} ${pts} ${w},${h}`} />
//     </svg>
//   );
// }

// export default function KPICard({ value, unit = "", type = "sessions", prev, history = [] }) {
//   const cfg = CONFIG[type];
//   const { Icon } = cfg;
//   const animated = useAnimatedNumber(value);
//   const [popped, setPopped] = useState(false);
//   const isLoading = value === undefined || value === null;

//   useEffect(() => {
//     if (prev !== undefined && value !== undefined && value !== prev) {
//       setPopped(true);
//       const t = setTimeout(() => setPopped(false), 500);
//       return () => clearTimeout(t);
//     }
//   }, [value]);

//   const trend = prev !== undefined && value !== undefined
//     ? value > prev ? "up" : value < prev ? "down" : "flat" : "flat";
//   const trendPct = prev && prev !== 0 ? Math.abs(((value - prev) / prev) * 100).toFixed(1) : null;

//   return (
//     <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ height: "100%" }}>
//       <Box className={`glow-card ${cfg.cls}`} sx={{ p: 3, height: "100%", cursor: "default" }}>
//         {/* Top row */}
//         <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
//           <Box>
//             <Typography className="section-label">{cfg.label}</Typography>
//           </Box>
//           <Box sx={{
//             width: 42, height: 42, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
//             background: cfg.bg, border: `1px solid ${cfg.border}`,
//             transition: "all 0.3s", "&:hover": { transform: "rotate(10deg) scale(1.1)" }
//           }}>
//             <Icon sx={{ fontSize: 20, color: cfg.color }} />
//           </Box>
//         </Box>

//         {/* Value */}
//         <Box display="flex" alignItems="baseline" gap={0.5} mb={1.5}>
//           {isLoading ? <div className="shimmer" /> : (
//             <Typography className={`mono ${popped ? "number-pop" : ""}`}
//               sx={{ fontSize: "2.4rem", fontWeight: 800, color: cfg.color, lineHeight: 1, letterSpacing: "-1px" }}>
//               {unit === "%" ? animated.toFixed(1) : Math.round(animated).toLocaleString()}
//             </Typography>
//           )}
//           {unit && !isLoading && (
//             <Typography sx={{ color: "#64748b", fontSize: "1.1rem", fontFamily: "'JetBrains Mono',monospace" }}>{unit}</Typography>
//           )}
//         </Box>

//         {/* Progress bar */}
//         <Box sx={{ height: 4, borderRadius: 2, background: `${cfg.color}15`, mb: 2, overflow: "hidden" }}>
//           <Box className="funnel-bar" sx={{
//             height: "100%", borderRadius: 2,
//             width: `${Math.min(((value || 0) / (type === "sessions" ? 100 : type === "users" ? 60 : 100)) * 100, 100)}%`,
//             background: `linear-gradient(90deg, ${cfg.color}60, ${cfg.color})`,
//           }} />
//         </Box>

//         {/* Bottom row: trend + sparkline */}
//         <Box display="flex" alignItems="center" justifyContent="space-between">
//           <Box>
//             {trend !== "flat" && trendPct ? (
//               <Box sx={{
//                 display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.5, py: 0.5, borderRadius: "8px",
//                 background: trend === "up" ? "rgba(0,212,170,0.1)" : "rgba(244,63,94,0.1)",
//                 border: `1px solid ${trend === "up" ? "rgba(0,212,170,0.25)" : "rgba(244,63,94,0.25)"}`,
//               }}>
//                 <Typography sx={{ color: trend === "up" ? "#00d4aa" : "#f43f5e", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>
//                   {trend === "up" ? "▲" : "▼"} {trendPct}%
//                 </Typography>
//               </Box>
//             ) : (
//               <Typography sx={{ color: "#475569", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace" }}>— stable</Typography>
//             )}
//           </Box>
//           <Sparkline data={history.length ? history : [value || 0]} color={cfg.spark} />
//         </Box>
//       </Box>
//     </motion.div>
//   );
// }
// import { useEffect, useRef, useState } from "react";
// import { Tooltip } from "@mui/material";
// import { PeopleAlt, TrendingUp, Undo, Speed } from "@mui/icons-material";
// import { motion } from "framer-motion";

// // ── CONFIG — unchanged ──────────────────────────────────────────────────────
// const CONFIG = {
//   sessions: { label: "Total Sessions",  color: "#1D9E75", bg: "rgba(29,158,117,0.10)",  border: "rgba(29,158,117,0.22)",  Icon: PeopleAlt,  spark: "#1D9E75", accentBg: "#E1F5EE" },
//   cvr:      { label: "Conversion Rate", color: "#378ADD", bg: "rgba(55,138,221,0.10)",  border: "rgba(55,138,221,0.22)",  Icon: TrendingUp, spark: "#378ADD", accentBg: "#E6F1FB" },
//   bounce:   { label: "Bounce Rate",     color: "#EF9F27", bg: "rgba(239,159,39,0.10)",  border: "rgba(239,159,39,0.22)",  Icon: Undo,       spark: "#EF9F27", accentBg: "#FAEEDA" },
//   users:    { label: "Active Users",    color: "#E24B4A", bg: "rgba(226,75,74,0.10)",   border: "rgba(226,75,74,0.22)",   Icon: Speed,      spark: "#E24B4A", accentBg: "#FCEBEB" },
// };

// // ── useAnimatedNumber — unchanged ───────────────────────────────────────────
// function useAnimatedNumber(target, duration = 800) {
//   const [display, setDisplay] = useState(target || 0);
//   const prevRef = useRef(target || 0);
//   const rafRef  = useRef(null);

//   useEffect(() => {
//     if (target === undefined || target === null) return;
//     const start = prevRef.current || 0;
//     const end   = parseFloat(target);
//     const startTime = performance.now();
//     cancelAnimationFrame(rafRef.current);
//     const tick = (now) => {
//       const progress = Math.min((now - startTime) / duration, 1);
//       const eased    = 1 - Math.pow(1 - progress, 3);
//       setDisplay(start + (end - start) * eased);
//       if (progress < 1) rafRef.current = requestAnimationFrame(tick);
//       else prevRef.current = end;
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [target]);

//   return display;
// }

// // ── Sparkline SVG — unchanged logic ────────────────────────────────────────
// function Sparkline({ data = [], color }) {
//   if (!data.length) return null;
//   const max   = Math.max(...data, 1);
//   const min   = Math.min(...data, 0);
//   const range = max - min || 1;
//   const w = 72, h = 28;
//   const pts = data.map((v, i) =>
//     `${(i / Math.max(data.length - 1, 1)) * w},${h - ((v - min) / range) * (h - 2) + 1}`
//   ).join(" ");

//   return (
//     <svg width={w} height={h} style={{ overflow: "visible", display: "block" }}>
//       {/* area fill */}
//       <polyline
//         fill={`${color}18`} stroke="none"
//         points={`0,${h} ${pts} ${w},${h}`}
//       />
//       {/* line */}
//       <polyline
//         fill="none" stroke={color} strokeWidth="2"
//         strokeLinecap="round" strokeLinejoin="round"
//         points={pts} opacity={0.9}
//       />
//       {/* last point dot */}
//       {data.length > 1 && (() => {
//         const last = data[data.length - 1];
//         const x = w;
//         const y = h - ((last - min) / range) * (h - 2) + 1;
//         return <circle cx={x} cy={y} r="3" fill={color} opacity="0.9" />;
//       })()}
//     </svg>
//   );
// }

// // ── KPICard ─────────────────────────────────────────────────────────────────
// export default function KPICard({ value, unit = "", type = "sessions", prev, history = [] }) {
//   const cfg       = CONFIG[type];
//   const { Icon }  = cfg;
//   const animated  = useAnimatedNumber(value);
//   const [popped, setPopped] = useState(false);
//   const isLoading = value === undefined || value === null;

//   // unchanged pop effect
//   useEffect(() => {
//     if (prev !== undefined && value !== undefined && value !== prev) {
//       setPopped(true);
//       const t = setTimeout(() => setPopped(false), 500);
//       return () => clearTimeout(t);
//     }
//   }, [value]);

//   const trend    = prev !== undefined && value !== undefined
//     ? value > prev ? "up" : value < prev ? "down" : "flat" : "flat";
//   const trendPct = prev && prev !== 0
//     ? Math.abs(((value - prev) / prev) * 100).toFixed(1) : null;

//   const displayVal = isLoading ? null
//     : unit === "%" ? animated.toFixed(1)
//     : Math.round(animated).toLocaleString();

//   return (
//     <motion.div
//       whileHover={{ y: -5, boxShadow: `0 16px 40px ${cfg.color}18` }}
//       transition={{ type: "spring", stiffness: 280, damping: 22 }}
//       style={{ height: "100%" }}
//     >
//       <div style={{
//         background: "#111927",
//         border: `1px solid ${cfg.border}`,
//         borderRadius: 16,
//         padding: "20px 22px",
//         height: "100%",
//         display: "flex", flexDirection: "column",
//         position: "relative", overflow: "hidden",
//         cursor: "default",
//         borderTop: `3px solid ${cfg.color}`,
//       }}>

//         {/* Subtle bg glow */}
//         <div style={{
//           position: "absolute", top: -30, right: -30,
//           width: 120, height: 120, borderRadius: "50%",
//           background: `${cfg.color}0a`,
//           pointerEvents: "none",
//         }} />

//         {/* ── Top row: label + icon ── */}
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
//           <span style={{
//             fontSize: 11, fontWeight: 600, color: "#64748B",
//             textTransform: "uppercase", letterSpacing: "0.08em",
//             fontFamily: "'DM Mono',monospace",
//           }}>{cfg.label}</span>

//           <motion.div
//             whileHover={{ rotate: 10, scale: 1.1 }}
//             transition={{ type: "spring", stiffness: 400 }}
//             style={{
//               width: 38, height: 38, borderRadius: 10,
//               background: cfg.bg,
//               border: `1px solid ${cfg.border}`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             <Icon style={{ fontSize: 19, color: cfg.color }} />
//           </motion.div>
//         </div>

//         {/* ── Main value ── */}
//         <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 14 }}>
//           {isLoading ? (
//             <div style={{
//               height: 38, width: 80, borderRadius: 8,
//               background: "rgba(255,255,255,0.06)",
//               animation: "kpi-shimmer 1.4s ease-in-out infinite",
//             }} />
//           ) : (
//             <motion.span
//               key={displayVal}
//               initial={{ opacity: 0.6, y: 4 }}
//               animate={{ opacity: 1, y: 0 }}
//               style={{
//                 fontSize: "2.2rem", fontWeight: 800,
//                 color: cfg.color, lineHeight: 1,
//                 letterSpacing: "-0.04em",
//                 fontVariantNumeric: "tabular-nums",
//                 fontFamily: "'DM Sans',sans-serif",
//                 textShadow: `0 0 24px ${cfg.color}40`,
//               }}
//             >
//               {displayVal}
//             </motion.span>
//           )}
//           {unit && !isLoading && (
//             <span style={{ color: "#475569", fontSize: "1rem", fontFamily: "'DM Mono',monospace" }}>
//               {unit}
//             </span>
//           )}
//         </div>

//         {/* ── Progress bar ── */}
//         <div style={{ height: 4, borderRadius: 2, background: `${cfg.color}15`, marginBottom: 16, overflow: "hidden" }}>
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${Math.min(((value || 0) / (type === "sessions" ? 100 : type === "users" ? 60 : 100)) * 100, 100)}%` }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             style={{
//               height: "100%", borderRadius: 2,
//               background: `linear-gradient(90deg, ${cfg.color}60, ${cfg.color})`,
//             }}
//           />
//         </div>

//         {/* ── Bottom: trend pill + sparkline ── */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
//           <div>
//             {trend !== "flat" && trendPct ? (
//               <motion.div
//                 initial={{ scale: 0.9 }} animate={{ scale: 1 }}
//                 style={{
//                   display: "inline-flex", alignItems: "center", gap: 5,
//                   padding: "4px 10px", borderRadius: 20,
//                   background: trend === "up" ? "rgba(29,158,117,0.12)" : "rgba(226,75,74,0.12)",
//                   border: `1px solid ${trend === "up" ? "rgba(29,158,117,0.28)" : "rgba(226,75,74,0.28)"}`,
//                 }}
//               >
//                 <span style={{ fontSize: 10 }}>{trend === "up" ? "▲" : "▼"}</span>
//                 <span style={{
//                   color: trend === "up" ? "#1D9E75" : "#E24B4A",
//                   fontSize: 11, fontFamily: "'DM Mono',monospace", fontWeight: 700,
//                 }}>
//                   {trendPct}%
//                 </span>
//               </motion.div>
//             ) : (
//               <span style={{ fontSize: 11, color: "#334155", fontFamily: "'DM Mono',monospace" }}>
//                 — stable
//               </span>
//             )}
//           </div>

//           <Sparkline data={history.length ? history : [value || 0]} color={cfg.spark} />
//         </div>

//         <style>{`
//           @keyframes kpi-shimmer {
//             0%,100%{opacity:0.4} 50%{opacity:0.7}
//           }
//         `}</style>
//       </div>
//     </motion.div>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import { Box, Typography, Tooltip } from "@mui/material";
// import { PeopleAlt, TrendingUp, Undo, Speed } from "@mui/icons-material";
// import { motion } from "framer-motion";

// const CONFIG = {
//   sessions: { label: "Total Sessions",   color: "#00d4aa", bg: "rgba(0,212,170,0.08)",   border: "rgba(0,212,170,0.2)",   Icon: PeopleAlt, cls: "kpi-sessions", spark: "#00d4aa" },
//   cvr:      { label: "Conversion Rate",  color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.2)",  Icon: TrendingUp, cls: "kpi-cvr",     spark: "#3b82f6" },
//   bounce:   { label: "Bounce Rate",      color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)",  Icon: Undo,       cls: "kpi-bounce",  spark: "#f59e0b" },
//   users:    { label: "Active Users",     color: "#f43f5e", bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.2)",   Icon: Speed,      cls: "kpi-users",   spark: "#f43f5e" },
// };

// function useAnimatedNumber(target, duration = 800) {
//   const [display, setDisplay] = useState(target || 0);
//   const prevRef = useRef(target || 0);
//   const rafRef = useRef(null);
//   useEffect(() => {
//     if (target === undefined || target === null) return;
//     const start = prevRef.current || 0;
//     const end = parseFloat(target);
//     const startTime = performance.now();
//     cancelAnimationFrame(rafRef.current);
//     const tick = (now) => {
//       const progress = Math.min((now - startTime) / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setDisplay(start + (end - start) * eased);
//       if (progress < 1) rafRef.current = requestAnimationFrame(tick);
//       else prevRef.current = end;
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [target]);
//   return display;
// }

// // Mini sparkline using SVG
// function Sparkline({ data = [], color }) {
//   if (!data.length) return null;
//   const max = Math.max(...data, 1);
//   const min = Math.min(...data, 0);
//   const range = max - min || 1;
//   const w = 80, h = 28;
//   const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
//   return (
//     <svg width={w} height={h} style={{ overflow: "visible" }}>
//       <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} opacity={0.8} />
//       <polyline fill={`${color}20`} stroke="none"
//         points={`0,${h} ${pts} ${w},${h}`} />
//     </svg>
//   );
// }

// export default function KPICard({ value, unit = "", type = "sessions", prev, history = [] }) {
//   const cfg = CONFIG[type];
//   const { Icon } = cfg;
//   const animated = useAnimatedNumber(value);
//   const [popped, setPopped] = useState(false);
//   const isLoading = value === undefined || value === null;

//   useEffect(() => {
//     if (prev !== undefined && value !== undefined && value !== prev) {
//       setPopped(true);
//       const t = setTimeout(() => setPopped(false), 500);
//       return () => clearTimeout(t);
//     }
//   }, [value]);

//   const trend = prev !== undefined && value !== undefined
//     ? value > prev ? "up" : value < prev ? "down" : "flat" : "flat";
//   const trendPct = prev && prev !== 0 ? Math.abs(((value - prev) / prev) * 100).toFixed(1) : null;

//   return (
//     <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ height: "100%" }}>
//       <Box className={`glow-card ${cfg.cls}`} sx={{ p: 3, height: "100%", cursor: "default" }}>
//         {/* Top row */}
//         <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
//           <Box>
//             <Typography className="section-label">{cfg.label}</Typography>
//           </Box>
//           <Box sx={{
//             width: 42, height: 42, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
//             background: cfg.bg, border: `1px solid ${cfg.border}`,
//             transition: "all 0.3s", "&:hover": { transform: "rotate(10deg) scale(1.1)" }
//           }}>
//             <Icon sx={{ fontSize: 20, color: cfg.color }} />
//           </Box>
//         </Box>

//         {/* Value */}
//         <Box display="flex" alignItems="baseline" gap={0.5} mb={1.5}>
//           {isLoading ? <div className="shimmer" /> : (
//             <Typography className={`mono ${popped ? "number-pop" : ""}`}
//               sx={{ fontSize: "2.4rem", fontWeight: 800, color: cfg.color, lineHeight: 1, letterSpacing: "-1px" }}>
//               {unit === "%" ? animated.toFixed(1) : Math.round(animated).toLocaleString()}
//             </Typography>
//           )}
//           {unit && !isLoading && (
//             <Typography sx={{ color: "#64748b", fontSize: "1.1rem", fontFamily: "'JetBrains Mono',monospace" }}>{unit}</Typography>
//           )}
//         </Box>

//         {/* Progress bar */}
//         <Box sx={{ height: 4, borderRadius: 2, background: `${cfg.color}15`, mb: 2, overflow: "hidden" }}>
//           <Box className="funnel-bar" sx={{
//             height: "100%", borderRadius: 2,
//             width: `${Math.min(((value || 0) / (type === "sessions" ? 100 : type === "users" ? 60 : 100)) * 100, 100)}%`,
//             background: `linear-gradient(90deg, ${cfg.color}60, ${cfg.color})`,
//           }} />
//         </Box>

//         {/* Bottom row: trend + sparkline */}
//         <Box display="flex" alignItems="center" justifyContent="space-between">
//           <Box>
//             {trend !== "flat" && trendPct ? (
//               <Box sx={{
//                 display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.5, py: 0.5, borderRadius: "8px",
//                 background: trend === "up" ? "rgba(0,212,170,0.1)" : "rgba(244,63,94,0.1)",
//                 border: `1px solid ${trend === "up" ? "rgba(0,212,170,0.25)" : "rgba(244,63,94,0.25)"}`,
//               }}>
//                 <Typography sx={{ color: trend === "up" ? "#00d4aa" : "#f43f5e", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>
//                   {trend === "up" ? "▲" : "▼"} {trendPct}%
//                 </Typography>
//               </Box>
//             ) : (
//               <Typography sx={{ color: "#475569", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace" }}>— stable</Typography>
//             )}
//           </Box>
//           <Sparkline data={history.length ? history : [value || 0]} color={cfg.spark} />
//         </Box>
//       </Box>
//     </motion.div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { PeopleAlt, TrendingUp, Undo, Speed } from "@mui/icons-material";
import { motion } from "framer-motion";

const CONFIG = {
  sessions: { label: "TOTAL SESSIONS", color: "#00d4aa", Icon: PeopleAlt },
  cvr:      { label: "CONVERSION RATE", color: "#3b82f6", Icon: TrendingUp },
  bounce:   { label: "BOUNCE RATE",     color: "#f59e0b", Icon: Undo },
  users:    { label: "ACTIVE USERS",    color: "#f43f5e", Icon: Speed },
};

function useAnimatedNumber(target, duration = 800) {
  const [display, setDisplay] = useState(target || 0);
  const prevRef = useRef(target || 0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target === undefined || target === null) return;
    const start = prevRef.current || 0;
    const end = parseFloat(target);
    const startTime = performance.now();
    cancelAnimationFrame(rafRef.current);

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (end - start) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else prevRef.current = end;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return display;
}

function MiniSparkline({ data = [], color }) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const w = 100, h = 30;
  const pts = data.map((v, i) => 
    `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`
  ).join(" ");

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ overflow: "visible", filter: `drop-shadow(0 2px 4px ${color}30)` }}>
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill={`url(#grad-${color})`} stroke="none" points={`0,${h} ${pts} ${w},${h}`} />
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
}

export default function KPICard({ value, unit = "", type = "sessions", prev, history = [] }) {
  const cfg = CONFIG[type];
  const { Icon } = cfg;
  const animated = useAnimatedNumber(value);
  const isLoading = value === undefined || value === null;

  const trend = prev !== undefined && value !== undefined
    ? value > prev ? "up" : value < prev ? "down" : "flat" : "flat";
  const trendPct = prev && prev !== 0 ? Math.abs(((value - prev) / prev) * 100).toFixed(1) : null;

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      style={{ height: "100%" }}
    >
      <Box sx={{
        p: 2.5,
        height: "100%",
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s ease",
        "&:hover": { borderColor: `${cfg.color}40` }
      }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography sx={{ 
            fontSize: "0.65rem", 
            fontWeight: 800, 
            color: "#94a3b8", 
            letterSpacing: "0.1em",
            fontFamily: "'Inter', sans-serif" 
          }}>
            {cfg.label}
          </Typography>
          <Box sx={{ 
            p: 1, 
            borderRadius: "10px", 
            background: `${cfg.color}15`, 
            color: cfg.color,
            display: "flex" 
          }}>
            <Icon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        {/* Value Area */}
        <Box sx={{ my: 1 }}>
          <Box display="flex" alignItems="baseline" gap={0.5}>
            <Typography sx={{ 
              fontSize: "2rem", 
              fontWeight: 800, 
              color: "#f8fafc", 
              fontFamily: "'JetBrains Mono', monospace",
              lineHeight: 1
            }}>
              {unit === "%" ? animated.toFixed(1) : Math.round(animated).toLocaleString()}
              <span style={{ fontSize: "1rem", color: "#64748b", marginLeft: "2px" }}>{unit}</span>
            </Typography>
          </Box>

          {/* Trend Tag */}
          <Box mt={1}>
            {trend !== "flat" ? (
              <Typography sx={{ 
                fontSize: "0.7rem", 
                fontWeight: 700, 
                color: trend === "up" ? "#00d4aa" : "#f43f5e",
                fontFamily: "'JetBrains Mono', monospace",
                display: "flex",
                alignItems: "center",
                gap: 0.5
              }}>
                {trend === "up" ? "↑" : "↓"} {trendPct}%
                <span style={{ color: "#475569", fontWeight: 400 }}>vs prev</span>
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "0.7rem", color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>
                STABLE
              </Typography>
            )}
          </Box>
        </Box>

        {/* Footer Sparkline */}
        <Box sx={{ mt: 2, mx: -2.5, mb: -2.5, height: 40, opacity: 0.6 }}>
          <MiniSparkline data={history.length ? history : [value, value, value]} color={cfg.color} />
        </Box>
      </Box>
    </motion.div>
  );
}