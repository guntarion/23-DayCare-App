// components/forms/communication-log/KomunikasiForm.tsx
'use client';

import { useState } from 'react';
import {
  //   Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  //   Typography,
} from '@mui/material';

interface Komunikasi {
  id?: number;
  tanggal: string;
  waktu: string;
  arah: 'pengasuh_ke_ortu' | 'ortu_ke_pengasuh';
  namaMurid: string;
  namaPengasuh: string;
  namaOrangTua: string;
  jenisKomunikasi: 'langsung' | 'telepon' | 'whatsapp';
  topik: string;
  isiPesan: string;
  tindakLanjut: string;
  status: 'perlu_tindakan' | 'selesai';
}

interface KomunikasiFormProps {
  initialData?: Komunikasi;
  onClose: () => void;
  onSubmit: (data: Komunikasi) => void;
}

// Mock data for dropdowns
const mockMurid = [
  'Almahyra Shaqueena Azkadina',
  'Bassam Athaillah',
  'Jennadira Mahalina Prasetyo',
];

const mockPengasuh = ['Siti Fatimah', 'Nur Hidayah', 'Dewi Sartika'];

const mockOrangTua = ['Sarah Amalia', 'Ahmad Fauzi', 'Ratna Sari'];

export function KomunikasiForm({
  initialData,
  onClose,
  onSubmit,
}: KomunikasiFormProps) {
  const defaultFormData: Komunikasi = {
    tanggal: new Date().toISOString().split('T')[0],
    waktu: new Date().toTimeString().slice(0, 5),
    arah: 'pengasuh_ke_ortu',
    namaMurid: '',
    namaPengasuh: '',
    namaOrangTua: '',
    jenisKomunikasi: 'langsung',
    topik: '',
    isiPesan: '',
    tindakLanjut: '',
    status: 'perlu_tindakan',
  };

  const [formData, setFormData] = useState<Komunikasi>(
    initialData || defaultFormData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>
        {initialData ? 'Edit Komunikasi' : 'Tambah Komunikasi Baru'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Waktu dan Arah */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
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
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type='time'
                label='Waktu'
                value={formData.waktu}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, waktu: e.target.value }))
                }
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Arah Komunikasi</InputLabel>
                <Select
                  value={formData.arah}
                  label='Arah Komunikasi'
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      arah: e.target.value as Komunikasi['arah'],
                    }))
                  }
                >
                  <MenuItem value='pengasuh_ke_ortu'>
                    Pengasuh → Orang Tua
                  </MenuItem>
                  <MenuItem value='ortu_ke_pengasuh'>
                    Orang Tua → Pengasuh
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Pihak yang Terlibat */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Nama Murid</InputLabel>
                <Select
                  value={formData.namaMurid}
                  label='Nama Murid'
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      namaMurid: e.target.value,
                    }))
                  }
                >
                  {mockMurid.map((nama) => (
                    <MenuItem key={nama} value={nama}>
                      {nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Nama Pengasuh</InputLabel>
                <Select
                  value={formData.namaPengasuh}
                  label='Nama Pengasuh'
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      namaPengasuh: e.target.value,
                    }))
                  }
                >
                  {mockPengasuh.map((nama) => (
                    <MenuItem key={nama} value={nama}>
                      {nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Nama Orang Tua</InputLabel>
                <Select
                  value={formData.namaOrangTua}
                  label='Nama Orang Tua'
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      namaOrangTua: e.target.value,
                    }))
                  }
                >
                  {mockOrangTua.map((nama) => (
                    <MenuItem key={nama} value={nama}>
                      {nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Informasi Komunikasi */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Jenis Komunikasi</InputLabel>
                <Select
                  value={formData.jenisKomunikasi}
                  label='Jenis Komunikasi'
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      jenisKomunikasi: e.target
                        .value as Komunikasi['jenisKomunikasi'],
                    }))
                  }
                >
                  <MenuItem value='langsung'>Langsung</MenuItem>
                  <MenuItem value='telepon'>Telepon</MenuItem>
                  <MenuItem value='whatsapp'>WhatsApp</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Topik'
                value={formData.topik}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, topik: e.target.value }))
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Isi Pesan'
                value={formData.isiPesan}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isiPesan: e.target.value }))
                }
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Tindak Lanjut'
                value={formData.tindakLanjut}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    tindakLanjut: e.target.value,
                  }))
                }
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label='Status'
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as Komunikasi['status'],
                    }))
                  }
                >
                  <MenuItem value='perlu_tindakan'>Perlu Tindakan</MenuItem>
                  <MenuItem value='selesai'>Selesai</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button type='submit' variant='contained'>
          {initialData ? 'Update' : 'Simpan'}
        </Button>
      </DialogActions>
    </form>
  );
}
