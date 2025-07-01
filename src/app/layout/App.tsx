import {
  Box,
  CssBaseline,
  createTheme,
  darkScrollbar,
  Fab,
  IconButton,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Components
import Sidebar from "./Sidebar";
import AppTree from "./AppTree";
import AppButtons from "./AppButtons";
import MDContainer from "../components/MDContainer";
import Home from "../pages/Home";
import { pages } from "../pages/pages";
import usePageTracking from "../hooks/usePageTracking";

// Styles
import "../styles/global.css";

interface Page {
  index: number;
  name: string;
  route: string;
  visible: boolean;
}

function initVisiblePageIndexes(pages: Page[]) {
  return pages.filter((page) => page.visible).map((page) => page.index);
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isMobile = useMediaQuery("(max-width:768px)");

  // State
  const [expanded, setExpanded] = useState(!isMobile);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentComponent, setCurrentComponent] = useState("");
  const [visiblePageIndexes, setVisiblePageIndexes] = useState(
    initVisiblePageIndexes(pages)
  );
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : prefersDarkMode;
  });
  const [visiblePages, setVisiblePages] = useState(
    pages.filter((x) => x.visible)
  );
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);

  // Handle theme toggle
  const handleThemeChange = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    
    // Add or remove dark-mode class from body for global CSS selectors
    if (newDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setExpanded(!expanded);
    if (isMobile) {
      setShowMobileOverlay(!expanded);
    }
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && expanded) {
      setExpanded(false);
      setShowMobileOverlay(false);
    }
  };

  // Update sidebar state when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setShowMobileOverlay(false);
    } else if (expanded) {
      setShowMobileOverlay(true);
    }
  }, [isMobile]);
  
  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile && expanded) {
      setExpanded(false);
      setShowMobileOverlay(false);
    }
  }, [location.pathname, isMobile]);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  
  // Page tracking
  usePageTracking();

  // Create and configure theme
  let theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#1e1e1e" : "#f8f9fa",
        paper: darkMode ? "#252527" : "#ffffff",
      },
      primary: {
        main: darkMode ? "#90caf9" : "#0d6efd",
      },
      secondary: {
        main: darkMode ? "#bdbdbd" : "#6c757d",
      },
      text: {
        primary: darkMode ? "#e0e0e0" : "#212529",
        secondary: darkMode ? "#adb5bd" : "#6c757d",
      },
    },
    typography: {
      fontFamily: ['Roboto', 'Segoe UI', 'Arial', 'sans-serif'].join(','),
      h1: { fontWeight: 600 },
      h2: { fontWeight: 500 },
      body1: { lineHeight: 1.6 },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: darkMode ? darkScrollbar() : null,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#252527" : "#ffffff",
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: darkMode 
              ? "0 2px 8px rgba(0,0,0,0.25)"
              : "0 2px 8px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  });

  // Make theme responsive
  theme = responsiveFontSizes(theme);

  // Handle mobile view
  useEffect(() => {
    // Auto-collapse sidebar on mobile
    if (isMobile && expanded) {
      setExpanded(false);
    }
  }, [isMobile]);

  // Handle visible pages
  useEffect(() => {
    const newPages = [];
    for (const index of visiblePageIndexes) {
      const page = pages.find((x) => x.index === index);
      if (page) newPages.push(page);
    }
    setVisiblePages(newPages);

    if (visiblePageIndexes.length === 0) {
      setSelectedIndex(-1);
      navigate("/");
    } else if (
      selectedIndex !== -1 &&
      !visiblePageIndexes.includes(selectedIndex)
    ) {
      // If selected page is removed, select another one
      const newSelectedIndex = Math.min(...visiblePageIndexes);
      setSelectedIndex(newSelectedIndex);

      const newPage = pages.find((x) => x.index === newSelectedIndex);
      if (newPage) navigate(newPage.route);
    }
  }, [visiblePageIndexes, navigate, selectedIndex]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box
        className={darkMode ? "dark-mode" : ""}
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          bgcolor: darkMode ? "#1e1e1e" : "#f8f9fa",
        }}
      >
        {/* Main narrow sidebar - always visible */}
        <Box
          sx={{
            width: 50,
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1200,
            bgcolor: darkMode ? "#333333" : "#f8f8f8",
            borderRight: 1,
            borderColor:
              darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            boxShadow: darkMode ? "none" : "0 0 10px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
          }}
          className="sidebar-container"
        >
          <Sidebar
            expanded={expanded}
            setExpanded={setExpanded}
            darkMode={darkMode}
            handleThemeChange={handleThemeChange}
            setSelectedIndex={setSelectedIndex}
            mobileView={isMobile}
          />
        </Box>

        {/* Expanded side panel with file tree */}
        <Box
          sx={{
            width: expanded ? 220 : 0,
            height: "100%",
            position: "fixed",
            top: 0,
            left: 50,
            zIndex: isMobile ? 1200 : 1100,
            bgcolor: darkMode ? "#252527" : "#f3f3f3",
            borderRight: 1,
            borderColor:
              darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            transition: "width 0.3s ease, opacity 0.3s ease, visibility 0.3s",
            overflow: "hidden",
            opacity: expanded ? 1 : 0,
            visibility: expanded ? "visible" : "hidden",
            boxShadow: darkMode ? "none" : "2px 0 5px rgba(0,0,0,0.05)",
          }}
          className={`sidebar-expanded ${expanded ? "expanded" : ""}`}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              EXPLORER
            </Typography>
            <AppTree
              pages={pages.filter((x) => x.visible)}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              currentComponent={currentComponent}
              setCurrentComponent={setCurrentComponent}
              visiblePageIndexs={visiblePageIndexes}
              setVisiblePageIndexs={setVisiblePageIndexes}
            />
          </Box>
        </Box>

        {/* Main content area */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: { xs: 50, md: expanded ? 270 : 50 },
            width: { xs: `calc(100% - 50px)`, md: expanded ? `calc(100% - 270px)` : `calc(100% - 50px)` },
            transition: "margin 0.3s ease, width 0.3s ease",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "absolute",
            right: 0,
          }}
        >
          {/* Tabs bar */}
          <Box
            sx={{
              height: 40,
              borderBottom: 1,
              borderColor:
                darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              bgcolor: darkMode ? "#252527" : "#f3f3f3",
            }}
          >
            <AppButtons
              pages={visiblePages}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              currentComponent={currentComponent}
              setCurrentComponent={setCurrentComponent}
              visiblePageIndexs={visiblePageIndexes}
              setVisiblePageIndexs={setVisiblePageIndexes}
            />
          </Box>

          {/* Content area */}
          <Box
            className="content-container"
            sx={{
              flexGrow: 1,
              overflow: "auto",
              p: { xs: 2, sm: 3 },
              bgcolor: darkMode ? "#1e1e1e" : "#f8f9fa",
              minHeight: 0, // This is important for proper flexbox behavior
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<Home setSelectedIndex={setSelectedIndex} />}
              />
              {pages.map(({ index, name, route }) => (
                <Route
                  key={index}
                  path={route}
                  element={
                    <MDContainer
                      path={`${process.env.PUBLIC_URL}/pages/${name}`}
                    />
                  }
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>

        {/* Mobile sidebar toggle button */}
        {isMobile && (
          <Fab
            color="primary"
            size="medium"
            aria-label="toggle sidebar"
            onClick={toggleSidebar}
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1300,
            }}
          >
            {expanded ? <CloseIcon /> : <MenuIcon />}
          </Fab>
        )}
        
        {/* Overlay for mobile when sidebar is expanded */}
        {showMobileOverlay && (
          <Box
            onClick={handleOverlayClick}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 1050,
              display: { xs: "block", md: "none" }
            }}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
