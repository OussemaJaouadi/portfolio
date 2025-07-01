import {
  Box,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import logo from "../../static/unnamed.jpg";
import { useLocation } from "react-router-dom";
import { links } from "./links";

interface Props {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Home({ setSelectedIndex }: Props) {
  const { pathname } = useLocation();
  useEffect(() => {
    setSelectedIndex(-1);
  }, [setSelectedIndex]);

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME!;
  }, [pathname]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ 
        minHeight: `calc(100vh - 20px - 33px)`,
        background: theme => theme.palette.mode === 'dark' 
          ? 'linear-gradient(to bottom, rgba(30,30,30,1) 0%, rgba(30,30,30,0.9) 100%)'
          : 'linear-gradient(to bottom, rgba(248,249,250,1) 0%, rgba(248,249,250,0.9) 100%)'
      }}
      className="page-transition"
    >
      <Grid item xs={12} sx={{ 
          maxWidth: "900px", 
          width: "100%", 
          padding: { xs: 2, sm: 3, md: 4 },
          animation: 'fadeIn 0.8s ease-out',
          transform: 'translateY(-20px)'
        }}>
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={4}
          alignItems="center"
          sx={{ 
            padding: { xs: 2, sm: 4, md: 5 },
            borderRadius: 3,
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(37, 37, 39, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(31, 38, 135, 0.1)'
          }}
        >
          <Box display="flex" sx={{ justifyContent: "center", alignItems: "center", ml: { xs: 0, sm: 2 } }}>
            <Box
              component="img"
              src={logo} 
              width="180px" 
              alt="Oussema Jaouadi" 
              className="home-avatar"
              sx={{ 
                borderRadius: '50%',
                border: '4px solid',
                borderColor: theme => theme.palette.mode === 'dark' ? '#90caf9' : '#0d6efd',
                boxShadow: theme => theme.palette.mode === 'dark' 
                  ? '0 8px 24px rgba(144, 202, 249, 0.3)' 
                  : '0 8px 24px rgba(13, 110, 253, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: theme => theme.palette.mode === 'dark' 
                    ? '0 12px 28px rgba(144, 202, 249, 0.4)' 
                    : '0 12px 28px rgba(13, 110, 253, 0.3)',
                }
              }}
            />
          </Box>
          <Box sx={{ flex: 1, mr: { xs: 0, sm: 2 } }}>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  background: theme => theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                    : 'linear-gradient(45deg, #0d6efd 30%, #0a58ca 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  letterSpacing: '-0.02em'
                }}
              >
                Oussema Jaouadi
              </Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: theme => theme.palette.mode === 'dark' ? '#adb5bd' : '#495057',
                  mb: 2,
                  letterSpacing: '0.02em',
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                }}
              >
                Site Reliability Engineer | Platform Engineer
              </Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Typography 
                variant="body1" 
                sx={{
                  color: theme => theme.palette.mode === 'dark' ? '#adb5bd' : '#6c757d',
                  mb: 3,
                  textAlign: { xs: 'center', sm: 'left' },
                  maxWidth: '500px',
                  lineHeight: 1.6
                }}
              >
                Passionate about building resilient, scalable systems and optimizing infrastructure for reliability and performance.
              </Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Stack direction="row" spacing={1}>
                {links.map((link) => (
                  <Tooltip key={link.index} title={link.title} arrow>
                    <Link
                      target="_blank"
                      href={link.href}
                      underline="none"
                      color="inherit"
                      sx={{ display: 'block' }}
                    >
                      <IconButton 
                        color="primary"
                        sx={{
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            backgroundColor: theme => theme.palette.mode === 'dark' 
                              ? 'rgba(144, 202, 249, 0.1)' 
                              : 'rgba(13, 110, 253, 0.1)',
                          }
                        }}
                      >
                        {link.icon}
                      </IconButton>
                    </Link>
                  </Tooltip>
                ))}
              </Stack>
            </Grid>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
