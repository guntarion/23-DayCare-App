// app/leaderboards/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import {
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  SportsScore as ScoreIcon,
  Favorite as HeartIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import { AchievementForm } from '@/components/forms/leaderboards/AchievementForm';

// Types
interface Achievement {
  id: string;
  childId: string;
  category: string;
  title: string;
  description: string;
  date: string;
  points: number;
  badgeColor?: string;
}

interface ChildStats {
  id: string;
  name: string;
  achievements: Achievement[];
  totalPoints: number;
  strengths: string[];
  recentMilestones: string[];
}

// Mock Data
const mockChildStats: ChildStats[] = [
  {
    id: '1',
    name: 'Almahyra Shaqueena',
    achievements: [
      {
        id: 'a1',
        childId: '1',
        category: 'academic',
        title: 'Hafalan Superstar',
        description: 'Menghafal 5 surat pendek dalam satu minggu',
        date: '2024-03-10',
        points: 50,
        badgeColor: '#FFD700',
      },
      {
        id: 'a2',
        childId: '1',
        category: 'social',
        title: 'Sahabat Sejati',
        description: 'Selalu berbagi dan membantu teman',
        date: '2024-03-09',
        points: 30,
        badgeColor: '#9C27B0',
      },
    ],
    totalPoints: 80,
    strengths: ['Komunikasi', 'Kemandirian', 'Hafalan'],
    recentMilestones: ['Bisa makan sendiri', 'Mengenal semua warna'],
  },
  // Add more children data...
];

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState('overall');
  const [addAchievementOpen, setAddAchievementOpen] = useState(false);

  const renderAchievementCard = (achievement: Achievement) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: achievement.badgeColor }}>
            <TrophyIcon />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1' fontWeight='bold'>
              {achievement.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {achievement.description}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                size='small'
                icon={<StarIcon sx={{ fontSize: 16 }} />}
                label={`${achievement.points} points`}
                color='primary'
              />
              <Typography variant='caption' color='text.secondary'>
                {new Date(achievement.date).toLocaleDateString('id-ID')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderChildLeaderboard = (child: ChildStats) => (
    <Card key={child.id} sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
            {child.name.charAt(0)}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant='h6'>{child.name}</Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              Total Points: {child.totalPoints}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle2' gutterBottom>
            Keunggulan:
          </Typography>
          <Stack direction='row' spacing={1} flexWrap='wrap'>
            {child.strengths.map((strength, index) => (
              <Chip
                key={`${child.id}-strength-${index}`}
                label={strength}
                size='small'
                icon={<StarIcon />}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>

        <Typography variant='subtitle2' gutterBottom>
          Pencapaian Terbaru:
        </Typography>
        {child.achievements.map((achievement) => (
          <Box key={`${child.id}-achievement-${achievement.id}`}>
            {renderAchievementCard(achievement)}
          </Box>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4'>Pencapaian Anak</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setAddAchievementOpen(true)}
        >
          Tambah Pencapaian
        </Button>
      </Box>

      {/* Category Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab
          value='overall'
          label='Semua'
          icon={<TrophyIcon />}
          iconPosition='start'
        />
        <Tab
          value='academic'
          label='Akademik'
          icon={<SchoolIcon />}
          iconPosition='start'
        />
        <Tab
          value='social'
          label='Sosial'
          icon={<HeartIcon />}
          iconPosition='start'
        />
        <Tab
          value='physical'
          label='Fisik'
          icon={<ScoreIcon />}
          iconPosition='start'
        />
      </Tabs>

      {/* Leaderboards Content */}
      <Box>{mockChildStats.map((child) => renderChildLeaderboard(child))}</Box>

      {/* Add Achievement Dialog - Basic structure */}
      <AchievementForm
        open={addAchievementOpen}
        onClose={() => setAddAchievementOpen(false)}
        onSubmit={(data) => {
          console.log('New achievement:', data);
          setAddAchievementOpen(false);
          // Handle achievement submission
        }}
      />
    </Box>
  );
}
