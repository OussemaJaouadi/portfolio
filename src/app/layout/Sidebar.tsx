import React from "react";
import {
  Box,
  IconButton,
  Link,
  Tooltip,
  Divider,
  useTheme,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { VscFiles, VscSettingsGear, VscAccount } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import { links } from "../pages/links";
import { useNavigate } from "react-router-dom";

interface Props {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  handleThemeChange: () => void;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  mobileView?: boolean;
}

export default function Sidebar({
  expanded,
  setExpanded,
  darkMode,
  handleThemeChange,
  setSelectedIndex,
  mobileView,
}: Props) {
  const navigate = useNavigate();
  
  // Side effect icons style
  const iconStyle = {
    fontSize: 24,
    color: darkMode ? "#858585" : "#666666",
    cursor: "pointer",
    transition: "color 0.2s ease",
    "&:hover": {
      color: darkMode ? "white" : "#333333",
    },
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Top section */}
      <Box>
        {/* Toggle sidebar button */}
        <Tooltip title={expanded ? "Collapse Sidebar" : "Expand Sidebar"} placement="right">
          <IconButton
            sx={{
              width: "100%", 
              height: 48,
              borderRadius: 0,
            }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 
              <MenuOpenIcon sx={iconStyle} /> :
              <MenuIcon sx={iconStyle} />
            }
          </IconButton>
        </Tooltip>
        
        <Divider sx={{ my: 1, mx: 1 }} />
        
        {/* Files explorer */}
        <Tooltip title="Explorer" placement="right">
          <IconButton
            sx={{
              width: "100%", 
              height: 48,
              borderRadius: 0,
              bgcolor: (theme) => expanded ? 
                (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') : 
                'transparent'
            }}
            onClick={() => {
              navigate("/");
              setSelectedIndex(-1);
            }}
          >
            <VscFiles style={iconStyle} />
          </IconButton>
        </Tooltip>
        
        {/* User profile */}
        <Tooltip title="My Portfolio" placement="right">
          <IconButton
            sx={{
              width: "100%", 
              height: 48,
              borderRadius: 0,
            }}
            onClick={() => {
              navigate("/overview");
              setSelectedIndex(0);
            }}
          >
            <VscAccount style={iconStyle} />
          </IconButton>
        </Tooltip>
        
        {/* Git */}
        <Tooltip title="Source Code" placement="right">
          <Link
            href={links[0].href}
            target="_blank"
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
            }}
          >
            <BiGitBranch style={iconStyle} />
          </Link>
        </Tooltip>
      </Box>
      
      {/* Bottom section */}
      <Box>
        {/* Contact links */}
        <Divider sx={{ my: 1, mx: 1 }} />
        
        {/* Contact links section icon */}
        <Tooltip title="Contact Information" placement="right">
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              color: theme => theme.palette.mode === 'dark' ? '#858585' : '#666666',
            }}
          >
            <ContactsOutlinedIcon fontSize="small" />
          </Box>
        </Tooltip>
        
        {links.map((link) => (
          <Tooltip key={link.index} title={link.title} placement="right">
            <Link
              href={link.href}
              target="_blank"
              underline="none"
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                color: theme => theme.palette.mode === 'dark' ? '#858585' : '#666666',
                '&:hover': {
                  color: theme => theme.palette.mode === 'dark' ? 'white' : '#333333',
                  backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              {link.icon}
            </Link>
          </Tooltip>
        ))}
        
        <Divider sx={{ my: 1, mx: 1 }} />
        
        {/* Theme toggle */}
        <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"} placement="right">
          <IconButton
            sx={{
              width: "100%", 
              height: 48,
              borderRadius: 0,
            }}
            onClick={handleThemeChange}
          >
            {darkMode ? (
              <LightModeOutlinedIcon sx={iconStyle} />
            ) : (
              <DarkModeOutlinedIcon sx={iconStyle} />
            )}
          </IconButton>
        </Tooltip>
        
        {/* Settings */}
        <Tooltip title="Settings" placement="right">
          <IconButton
            sx={{
              width: "100%", 
              height: 48,
              borderRadius: 0,
            }}
            onClick={() => {
              navigate("/docs");
              setSelectedIndex(10);
            }}
          >
            <VscSettingsGear style={iconStyle} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
