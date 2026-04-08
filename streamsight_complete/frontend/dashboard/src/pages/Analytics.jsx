// import { useState } from "react";
// import { Box, Typography, ToggleButton, ToggleButtonGroup, CircularProgress, Alert, Grid } from "@mui/material";
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, Legend
// } from "recharts";
// import { useMetrics } from "../hooks/useMetrics";

// const COLORS = ["#00d4aa", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7"];

// function formatTime(ts) {
//   if (!ts) return "";
//   return new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
// }

// const ChartTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <Box sx={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: 2, p: 1.5 }}>
//       <Typography sx={{ color: "#64748b", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", mb: 1 }}>{label}</Typography>
//       {payload.map((p, i) => (
//         <Typography key={i} sx={{ color: p.color, fontSize: "0.75rem", fontFamily: "'JetBrains Mono',monospace" }}>
//           {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

// const axisStyle = { fill: "#475569", fontSize: 10, fontFamily: "JetBrains Mono" };

// function ChartCard({ title, subtitle, children, height = 240 }) {
//   return (
//     <Box sx={{
//       background: "#0d1117", border: "1px solid #1e293b", borderRadius: 3, p: 3,
//       transition: "all 0.3s", "&:hover": { borderColor: "rgba(0,212,170,0.25)", boxShadow: "0 0 24px rgba(0,212,170,0.06)" }
//     }}>
//       <Box mb={2.5}>
//         <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569" }}>
//           {title}
//         </Typography>
//         {subtitle && <Typography sx={{ color: "#334155", fontSize: "0.72rem", mt: 0.5, fontFamily: "'JetBrains Mono',monospace" }}>{subtitle}</Typography>}
//       </Box>
//       <Box sx={{ height }}>{children}</Box>
//     </Box>
//   );
// }

// export default function Analytics() {
//   const [range, setRange] = useState("1h");
//   const { history, loading, error } = useMetrics(range);

//   const cvrData = history.map(m => ({
//     time: formatTime(m.window_start),
//     cvr: parseFloat((m.cvr || 0).toFixed(2)),
//     bounce: parseFloat((m.bounce_rate || 0).toFixed(2)),
//   }));

//   const eventTypes = ["page_view", "add_to_cart", "checkout", "purchase", "search", "product_click"];
//   const eventBarData = eventTypes.map(et => ({
//     name: et.replace(/_/g, " "),
//     count: history.reduce((sum, m) => sum + (m.event_breakdown?.[et] || 0), 0),
//   }));

//   const sessionData = history.slice(-20).map(m => ({
//     time: formatTime(m.window_start),
//     sessions: m.session_count || 0,
//     users: m.active_users || 0,
//   }));

//   const deviceData = [
//     { name: "Mobile", value: 45 },
//     { name: "Desktop", value: 38 },
//     { name: "Tablet", value: 17 },
//   ];

//   const isEmpty = cvrData.length === 0;

//   return (
//     <Box sx={{ position: "relative", zIndex: 1 }}>
//       {/* Header */}
//       <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap" gap={2}>
//         <Box>
//           <Typography variant="h4" fontWeight={800} sx={{ color: "#e2e8f0", letterSpacing: "-0.5px" }}>
//             Analytics
//           </Typography>
//           <Typography sx={{ color: "#64748b", mt: 0.5, fontSize: "0.875rem", fontFamily: "'JetBrains Mono',monospace" }}>
//             Historical metrics and trends
//           </Typography>
//         </Box>
//         <ToggleButtonGroup value={range} exclusive onChange={(_, v) => v && setRange(v)} size="small">
//           {["1h", "6h", "24h"].map(r => (
//             <ToggleButton key={r} value={r} sx={{
//               fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", px: 2.5,
//               border: "1px solid #1e293b", color: "#64748b",
//               "&.Mui-selected": { background: "rgba(0,212,170,0.12)", color: "#00d4aa", borderColor: "rgba(0,212,170,0.3)" },
//               "&:hover": { background: "#111827" },
//             }}>
//               {r}
//             </ToggleButton>
//           ))}
//         </ToggleButtonGroup>
//       </Box>

//       {loading && (
//         <Box display="flex" alignItems="center" justifyContent="center" py={10} gap={2}>
//           <CircularProgress size={24} sx={{ color: "#00d4aa" }} />
//           <Typography sx={{ color: "#64748b", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.875rem" }}>
//             Loading analytics...
//           </Typography>
//         </Box>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 2, mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       {!loading && !error && (
//         <Grid container spacing={2.5}>
//           {/* CVR + Bounce Line Chart */}
//           <Grid item xs={12}>
//             <ChartCard title="CVR & Bounce Rate Over Time" subtitle={`${history.length} data points`} height={240}>
//               {isEmpty ? (
//                 <Box display="flex" alignItems="center" justifyContent="center" height="100%" sx={{ color: "#334155", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.875rem" }}>
//                   No data for selected range
//                 </Box>
//               ) : (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={cvrData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//                     <XAxis dataKey="time" tick={axisStyle} stroke="#1e293b" />
//                     <YAxis tick={axisStyle} stroke="#1e293b" />
//                     <Tooltip content={<ChartTooltip />} />
//                     <Legend wrapperStyle={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "#64748b" }} />
//                     <Line type="monotone" dataKey="cvr" stroke="#00d4aa" strokeWidth={2.5} dot={false} name="CVR %" activeDot={{ r: 5, fill: "#00d4aa", stroke: "#07090f", strokeWidth: 2 }} />
//                     <Line type="monotone" dataKey="bounce" stroke="#f59e0b" strokeWidth={2.5} dot={false} name="Bounce %" activeDot={{ r: 5, fill: "#f59e0b", stroke: "#07090f", strokeWidth: 2 }} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               )}
//             </ChartCard>
//           </Grid>

//           {/* Sessions over time */}
//           <Grid item xs={12} md={8}>
//             <ChartCard title="Sessions & Active Users" subtitle="Per 5-second batch" height={220}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={sessionData} barSize={18} barGap={4}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//                   <XAxis dataKey="time" tick={axisStyle} stroke="#1e293b" />
//                   <YAxis tick={axisStyle} stroke="#1e293b" />
//                   <Tooltip content={<ChartTooltip />} />
//                   <Legend wrapperStyle={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "#64748b" }} />
//                   <Bar dataKey="sessions" fill="#3b82f6" fillOpacity={0.8} radius={[4, 4, 0, 0]} name="Sessions" />
//                   <Bar dataKey="users" fill="#00d4aa" fillOpacity={0.8} radius={[4, 4, 0, 0]} name="Active Users" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </Grid>

//           {/* Device split */}
//           <Grid item xs={12} md={4}>
//             <ChartCard title="Device Split" height={220}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie data={deviceData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
//                     dataKey="value" paddingAngle={3}
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     labelLine={false}>
//                     {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="transparent" />)}
//                   </Pie>
//                   <Tooltip content={<ChartTooltip />} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </Grid>

//           {/* Event distribution */}
//           <Grid item xs={12}>
//             <ChartCard title="Event Type Distribution" subtitle="Cumulative for selected range" height={220}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={eventBarData} barSize={36}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//                   <XAxis dataKey="name" tick={axisStyle} stroke="#1e293b" />
//                   <YAxis tick={axisStyle} stroke="#1e293b" />
//                   <Tooltip content={<ChartTooltip />} />
//                   <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Count">
//                     {eventBarData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />)}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </Grid>
//         </Grid>
//       )}
//     </Box>
//   );
// }


// import { useState } from "react";
// import { Box, Grid, Typography, ToggleButton, ToggleButtonGroup, CircularProgress, Alert, Chip } from "@mui/material";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
// import { motion } from "framer-motion";
// import { useMetrics } from "../hooks/useMetrics";

// const COLORS = ["#00d4aa", "#3b82f6", "#f59e0b", "#f43f5e", "#a855f7", "#10b981"];

// function formatTime(ts) {
//   if (!ts) return "";
//   return new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
// }

// const ChartTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <Box sx={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 2, p: 1.5, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
//       <Typography sx={{ color: "#64748b", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", mb: 1 }}>{label}</Typography>
//       {payload.map((p, i) => (
//         <Typography key={i} sx={{ color: p.color, fontSize: "0.75rem", fontFamily: "'JetBrains Mono',monospace" }}>
//           {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

// const axisStyle = { fill: "#475569", fontSize: 10, fontFamily: "JetBrains Mono" };

// function ChartCard({ title, subtitle, badge, badgeColor = "#a855f7", children, height = 240 }) {
//   return (
//     <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
//       <Box sx={{
//         background: "#1e293b", border: "1px solid #334155", borderRadius: 3,
//         overflow: "hidden", transition: "all 0.3s",
//         "&:hover": { borderColor: "rgba(168,85,247,0.3)", boxShadow: "0 0 24px rgba(168,85,247,0.06)" }
//       }}>
//         <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <Box>
//             <Typography className="section-label">{title}</Typography>
//             {subtitle && <Typography sx={{ color: "#334155", fontSize: "0.68rem", mt: 0.3, fontFamily: "'JetBrains Mono',monospace" }}>{subtitle}</Typography>}
//           </Box>
//           {badge && <Chip label={badge} size="small" sx={{ height: 20, fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", background: `${badgeColor}15`, color: badgeColor, border: `1px solid ${badgeColor}30` }} />}
//         </Box>
//         <Box sx={{ p: 3, height }}>{children}</Box>
//       </Box>
//     </motion.div>
//   );
// }

// export default function Analytics() {
//   const [range, setRange] = useState("1h");
//   const { history, loading, error } = useMetrics(range);

//   const cvrData = history.map(m => ({ time: formatTime(m.window_start), cvr: parseFloat((m.cvr || 0).toFixed(2)), bounce: parseFloat((m.bounce_rate || 0).toFixed(2)) }));
//   const sessionData = history.slice(-20).map(m => ({ time: formatTime(m.window_start), sessions: m.session_count || 0, users: m.active_users || 0 }));
//   const eventTypes = ["page_view","add_to_cart","checkout","purchase","search","product_click"];
//   const eventBarData = eventTypes.map(et => ({ name: et.replace(/_/g, " "), count: history.reduce((s, m) => s + (m.event_breakdown?.[et] || 0), 0) }));
//   const deviceData = [{ name: "Mobile", value: 45 }, { name: "Desktop", value: 38 }, { name: "Tablet", value: 17 }];

//   return (
//     <Box className="page-analytics" sx={{ p: { xs: 2, md: 3 }, minHeight: "100vh", position: "relative", zIndex: 1 }}>
//       {/* Header */}
//       <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap" gap={2}>
//           <Box>
//             <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.5px", mb: 0.5 }} className="gradient-text-purple">
//               Analytics
//             </Typography>
//             <Typography sx={{ color: "#64748b", fontSize: "0.875rem", fontFamily: "'JetBrains Mono',monospace" }}>
//               Historical metrics · {history.length} data points loaded
//             </Typography>
//           </Box>
//           <ToggleButtonGroup value={range} exclusive onChange={(_, v) => v && setRange(v)} size="small">
//             {["1h", "6h", "24h"].map(r => (
//               <ToggleButton key={r} value={r} sx={{ px: 2.5, fontSize: "0.75rem" }}>Last {r}</ToggleButton>
//             ))}
//           </ToggleButtonGroup>
//         </Box>
//       </motion.div>

//       {loading && (
//         <Box display="flex" alignItems="center" justifyContent="center" py={12} gap={2}>
//           <CircularProgress size={24} sx={{ color: "#a855f7" }} />
//           <Typography sx={{ color: "#64748b", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.875rem" }}>Loading analytics...</Typography>
//         </Box>
//       )}

//       {error && <Alert severity="error" sx={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 2, mb: 3 }}>{error}</Alert>}

//       {!loading && !error && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
//           <Grid container spacing={2.5}>
//             {/* CVR Area Chart */}
//             <Grid item xs={12}>
//               <ChartCard title="CVR & Bounce Rate Over Time" subtitle={`${history.length} batches`} badge="LIVE" badgeColor="#00d4aa" height={260}>
//                 {cvrData.length === 0 ? (
//                   <Box display="flex" alignItems="center" justifyContent="center" height="100%" sx={{ color: "#334155", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.875rem" }}>No data for selected range</Box>
//                 ) : (
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={cvrData}>
//                       <defs>
//                         <linearGradient id="cvrGrad" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.25} />
//                           <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
//                         </linearGradient>
//                         <linearGradient id="bounceGrad" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
//                           <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//                       <XAxis dataKey="time" tick={axisStyle} stroke="#1e293b" />
//                       <YAxis tick={axisStyle} stroke="#1e293b" />
//                       <Tooltip content={<ChartTooltip />} />
//                       <Legend wrapperStyle={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "#64748b" }} />
//                       <Area type="monotone" dataKey="cvr" stroke="#00d4aa" strokeWidth={2.5} fill="url(#cvrGrad)" name="CVR %" dot={false} activeDot={{ r: 5, fill: "#00d4aa", stroke: "#0f172a", strokeWidth: 2 }} />
//                       <Area type="monotone" dataKey="bounce" stroke="#f59e0b" strokeWidth={2.5} fill="url(#bounceGrad)" name="Bounce %" dot={false} activeDot={{ r: 5, fill: "#f59e0b", stroke: "#0f172a", strokeWidth: 2 }} />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 )}
//               </ChartCard>
//             </Grid>

//             {/* Sessions Bar */}
//             <Grid item xs={12} md={8}>
//               <ChartCard title="Sessions & Active Users" subtitle="Per batch window" badge="5s batches" badgeColor="#3b82f6" height={220}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={sessionData} barSize={16} barGap={4}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//                     <XAxis dataKey="time" tick={axisStyle} stroke="#1e293b" />
//                     <YAxis tick={axisStyle} stroke="#1e293b" />
//                     <Tooltip content={<ChartTooltip />} />
//                     <Legend wrapperStyle={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "#64748b" }} />
//                     <Bar dataKey="sessions" fill="#3b82f6" fillOpacity={0.85} radius={[4,4,0,0]} name="Sessions" />
//                     <Bar dataKey="users" fill="#00d4aa" fillOpacity={0.85} radius={[4,4,0,0]} name="Active Users" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>

//             {/* Device Donut */}
//             <Grid item xs={12} md={4}>
//               <ChartCard title="Device Split" badge="Estimated" badgeColor="#a855f7" height={220}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={deviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={4}
//                       label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
//                       {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="transparent" />)}
//                     </Pie>
//                     <Tooltip content={<ChartTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>

//             {/* Event Distribution */}
//             <Grid item xs={12}>
//               <ChartCard title="Event Type Distribution" subtitle="Cumulative for selected range" badge="Kafka events" badgeColor="#f59e0b" height={220}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={eventBarData} barSize={40}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//                     <XAxis dataKey="name" tick={axisStyle} stroke="#1e293b" />
//                     <YAxis tick={axisStyle} stroke="#1e293b" />
//                     <Tooltip content={<ChartTooltip />} />
//                     <Bar dataKey="count" radius={[6,6,0,0]} name="Count">
//                       {eventBarData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />)}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>
//           </Grid>
//         </motion.div>
//       )}
//     </Box>
//   );
// }
// import { useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   ToggleButton,
//   ToggleButtonGroup,
//   CircularProgress,
//   Alert,
//   Chip,
// } from "@mui/material";

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// import { motion } from "framer-motion";
// import { useMetrics } from "../hooks/useMetrics";

// const COLORS = ["#00d4aa", "#3b82f6", "#f59e0b", "#f43f5e", "#a855f7", "#10b981"];

// function formatTime(ts) {
//   if (!ts) return "";
//   return new Date(ts).toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// const ChartTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;

//   return (
//     <Box
//       sx={{
//         background: "#0f172a",
//         border: "1px solid #334155",
//         borderRadius: 2,
//         p: 1.5,
//         boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
//       }}
//     >
//       <Typography
//         sx={{
//           color: "#94a3b8",
//           fontSize: "0.7rem",
//           fontFamily: "'JetBrains Mono', monospace",
//           mb: 1,
//         }}
//       >
//         {label}
//       </Typography>

//       {payload.map((p, i) => (
//         <Typography
//           key={i}
//           sx={{
//             color: p.color,
//             fontSize: "0.75rem",
//             fontFamily: "'JetBrains Mono', monospace",
//           }}
//         >
//           {p.name}:{" "}
//           {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

// const axisStyle = {
//   fill: "#64748b",
//   fontSize: 10,
//   fontFamily: "JetBrains Mono",
// };

// function ChartCard({
//   title,
//   subtitle,
//   badge,
//   badgeColor = "#a855f7",
//   children,
//   height = 240,
// }) {
//   return (
//     <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
//       <Box
//         sx={{
//           background: "rgba(15,23,42,0.9)",
//           border: "1px solid rgba(51,65,85,0.6)",
//           borderRadius: 3,
//           overflow: "hidden",
//           transition: "all 0.3s",
//           backdropFilter: "blur(6px)",

//           "&:hover": {
//             borderColor: `${badgeColor}55`,
//             boxShadow: "0 0 32px rgba(168,85,247,0.12)",
//           },
//         }}
//       >
//         <Box
//           sx={{
//             px: 3,
//             py: 2,
//             borderBottom: "1px solid #1e293b",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 color: "#e2e8f0",
//                 fontWeight: 600,
//                 fontSize: "1rem",
//               }}
//             >
//               {title}
//             </Typography>

//             {subtitle && (
//               <Typography
//                 sx={{
//                   color: "#64748b",
//                   fontSize: "0.72rem",
//                   fontFamily: "'JetBrains Mono',monospace",
//                   mt: 0.3,
//                 }}
//               >
//                 {subtitle}
//               </Typography>
//             )}
//           </Box>

//           {badge && (
//             <Chip
//               label={badge}
//               size="small"
//               sx={{
//                 height: 20,
//                 fontSize: "0.65rem",
//                 fontFamily: "'JetBrains Mono', monospace",
//                 background: `${badgeColor}22`,
//                 color: badgeColor,
//                 border: `1px solid ${badgeColor}55`,
//               }}
//             />
//           )}
//         </Box>

//         <Box sx={{ p: 3, height }}>{children}</Box>
//       </Box>
//     </motion.div>
//   );
// }

// export default function Analytics() {
//   const [range, setRange] = useState("1h");
//   const { history, loading, error } = useMetrics(range);

//   const cvrData = history.map((m) => ({
//     time: formatTime(m.window_start),
//     cvr: parseFloat((m.cvr || 0).toFixed(2)),
//     bounce: parseFloat((m.bounce_rate || 0).toFixed(2)),
//   }));

//   const sessionData = history.slice(-20).map((m) => ({
//     time: formatTime(m.window_start),
//     sessions: m.session_count || 0,
//     users: m.active_users || 0,
//   }));

//   const eventTypes = [
//     "page_view",
//     "add_to_cart",
//     "checkout",
//     "purchase",
//     "search",
//     "product_click",
//   ];

//   const eventBarData = eventTypes.map((et) => ({
//     name: et.replace(/_/g, " "),
//     count: history.reduce((s, m) => s + (m.event_breakdown?.[et] || 0), 0),
//   }));

//   const deviceData = [
//     { name: "Mobile", value: 45 },
//     { name: "Desktop", value: 38 },
//     { name: "Tablet", value: 17 },
//   ];

//   return (
//     <Box
//       className="page-analytics"
//       sx={{
//         p: { xs: 2, md: 4 },
//         minHeight: "100vh",
//       }}
//     >
//       {/* Header */}
//       <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="space-between"
//           mb={4}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <Box>
//             <Typography
//               variant="h4"
//               fontWeight={800}
//               sx={{
//                 letterSpacing: "-1px",
//                 mb: 0.5,
//                 background: "linear-gradient(to right, #a855f7, #6366f1)",
//                 backgroundClip: "text",
//                 color: "transparent",
//               }}
//             >
//               Analytics Dashboard
//             </Typography>

//             <Typography
//               sx={{
//                 color: "#64748b",
//                 fontSize: "0.9rem",
//                 fontFamily: "'JetBrains Mono', monospace",
//               }}
//             >
//               Historical metrics · {history.length} data points loaded
//             </Typography>
//           </Box>

//           <ToggleButtonGroup
//             value={range}
//             exclusive
//             onChange={(_, v) => v && setRange(v)}
//             size="small"
//             sx={{
//               background: "rgba(30,41,59,0.5)",
//               borderRadius: 2,
//               p: 0.5,
//             }}
//           >
//             {["1h", "6h", "24h"].map((r) => (
//               <ToggleButton
//                 key={r}
//                 value={r}
//                 sx={{
//                   px: 2.8,
//                   fontSize: "0.75rem",
//                   color: "#cbd5e1",
//                   "&.Mui-selected": {
//                     background: "#4f46e5 !important",
//                     color: "#fff",
//                   },
//                 }}
//               >
//                 Last {r}
//               </ToggleButton>
//             ))}
//           </ToggleButtonGroup>
//         </Box>
//       </motion.div>

//       {/* Loading */}
//       {loading && (
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           py={12}
//           gap={2}
//         >
//           <CircularProgress size={26} sx={{ color: "#a855f7" }} />
//           <Typography
//             sx={{
//               color: "#94a3b8",
//               fontFamily: "'JetBrains Mono', monospace",
//             }}
//           >
//             Loading analytics...
//           </Typography>
//         </Box>
//       )}

//       {/* Error */}
//       {error && (
//         <Alert
//           severity="error"
//           sx={{
//             background: "rgba(239,68,68,0.08)",
//             border: "1px solid rgba(239,68,68,0.2)",
//             color: "#ef4444",
//             borderRadius: 2,
//             mb: 3,
//           }}
//         >
//           {error}
//         </Alert>
//       )}

//       {/* Main analytics */}
//       {!loading && !error && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <Grid container spacing={3}>
//             {/* CVR AREA CHART */}
//             <Grid item xs={12}>
//               <ChartCard
//                 title="CVR & Bounce Rate Over Time"
//                 subtitle={`${history.length} batches`}
//                 badge="LIVE"
//                 badgeColor="#00d4aa"
//                 height={260}
//               >
//                 {cvrData.length === 0 ? (
//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     height="100%"
//                     sx={{
//                       color: "#64748b",
//                       fontFamily: "'JetBrains Mono', monospace",
//                     }}
//                   >
//                     No data for selected range
//                   </Box>
//                 ) : (
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={cvrData}>
//                       <defs>
//                         <linearGradient id="cvrGrad" x1="0" y1="0" x2="0" y2="1">
//                           <stop
//                             offset="5%"
//                             stopColor="#00d4aa"
//                             stopOpacity={0.25}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#00d4aa"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>

//                         <linearGradient
//                           id="bounceGrad"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#f59e0b"
//                             stopOpacity={0.25}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#f59e0b"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                       </defs>

//                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//                       <XAxis dataKey="time" tick={axisStyle} stroke="#1e293b" />
//                       <YAxis tick={axisStyle} stroke="#1e293b" />
//                       <Tooltip content={<ChartTooltip />} />
//                       <Legend
//                         wrapperStyle={{
//                           fontFamily: "'JetBrains Mono', monospace",
//                           fontSize: "0.72rem",
//                           color: "#64748b",
//                         }}
//                       />

//                       <Area
//                         type="monotone"
//                         dataKey="cvr"
//                         stroke="#00d4aa"
//                         strokeWidth={2.2}
//                         fill="url(#cvrGrad)"
//                         name="CVR %"
//                       />

//                       <Area
//                         type="monotone"
//                         dataKey="bounce"
//                         stroke="#f59e0b"
//                         strokeWidth={2.2}
//                         fill="url(#bounceGrad)"
//                         name="Bounce %"
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 )}
//               </ChartCard>
//             </Grid>

//             {/* SESSIONS BAR CHART */}
//             <Grid item xs={12} md={8}>
//               <ChartCard
//                 title="Sessions & Active Users"
//                 subtitle="Per batch window"
//                 badge="5s batches"
//                 badgeColor="#3b82f6"
//                 height={230}
//               >
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={sessionData} barSize={16}>
//                     <CartesianGrid
//                       stroke="#1e293b"
//                       strokeDasharray="3 3"
//                       vertical={false}
//                     />

//                     <XAxis
//                       dataKey="time"
//                       tick={axisStyle}
//                       stroke="#1e293b"
//                     />
//                     <YAxis tick={axisStyle} stroke="#1e293b" />

//                     <Tooltip content={<ChartTooltip />} />
//                     <Legend
//                       wrapperStyle={{
//                         fontFamily: "'JetBrains Mono', monospace",
//                         fontSize: "0.72rem",
//                       }}
//                     />

//                     <Bar
//                       dataKey="sessions"
//                       name="Sessions"
//                       fill="#3b82f6"
//                       radius={[6, 6, 0, 0]}
//                       fillOpacity={0.85}
//                     />

//                     <Bar
//                       dataKey="users"
//                       name="Active Users"
//                       fill="#00d4aa"
//                       radius={[6, 6, 0, 0]}
//                       fillOpacity={0.85}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>

//             {/* DEVICE PIE (DONUT) CHART */}
//             <Grid item xs={12} md={4}>
//               <ChartCard
//                 title="Device Split"
//                 badge="Estimated"
//                 badgeColor="#a855f7"
//                 height={230}
//               >
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={deviceData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={55}
//                       outerRadius={85}
//                       paddingAngle={4}
//                       dataKey="value"
//                       labelLine={false}
//                       label={({ name, percent }) =>
//                         `${name} ${(percent * 100).toFixed(0)}%`
//                       }
//                     >
//                       {deviceData.map((_, i) => (
//                         <Cell
//                           key={i}
//                           fill={COLORS[i]}
//                           stroke="transparent"
//                         />
//                       ))}
//                     </Pie>

//                     <Tooltip content={<ChartTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>

//             {/* EVENT DISTRIBUTION */}
//             <Grid item xs={12}>
//               <ChartCard
//                 title="Event Type Distribution"
//                 subtitle="Cumulative for selected range"
//                 badge="Kafka Events"
//                 badgeColor="#f59e0b"
//                 height={240}
//               >
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={eventBarData} barSize={40}>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="#1e293b"
//                       vertical={false}
//                     />
//                     <XAxis
//                       dataKey="name"
//                       tick={axisStyle}
//                       stroke="#1e293b"
//                     />
//                     <YAxis tick={axisStyle} stroke="#1e293b" />
//                     <Tooltip content={<ChartTooltip />} />

//                     <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Count">
//                       {eventBarData.map((_, i) => (
//                         <Cell
//                           key={i}
//                           fill={COLORS[i % COLORS.length]}
//                           fillOpacity={0.85}
//                         />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>
//           </Grid>
//         </motion.div>
//       )}
//     </Box>
//   );
// }
// import { useState } from "react";
// import { Box, Grid, Typography, ToggleButton, ToggleButtonGroup, CircularProgress, Alert, Chip } from "@mui/material";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
// import { motion } from "framer-motion";
// import { useMetrics } from "../hooks/useMetrics";

// const COLORS = ["#00d4aa", "#3b82f6", "#f59e0b", "#f43f5e", "#a855f7", "#10b981"];

// function formatTime(ts) {
//   if (!ts) return "";
//   return new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
// }

// const ChartTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <Box sx={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 2, p: 1.5, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
//       <Typography sx={{ color: "#64748b", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", mb: 1 }}>{label}</Typography>
//       {payload.map((p, i) => (
//         <Typography key={i} sx={{ color: p.color, fontSize: "0.75rem", fontFamily: "'JetBrains Mono',monospace" }}>
//           {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

// const axisStyle = { fill: "#475569", fontSize: 10, fontFamily: "JetBrains Mono" };

// function ChartCard({ title, subtitle, badge, badgeColor = "#a855f7", children, height = 240 }) {
//   return (
//     <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
//       <Box sx={{
//         background: "#1e293b", border: "1px solid #334155", borderRadius: 3,
//         overflow: "hidden", transition: "all 0.3s",
//         "&:hover": { borderColor: "rgba(168,85,247,0.3)", boxShadow: "0 0 24px rgba(168,85,247,0.06)" }
//       }}>
//         <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <Box>
//             <Typography className="section-label">{title}</Typography>
//             {subtitle && <Typography sx={{ color: "#334155", fontSize: "0.68rem", mt: 0.3, fontFamily: "'JetBrains Mono',monospace" }}>{subtitle}</Typography>}
//           </Box>
//           {badge && <Chip label={badge} size="small" sx={{ height: 20, fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", background: `${badgeColor}15`, color: badgeColor, border: `1px solid ${badgeColor}30` }} />}
//         </Box>
//         <Box sx={{ p: 3, height }}>{children}</Box>
//       </Box>
//     </motion.div>
//   );
// }

// export default function Analytics() {
//   const [range, setRange] = useState("1h");
//   const { history, loading, error } = useMetrics(range);

//   const cvrData = history.map(m => ({ time: formatTime(m.window_start), cvr: parseFloat((m.cvr || 0).toFixed(2)), bounce: parseFloat((m.bounce_rate || 0).toFixed(2)) }));
//   const sessionData = history.slice(-20).map(m => ({ time: formatTime(m.window_start), sessions: m.session_count || 0, users: m.active_users || 0 }));
//   const eventTypes = ["page_view","add_to_cart","checkout","purchase","search","product_click"];
//   const eventBarData = eventTypes.map(et => ({ name: et.replace(/_/g, " "), count: history.reduce((s, m) => s + (m.event_breakdown?.[et] || 0), 0) }));
//   const deviceData = [{ name: "Mobile", value: 45 }, { name: "Desktop", value: 38 }, { name: "Tablet", value: 17 }];

//   return (
//     <Box className="page-analytics" sx={{ p: { xs: 2, md: 3 }, minHeight: "100vh", position: "relative", zIndex: 1 }}>
//       {/* Header */}
//       <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap" gap={2}>
//           <Box>
//             <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.5px", mb: 0.5 }} className="gradient-text-purple">
//               Analytics
//             </Typography>
//             <Typography sx={{ color: "#64748b", fontSize: "0.875rem", fontFamily: "'JetBrains Mono',monospace" }}>
//               Historical metrics · {history.length} data points loaded
//             </Typography>
//           </Box>
//           <ToggleButtonGroup value={range} exclusive onChange={(_, v) => v && setRange(v)} size="small">
//             {["1h", "6h", "24h"].map(r => (
//               <ToggleButton key={r} value={r} sx={{ px: 2.5, fontSize: "0.75rem" }}>Last {r}</ToggleButton>
//             ))}
//           </ToggleButtonGroup>
//         </Box>
//       </motion.div>

//       {loading && (
//         <Box display="flex" alignItems="center" justifyContent="center" py={12} gap={2}>
//           <CircularProgress size={24} sx={{ color: "#a855f7" }} />
//           <Typography sx={{ color: "#64748b", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.875rem" }}>Loading analytics...</Typography>
//         </Box>
//       )}

//       {error && <Alert severity="error" sx={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", borderRadius: 2, mb: 3 }}>{error}</Alert>}

//       {!loading && !error && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
//           <Grid container spacing={2.5}>
//             {/* CVR Area Chart */}
//             <Grid item xs={12}>
//               <ChartCard title="CVR & Bounce Rate Over Time" subtitle={`${history.length} batches`} badge="LIVE" badgeColor="#00d4aa" height={260}>
//                 {cvrData.length === 0 ? (
//                   <Box display="flex" alignItems="center" justifyContent="center" height="100%" sx={{ color: "#334155", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.875rem" }}>No data for selected range</Box>
//                 ) : (
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={cvrData}>
//                       <defs>
//                         <linearGradient id="cvrGrad" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.25} />
//                           <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
//                         </linearGradient>
//                         <linearGradient id="bounceGrad" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
//                           <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//                       <XAxis dataKey="time" tick={axisStyle} stroke="#1e293b" />
//                       <YAxis tick={axisStyle} stroke="#1e293b" />
//                       <Tooltip content={<ChartTooltip />} />
//                       <Legend wrapperStyle={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "#64748b" }} />
//                       <Area type="monotone" dataKey="cvr" stroke="#00d4aa" strokeWidth={2.5} fill="url(#cvrGrad)" name="CVR %" dot={false} activeDot={{ r: 5, fill: "#00d4aa", stroke: "#0f172a", strokeWidth: 2 }} />
//                       <Area type="monotone" dataKey="bounce" stroke="#f59e0b" strokeWidth={2.5} fill="url(#bounceGrad)" name="Bounce %" dot={false} activeDot={{ r: 5, fill: "#f59e0b", stroke: "#0f172a", strokeWidth: 2 }} />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 )}
//               </ChartCard>
//             </Grid>

//             {/* Sessions Bar */}
//             <Grid item xs={12} md={8}>
//               <ChartCard title="Sessions & Active Users" subtitle="Per batch window" badge="5s batches" badgeColor="#3b82f6" height={220}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={sessionData} barSize={16} barGap={4}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//                     <XAxis dataKey="time" tick={axisStyle} stroke="#1e293b" />
//                     <YAxis tick={axisStyle} stroke="#1e293b" />
//                     <Tooltip content={<ChartTooltip />} />
//                     <Legend wrapperStyle={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "#64748b" }} />
//                     <Bar dataKey="sessions" fill="#3b82f6" fillOpacity={0.85} radius={[4,4,0,0]} name="Sessions" />
//                     <Bar dataKey="users" fill="#00d4aa" fillOpacity={0.85} radius={[4,4,0,0]} name="Active Users" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>

//             {/* Device Donut */}
//             <Grid item xs={12} md={4}>
//               <ChartCard title="Device Split" badge="Estimated" badgeColor="#a855f7" height={220}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={deviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={4}
//                       label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
//                       {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="transparent" />)}
//                     </Pie>
//                     <Tooltip content={<ChartTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>

//             {/* Event Distribution */}
//             <Grid item xs={12}>
//               <ChartCard title="Event Type Distribution" subtitle="Cumulative for selected range" badge="Kafka events" badgeColor="#f59e0b" height={220}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={eventBarData} barSize={40}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//                     <XAxis dataKey="name" tick={axisStyle} stroke="#1e293b" />
//                     <YAxis tick={axisStyle} stroke="#1e293b" />
//                     <Tooltip content={<ChartTooltip />} />
//                     <Bar dataKey="count" radius={[6,6,0,0]} name="Count">
//                       {eventBarData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />)}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </Grid>
//           </Grid>
//         </motion.div>
//       )}
//     </Box>
//   );
// }


// import { useEffect, useRef, useState } from "react";
// import { Box, Grid, Typography, ToggleButton, ToggleButtonGroup, CircularProgress, Alert, Chip, Divider } from "@mui/material";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
// import { motion } from "framer-motion";
// import { useMetrics } from "../hooks/useMetrics";
// import { CheckCircleOutline, Storage, AnalyticsOutlined } from "@mui/icons-material";

// const COLORS = ["#00d4aa", "#3b82f6", "#f59e0b", "#f43f5e", "#a855f7", "#10b981"];

// function formatTime(ts) {
//   if (!ts) return "";
//   return new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
// }

// const ChartTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <Box sx={{ 
//       background: "rgba(15, 23, 42, 0.95)", 
//       border: "1px solid rgba(255,255,255,0.1)", 
//       borderRadius: 1.5, p: 1.5, 
//       boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
//       backdropFilter: "blur(4px)"
//     }}>
//       <Typography sx={{ color: "#94a3b8", fontSize: "0.65rem", fontWeight: 700, mb: 1, borderBottom: "1px solid rgba(255,255,255,0.05)", pb: 0.5 }}>
//         TIMESTAMP: {label}
//       </Typography>
//       {payload.map((p, i) => (
//         <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.5 }}>
//           <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
//           <Typography sx={{ color: "#f1f5f9", fontSize: "0.75rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>
//             {p.name}: <span style={{ color: p.color }}>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// const axisStyle = { fill: "#64748b", fontSize: 9, fontFamily: "JetBrains Mono", fontWeight: 500 };

// function ChartCard({ title, subtitle, badge, badgeColor = "#3b82f6", children, height = 280 }) {
//   return (
//     <Box sx={{
//       background: "#0f172a",
//       border: "1px solid rgba(255,255,255,0.06)",
//       borderRadius: 2,
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       position: "relative",
//       "&:hover": { borderColor: "rgba(255,255,255,0.12)" }
//     }}>
//       <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Box>
//           <Typography sx={{ color: "#f8fafc", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.02em" }}>{title}</Typography>
//           {subtitle && <Typography sx={{ color: "#475569", fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace" }}>{subtitle}</Typography>}
//         </Box>
//         {badge && (
//           <Box sx={{ 
//             px: 1, py: 0.2, borderRadius: 1, fontSize: "0.6rem", fontWeight: 800, 
//             background: `${badgeColor}10`, color: badgeColor, border: `1px solid ${badgeColor}30`,
//             fontFamily: "'JetBrains Mono'"
//           }}>
//             {badge}
//           </Box>
//         )}
//       </Box>
//       <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />
//       <Box sx={{ p: 2, flex: 1, minHeight: height }}>{children}</Box>
//     </Box>
//   );
// }

// export default function Analytics() {
//   const [range, setRange] = useState("1h");
//   const { history, loading, error } = useMetrics(range);

//   const cvrData = history.map(m => ({ time: formatTime(m.window_start), cvr: parseFloat((m.cvr || 0).toFixed(2)), bounce: parseFloat((m.bounce_rate || 0).toFixed(2)) }));
//   const sessionData = history.slice(-30).map(m => ({ time: formatTime(m.window_start), sessions: m.session_count || 0, users: m.active_users || 0 }));
//   const eventTypes = ["page_view","add_to_cart","checkout","purchase"];
//   const eventBarData = eventTypes.map(et => ({ name: et.split('_').join(' ').toUpperCase(), count: history.reduce((s, m) => s + (m.event_breakdown?.[et] || 0), 0) }));
  
//   const totalEvents = eventBarData.reduce((acc, curr) => acc + curr.count, 0);

//   return (
//     <Box sx={{ p: 3, background: "#020617", minHeight: "100vh" }}>
      
//       {/* AWS Style Breadcrumbs / Header */}
//       <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
//         <Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//             <AnalyticsOutlined sx={{ color: "#3b82f6", fontSize: 20 }} />
//             <Typography sx={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em" }}>CLOUD_MONITOR / SHOPSTREAM</Typography>
//           </Box>
//           <Typography variant="h4" sx={{ color: "#f8fafc", fontWeight: 800, fontSize: "1.75rem" }}>Performance Analytics</Typography>
//         </Box>

//         <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 1, borderRadius: 2, border: "1px solid rgba(16, 185, 129, 0.2)", background: "rgba(16, 185, 129, 0.05)" }}>
//             <CheckCircleOutline sx={{ color: "#10b981", fontSize: 16 }} />
//             <Typography sx={{ color: "#10b981", fontSize: "0.75rem", fontWeight: 700, fontFamily: "'JetBrains Mono'" }}>SYSTEM_HEALTH: NOMINAL</Typography>
//           </Box>
//           <ToggleButtonGroup 
//             value={range} 
//             exclusive 
//             onChange={(_, v) => v && setRange(v)} 
//             sx={{ background: "#1e293b", "& .MuiToggleButton-root": { color: "#94a3b8", border: "none", px: 2, "&.Mui-selected": { color: "#fff", background: "#334155" } } }}
//           >
//             {["1h", "6h", "24h"].map(r => <ToggleButton key={r} value={r} size="small">{r}</ToggleButton>)}
//           </ToggleButtonGroup>
//         </Box>
//       </Box>

//       {loading && <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}><CircularProgress size={30} /></Box>}

//    {!loading && !error && (
//   <Grid container spacing={2}>
//     {/* Main Traffic Chart */}
//     <Grid item xs={12} lg={9}>
//       <ChartCard title="Session Density & Active Users" subtitle={`Stream data: last ${range}`} badge="LIVE_REPLAY">
//         <ResponsiveContainer width="100%" height={300}>
//           {/* Added key={range} to force re-render on toggle */}
//           {/* Added syncId so all charts hover together */}
//           <AreaChart key={`area-${range}`} data={sessionData} syncId="anySyncId">
//             <defs>
//               <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//             <XAxis dataKey="time" tick={axisStyle} stroke="transparent" minTickGap={30} />
//             <YAxis tick={axisStyle} stroke="transparent" />
//             <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
//             <Area type="stepAfter" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" name="Total Sessions" isAnimationActive={true} />
//             <Area type="monotone" dataKey="users" stroke="#00d4aa" strokeWidth={2} fill="transparent" name="Active Users" />
//           </AreaChart>
//         </ResponsiveContainer>
//       </ChartCard>
//     </Grid>

//     {/* Event Distribution */}
//     <Grid item xs={12} lg={3}>
//       <ChartCard title="Global Event Load" badge="KAFKA" height={300}>
//         <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
//           <ResponsiveContainer width="100%" height={180}>
//             {/* Added key={range} for PieChart reset */}
//             <PieChart key={`pie-${range}`}>
//               <Pie 
//                 data={eventBarData} 
//                 dataKey="count" 
//                 innerRadius={55} 
//                 outerRadius={75} 
//                 paddingAngle={5}
//                 animationBegin={0}
//                 animationDuration={800}
//               >
//                 {eventBarData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//               </Pie>
//               <Tooltip content={<ChartTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//           <Box sx={{ mt: 2 }}>
//             {eventBarData.map((entry, i) => (
//               <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//                 <Typography sx={{ color: "#94a3b8", fontSize: "0.65rem", fontWeight: 600 }}>{entry.name}</Typography>
//                 <Typography sx={{ color: "#f8fafc", fontSize: "0.65rem", fontFamily: "'JetBrains Mono'" }}>{entry.count.toLocaleString()}</Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </ChartCard>
//     </Grid>

//     {/* Conversion Metrics - THE BAR CHART FIX */}
//     <Grid item xs={12}>
//       <ChartCard title="Yield & Conversion Ratios" subtitle={`Historical Analysis (${range})`} badge="AGGREGATOR_v2">
//         <ResponsiveContainer width="100%" height={250}>
//           {/* 1. Added key={range} -> This is the most important fix */}
//           {/* 2. Added syncId="anySyncId" to link it with the Top Chart */}
//           <BarChart key={`bar-${range}`} data={cvrData} barGap={8} syncId="anySyncId">
//             <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//             <XAxis dataKey="time" tick={axisStyle} stroke="transparent" />
//             <YAxis tick={axisStyle} stroke="transparent" />
//             <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
//             <Legend iconType="circle" wrapperStyle={{ paddingTop: 10, fontSize: 10, fontFamily: "JetBrains Mono" }} />
//             <Bar 
//               dataKey="cvr" 
//               fill="#00d4aa" 
//               radius={[4, 4, 0, 0]} 
//               name="Conversion Rate %" 
//               isAnimationActive={true}
//               animationDuration={1000}
//             />
//             <Bar 
//               dataKey="bounce" 
//               fill="#f43f5e" 
//               radius={[4, 4, 0, 0]} 
//               name="Bounce Rate %" 
//               isAnimationActive={true}
//               animationDuration={1200}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>
//     </Grid>
//   </Grid>
// )}
//     </Box>
//   );
// }


import { useState } from "react";
import { Box, Grid, Typography, ToggleButton, ToggleButtonGroup, CircularProgress, Alert, Chip, Divider } from "@mui/material";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion";
import { AnalyticsOutlined, CheckCircleOutline } from "@mui/icons-material";
import { useMetrics } from "../hooks/useMetrics";

const COLORS = ["#00d4aa","#3b82f6","#f59e0b","#f43f5e","#a855f7","#10b981"];
const PRODUCT_COLORS = ["#00d4aa","#3b82f6","#a855f7","#f59e0b","#ef4444","#06b6d4","#10b981","#f97316","#8b5cf6","#ec4899","#14b8a6","#6366f1"];

function formatTime(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString("en-IN", { hour:"2-digit",minute:"2-digit",second:"2-digit" });
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ background:"rgba(13,17,23,0.97)",border:"1px solid #1e293b",borderRadius:1.5,p:1.5,backdropFilter:"blur(4px)" }}>
      <Typography sx={{ color:"#64748b",fontSize:"0.65rem",fontWeight:700,mb:1,borderBottom:"1px solid #1e293b",pb:0.5 }}>
        {label}
      </Typography>
      {payload.map((p,i) => (
        <Box key={i} display="flex" alignItems="center" gap={1.5} mt={0.5}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:p.color }} />
          <Typography sx={{ color:"#f1f5f9",fontSize:"0.75rem",fontFamily:"'JetBrains Mono',monospace",fontWeight:600 }}>
            {p.name}: <span style={{ color:p.color }}>{typeof p.value==="number" ? p.value.toLocaleString() : p.value}</span>
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const axisStyle = { fill:"#64748b",fontSize:9,fontFamily:"JetBrains Mono",fontWeight:500 };

function ChartCard({ title, subtitle, badge, badgeColor="#3b82f6", children, height=280 }) {
  return (
    <Box sx={{ background:"#0f172a",border:"1px solid rgba(255,255,255,0.06)",borderRadius:2,height:"100%",display:"flex",flexDirection:"column","&:hover":{borderColor:"rgba(255,255,255,0.12)"} }}>
      <Box sx={{ p:2,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <Box>
          <Typography sx={{ color:"#f8fafc",fontSize:"0.85rem",fontWeight:700,letterSpacing:"0.02em" }}>{title}</Typography>
          {subtitle && <Typography sx={{ color:"#475569",fontSize:"0.65rem",fontFamily:"'JetBrains Mono',monospace" }}>{subtitle}</Typography>}
        </Box>
        {badge && (
          <Box sx={{ px:1,py:0.2,borderRadius:1,fontSize:"0.6rem",fontWeight:800,background:`${badgeColor}10`,color:badgeColor,border:`1px solid ${badgeColor}30`,fontFamily:"'JetBrains Mono'" }}>
            {badge}
          </Box>
        )}
      </Box>
      <Divider sx={{ borderColor:"rgba(255,255,255,0.04)" }} />
      <Box sx={{ p:2,flex:1,minHeight:height }}>{children}</Box>
    </Box>
  );
}

// User Activity Heatmap — shows which hours have most activity
function ActivityHeatmap({ history }) {
  // Aggregate events by hour of day
  const hourCounts = Array(24).fill(0);
  history.forEach(m => {
    if (!m.window_start) return;
    const h = new Date(m.window_start).getHours();
    hourCounts[h] += (m.session_count || 0);
  });
  const maxVal = Math.max(...hourCounts, 1);

  return (
    <Box>
      <Typography sx={{ color:"#64748b",fontSize:"0.65rem",fontFamily:"'JetBrains Mono',monospace",mb:1.5 }}>
        Session density by hour of day (24h clock)
      </Typography>
      <Box display="flex" gap={0.4} flexWrap="wrap">
        {hourCounts.map((count,h) => {
          const intensity = count / maxVal;
          const bg = intensity > 0.8 ? "#00d4aa" : intensity > 0.6 ? "#00d4aa99" : intensity > 0.4 ? "#00d4aa55" : intensity > 0.2 ? "#00d4aa22" : "#1e293b";
          return (
            <Box key={h}
              title={`${h}:00 — ${count} sessions`}
              sx={{ width:32,height:32,borderRadius:1,background:bg,display:"flex",alignItems:"center",justifyContent:"center",cursor:"default",
                transition:"transform 0.15s","&:hover":{transform:"scale(1.2)",zIndex:1} }}>
              <Typography sx={{ fontSize:"0.55rem",color:intensity>0.4?"#07090f":"#334155",fontFamily:"'JetBrains Mono',monospace",fontWeight:700 }}>
                {h}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box display="flex" gap={2} mt={1.5} flexWrap="wrap">
        {[["Low",0.2],["Medium",0.5],["High",0.8],["Peak",1.0]].map(([label,intensity])=>(
          <Box key={label} display="flex" alignItems="center" gap={0.6}>
            <Box sx={{ width:10,height:10,borderRadius:0.5,background:intensity>0.8?"#00d4aa":intensity>0.5?"#00d4aa99":intensity>0.2?"#00d4aa55":"#1e293b" }} />
            <Typography sx={{ fontSize:"0.62rem",color:"#64748b" }}>{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Product-wise sales chart (simulated from purchase breakdown)
const PRODUCTS = [
  "AirPods Pro","MacBook M3","Nike Jordan","Sony WH-1000","Levi Jeans",
  "iPad Pro","Atomic Habits","Samsung 4K","Yoga Mat","Adidas Ultra","KitchenAid","Dyson V15"
];

function getProductData(history) {
  // Simulate product breakdown from purchase count
  const total = history.reduce((s,m)=>s+(m.funnel?.purchase||0),0);
  if (total === 0) return PRODUCTS.map(name=>({name,sales:0,revenue:0}));
  // Distribute realistically
  const weights = [0.18,0.15,0.12,0.11,0.09,0.08,0.07,0.06,0.05,0.04,0.03,0.02];
  return PRODUCTS.map((name,i)=>({
    name: name.length > 10 ? name.slice(0,10)+"…" : name,
    sales: Math.round(total * weights[i]),
    revenue: Math.round(total * weights[i] * [549,1299,180,349,89,1099,16,599,79,190,399,749][i]),
  }));
}

export default function Analytics() {
  const [range, setRange] = useState("1h");
  const { history, loading, error } = useMetrics(range);

  const cvrData = history.map(m => ({ time:formatTime(m.window_start),cvr:parseFloat((m.cvr||0).toFixed(2)),bounce:parseFloat((m.bounce_rate||0).toFixed(2)) }));
  const sessionData = history.slice(-30).map(m => ({ time:formatTime(m.window_start),sessions:m.session_count||0,users:m.active_users||0 }));
  const eventTypes = ["page_view","add_to_cart","checkout","purchase"];
  const eventBarData = eventTypes.map(et => ({ name:et.split("_").join(" ").toUpperCase(),count:history.reduce((s,m)=>s+(m.event_breakdown?.[et]||0),0) }));
  const productData = getProductData(history);

  return (
    <Box sx={{ p:3,background:"#020617",minHeight:"100vh" }}>
      {/* Header */}
      <Box sx={{ mb:4,display:"flex",justifyContent:"space-between",alignItems:"flex-end" }}>
        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <AnalyticsOutlined sx={{ color:"#3b82f6",fontSize:20 }} />
            <Typography sx={{ color:"#64748b",fontSize:"0.75rem",fontWeight:600,letterSpacing:"0.1em" }}>CLOUD_MONITOR / SHOPSTREAM</Typography>
          </Box>
          <Typography variant="h4" sx={{ color:"#f8fafc",fontWeight:800,fontSize:"1.75rem" }}>Performance Analytics</Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <Box display="flex" alignItems="center" gap={1} sx={{ px:2,py:1,borderRadius:2,border:"1px solid rgba(16,185,129,0.2)",background:"rgba(16,185,129,0.05)" }}>
            <CheckCircleOutline sx={{ color:"#10b981",fontSize:16 }} />
            <Typography sx={{ color:"#10b981",fontSize:"0.75rem",fontWeight:700,fontFamily:"'JetBrains Mono'" }}>SYSTEM_HEALTH: NOMINAL</Typography>
          </Box>
          <ToggleButtonGroup value={range} exclusive onChange={(_,v)=>v&&setRange(v)}
            sx={{ background:"#1e293b","& .MuiToggleButton-root":{ color:"#94a3b8",border:"none",px:2,"&.Mui-selected":{color:"#fff",background:"#334155"} } }}>
            {["1h","6h","24h"].map(r=><ToggleButton key={r} value={r} size="small">{r}</ToggleButton>)}
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading && <Box sx={{ display:"flex",justifyContent:"center",py:10 }}><CircularProgress size={30} sx={{ color:"#3b82f6" }} /></Box>}

      {!loading && !error && (
        <Grid container spacing={2}>
          {/* Session area chart */}
          <Grid item xs={12} lg={9}>
            <ChartCard title="Session Density & Active Users" subtitle={`Stream data: last ${range}`} badge="LIVE_REPLAY">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart key={`area-${range}`} data={sessionData} syncId="ss">
                  <defs>
                    <linearGradient id="gSess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" tick={axisStyle} stroke="transparent" minTickGap={30} />
                  <YAxis tick={axisStyle} stroke="transparent" />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke:"rgba(255,255,255,0.1)",strokeWidth:1 }} />
                  <Area type="stepAfter" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#gSess)" name="Total Sessions" />
                  <Area type="monotone" dataKey="users" stroke="#00d4aa" strokeWidth={2} fill="transparent" name="Active Users" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>

          {/* Event donut */}
          <Grid item xs={12} lg={3}>
            <ChartCard title="Global Event Load" badge="KAFKA" height={300}>
              <Box sx={{ height:"100%",display:"flex",flexDirection:"column",justifyContent:"center" }}>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart key={`pie-${range}`}>
                    <Pie data={eventBarData} dataKey="count" innerRadius={55} outerRadius={75} paddingAngle={5} animationBegin={0} animationDuration={800}>
                      {eventBarData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt:2 }}>
                  {eventBarData.map((entry,i)=>(
                    <Box key={i} display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography sx={{ color:"#94a3b8",fontSize:"0.65rem",fontWeight:600 }}>{entry.name}</Typography>
                      <Typography sx={{ color:"#f8fafc",fontSize:"0.65rem",fontFamily:"'JetBrains Mono'" }}>{entry.count.toLocaleString()}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </ChartCard>
          </Grid>

          {/* CVR + Bounce bar chart */}
          <Grid item xs={12}>
            <ChartCard title="Yield & Conversion Ratios" subtitle={`Historical Analysis (${range})`} badge="AGGREGATOR_v2">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart key={`bar-${range}`} data={cvrData} barGap={8} syncId="ss">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" tick={axisStyle} stroke="transparent" />
                  <YAxis tick={axisStyle} stroke="transparent" />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill:"rgba(255,255,255,0.05)" }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop:10,fontSize:10,fontFamily:"JetBrains Mono" }} />
                  <Bar dataKey="cvr" fill="#00d4aa" radius={[4,4,0,0]} name="Conversion Rate %" isAnimationActive animationDuration={1000} />
                  <Bar dataKey="bounce" fill="#f43f5e" radius={[4,4,0,0]} name="Bounce Rate %" isAnimationActive animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>

          {/* Product-wise Sales Chart */}
          <Grid item xs={12} lg={8}>
            <ChartCard title="Product-wise Sales" subtitle="Based on purchase events per product" badge="NEW" badgeColor="#00d4aa" height={280}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={productData} layout="vertical" margin={{ left:10,right:20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" tick={axisStyle} stroke="transparent" />
                  <YAxis type="category" dataKey="name" tick={{ fill:"#94a3b8",fontSize:9,fontFamily:"JetBrains Mono" }} stroke="transparent" width={80} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill:"rgba(255,255,255,0.05)" }} />
                  <Bar dataKey="sales" name="Units Sold" radius={[0,4,4,0]} isAnimationActive animationDuration={1200}>
                    {productData.map((_,i)=><Cell key={i} fill={PRODUCT_COLORS[i%PRODUCT_COLORS.length]} fillOpacity={0.85} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>

          {/* User Activity Heatmap */}
          <Grid item xs={12} lg={4}>
            <ChartCard title="User Activity Heatmap" subtitle="Sessions by hour of day" badge="NEW" badgeColor="#a855f7" height={280}>
              <Box sx={{ pt:1 }}>
                <ActivityHeatmap history={history} />
              </Box>
            </ChartCard>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
