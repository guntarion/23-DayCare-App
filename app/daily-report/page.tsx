// app/daily-report/page.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { DaycareMonitoringForm } from '@/components/forms/daily-report/DaycareMonitoringForm';

interface Report {
  id: number;
  date: string;
  childName: string;
  overallMood: string;
  activities: string[];
  status: 'sent' | 'draft';
}

// Mock data - replace with actual data from your backend
const mockReports: Report[] = [
  {
    id: 1,
    date: '2024-03-11',
    childName: 'Almahyra Shaqueena Azkadina',
    overallMood: 'Baik',
    activities: ['Mengaji', 'Bermain Bersama'],
    status: 'sent',
  },
  {
    id: 2,
    date: '2024-03-11',
    childName: 'Bassam Athaillah',
    overallMood: 'Sangat Baik',
    activities: ['Berenang', 'Gymnastic'],
    status: 'draft',
  },
  // Add more mock data as needed
];

export default function DailyReportPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleCreateNew = () => {
    setSelectedReport(null);
    setIsFormOpen(true);
  };

  const handleView = (report: Report) => {
    setSelectedReport(report);
    setIsFormOpen(true);
  };

  // Convert Report to FormData
  const convertReportToFormData = (report: Report) => {
    return {
      childName: report.childName,
      date: report.date,
      behavior: {
        mood: 0,
        socialInteraction: 0,
        followingInstructions: 0,
        emotionalRegulation: 0,
      },
      activities: {
        learningParticipation: 0,
        playActivities: 0,
        creativity: 0,
        physicalActivity: 0,
      },
      health: {
        lunchResponse: 0,
        snackResponse: 0,
        appetite: 0,
        hydration: 0,
        napTime: 0,
        napQuality: 0,
        bathroom: 0,
        physicalComfort: 0,
      },
      development: {
        communication: 0,
        motorSkills: 0,
        concentration: 0,
        independence: 0,
      },
      dailyActivities: {
        mengaji: report.activities.includes('Mengaji'),
        hafalanSurat: false,
        berenang: report.activities.includes('Berenang'),
        bermainMusik: false,
        bermainBersama: report.activities.includes('Bermain Bersama'),
        gymnastic: report.activities.includes('Gymnastic'),
      },
      notes: '',
    };
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
        <Typography variant='h4'>Laporan Harian</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Buat Laporan
        </Button>
      </Box>

      {/* Daily Reports Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Nama Anak</TableCell>
              <TableCell>Mood</TableCell>
              <TableCell>Kegiatan</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  {new Date(report.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell>{report.childName}</TableCell>
                <TableCell>{report.overallMood}</TableCell>
                <TableCell>
                  {report.activities.map((activity) => (
                    <Chip
                      key={activity}
                      label={activity}
                      size='small'
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <Chip
                    label={report.status === 'sent' ? 'Terkirim' : 'Draft'}
                    color={report.status === 'sent' ? 'success' : 'default'}
                    size='small'
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size='small'
                    onClick={() => handleView(report)}
                    color='primary'
                  >
                    {report.status === 'sent' ? <ViewIcon /> : <EditIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form Dialog */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth='md'
        fullWidth
      >
        <DaycareMonitoringForm
          initialData={
            selectedReport ? convertReportToFormData(selectedReport) : undefined
          }
          onClose={() => setIsFormOpen(false)}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            setIsFormOpen(false);
          }}
        />
      </Dialog>
    </Box>
  );
}
