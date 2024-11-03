// app/activity-agenda/page.tsx
'use client';

import { useState, Fragment } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { KegiatanForm } from '@/components/forms/activity-agenda/KegiatanForm';

interface Kegiatan {
  id: number;
  nama: string;
  tanggal: string;
  waktuMulai: string;
  waktuSelesai: string;
  kelompokUsia: string;
  pengasuh: string;
  deskripsi: string;
  perlengkapan?: string[];
  catatan?: string;
  tipe: 'harian' | 'khusus' | 'berulang';
  status: 'upcoming' | 'ongoing' | 'completed';
}

const kelompokUsia = [
  'Semua Kelompok',
  'Kelompok 0-1 tahun',
  'Kelompok 1-2 tahun',
  'Kelompok 2-3 tahun',
];

export default function AgendaKegiatanPage() {
  const [selectedKelompok, setSelectedKelompok] = useState('Semua Kelompok');
  const [activeTab, setActiveTab] = useState('calendar');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState<
    Kegiatan | undefined
  >(undefined);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleCreateNew = () => {
    setSelectedKegiatan(undefined);
    setIsFormOpen(true);
  };

  const renderCalendarView = () => {
    const days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];

    // Get current date info
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startingDayIndex = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Create array for calendar dates
    const calendarDays = Array(42)
      .fill(null)
      .map((_, index) => {
        const dayNumber = index - startingDayIndex + 1;
        return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
      });

    return (
      <Card>
        <CardContent>
          {/* Days of week header */}
          <Grid container spacing={1} sx={{ mb: 1 }}>
            {days.map((day) => (
              <Grid item xs key={day}>
                <Paper
                  sx={{
                    p: 1,
                    textAlign: 'center',
                    bgcolor: 'grey.100',
                  }}
                >
                  <Typography variant='subtitle2'>{day}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Calendar grid */}
          <Grid container spacing={1}>
            {calendarDays.map((day, i) => (
              <Grid item xs key={i}>
                <Paper
                  sx={{
                    p: 1,
                    minHeight: 100,
                    '&:hover': { bgcolor: 'grey.50' },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {day !== null && (
                    <>
                      <Typography
                        variant='caption'
                        sx={{ alignSelf: 'flex-end', mb: 1 }}
                      >
                        {day}
                      </Typography>
                      {day === 15 && (
                        <Stack spacing={0.5}>
                          <Chip
                            label='09:00 - Penimbangan'
                            size='small'
                            color='primary'
                            sx={{ fontSize: '0.75rem' }}
                          />
                          <Chip
                            label='10:00 - Bermain Sensorik'
                            size='small'
                            color='success'
                            sx={{ fontSize: '0.75rem' }}
                          />
                        </Stack>
                      )}
                    </>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const renderWeeklySchedule = () => {
    const times = [
      '08:00 - 09:00',
      '09:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
    ];
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

    return (
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            {/* Header */}
            <Grid item xs={2}>
              <Paper sx={{ p: 1, bgcolor: 'grey.100' }}>
                <Typography variant='subtitle2'>Waktu</Typography>
              </Paper>
            </Grid>
            {days.map((day) => (
              <Grid item xs={2} key={day}>
                <Paper sx={{ p: 1, bgcolor: 'grey.100' }}>
                  <Typography variant='subtitle2'>{day}</Typography>
                </Paper>
              </Grid>
            ))}

            {/* Schedule */}
            {times.map((time) => (
              <Fragment key={time}>
                <Grid item xs={2}>
                  <Paper sx={{ p: 1 }}>
                    <Typography variant='caption'>{time}</Typography>
                  </Paper>
                </Grid>
                {days.map((day) => (
                  <Grid item xs={2} key={`${time}-${day}`}>
                    <Paper
                      sx={{
                        p: 1,
                        bgcolor:
                          time === '08:00 - 09:00'
                            ? 'warning.50'
                            : 'background.default',
                      }}
                    >
                      {time === '08:00 - 09:00' && (
                        <Typography variant='caption'>Penyambutan</Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Fragment>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const renderSpecialActivities = () => {
    return (
      <Stack spacing={3}>
        {/* Upcoming Activities */}
        <Card>
          <CardContent>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ borderLeft: 4, borderColor: 'primary.main', pl: 2 }}
            >
              Kegiatan Khusus Mendatang
            </Typography>
          </CardContent>
        </Card>

        {/* Recurring Activities */}
        <Card>
          <CardContent>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ borderLeft: 4, borderColor: 'success.main', pl: 2 }}
            >
              Kegiatan Rutin
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    );
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4'>Agenda Kegiatan</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Kelompok Usia</InputLabel>
            <Select
              value={selectedKelompok}
              label='Kelompok Usia'
              onChange={(e) => setSelectedKelompok(e.target.value)}
            >
              {kelompokUsia.map((kelompok) => (
                <MenuItem key={kelompok} value={kelompok}>
                  {kelompok}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
          >
            Tambah Kegiatan
          </Button>
        </Box>
      </Box>

      {/* View Options */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label='Kalender' value='calendar' />
        <Tab label='Jadwal Mingguan' value='schedule' />
        <Tab label='Kegiatan Khusus' value='special' />
      </Tabs>

      {/* Content Section */}
      <Box sx={{ mt: 2 }}>
        {activeTab === 'calendar' && renderCalendarView()}
        {activeTab === 'schedule' && renderWeeklySchedule()}
        {activeTab === 'special' && renderSpecialActivities()}
      </Box>

      {/* Form Dialog */}
      <KegiatanForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={selectedKegiatan}
      />
    </Box>
  );
}
