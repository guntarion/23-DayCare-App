// components/forms/leaderboards/AchievementForm.tsx
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
  Chip,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Slider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Favorite as HeartIcon,
  SportsScore as ScoreIcon,
  Palette as CreativeIcon,
  AutoAwesome as IndependentIcon,
} from '@mui/icons-material';

// Types
interface AchievementFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AchievementFormData) => void;
}

interface AchievementFormData {
  childId: string;
  category: string;
  achievementType: 'template' | 'custom';
  templateId?: string;
  title: string;
  description: string;
  points: number;
  date: string;
  metrics: {
    consistency: number;
    impact: number;
    difficulty: number;
  };
  evidence?: string;
  notes?: string;
}

// Achievement Categories with Metrics
const achievementCategories = {
  academic: {
    title: 'Prestasi Akademik',
    metrics: [
      'Hafalan Surat',
      'Mengenal Huruf',
      'Mengenal Angka',
      'Mengaji',
      'Kosa Kata Baru',
    ],
  },
  social: {
    title: 'Kecerdasan Sosial',
    metrics: [
      'Berbagi dengan Teman',
      'Membantu Teman',
      'Kerjasama Tim',
      'Mengikuti Aturan',
    ],
  },
  physical: {
    title: 'Perkembangan Fisik',
    metrics: [
      'Kegiatan Olahraga',
      'Berenang',
      'Senam',
      'Motorik Halus',
      'Motorik Kasar',
    ],
  },
  independence: {
    title: 'Kemandirian',
    metrics: [
      'Makan Sendiri',
      'Merapikan Mainan',
      'Toilet Training',
      'Memakai Sepatu Sendiri',
    ],
  },
  creativity: {
    title: 'Kreativitas',
    metrics: ['Menggambar', 'Bermain Musik', 'Bercerita', 'Bermain Peran'],
  },
};

// Special Achievement Templates
// const specialAchievements = [
//   {
//     title: 'Hafiz Cilik',
//     description: 'Menghafal {X} surat pendek',
//     points: 50,
//     category: 'academic',
//   },
//   {
//     title: 'Atlet Berenang',
//     description: 'Menguasai teknik dasar berenang',
//     points: 40,
//     category: 'physical',
//   },
//   {
//     title: 'Superstar Mandiri',
//     description: 'Konsisten dalam kemandirian selama {X} hari',
//     points: 45,
//     category: 'independence',
//   },
//   {
//     title: 'Sahabat Sejati',
//     description: 'Menunjukkan kepedulian luar biasa kepada teman',
//     points: 30,
//     category: 'social',
//   },
//   {
//     title: 'Seniman Cilik',
//     description: 'Berkreasi dalam kegiatan seni',
//     points: 35,
//     category: 'creativity',
//   },
// ];

// Achievement Templates with detailed scoring criteria
const achievementTemplates = {
  academic: [
    {
      id: 'ac1',
      title: 'Hafiz Cilik',
      description: 'Menghafal surat pendek baru',
      basePoints: 50,
      metrics: {
        consistency: 'Jumlah hari berturut-turut menghafal',
        impact: 'Panjang dan kompleksitas surat',
        difficulty: 'Tingkat kesulitan surat',
      },
    },
    {
      id: 'ac2',
      title: 'Mengaji Lancar',
      description: 'Peningkatan kemampuan mengaji',
      basePoints: 40,
      metrics: {
        consistency: 'Kerutinan mengaji',
        impact: 'Peningkatan kelancaran',
        difficulty: 'Tingkat materi yang dikuasai',
      },
    },
  ],
  physical: [
    {
      id: 'ph1',
      title: 'Perenang Handal',
      description: 'Pencapaian dalam berenang',
      basePoints: 45,
      metrics: {
        consistency: 'Kerutinan latihan',
        impact: 'Peningkatan kemampuan',
        difficulty: 'Teknik yang dikuasai',
      },
    },
  ],
  social: [
    {
      id: 'sc1',
      title: 'Sahabat Sejati',
      description: 'Menunjukkan sikap sosial positif',
      basePoints: 30,
      metrics: {
        consistency: 'Keajegan perilaku positif',
        impact: 'Pengaruh pada teman',
        difficulty: 'Kompleksitas situasi',
      },
    },
  ],
  independence: [
    {
      id: 'in1',
      title: 'Mandiri Penuh',
      description: 'Kemandirian dalam aktivitas sehari-hari',
      basePoints: 35,
      metrics: {
        consistency: 'Rutinitas mandiri',
        impact: 'Jumlah aktivitas',
        difficulty: 'Tingkat kemandirian',
      },
    },
  ],
  creativity: [
    {
      id: 'cr1',
      title: 'Seniman Cilik',
      description: 'Kreativitas dalam seni',
      basePoints: 40,
      metrics: {
        consistency: 'Keaktifan berkreasi',
        impact: 'Hasil karya',
        difficulty: 'Kompleksitas kreasi',
      },
    },
  ],
};

// Mock children data
const mockChildren = [
  { id: '1', name: 'Almahyra Shaqueena' },
  { id: '2', name: 'Bassam Athaillah' },
  // Add more children
];

export function AchievementForm({
  open,
  onClose,
  onSubmit,
}: AchievementFormProps) {
  const [formData, setFormData] = useState<AchievementFormData>({
    childId: '',
    category: '',
    achievementType: 'template',
    title: '',
    description: '',
    points: 0,
    date: new Date().toISOString().split('T')[0],
    metrics: {
      consistency: 5,
      impact: 5,
      difficulty: 5,
    },
    notes: '',
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <SchoolIcon />;
      case 'social':
        return <HeartIcon />;
      case 'physical':
        return <ScoreIcon />;
      case 'creativity':
        return <CreativeIcon />;
      case 'independence':
        return <IndependentIcon />;
      default:
        return <TrophyIcon />;
    }
  };

  const calculatePoints = () => {
    let basePoints = 0;
    if (formData.achievementType === 'template' && formData.templateId) {
      const template = Object.values(achievementTemplates)
        .flat()
        .find((t) => t.id === formData.templateId);
      if (template) {
        basePoints = template.basePoints;
      }
    } else {
      basePoints = 30; // Default base points for custom achievements
    }

    // Calculate multiplier based on metrics
    const metricsAverage =
      (formData.metrics.consistency +
        formData.metrics.impact +
        formData.metrics.difficulty) /
      15;

    return Math.round(basePoints * metricsAverage);
  };

  const handleMetricChange = (
    metric: keyof typeof formData.metrics,
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: value,
      },
      points: calculatePoints(),
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = Object.values(achievementTemplates)
      .flat()
      .find((t) => t.id === templateId);

    if (template) {
      setFormData((prev) => ({
        ...prev,
        templateId,
        title: template.title,
        description: template.description,
        points: template.basePoints,
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrophyIcon color='primary' />
          <Typography>Catat Pencapaian Baru</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Basic Information */}
          <FormControl fullWidth>
            <InputLabel>Pilih Anak</InputLabel>
            <Select
              value={formData.childId}
              label='Pilih Anak'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, childId: e.target.value }))
              }
            >
              {mockChildren.map((child) => (
                <MenuItem key={child.id} value={child.id}>
                  {child.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Selection */}
          <FormControl fullWidth>
            <InputLabel>Kategori Pencapaian</InputLabel>
            <Select
              value={formData.category}
              label='Kategori Pencapaian'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              {Object.entries(achievementCategories).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getCategoryIcon(key)}
                    <Typography>{value.title}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Achievement Type Selection */}
          <FormControl>
            <RadioGroup
              row
              value={formData.achievementType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  achievementType: e.target.value as 'template' | 'custom',
                }))
              }
            >
              <FormControlLabel
                value='template'
                control={<Radio />}
                label='Pilih dari Template'
              />
              <FormControlLabel
                value='custom'
                control={<Radio />}
                label='Pencapaian Kustom'
              />
            </RadioGroup>
          </FormControl>

          {/* Template Selection or Custom Achievement Input */}
          {formData.achievementType === 'template' && formData.category && (
            <FormControl fullWidth>
              <InputLabel>Pilih Template</InputLabel>
              <Select
                value={formData.templateId || ''}
                label='Pilih Template'
                onChange={(e) => handleTemplateSelect(e.target.value)}
              >
                {achievementTemplates[
                  formData.category as keyof typeof achievementTemplates
                ]?.map((template) => (
                  <MenuItem key={template.id} value={template.id}>
                    <Typography>{template.title}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {formData.achievementType === 'custom' && (
            <>
              <TextField
                fullWidth
                label='Judul Pencapaian'
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <TextField
                fullWidth
                label='Deskripsi'
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </>
          )}

          {/* Metrics */}
          <Box>
            <Typography variant='subtitle1' gutterBottom>
              Metrik Pencapaian
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography gutterBottom>Konsistensi</Typography>
                <Slider
                  value={formData.metrics.consistency}
                  onChange={(_, value) =>
                    handleMetricChange('consistency', value as number)
                  }
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay='auto'
                />
              </Box>
              <Box>
                <Typography gutterBottom>Dampak</Typography>
                <Slider
                  value={formData.metrics.impact}
                  onChange={(_, value) =>
                    handleMetricChange('impact', value as number)
                  }
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay='auto'
                />
              </Box>
              <Box>
                <Typography gutterBottom>Tingkat Kesulitan</Typography>
                <Slider
                  value={formData.metrics.difficulty}
                  onChange={(_, value) =>
                    handleMetricChange('difficulty', value as number)
                  }
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay='auto'
                />
              </Box>
            </Stack>
          </Box>

          <TextField
            fullWidth
            label='Catatan Tambahan'
            multiline
            rows={2}
            value={formData.notes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
          />

          <Box sx={{ textAlign: 'right' }}>
            <Chip
              icon={<TrophyIcon />}
              label={`${formData.points} points`}
              color='primary'
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button
          variant='contained'
          onClick={() => onSubmit(formData)}
          disabled={!formData.childId || !formData.category || !formData.title}
        >
          Simpan Pencapaian
        </Button>
      </DialogActions>
    </Dialog>
  );
}
