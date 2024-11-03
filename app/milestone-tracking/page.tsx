// app/milestone-tracking/page.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Tab,
  Tabs,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  //   Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  PhotoCamera as PhotoIcon,
  Note as NoteIcon,
} from '@mui/icons-material';
import { MilestoneForm } from '@/components/forms/milestone-tracking/MilestoneForm';

interface Milestone {
  id: string;
  category: string;
  ageGroup: string;
  description: string;
  achieved: boolean;
  achievedDate?: string;
  notes?: string;
  photos?: string[];
}

interface CategoryProgress {
  total: number;
  achieved: number;
}

interface ChildMilestones {
  [category: string]: {
    [ageGroup: string]: Milestone[];
  };
}

// Mock data
const mockChildren = [
  { id: 1, name: 'Ahmad', age: '2 tahun' },
  { id: 2, name: 'Fatima', age: '1.5 tahun' },
];

const mockMilestones: ChildMilestones = {
  physical: {
    '1-2': [
      {
        id: 'p1',
        category: 'physical',
        ageGroup: '1-2',
        description: 'Berjalan Mandiri',
        achieved: true,
        achievedDate: '2024-02-15',
        notes: 'Sudah bisa berjalan tanpa bantuan',
      },
      {
        id: 'p2',
        category: 'physical',
        ageGroup: '1-2',
        description: 'Menaiki tangga dengan bantuan',
        achieved: true,
        achievedDate: '2024-03-01',
      },
      {
        id: 'p3',
        category: 'physical',
        ageGroup: '1-2',
        description: 'Melempar bola',
        achieved: false,
      },
    ],
  },
  cognitive: {
    '1-2': [
      {
        id: 'c1',
        category: 'cognitive',
        ageGroup: '1-2',
        description: 'Mengenal warna dasar',
        achieved: true,
        achievedDate: '2024-02-20',
      },
      {
        id: 'c2',
        category: 'cognitive',
        ageGroup: '1-2',
        description: 'Menghitung 1-5',
        achieved: false,
      },
    ],
  },
  language: {
    '1-2': [
      {
        id: 'l1',
        category: 'language',
        ageGroup: '1-2',
        description: 'Mengucapkan 10+ kata',
        achieved: true,
        achievedDate: '2024-01-15',
      },
    ],
  },
  social: {
    '1-2': [
      {
        id: 's1',
        category: 'social',
        ageGroup: '1-2',
        description: 'Bermain bersama teman',
        achieved: true,
        achievedDate: '2024-02-10',
      },
    ],
  },
  self: {
    '1-2': [
      {
        id: 'sh1',
        category: 'self',
        ageGroup: '1-2',
        description: 'Makan dengan sendok',
        achieved: true,
        achievedDate: '2024-01-20',
      },
    ],
  },
};

const categories = [
  { value: 'physical', label: 'Fisik & Motorik' },
  { value: 'cognitive', label: 'Kognitif' },
  { value: 'language', label: 'Bahasa' },
  { value: 'social', label: 'Sosial & Emosional' },
  { value: 'self', label: 'Kemandirian' },
];

export default function MilestoneTrackingPage() {
  const [selectedChild, setSelectedChild] = useState<number | ''>('');
  const [activeTab, setActiveTab] = useState('physical');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const calculateProgress = (category: string): CategoryProgress => {
    const milestones = mockMilestones[category]?.['1-2'] || [];
    const total = milestones.length;
    const achieved = milestones.filter((m) => m.achieved).length;
    return { total, achieved };
  };

  const renderMilestoneSection = (category: string) => {
    const milestones = mockMilestones[category]?.['1-2'] || [];
    const progress = calculateProgress(category);

    return (
      <Card>
        <CardHeader
          title={categories.find((c) => c.value === category)?.label}
          subheader={`Usia 1-2 Tahun`}
        />
        <CardContent>
          <Stack spacing={2}>
            {milestones.map((milestone) => (
              <Paper key={milestone.id} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Checkbox checked={milestone.achieved} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='body1'>
                      {milestone.description}
                    </Typography>
                    {milestone.achievedDate && (
                      <Typography variant='caption' color='text.secondary'>
                        Tercapai pada:{' '}
                        {new Date(milestone.achievedDate).toLocaleDateString(
                          'id-ID'
                        )}
                      </Typography>
                    )}
                  </Box>
                  <Stack direction='row' spacing={1}>
                    <IconButton size='small' color='primary'>
                      <NoteIcon />
                    </IconButton>
                    <IconButton size='small' color='primary'>
                      <PhotoIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </Paper>
            ))}

            {/* Progress Bar */}
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant='body2'>Progress</Typography>
                <Typography variant='body2'>
                  {progress.achieved}/{progress.total} milestone tercapai
                </Typography>
              </Box>
              <LinearProgress
                variant='determinate'
                value={(progress.achieved / progress.total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            {/* Latest Notes */}
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='subtitle2' gutterBottom>
                  Catatan Perkembangan Terkini
                </Typography>
                <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                  <Typography variant='body2'>
                    Ahmad menunjukkan kemajuan signifikan dalam keseimbangan.
                    Sudah bisa berjalan mundur dan menaiki tangga dengan bantuan
                    minimal.
                  </Typography>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ mt: 1, display: 'block' }}
                  >
                    Dicatat oleh: Pengasuh Ani - 11/3/2024
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </CardContent>
      </Card>
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
        <Typography variant='h4'>Tracking Milestone</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Pilih Anak</InputLabel>
            <Select
              value={selectedChild}
              label='Pilih Anak'
              onChange={(e) => setSelectedChild(e.target.value as number)}
            >
              {mockChildren.map((child) => (
                <MenuItem key={child.id} value={child.id}>
                  {child.name} ({child.age})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
          >
            Tambah Pencapaian
          </Button>
        </Box>
      </Box>

      {/* Category Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        {categories.map((category) => (
          <Tab
            key={category.value}
            label={category.label}
            value={category.value}
          />
        ))}
      </Tabs>

      {/* Content Section */}
      <Box sx={{ mt: 2 }}>{renderMilestoneSection(activeTab)}</Box>

      {/* Form Dialog */}
      <MilestoneForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        category={activeTab}
      />
    </Box>
  );
}
