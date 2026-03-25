// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#00d4aa",
//       light: "#33ddbb",
//       dark: "#009977",
//       contrastText: "#0a0f1a",
//     },
//     secondary: {
//       main: "#3b82f6",
//       light: "#60a5fa",
//       dark: "#1d4ed8",
//     },
//     error: { main: "#ef4444" },
//     warning: { main: "#f59e0b" },
//     success: { main: "#10b981" },
//     background: {
//       default: "#07090f",
//       paper: "#0d1117",
//     },
//     text: {
//       primary: "#e2e8f0",
//       secondary: "#64748b",
//     },
//     divider: "#1e293b",
//   },
//   typography: {
//     fontFamily: "'Syne', 'Inter', sans-serif",
//     h1: { fontWeight: 800 },
//     h2: { fontWeight: 700 },
//     h3: { fontWeight: 700 },
//     h4: { fontWeight: 600 },
//     h5: { fontWeight: 600 },
//     h6: { fontWeight: 600 },
//     button: { fontWeight: 600, textTransform: "none" },
//   },
//   shape: { borderRadius: 12 },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 10,
//           padding: "10px 22px",
//           fontSize: "0.875rem",
//           transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
//           "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" },
//           "&:active": { transform: "translateY(0)" },
//         },
//         containedPrimary: {
//           background: "linear-gradient(135deg, #00d4aa, #0088ff)",
//           color: "#07090f",
//           fontWeight: 700,
//           "&:hover": {
//             background: "linear-gradient(135deg, #00e8bb, #0099ff)",
//             boxShadow: "0 8px 24px rgba(0,212,170,0.35)",
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           background: "#0d1117",
//           border: "1px solid #1e293b",
//           borderRadius: 16,
//           transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
//           "&:hover": {
//             borderColor: "rgba(0,212,170,0.3)",
//             boxShadow: "0 0 30px rgba(0,212,170,0.08), 0 8px 32px rgba(0,0,0,0.4)",
//             transform: "translateY(-3px)",
//           },
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 10,
//             "& fieldset": { borderColor: "#1e293b" },
//             "&:hover fieldset": { borderColor: "rgba(0,212,170,0.4)" },
//             "&.Mui-focused fieldset": { borderColor: "#00d4aa" },
//           },
//           "& .MuiInputLabel-root.Mui-focused": { color: "#00d4aa" },
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: { backgroundImage: "none", background: "#0d1117" },
//       },
//     },
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           background: "linear-gradient(180deg, #0a0f1a 0%, #07090f 100%)",
//           border: "none",
//           borderRight: "1px solid #1e293b",
//         },
//       },
//     },
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: {
//           background: "#1e293b",
//           border: "1px solid #334155",
//           borderRadius: 8,
//           fontSize: "0.75rem",
//           fontFamily: "'JetBrains Mono', monospace",
//         },
//       },
//     },
//     MuiBadge: {
//       styleOverrides: {
//         badge: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 },
//       },
//     },
//   },
// });

// export default theme;


// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#00d4aa", light: "#33ddbb", dark: "#009977", contrastText: "#0a0f1a" },
//     secondary: { main: "#3b82f6", light: "#60a5fa", dark: "#1d4ed8" },
//     error: { main: "#ef4444" }, warning: { main: "#f59e0b" }, success: { main: "#10b981" },
//     background: { default: "#0f172a", paper: "#1e293b" },
//     text: { primary: "#f1f5f9", secondary: "#94a3b8" },
//     divider: "#334155",
//   },
//   typography: {
//     fontFamily: "'Syne', 'Inter', sans-serif",
//     h4: { fontWeight: 800 }, h5: { fontWeight: 700 }, h6: { fontWeight: 700 },
//     button: { fontWeight: 700, textTransform: "none" },
//   },
//   shape: { borderRadius: 14 },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 10, padding: "10px 22px",
//           transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
//           "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" },
//           "&:active": { transform: "translateY(0)" },
//         },
//         containedPrimary: {
//           background: "linear-gradient(135deg, #00d4aa, #0088ff)", color: "#0a0f1a", fontWeight: 700,
//           "&:hover": { background: "linear-gradient(135deg, #00e8bb, #0099ff)", boxShadow: "0 8px 24px rgba(0,212,170,0.4)" },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           backgroundImage: "none", border: "1px solid #334155", borderRadius: 16,
//           transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
//         },
//       },
//     },
//     MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
//     MuiDrawer: { styleOverrides: { paper: { background: "#0f172a", borderRight: "1px solid #1e293b" } } },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 10,
//             "& fieldset": { borderColor: "#334155" },
//             "&:hover fieldset": { borderColor: "rgba(0,212,170,0.5)" },
//             "&.Mui-focused fieldset": { borderColor: "#00d4aa" },
//           },
//           "& .MuiInputLabel-root.Mui-focused": { color: "#00d4aa" },
//         },
//       },
//     },
//     MuiChip: { styleOverrides: { root: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 } } },
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: { background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: "0.75rem" },
//       },
//     },
//     MuiToggleButton: {
//       styleOverrides: {
//         root: {
//           border: "1px solid #334155", color: "#64748b", fontFamily: "'JetBrains Mono',monospace",
//           "&.Mui-selected": { background: "rgba(0,212,170,0.12)", color: "#00d4aa", borderColor: "rgba(0,212,170,0.3)" },
//           "&:hover": { background: "#1e293b" },
//         },
//       },
//     },
//   },
// });

// export default theme;



import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00d4aa", light: "#33ddbb", dark: "#009977", contrastText: "#0a0f1a" },
    secondary: { main: "#3b82f6", light: "#60a5fa", dark: "#1d4ed8" },
    error: { main: "#ef4444" }, warning: { main: "#f59e0b" }, success: { main: "#10b981" },
    background: { default: "#0f172a", paper: "#1e293b" },
    text: { primary: "#f1f5f9", secondary: "#94a3b8" },
    divider: "#334155",
  },
  typography: {
    fontFamily: "'Syne', 'Inter', sans-serif",
    h4: { fontWeight: 800 }, h5: { fontWeight: 700 }, h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10, padding: "10px 22px",
          transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
          "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" },
          "&:active": { transform: "translateY(0)" },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #00d4aa, #0088ff)", color: "#0a0f1a", fontWeight: 700,
          "&:hover": { background: "linear-gradient(135deg, #00e8bb, #0099ff)", boxShadow: "0 8px 24px rgba(0,212,170,0.4)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none", border: "1px solid #334155", borderRadius: 16,
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiDrawer: { styleOverrides: { paper: { background: "#0f172a", borderRight: "1px solid #1e293b" } } },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": { borderColor: "#334155" },
            "&:hover fieldset": { borderColor: "rgba(0,212,170,0.5)" },
            "&.Mui-focused fieldset": { borderColor: "#00d4aa" },
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "#00d4aa" },
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 } } },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: "0.75rem" },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: "1px solid #334155", color: "#64748b", fontFamily: "'JetBrains Mono',monospace",
          "&.Mui-selected": { background: "rgba(0,212,170,0.12)", color: "#00d4aa", borderColor: "rgba(0,212,170,0.3)" },
          "&:hover": { background: "#1e293b" },
        },
      },
    },
  },
});

export default theme;
