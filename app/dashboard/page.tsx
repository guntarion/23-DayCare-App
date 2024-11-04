// app/dashboard/page.tsx
'use client';

import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  //   IconButton,
} from '@mui/material';
import {
  People as PeopleIcon,
  AccessTime as ClockIcon,
  Warning as AlertIcon,
  Event as CalendarIcon,
  BabyChangingStation as BabyIcon,
  TrendingUp as TrendingUpIcon,
  //   Visibility as ViewIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const attendanceData = [
  { name: 'Sen', value: 45 },
  { name: 'Sel', value: 48 },
  { name: 'Rab', value: 47 },
  { name: 'Kam', value: 46 },
  { name: 'Jum', value: 44 },
];

const dailyActivities = [
  {
    id: 1,
    activity: 'Bermain Sensorik',
    time: '09:00 - 10:00',
    participants: 15,
    icon: <BabyIcon />,
  },
  {
    id: 2,
    activity: 'Penimbangan Rutin',
    time: '10:30 - 11:30',
    participants: 48,
    icon: <TrendingUpIcon />,
  },
];

const recentReports = [
  {
    id: 1,
    name: 'Almahyra Shaqueena',
    description: 'Perkembangan motorik meningkat signifikan',
    time: '2 jam yang lalu',
    severity: 'info',
  },
  {
    id: 2,
    name: 'Bassam Athaillah',
    description: 'Catatan kesehatan: Alergi makanan baru terdeteksi',
    time: '4 jam yang lalu',
    severity: 'warning',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Pemeriksaan Kesehatan Rutin',
    date: '15 Maret 2024',
    status: 'upcoming',
  },
  {
    id: 2,
    title: "Parent's Day",
    date: '20 Maret 2024',
    status: 'planning',
  },
];

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                color: 'primary.main',
              }}
            >
              <PeopleIcon />
            </Box>
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Jumlah Anak Aktif
              </Typography>
              <Typography variant='h4'>48</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: '50%',
                bgcolor: 'success.light',
                color: 'success.main',
              }}
            >
              <ClockIcon />
            </Box>
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Kehadiran Hari Ini
              </Typography>
              <Typography variant='h4'>44</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: '50%',
                bgcolor: 'warning.light',
                color: 'warning.main',
              }}
            >
              <AlertIcon />
            </Box>
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Insiden Bulan Ini
              </Typography>
              <Typography variant='h4'>3</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: '50%',
                bgcolor: 'secondary.light',
                color: 'secondary.main',
              }}
            >
              <CalendarIcon />
            </Box>
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Kegiatan Hari Ini
              </Typography>
              <Typography variant='h4'>6</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts and Lists */}
      <Grid container spacing={3}>
        {/* Attendance Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Tren Kehadiran Mingguan' />
            <CardContent sx={{ height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke='#1976d2'
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Activities */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Aktivitas Hari Ini' />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dailyActivities.map((activity) => (
                  <Paper
                    key={activity.id}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      bgcolor: 'grey.50',
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                      }}
                    >
                      {activity.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant='subtitle1'>
                        {activity.activity}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {activity.time}
                      </Typography>
                    </Box>
                    <Typography variant='body2' color='text.secondary'>
                      {activity.participants} anak
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Reports */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Laporan Terbaru' />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentReports.map((report) => (
                  <Box
                    key={report.id}
                    sx={{
                      borderLeft: 6,
                      borderColor: `${report.severity}.main`,
                      pl: 2,
                      py: 1,
                    }}
                  >
                    <Typography variant='subtitle1'>{report.name}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {report.description}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {report.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Agenda Mendatang' />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {upcomingEvents.map((event) => (
                  <Paper
                    key={event.id}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      bgcolor: 'grey.50',
                    }}
                  >
                    <Box>
                      <Typography variant='subtitle1'>{event.title}</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {event.date}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 8,
                        bgcolor:
                          event.status === 'upcoming'
                            ? 'primary.lighter'
                            : 'secondary.lighter',
                        color:
                          event.status === 'upcoming'
                            ? 'primary.main'
                            : 'secondary.main',
                      }}
                    >
                      <Typography variant='caption'>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Planning'}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
