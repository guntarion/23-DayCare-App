// components/forms/activity-agenda/KegiatanForm.tsx
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
  Box,
  //   Chip,
} from '@mui/material';

interface Kegiatan {
  id?: number;
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

interface KegiatanFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Kegiatan;
}

const kelompokUsia = [
  'Semua Kelompok',
  'Kelompok 0-1 tahun',
  'Kelompok 1-2 tahun',
  'Kelompok 2-3 tahun',
];

const pengasuh = ['Siti Fatimah', 'Nur Hidayah', 'Dewi Sartika', 'Dr. Rina'];

export function KegiatanForm({
  open,
  onClose,
  initialData,
}: KegiatanFormProps) {
  const defaultFormData: Kegiatan = {
    nama: '',
    tanggal: new Date().toISOString().split('T')[0],
    waktuMulai: '09:00',
    waktuSelesai: '10:00',
    kelompokUsia: 'Semua Kelompok',
    pengasuh: '',
    deskripsi: '',
    perlengkapan: [],
    catatan: '',
    tipe: 'harian',
    status: 'upcoming',
  };

  const [formData, setFormData] = useState<Kegiatan>(
    initialData || defaultFormData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialData ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label='Nama Kegiatan'
              value={formData.nama}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, nama: e.target.value }))
              }
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Tipe Kegiatan</InputLabel>
              <Select
                value={formData.tipe}
                label='Tipe Kegiatan'
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    tipe: e.target.value as Kegiatan['tipe'],
                  }))
                }
              >
                <MenuItem value='harian'>Kegiatan Harian</MenuItem>
                <MenuItem value='khusus'>Kegiatan Khusus</MenuItem>
                <MenuItem value='berulang'>Kegiatan Berulang</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type='date'
              label='Tanggal'
              value={formData.tanggal}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tanggal: e.target.value }))
              }
              InputLabelProps={{ shrink: true }}
              required
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                type='time'
                label='Waktu Mulai'
                value={formData.waktuMulai}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    waktuMulai: e.target.value,
                  }))
                }
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                fullWidth
                type='time'
                label='Waktu Selesai'
                value={formData.waktuSelesai}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    waktuSelesai: e.target.value,
                  }))
                }
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>

            <FormControl fullWidth required>
              <InputLabel>Kelompok Usia</InputLabel>
              <Select
                value={formData.kelompokUsia}
                label='Kelompok Usia'
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    kelompokUsia: e.target.value,
                  }))
                }
              >
                {kelompokUsia.map((kelompok) => (
                  <MenuItem key={kelompok} value={kelompok}>
                    {kelompok}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Pengasuh Bertugas</InputLabel>
              <Select
                value={formData.pengasuh}
                label='Pengasuh Bertugas'
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pengasuh: e.target.value }))
                }
              >
                {pengasuh.map((nama) => (
                  <MenuItem key={nama} value={nama}>
                    {nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label='Deskripsi Kegiatan'
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))
              }
              multiline
              rows={3}
              required
            />

            <TextField
              fullWidth
              label='Perlengkapan (pisahkan dengan koma)'
              value={formData.perlengkapan?.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  perlengkapan: e.target.value
                    .split(',')
                    .map((item) => item.trim()),
                }))
              }
            />

            <TextField
              fullWidth
              label='Catatan Khusus'
              value={formData.catatan}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, catatan: e.target.value }))
              }
              multiline
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type='submit' variant='contained'>
            {initialData ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
