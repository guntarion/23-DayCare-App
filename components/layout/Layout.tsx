// components/layout/Layout.tsx
import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
// Update the import to use relative path since they're in the same folder
import Sidebar from '@/components/layout/Sidebar';
// or
// import Sidebar from './Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='toggle sidebar'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            edge='start'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Daycare Al Muhajirin Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: { sm: `calc(100% - ${sidebarOpen ? 240 : 0}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
