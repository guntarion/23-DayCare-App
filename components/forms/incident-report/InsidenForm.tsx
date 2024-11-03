// components/forms/incident-report/InsidenForm.tsx
'use client';

import { useState } from 'react';
import {
  Box,
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
  Typography,
  //   Chip,
  Divider,
} from '@mui/material';

interface Insiden {
  id?: number;
  // Informasi Dasar
  tanggal: string;
  waktu: string;
  namaMurid: string;
  namaPengasuh: string;

  // Detail Insiden
  jenisInsiden:
    | 'terjatuh'
    | 'cedera'
    | 'sakit'
    | 'konflik'
    | 'perilaku'
    | 'lainnya';
  lokasiKejadian: string;
  tingkatKeparahan: 'ringan' | 'sedang' | 'serius';
  deskripsiKejadian: string;

  // Tindakan
  pertolongan: string;
  notifikasi: {
    waktu: string;
    metode: 'telepon' | 'whatsapp' | 'langsung';
    dihubungi: string;
  };
  tindakLanjut: string;

  // Dokumentasi
  foto?: string[];
  saksi: string[];

  // Status
  status: 'open' | 'in_progress' | 'closed';
}

interface InsidenFormProps {
  initialData?: Insiden;
  onClose: () => void;
  onSubmit: (data: Insiden) => void;
}

// Mock data for dropdowns
const mockMurid = [
  'Almahyra Shaqueena Azkadina',
  'Bassam Athaillah',
  'Jennadira Mahalina Prasetyo',
];

const mockPengasuh = ['Siti Fatimah', 'Nur Hidayah', 'Dewi Sartika'];

const mockLokasi = [
  'Area Bermain Indoor',
  'Area Bermain Outdoor',
  'Ruang Belajar',
  'Ruang Tidur',
  'Ruang Makan',
  'Kamar Mandi',
  'Lainnya',
];

export function InsidenForm({
  initialData,
  onClose,
  onSubmit,
}: InsidenFormProps) {
  const defaultFormData: Insiden = {
    tanggal: new Date().toISOString().split('T')[0],
    waktu: new Date().toTimeString().slice(0, 5),
    namaMurid: '',
    namaPengasuh: '',
    jenisInsiden: 'terjatuh',
    lokasiKejadian: '',
    tingkatKeparahan: 'ringan',
    deskripsiKejadian: '',
    pertolongan: '',
    notifikasi: {
      waktu: new Date().toTimeString().slice(0, 5),
      metode: 'telepon',
      dihubungi: '',
    },
    tindakLanjut: '',
    saksi: [],
    status: 'open',
  };

  const [formData, setFormData] = useState<Insiden>(
    initialData || defaultFormData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>
        {initialData ? 'Edit Laporan Insiden' : 'Input Laporan Insiden'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Informasi Dasar */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Informasi Dasar
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='Tanggal Kejadian'
                  value={formData.tanggal}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tanggal: e.target.value,
                    }))
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='time'
                  label='Waktu Kejadian'
                  value={formData.waktu}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, waktu: e.target.value }))
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
            </Grid>
          </Box>

          <Divider />

          {/* Detail Insiden */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Detail Insiden
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Jenis Insiden</InputLabel>
                  <Select
                    value={formData.jenisInsiden}
                    label='Jenis Insiden'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jenisInsiden: e.target.value as Insiden['jenisInsiden'],
                      }))
                    }
                  >
                    <MenuItem value='terjatuh'>Terjatuh</MenuItem>
                    <MenuItem value='cedera'>Cedera</MenuItem>
                    <MenuItem value='sakit'>Sakit</MenuItem>
                    <MenuItem value='konflik'>
                      Konflik dengan Anak Lain
                    </MenuItem>
                    <MenuItem value='perilaku'>Masalah Perilaku</MenuItem>
                    <MenuItem value='lainnya'>Lainnya</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Lokasi Kejadian</InputLabel>
                  <Select
                    value={formData.lokasiKejadian}
                    label='Lokasi Kejadian'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lokasiKejadian: e.target.value,
                      }))
                    }
                  >
                    {mockLokasi.map((lokasi) => (
                      <MenuItem key={lokasi} value={lokasi}>
                        {lokasi}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Tingkat Keparahan</InputLabel>
                  <Select
                    value={formData.tingkatKeparahan}
                    label='Tingkat Keparahan'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tingkatKeparahan: e.target
                          .value as Insiden['tingkatKeparahan'],
                      }))
                    }
                  >
                    <MenuItem value='ringan'>Ringan</MenuItem>
                    <MenuItem value='sedang'>Sedang</MenuItem>
                    <MenuItem value='serius'>Serius</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Deskripsi Kejadian'
                  value={formData.deskripsiKejadian}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deskripsiKejadian: e.target.value,
                    }))
                  }
                  multiline
                  rows={4}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Tindakan */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Tindakan yang Diambil
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Pertolongan yang Diberikan'
                  value={formData.pertolongan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pertolongan: e.target.value,
                    }))
                  }
                  multiline
                  rows={2}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type='time'
                  label='Waktu Notifikasi'
                  value={formData.notifikasi.waktu}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      notifikasi: {
                        ...prev.notifikasi,
                        waktu: e.target.value,
                      },
                    }))
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Metode Notifikasi</InputLabel>
                  <Select
                    value={formData.notifikasi.metode}
                    label='Metode Notifikasi'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notifikasi: {
                          ...prev.notifikasi,
                          metode: e.target
                            .value as Insiden['notifikasi']['metode'],
                        },
                      }))
                    }
                  >
                    <MenuItem value='telepon'>Telepon</MenuItem>
                    <MenuItem value='whatsapp'>WhatsApp</MenuItem>
                    <MenuItem value='langsung'>Langsung</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Orang Tua yang Dihubungi'
                  value={formData.notifikasi.dihubungi}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      notifikasi: {
                        ...prev.notifikasi,
                        dihubungi: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Tindak Lanjut yang Diperlukan'
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
            </Grid>
          </Box>

          <Divider />

          {/* Dokumentasi */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Dokumentasi
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Saksi (pisahkan dengan koma)'
                  value={formData.saksi.join(', ')}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      saksi: e.target.value
                        .split(',')
                        .map((item) => item.trim()),
                    }))
                  }
                />
              </Grid>
              {/* TODO: Add file upload for photos */}
            </Grid>
          </Box>

          <Divider />

          {/* Status */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Status Laporan
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label='Status'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as Insiden['status'],
                      }))
                    }
                  >
                    <MenuItem value='open'>Terbuka</MenuItem>
                    <MenuItem value='in_progress'>Dalam Proses</MenuItem>
                    <MenuItem value='closed'>Selesai</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
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
