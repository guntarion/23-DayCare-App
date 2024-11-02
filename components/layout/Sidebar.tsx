import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import {
  CalendarToday,
  Warning,
  Message,
  TrendingUp,
  Storage,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
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
    text: 'Master Data',
    icon: <Storage />,
    path: '/master-data',
  },
];

interface SidebarProps {
  open: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

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
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => router.push(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
