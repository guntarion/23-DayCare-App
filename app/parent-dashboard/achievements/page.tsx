// app/parent-dashboard/achievements/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tab,
  Tabs,
  Avatar,
  Chip,
  Stack,
  LinearProgress,
  Grid,
  Paper,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Favorite as HeartIcon,
  SportsScore as ScoreIcon,
  Palette as CreativeIcon,
  AutoAwesome as IndependentIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
} from '@mui/icons-material';

// Types
interface ChildProgress {
  id: string;
  name: string;
  age: string;
  totalPoints: number;
  achievements: Achievement[];
  monthlyProgress: {
    category: string;
    progress: number;
    level: string;
  }[];
  recentMilestones: {
    id: string;
    description: string;
    date: string;
    category: string;
  }[];
  upcomingMilestones: {
    id: string;
    description: string;
    category: string;
    estimatedCompletion?: string;
  }[];
  strengths: string[];
  areasOfFocus: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  points: number;
  feedback?: string;
  badgeColor?: string;
}

// Mock Data for parent's child
const mockChildProgress: ChildProgress = {
  id: '1',
  name: 'Almahyra Shaqueena',
  age: '2 tahun 3 bulan',
  totalPoints: 450,
  achievements: [
    {
      id: 'a1',
      title: 'Hafiz Cilik',
      description: 'Berhasil menghafal surat An-Nas dengan sempurna',
      category: 'academic',
      date: '2024-03-11',
      points: 50,
      feedback:
        'Almahyra menunjukkan kemampuan hafalan yang sangat baik dan konsisten',
      badgeColor: '#FFD700',
    },
    {
      id: 'a2',
      title: 'Perenang Pemula',
      description: 'Mulai berani berenang dengan pelampung',
      category: 'physical',
      date: '2024-03-10',
      points: 30,
      feedback: 'Perkembangan yang sangat baik dalam mengatasi rasa takut air',
      badgeColor: '#4CAF50',
    },
  ],
  monthlyProgress: [
    {
      category: 'academic',
      progress: 75,
      level: 'Berkembang Sangat Baik',
    },
    {
      category: 'social',
      progress: 85,
      level: 'Berkembang Sangat Baik',
    },
    {
      category: 'physical',
      progress: 60,
      level: 'Berkembang Sesuai Harapan',
    },
    {
      category: 'independence',
      progress: 70,
      level: 'Berkembang Sesuai Harapan',
    },
    {
      category: 'creativity',
      progress: 80,
      level: 'Berkembang Sangat Baik',
    },
  ],
  recentMilestones: [
    {
      id: 'm1',
      description: 'Dapat makan sendiri dengan sendok',
      date: '2024-03-09',
      category: 'independence',
    },
    {
      id: 'm2',
      description: 'Mengenal dan menyebutkan 5 warna dasar',
      date: '2024-03-08',
      category: 'academic',
    },
  ],
  upcomingMilestones: [
    {
      id: 'um1',
      description: 'Menghafal surat Al-Falaq',
      category: 'academic',
      estimatedCompletion: '2 minggu',
    },
    {
      id: 'um2',
      description: 'Berenang tanpa pelampung',
      category: 'physical',
      estimatedCompletion: '1 bulan',
    },
  ],
  strengths: ['Hafalan', 'Interaksi Sosial', 'Kemandirian'],
  areasOfFocus: ['Motorik Halus', 'Konsentrasi'],
};

// Helper function for category icons
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
      return <StarIcon />;
  }
};

export default function ParentAchievementsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'primary';
    if (progress >= 40) return 'warning';
    return 'error';
  };

  const renderOverviewTab = () => (
    <Grid container spacing={3}>
      {/* Child Summary Card */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                }}
              >
                {mockChildProgress.name.charAt(0)}
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant='h5'>{mockChildProgress.name}</Typography>
                <Typography variant='subtitle1' color='text.secondary'>
                  {mockChildProgress.age}
                </Typography>
                <Chip
                  icon={<TrophyIcon />}
                  label={`${mockChildProgress.totalPoints} Points`}
                  color='primary'
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Progress */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Perkembangan Bulan Ini
            </Typography>
            <Stack spacing={2}>
              {mockChildProgress.monthlyProgress.map((item) => (
                <Box key={item.category}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {getCategoryIcon(item.category)}
                    <Typography variant='body2' sx={{ ml: 1 }}>
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </Typography>
                    <Typography variant='caption' sx={{ ml: 'auto' }}>
                      {item.level}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant='determinate'
                    value={item.progress}
                    color={getProgressColor(item.progress)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Achievements */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Pencapaian Terbaru
            </Typography>
            <Stack spacing={2}>
              {mockChildProgress.achievements.map((achievement) => (
                <Paper key={achievement.id} sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ bgcolor: achievement.badgeColor }}>
                      {getCategoryIcon(achievement.category)}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant='subtitle1'>
                        {achievement.title}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {new Date(achievement.date).toLocaleDateString('id-ID')}
                      </Typography>
                    </Box>
                    <Chip
                      size='small'
                      label={`${achievement.points} pts`}
                      color='primary'
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  <Typography variant='body2'>
                    {achievement.description}
                  </Typography>
                  {achievement.feedback && (
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mt: 1, fontStyle: 'italic' }}
                    >
                      Feedback: {achievement.feedback}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Development Focus */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Fokus Pengembangan
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle2' gutterBottom>
                Keunggulan:
              </Typography>
              <Stack direction='row' spacing={1} flexWrap='wrap'>
                {mockChildProgress.strengths.map((strength, index) => (
                  <Chip
                    key={index}
                    label={strength}
                    color='success'
                    size='small'
                    icon={<StarIcon />}
                  />
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Area Pengembangan:
              </Typography>
              <Stack direction='row' spacing={1} flexWrap='wrap'>
                {mockChildProgress.areasOfFocus.map((area, index) => (
                  <Chip
                    key={index}
                    label={area}
                    color='primary'
                    variant='outlined'
                    size='small'
                  />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Upcoming Milestones */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Target Pencapaian
            </Typography>
            <Stack spacing={2}>
              {mockChildProgress.upcomingMilestones.map((milestone) => (
                <Paper key={milestone.id} sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {getCategoryIcon(milestone.category)}
                    <Typography variant='subtitle1' sx={{ ml: 1 }}>
                      {milestone.description}
                    </Typography>
                  </Box>
                  {milestone.estimatedCompletion && (
                    <Typography variant='caption' color='text.secondary'>
                      Estimasi pencapaian: {milestone.estimatedCompletion}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Perkembangan Anak
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab
          value='overview'
          label='Ringkasan'
          icon={<TimelineIcon />}
          iconPosition='start'
        />
        <Tab
          value='achievements'
          label='Pencapaian'
          icon={<TrophyIcon />}
          iconPosition='start'
        />
        <Tab
          value='milestones'
          label='Milestone'
          icon={<StarIcon />}
          iconPosition='start'
        />
      </Tabs>

      {activeTab === 'overview' && renderOverviewTab()}
      {/* Implement other tabs as needed */}
    </Box>
  );
}
