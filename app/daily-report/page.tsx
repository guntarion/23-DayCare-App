// app/daily-report/page.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { DaycareMonitoringForm } from '@/components/forms/daily-report/DaycareMonitoringForm';

export default function DailyReportPage() {
  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Laporan Harian
      </Typography>
      <DaycareMonitoringForm />
    </Box>
  );
}
