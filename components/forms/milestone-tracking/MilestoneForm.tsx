// components/forms/milestone-tracking/MilestoneForm.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  //   Box,
} from '@mui/material';

interface MilestoneFormProps {
  open: boolean;
  onClose: () => void;
  category: string;
}

const categories = [
  { value: 'physical', label: 'Fisik & Motorik' },
  { value: 'cognitive', label: 'Kognitif' },
  { value: 'language', label: 'Bahasa' },
  { value: 'social', label: 'Sosial & Emosional' },
  { value: 'self', label: 'Kemandirian' },
];

const ageGroups = [
  '0-1 tahun',
  '1-2 tahun',
  '2-3 tahun',
  '3-4 tahun',
  '4-5 tahun',
];

export function MilestoneForm({ open, onClose, category }: MilestoneFormProps) {
  const [formData, setFormData] = useState({
    category: category,
    ageGroup: '',
    description: '',
    achievedDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Tambah Pencapaian Milestone</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={formData.category}
                label='Kategori'
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Kelompok Usia</InputLabel>
              <Select
                value={formData.ageGroup}
                label='Kelompok Usia'
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ageGroup: e.target.value }))
                }
              >
                {ageGroups.map((age) => (
                  <MenuItem key={age} value={age}>
                    {age}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label='Deskripsi Pencapaian'
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              multiline
              rows={3}
            />

            <TextField
              fullWidth
              type='date'
              label='Tanggal Tercapai'
              value={formData.achievedDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  achievedDate: e.target.value,
                }))
              }
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label='Catatan'
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              multiline
              rows={3}
            />

            {/* TODO: Add photo upload functionality */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type='submit' variant='contained'>
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
