import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from '@mui/material';
import {
  CalendarToday,
  Dashboard,
  Warning,
  Message,
  TrendingUp,
  Storage,
  ExpandLess,
  ExpandMore,
  People,
  Event,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
  },
  {
    text: 'Laporan Harian',
    icon: <CalendarToday />,
    path: '/daily-report',
  },
  {
    text: 'Laporan Insiden',
    icon: <Warning />,
    path: '/incident-report',
  },
  {
    text: 'Log Komunikasi',
    icon: <Message />,
    path: '/communication-log',
  },
  {
    text: 'Tracking Milestone',
    icon: <TrendingUp />,
    path: '/milestone-tracking',
  },
  {
    text: 'Agenda Kegiatan',
    icon: <Event />,
    path: '/activity-agenda',
  },
  {
    text: 'Master Data',
    icon: <Storage />,
    subItems: [
      {
        text: 'Data Murid',
        icon: <People />,
        path: '/master-data/murid',
      },
    ],
  },
];

interface SidebarProps {
  open: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [masterDataOpen, setMasterDataOpen] = useState(true);

  const handleMasterDataClick = () => {
    setMasterDataOpen(!masterDataOpen);
  };

  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          mt: 8,
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <Box key={item.text}>
              {item.subItems ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleMasterDataClick}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                      {masterDataOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={masterDataOpen} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem key={subItem.text} disablePadding>
                          <ListItemButton
                            selected={pathname === subItem.path}
                            onClick={() => router.push(subItem.path)}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton
                    selected={pathname === item.path}
                    onClick={() => router.push(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              )}
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
