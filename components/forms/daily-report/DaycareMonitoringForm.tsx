// components/forms/daily-report/DaycareMonitoringForm.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  TextField,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Checkbox,
  TextareaAutosize,
} from '@mui/material';
import {
  ExpandMore,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
} from '@mui/icons-material';

// Define interfaces for type safety
interface RatingData {
  mood: number;
  socialInteraction: number;
  followingInstructions: number;
  emotionalRegulation: number;
}

interface ActivitiesData {
  learningParticipation: number;
  playActivities: number;
  creativity: number;
  physicalActivity: number;
}

interface HealthData {
  lunchResponse: number;
  snackResponse: number;
  appetite: number;
  hydration: number;
  napTime: number;
  napQuality: number;
  bathroom: number;
  physicalComfort: number;
}

interface DevelopmentData {
  communication: number;
  motorSkills: number;
  concentration: number;
  independence: number;
}

interface DailyActivities {
  mengaji: boolean;
  hafalanSurat: boolean;
  berenang: boolean;
  bermainMusik: boolean;
  bermainBersama: boolean;
  gymnastic: boolean;
}

interface FormData {
  childName: string;
  date: string;
  behavior: RatingData;
  activities: ActivitiesData;
  health: HealthData;
  development: DevelopmentData;
  dailyActivities: DailyActivities;
  notes: string;
}

interface DaycareMonitoringFormProps {
  initialData?: FormData;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const RatingButtons = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const ratingIcons = [
    { value: 1, icon: <SentimentVeryDissatisfied />, color: '#ef4444' },
    { value: 2, icon: <SentimentDissatisfied />, color: '#f97316' },
    { value: 3, icon: <SentimentNeutral />, color: '#eab308' },
    { value: 4, icon: <SentimentSatisfied />, color: '#22c55e' },
    { value: 5, icon: <SentimentVerySatisfied />, color: '#10b981' },
  ];

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => newValue && onChange(newValue)}
      aria-label='rating'
    >
      {ratingIcons.map((rating) => (
        <ToggleButton
          key={rating.value}
          value={rating.value}
          sx={{
            '&.Mui-selected': {
              backgroundColor: `${rating.color}20`,
              color: rating.color,
            },
            color: rating.color,
          }}
        >
          {rating.icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export function DaycareMonitoringForm({
  initialData,
  onClose,
  onSubmit,
}: DaycareMonitoringFormProps) {
  const childrenNames = [
    'Almahyra Shaqueena Azkadina',
    'Arasya Hamizan Utsman',
    'Auladil Ramadanish Kusumo',
    'Bassam Athaillah',
    'Jennadira Mahalina Prasetyo',
    'Keanu Shaquille Qureshi Afendy',
    'Kenzie Akbar Putra Indarianto',
  ];

  const defaultFormData: FormData = {
    childName: '',
    date: new Date().toISOString().split('T')[0],
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
      mengaji: false,
      hafalanSurat: false,
      berenang: false,
      bermainMusik: false,
      bermainBersama: false,
      gymnastic: false,
    },
    notes: '',
  };

  const [formData, setFormData] = useState<FormData>(
    initialData || defaultFormData
  );

  const handleRatingChange = (
    category: keyof Pick<
      FormData,
      'behavior' | 'activities' | 'health' | 'development'
    >,
    field: string,
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleActivityChange = (
    field: keyof DailyActivities,
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      dailyActivities: {
        ...prev.dailyActivities,
        [field]: value,
      },
    }));
  };

  const renderRatingSection = (
    title: string,
    category: keyof Pick<
      FormData,
      'behavior' | 'activities' | 'health' | 'development'
    >,
    fields: Record<string, string>
  ) => (
    <Accordion defaultExpanded={category === 'behavior'}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant='h6'>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          {Object.entries(fields).map(([key, label]) => (
            <Box key={key}>
              <Typography variant='subtitle2' gutterBottom>
                {label}
              </Typography>
              <RatingButtons
                value={
                  formData[category][
                    key as keyof (typeof formData)[typeof category]
                  ]
                }
                onChange={(value) => handleRatingChange(category, key, value)}
              />
            </Box>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Laporan Harian' : 'Buat Laporan Harian'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Basic Info */}
          <Stack spacing={2}>
            <Select
              value={formData.childName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, childName: e.target.value }))
              }
              displayEmpty
            >
              <MenuItem value='' disabled>
                Pilih Nama Anak
              </MenuItem>
              {childrenNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              type='date'
              label='Tanggal'
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              fullWidth
            />
          </Stack>

          {/* Behavior Section */}
          {renderRatingSection('Perilaku Anak', 'behavior', {
            mood: 'Mood & sikap secara umum',
            socialInteraction: 'Interaksi dengan teman',
            followingInstructions: 'Mengikuti instruksi',
            emotionalRegulation: 'Kontrol emosi',
          })}

          {/* Activities Section */}
          {renderRatingSection('Aktivitas Harian', 'activities', {
            learningParticipation: 'Partisipasi dalam kegiatan belajar',
            playActivities: 'Respon terhadap kegiatan bermain',
            creativity: 'Kreativitas',
            physicalActivity: 'Aktivitas fisik',
          })}

          {/* Health Section */}
          {renderRatingSection('Kesehatan dan Kebutuhan Dasar', 'health', {
            lunchResponse: 'Respon terhadap makan siang',
            snackResponse: 'Respon terhadap camilan',
            appetite: 'Nafsu makan',
            hydration: 'Konsumsi air',
            napTime: 'Tidur siang',
            napQuality: 'Kualitas tidur',
            bathroom: 'Kebiasaan toilet',
            physicalComfort: 'Kenyamanan fisik',
          })}

          {/* Development Section */}
          {renderRatingSection('Perkembangan', 'development', {
            communication: 'Komunikasi',
            motorSkills: 'Keterampilan motorik',
            concentration: 'Konsentrasi',
            independence: 'Kemandirian',
          })}

          {/* Daily Activities */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant='h6'>Kegiatan yang diikuti</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                {Object.entries({
                  mengaji: 'Mengaji',
                  hafalanSurat: 'Hafalan Surat Pendek',
                  berenang: 'Berenang',
                  bermainMusik: 'Bermain Musik',
                  bermainBersama: 'Bermain Bersama',
                  gymnastic: 'Gymnastic',
                }).map(([key, label]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={
                          formData.dailyActivities[key as keyof DailyActivities]
                        }
                        onChange={(e) =>
                          handleActivityChange(
                            key as keyof DailyActivities,
                            e.target.checked
                          )
                        }
                      />
                    }
                    label={label}
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Notes */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Catatan Lain
            </Typography>
            <TextareaAutosize
              minRows={4}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder='Tambahkan catatan di sini...'
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button onClick={() => onSubmit(formData)} variant='contained'>
          {initialData ? 'Update' : 'Simpan'}
        </Button>
      </DialogActions>
    </>
  );
}
