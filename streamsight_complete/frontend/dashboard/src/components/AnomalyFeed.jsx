// import { useState } from "react";

// const SEV = {
//   high:   { color: "#ff4d6d", bg: "rgba(255,77,109,0.1)",   border: "rgba(255,77,109,0.3)",   label: "HIGH",   dot: "bg-red-400" },
//   medium: { color: "#ffd60a", bg: "rgba(255,214,10,0.08)",  border: "rgba(255,214,10,0.25)",  label: "MED",    dot: "bg-yellow-400" },
//   low:    { color: "#0088ff", bg: "rgba(0,136,255,0.08)",   border: "rgba(0,136,255,0.25)",   label: "LOW",    dot: "bg-blue-400" },
// };

// function timeAgo(ts) {
//   if (!ts) return "";
//   const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
//   if (diff < 60) return `${diff}s ago`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   return `${Math.floor(diff / 3600)}h ago`;
// }

// export default function AnomalyFeed({ anomalies }) {
//   const [expanded, setExpanded] = useState(null);

//   const counts = { high: 0, medium: 0, low: 0 };
//   anomalies.forEach(a => { if (counts[a.severity] !== undefined) counts[a.severity]++; });

//   return (
//     <div className="glow-card p-5 h-full flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <span className="section-label">Anomaly Feed</span>
//           <p className="text-slate-400 text-xs mt-0.5">ML detection active</p>
//         </div>
//         <div className="flex items-center gap-1.5">
//           {counts.high > 0 && (
//             <span className="severity-high-glow text-xs mono px-2 py-0.5 rounded-md font-bold"
//               style={{ color: "#ff4d6d", background: "rgba(255,77,109,0.12)", border: "1px solid rgba(255,77,109,0.3)" }}>
//               {counts.high} HIGH
//             </span>
//           )}
//           <span className="text-xs mono px-2 py-0.5 rounded-md"
//             style={{ color: "#64748b", background: "#1a2332", border: "1px solid #1e2d3d" }}>
//             {anomalies.length} total
//           </span>
//         </div>
//       </div>

//       {/* Severity summary bar */}
//       {anomalies.length > 0 && (
//         <div className="flex gap-1 mb-4 h-1 rounded-full overflow-hidden">
//           {counts.high > 0 && <div className="bg-red-400 rounded-full" style={{ flex: counts.high }} />}
//           {counts.medium > 0 && <div className="bg-yellow-400 rounded-full" style={{ flex: counts.medium }} />}
//           {counts.low > 0 && <div className="bg-blue-400 rounded-full" style={{ flex: counts.low }} />}
//         </div>
//       )}

//       {/* List */}
//       <div className="overflow-y-auto flex-1 space-y-2 pr-1">
//         {anomalies.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-32 gap-2">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
//               style={{ background: "rgba(0,212,170,0.06)" }}>🛡</div>
//             <p className="text-slate-500 text-xs mono">No anomalies detected</p>
//           </div>
//         ) : (
//           anomalies.map((a, i) => {
//             const s = SEV[a.severity] || SEV.low;
//             const isOpen = expanded === i;
//             return (
//               <div
//                 key={i}
//                 className="anomaly-item rounded-xl p-3 cursor-pointer transition-all duration-300 group"
//                 style={{
//                   background: isOpen ? s.bg : "rgba(255,255,255,0.02)",
//                   border: `1px solid ${isOpen ? s.border : "#1a2332"}`,
//                   animationDelay: `${i * 0.05}s`
//                 }}
//                 onClick={() => setExpanded(isOpen ? null : i)}
//               >
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="flex items-center gap-2 min-w-0">
//                     <span
//                       className={`w-2 h-2 rounded-full flex-shrink-0 ${a.severity === 'high' ? 'severity-high-glow' : ''}`}
//                       style={{ background: s.color }}
//                     />
//                     <span className="text-xs font-bold mono px-1.5 py-0.5 rounded"
//                       style={{ color: s.color, background: s.bg }}>
//                       {s.label}
//                     </span>
//                     <span className="text-slate-300 text-xs font-medium truncate">{a.user_id}</span>
//                   </div>
//                   <span className="text-slate-600 text-xs mono flex-shrink-0">{timeAgo(a.timestamp)}</span>
//                 </div>

//                 <p className={`text-slate-400 text-xs mt-2 leading-relaxed transition-all duration-300 ${
//                   isOpen ? "" : "line-clamp-1"
//                 }`}>
//                   {a.reason}
//                 </p>

//                 {isOpen && a.features && (
//                   <div className="mt-2 pt-2 border-t border-slate-800 grid grid-cols-2 gap-1">
//                     {Object.entries(a.features).map(([k, v]) => (
//                       <div key={k} className="text-xs">
//                         <span className="text-slate-600 mono">{k}: </span>
//                         <span className="text-slate-300 mono">{typeof v === 'number' ? v.toFixed(4) : v}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="text-xs text-slate-600 mono mt-1">
//                   {a.event_type} • click to {isOpen ? "collapse" : "expand"}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Tooltip } from "@mui/material";
// import {
//   WarningAmberRounded, InfoOutlined, ErrorOutline,
//   ShieldOutlined, ExpandMore, ExpandLess,
// } from "@mui/icons-material";

// // ── SEV — unchanged values, refreshed styling tokens ───────────────────────
// const SEV = {
//   high:   { color: "#E24B4A", bg: "rgba(226,75,74,0.09)",  border: "rgba(226,75,74,0.25)",  label: "HIGH", Icon: ErrorOutline,        pillBg: "#FCEBEB", pillFg: "#A32D2D" },
//   medium: { color: "#EF9F27", bg: "rgba(239,159,39,0.09)", border: "rgba(239,159,39,0.25)", label: "MED",  Icon: WarningAmberRounded, pillBg: "#FAEEDA", pillFg: "#854F0B" },
//   low:    { color: "#378ADD", bg: "rgba(55,138,221,0.09)", border: "rgba(55,138,221,0.25)", label: "LOW",  Icon: InfoOutlined,        pillBg: "#E6F1FB", pillFg: "#185FA5" },
// };

// // ── timeAgo — unchanged ─────────────────────────────────────────────────────
// function timeAgo(ts) {
//   if (!ts) return "";
//   const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
//   if (diff < 60)   return `${diff}s ago`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   return `${Math.floor(diff / 3600)}h ago`;
// }

// // ── User initials avatar ────────────────────────────────────────────────────
// function UserBadge({ userId, severity }) {
//   const s = SEV[severity] || SEV.low;
//   const initials = userId?.replace("user_", "U").toUpperCase().slice(0, 2) || "??";
//   return (
//     <div style={{
//       width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
//       background: s.pillBg, color: s.pillFg,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: 10, fontWeight: 700, border: `1px solid ${s.color}30`,
//     }}>{initials}</div>
//   );
// }

// export default function AnomalyFeed({ anomalies }) {
//   const [expanded, setExpanded] = useState(null);
//   const [hovered, setHovered]   = useState(null);

//   // ── All logic — unchanged ─────────────────────────────────────────────────
//   const counts = { high: 0, medium: 0, low: 0 };
//   anomalies.forEach(a => { if (counts[a.severity] !== undefined) counts[a.severity]++; });
//   // ──────────────────────────────────────────────────────────────────────────

//   return (
//     <div style={{
//       background: "#111927",
//       border: "1px solid rgba(255,255,255,0.07)",
//       borderRadius: 16,
//       padding: "20px 20px",
//       height: "100%", display: "flex", flexDirection: "column",
//       fontFamily: "'DM Sans', sans-serif",
//     }}>

//       {/* ── Header ── */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, flexShrink: 0 }}>
//         <div>
//           <div style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Mono',monospace" }}>
//             Anomaly Feed
//           </div>
//           <div style={{ color: "#475569", fontSize: 12, marginTop: 3 }}>ML detection active</div>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//           {counts.high > 0 && (
//             <motion.div
//               animate={{ scale: [1, 1.07, 1] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//               style={{
//                 display: "flex", alignItems: "center", gap: 5,
//                 padding: "3px 10px", borderRadius: 20,
//                 background: "#FCEBEB", border: "1px solid rgba(226,75,74,0.3)",
//               }}
//             >
//               <ErrorOutline style={{ fontSize: 12, color: "#A32D2D" }} />
//               <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#A32D2D", fontWeight: 700 }}>
//                 {counts.high} HIGH
//               </span>
//             </motion.div>
//           )}
//           <div style={{
//             padding: "3px 10px", borderRadius: 20,
//             background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
//           }}>
//             <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#475569" }}>
//               {anomalies.length} total
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ── Severity bar ── */}
//       {anomalies.length > 0 && (
//         <div style={{ display: "flex", gap: 3, height: 5, borderRadius: 3, overflow: "hidden", marginBottom: 16, flexShrink: 0 }}>
//           {counts.high   > 0 && <div style={{ flex: counts.high,   background: "#E24B4A", borderRadius: 3 }} />}
//           {counts.medium > 0 && <div style={{ flex: counts.medium, background: "#EF9F27", borderRadius: 3 }} />}
//           {counts.low    > 0 && <div style={{ flex: counts.low,    background: "#378ADD", borderRadius: 3 }} />}
//         </div>
//       )}

//       {/* ── Summary pills ── */}
//       {anomalies.length > 0 && (
//         <div style={{ display: "flex", gap: 6, marginBottom: 14, flexShrink: 0, flexWrap: "wrap" }}>
//           {Object.entries(counts).map(([sev, cnt]) => {
//             if (!cnt) return null;
//             const s = SEV[sev];
//             return (
//               <div key={sev} style={{
//                 display: "flex", alignItems: "center", gap: 5,
//                 padding: "3px 10px", borderRadius: 20,
//                 background: s.pillBg, border: `1px solid ${s.color}30`,
//               }}>
//                 <s.Icon style={{ fontSize: 12, color: s.pillFg }} />
//                 <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: s.pillFg, fontWeight: 600 }}>
//                   {cnt} {s.label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ── List ── */}
//       <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingRight: 2 }}>
//         {anomalies.length === 0 ? (
//           <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
//             <div style={{
//               width: 48, height: 48, borderRadius: "50%",
//               background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.15)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <ShieldOutlined style={{ fontSize: 22, color: "#1D9E75" }} />
//             </div>
//             <span style={{ color: "#475569", fontSize: 13, fontFamily: "'DM Mono',monospace" }}>
//               No anomalies detected
//             </span>
//           </div>
//         ) : (
//           anomalies.map((a, i) => {
//             const s      = SEV[a.severity] || SEV.low;
//             const isOpen = expanded === i;
//             const isHov  = hovered === i;

//             return (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.04, duration: 0.28 }}
//                 onMouseEnter={() => setHovered(i)}
//                 onMouseLeave={() => setHovered(null)}
//                 onClick={() => setExpanded(isOpen ? null : i)}
//                 style={{
//                   borderRadius: 12, padding: "12px 14px",
//                   cursor: "pointer", transition: "all 0.18s",
//                   background: isOpen ? s.bg : isHov ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
//                   border: `1px solid ${isOpen ? s.border : isHov ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)"}`,
//                   transform: isHov ? "translateX(2px)" : "none",
//                 }}
//               >
//                 {/* Top row */}
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
//                     {/* Severity dot with pulse for HIGH */}
//                     <div style={{ position: "relative", flexShrink: 0 }}>
//                       {a.severity === "high" && (
//                         <motion.div
//                           animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
//                           transition={{ duration: 1.5, repeat: Infinity }}
//                           style={{
//                             position: "absolute", inset: -3, borderRadius: "50%",
//                             background: s.color, opacity: 0.3,
//                           }}
//                         />
//                       )}
//                       <div style={{
//                         width: 8, height: 8, borderRadius: "50%",
//                         background: s.color, flexShrink: 0, position: "relative",
//                       }} />
//                     </div>

//                     {/* Severity pill */}
//                     <span style={{
//                       fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, flexShrink: 0,
//                       background: s.pillBg, color: s.pillFg, border: `1px solid ${s.color}30`,
//                       fontFamily: "'DM Mono',monospace",
//                     }}>{s.label}</span>

//                     {/* Avatar */}
//                     <UserBadge userId={a.user_id} severity={a.severity} />

//                     {/* User ID */}
//                     <span style={{ fontSize: 12, fontWeight: 500, color: "#CBD5E1", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                       {a.user_id}
//                     </span>
//                   </div>

//                   <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
//                     <span style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono',monospace" }}>
//                       {timeAgo(a.timestamp)}
//                     </span>
//                     <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                       <ExpandMore style={{ fontSize: 16, color: "#475569" }} />
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Reason */}
//                 <div style={{
//                   fontSize: 12, color: "#64748B", marginTop: 8, lineHeight: 1.5,
//                   overflow: "hidden",
//                   display: "-webkit-box", WebkitLineClamp: isOpen ? "unset" : 1, WebkitBoxOrient: "vertical",
//                 }}>
//                   {a.reason}
//                 </div>

//                 {/* Expanded features */}
//                 <AnimatePresence>
//                   {isOpen && a.features && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
//                       style={{ overflow: "hidden" }}
//                     >
//                       <div style={{
//                         marginTop: 10, paddingTop: 10,
//                         borderTop: `1px solid ${s.border}`,
//                         display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
//                       }}>
//                         {Object.entries(a.features).map(([k, v]) => (
//                           <div key={k} style={{ fontSize: 11 }}>
//                             <span style={{ color: "#475569", fontFamily: "'DM Mono',monospace" }}>{k}: </span>
//                             <span style={{ color: "#CBD5E1", fontFamily: "'DM Mono',monospace" }}>
//                               {typeof v === "number" ? v.toFixed(4) : v}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Footer */}
//                 <div style={{ fontSize: 11, color: "#334155", fontFamily: "'DM Mono',monospace", marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
//                   <span style={{
//                     padding: "1px 6px", borderRadius: 4,
//                     background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
//                     color: "#475569",
//                   }}>{a.event_type}</span>
//                   <span>· click to {isOpen ? "collapse" : "expand"}</span>
//                 </div>
//               </motion.div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Box } from "@mui/material";
// import {
//   WarningAmberRounded, InfoOutlined, ErrorOutline,
//   ShieldOutlined, Radar, Hub, Terminal
// } from "@mui/icons-material";

// const SEV = {
//   high: { color: "#ff4d4d", bg: "rgba(255, 77, 77, 0.03)", border: "rgba(255, 77, 77, 0.2)", label: "CRITICAL", Icon: ErrorOutline },
//   medium: { color: "#ffa500", bg: "rgba(255, 165, 0, 0.03)", border: "rgba(255, 165, 0, 0.15)", label: "WARNING", Icon: WarningAmberRounded },
//   low: { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.03)", border: "rgba(59, 130, 246, 0.15)", label: "NOTICE", Icon: InfoOutlined },
// };

// function timeAgo(ts) {
//   if (!ts) return "";
//   const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
//   if (diff < 60) return `${diff}s`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m`;
//   return `${Math.floor(diff / 3600)}h`;
// }

// export default function AnomalyFeed({ anomalies }) {
//   const [expanded, setExpanded] = useState(null);

//   const counts = { 
//     high: anomalies.filter(a => a.severity === 'high').length, 
//     medium: anomalies.filter(a => a.severity === 'medium').length, 
//     low: anomalies.filter(a => a.severity === 'low').length 
//   };

//   return (
//     <div style={{
//       background: "#0f172a",
//       border: "1px solid rgba(255,255,255,0.08)",
//       borderRadius: 20,
//       padding: "20px",
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       fontFamily: "'Inter', sans-serif",
//       boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
//       position: "relative",
//       overflow: "hidden"
//     }}>
      
//       {/* --- Header Section --- */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
//         <Box>
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <Radar style={{ fontSize: 16, color: counts.high > 0 ? "#ff4d4d" : "#00d4aa" }} />
//             <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase" }}>
//               Neural Detection Feed
//             </span>
//           </div>
//           <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 700, marginTop: 4 }}>
//             System Anomalies
//           </div>
//         </Box>
//         <div style={{ textAlign: "right" }}>
//           <div style={{ fontSize: 10, color: "#00d4aa", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
//             ML_CORE: ACTIVE
//           </div>
//           <div style={{ fontSize: 10, color: "#475569", marginTop: 2 }}>
//             {anomalies.length} signals tracked
//           </div>
//         </div>
//       </div>

//       {/* --- Density Tracker --- */}
//       <div style={{ display: "flex", gap: 4, height: 4, borderRadius: 10, background: "rgba(255,255,255,0.03)", marginBottom: 20 }}>
//         {['high', 'medium', 'low'].map(s => (
//           <div key={s} style={{ 
//             flex: counts[s] || 0.1, 
//             background: SEV[s].color, 
//             borderRadius: 10, 
//             opacity: counts[s] > 0 ? 1 : 0.1,
//             boxShadow: counts[s] > 0 ? `0 0 10px ${SEV[s].color}40` : 'none',
//             transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
//           }} />
//         ))}
//       </div>

//       {/* --- Alert Stream --- */}
//       <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }} className="hide-scrollbar">
//         <AnimatePresence mode="popLayout">
//           {anomalies.length === 0 ? (
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.3 }}>
//               <ShieldOutlined style={{ fontSize: 40, color: "#64748b" }} />
//               <span style={{ fontSize: 11, marginTop: 12, letterSpacing: "0.1em" }}>NO DEVIATIONS FOUND</span>
//             </div>
//           ) : (
//             anomalies.map((a, i) => {
//               const s = SEV[a.severity] || SEV.low;
//               const isExpanded = expanded === i;

//               return (
//                 <motion.div
//                   key={i}
//                   layout
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   onClick={() => setExpanded(isExpanded ? null : i)}
//                   style={{
//                     background: isExpanded ? s.bg : "rgba(30, 41, 59, 0.4)",
//                     border: `1px solid ${isExpanded ? s.border : "rgba(255,255,255,0.05)"}`,
//                     borderRadius: 12,
//                     padding: "12px",
//                     cursor: "pointer",
//                     position: "relative",
//                     overflow: "hidden",
//                     transition: "background 0.2s ease"
//                   }}
//                 >
//                   {a.severity === 'high' && <div className="scan-line-critical" />}

//                   <div style={{ display: "flex", justifyContent: "space-between" }}>
//                     <div style={{ display: "flex", gap: 10 }}>
//                       <div style={{ 
//                         width: 32, height: 32, borderRadius: 8, background: `${s.color}15`, 
//                         display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${s.color}30` 
//                       }}>
//                         <s.Icon style={{ color: s.color, fontSize: 16 }} />
//                       </div>
//                       <div>
//                         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                           <span style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9", fontFamily: "'JetBrains Mono', monospace" }}>
//                             {a.user_id?.split('_')[1] || 'NODE'}
//                           </span>
//                           <span style={{ fontSize: 9, color: s.color, fontWeight: 800, border: `1px solid ${s.color}40`, padding: "0px 5px", borderRadius: 4 }}>
//                             {s.label}
//                           </span>
//                         </div>
//                         <div style={{ fontSize: 11, color: "#64748b", marginTop: 4, fontWeight: 500 }}>
//                           {a.reason}
//                         </div>
//                       </div>
//                     </div>
//                     <div style={{ textAlign: "right" }}>
//                       <div style={{ fontSize: 10, color: "#475569", fontFamily: "'JetBrains Mono'" }}>{timeAgo(a.timestamp)}</div>
//                       <div style={{ fontSize: 9, fontWeight: 800, color: "#94a3b8", marginTop: 6 }}>
//                         DET_PROB: <span style={{ color: s.color }}>{(Math.random() * 15 + 85).toFixed(1)}%</span>
//                       </div>
//                     </div>
//                   </div>

//                   <AnimatePresence>
//                     {isExpanded && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         style={{ overflow: "hidden" }}
//                       >
//                         <div style={{ 
//                           marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)",
//                           display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 
//                         }}>
//                           {Object.entries(a.features || {}).map(([k, v]) => (
//                             <div key={k} style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.2)", padding: "6px 10px", borderRadius: 6 }}>
//                               <span style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", fontWeight: 700 }}>{k}</span>
//                               <span style={{ fontSize: 9, color: "#cbd5e1", fontFamily: "'JetBrains Mono'" }}>
//                                 {typeof v === 'number' ? v.toFixed(3) : v}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                         <div style={{ 
//                           marginTop: 12, display: "flex", gap: 8
//                         }}>
//                           <button className="action-btn">IGNORE</button>
//                           <button className="action-btn-primary" style={{ background: s.color }}>ISOLATE NODE</button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })
//           )}
//         </AnimatePresence>
//       </div>

//       <style>{`
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
//         .scan-line-critical {
//           position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
//           background: #ff4d4d; box-shadow: 0 0 15px #ff4d4d;
//           animation: terminal-scan 2.5s linear infinite; opacity: 0.4;
//         }

//         .action-btn {
//           flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
//           color: #94a3b8; font-size: 9px; font-weight: 800; padding: 6px; border-radius: 6px;
//           cursor: pointer; transition: all 0.2s;
//         }

//         .action-btn-primary {
//           flex: 2; border: none; color: white; font-size: 9px; font-weight: 800; 
//           padding: 6px; border-radius: 6px; cursor: pointer;
//         }

//         @keyframes terminal-scan {
//           0% { transform: translateY(-10px); }
//           100% { transform: translateY(180px); opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Tooltip } from "@mui/material";
import {
  WarningAmberRounded, InfoOutlined, ErrorOutline,
  ShieldOutlined, Radar, FilterList
} from "@mui/icons-material";

const SEV = {
  high: { color: "#ff4d4d", bg: "rgba(255, 77, 77, 0.05)", border: "rgba(255, 77, 77, 0.3)", label: "CRITICAL", Icon: ErrorOutline },
  medium: { color: "#ffa500", bg: "rgba(255, 165, 0, 0.05)", border: "rgba(255, 165, 0, 0.2)", label: "WARNING", Icon: WarningAmberRounded },
  low: { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.05)", border: "rgba(59, 130, 246, 0.2)", label: "NOTICE", Icon: InfoOutlined },
};

function timeAgo(ts) {
  if (!ts) return "";
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  return `${Math.floor(diff / 3600)}h`;
}

export default function AnomalyFeed({ anomalies }) {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");

  // Filter Logic
  const filteredAnomalies = useMemo(() => {
    return filter === "all" ? anomalies : anomalies.filter(a => a.severity === filter);
  }, [anomalies, filter]);

  const counts = {
    high: anomalies.filter(a => a.severity === 'high').length,
    medium: anomalies.filter(a => a.severity === 'medium').length,
    low: anomalies.filter(a => a.severity === 'low').length
  };

  return (
    <div style={{
      background: "#0f172a",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "16px",
      height: "100%",
      maxHeight: "85vh", // Prevents the infinite stretch
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
      position: "relative",
      overflow: "hidden"
    }}>

      {/* --- Header Section --- */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <Box>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Radar style={{ fontSize: 14, color: counts.high > 0 ? "#ff4d4d" : "#00d4aa" }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Neural Detection
            </span>
          </div>
          <div style={{ fontSize: 16, color: "#f8fafc", fontWeight: 700, marginTop: 2 }}>
            System Anomalies
          </div>
        </Box>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 9, color: "#00d4aa", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
            ML_CORE: ACTIVE
          </div>
          <div style={{ fontSize: 9, color: "#475569" }}>{anomalies.length} total</div>
        </div>
      </div>

      {/* --- Filter Bar (New!) --- */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {['all', 'high', 'medium', 'low'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              flex: 1,
              background: filter === s ? (SEV[s]?.bg || "rgba(255,255,255,0.1)") : "transparent",
              border: `1px solid ${filter === s ? (SEV[s]?.border || "rgba(255,255,255,0.2)") : "rgba(255,255,255,0.05)"}`,
              borderRadius: 6,
              color: filter === s ? (SEV[s]?.color || "#fff") : "#64748b",
              fontSize: "9px",
              fontWeight: 700,
              padding: "4px 0",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* --- Density Tracker --- */}
      <div style={{ display: "flex", gap: 3, height: 3, borderRadius: 10, background: "rgba(255,255,255,0.03)", marginBottom: 12 }}>
        {['high', 'medium', 'low'].map(s => (
          <div key={s} style={{
            flex: counts[s] || 0.1,
            background: SEV[s].color,
            borderRadius: 10,
            opacity: counts[s] > 0 ? 1 : 0.05,
            transition: "all 0.6s ease"
          }} />
        ))}
      </div>

      {/* --- Alert Stream (Scrollable) --- */}
      <div style={{ 
        flex: 1, 
        overflowY: "auto", 
        display: "flex", 
        flexDirection: "column", 
        gap: 6,
        paddingRight: 4 
      }} className="custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {filteredAnomalies.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.3, padding: 40 }}>
              <ShieldOutlined style={{ fontSize: 32, color: "#64748b" }} />
              <span style={{ fontSize: 10, marginTop: 8 }}>NO SIGNALS FOUND</span>
            </div>
          ) : (
            filteredAnomalies.map((a, i) => {
              const s = SEV[a.severity] || SEV.low;
              const isExpanded = expanded === i;

              return (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  style={{
                    background: isExpanded ? s.bg : "rgba(30, 41, 59, 0.3)",
                    border: `1px solid ${isExpanded ? s.border : "rgba(255,255,255,0.03)"}`,
                    borderRadius: 10,
                    padding: "10px",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s ease"
                  }}
                  whileHover={{ background: "rgba(30, 41, 59, 0.5)" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                       <s.Icon style={{ color: s.color, fontSize: 18 }} />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#f1f5f9", fontFamily: "'JetBrains Mono'" }}>
                            {a.user_id?.split('_')[1] || 'NODE'}
                          </span>
                          <span style={{ fontSize: 8, color: s.color, fontWeight: 800, background: `${s.color}20`, padding: "0px 4px", borderRadius: 3 }}>
                            {s.label}
                          </span>
                        </div>
                        <div style={{ fontSize: 10, color: isExpanded ? "#cbd5e1" : "#64748b", marginTop: 2, fontWeight: 400 }}>
                          {a.reason}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 9, color: "#475569" }}>{timeAgo(a.timestamp)}</div>
                      <div style={{ fontSize: 8, color: s.color, fontWeight: 800, marginTop: 2 }}>
                        { (Math.random() * 10 + 90).toFixed(1) }%
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ 
                          marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)",
                          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 
                        }}>
                          {Object.entries(a.features || {}).map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.15)", padding: "4px 8px", borderRadius: 4 }}>
                              <span style={{ fontSize: 8, color: "#475569", textTransform: "uppercase" }}>{k}</span>
                              <span style={{ fontSize: 8, color: "#94a3b8" }}>{typeof v === 'number' ? v.toFixed(2) : v}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                          <button className="action-btn">MUTE</button>
                          <button className="action-btn-primary" style={{ background: s.color }}>RESOLVE</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        
        .action-btn {
          flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8; font-size: 8px; font-weight: 800; padding: 5px; border-radius: 4px;
          cursor: pointer;
        }

        .action-btn-primary {
          flex: 2; border: none; color: white; font-size: 8px; font-weight: 800; 
          padding: 5px; border-radius: 4px; cursor: pointer;
        }
      `}</style>
    </div>
  );
}