// components/forms/master-data/MuridForm.tsx
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
  Divider,
  //   Chip,
} from '@mui/material';

interface OrangTua {
  nama: string;
  pekerjaan: string;
  noHP: string;
  email: string;
}

interface InformasiKesehatan {
  golonganDarah: string;
  alergi: string[];
  penyakitKronis: string;
  obatRutin: string;
}

interface KontakDarurat {
  nama: string;
  hubungan: string;
  noHP: string;
}

interface Murid {
  namaLengkap: string;
  namaPanggilan: string;
  jenisKelamin: 'L' | 'P';
  tanggalLahir: string;
  agama: string;
  alamat: string;
  orangTua: {
    ayah: OrangTua;
    ibu: OrangTua;
  };
  informasiKesehatan: InformasiKesehatan;
  kontakDarurat: KontakDarurat;
  tanggalMasuk: string;
  status: string;
}

interface MuridFormProps {
  initialData?: Murid;
  onClose: () => void;
  onSubmit: (data: Murid) => void;
}

export function MuridForm({ initialData, onClose, onSubmit }: MuridFormProps) {
  const defaultFormData: Murid = {
    namaLengkap: '',
    namaPanggilan: '',
    jenisKelamin: 'L',
    tanggalLahir: '',
    agama: '',
    alamat: '',
    orangTua: {
      ayah: {
        nama: '',
        pekerjaan: '',
        noHP: '',
        email: '',
      },
      ibu: {
        nama: '',
        pekerjaan: '',
        noHP: '',
        email: '',
      },
    },
    informasiKesehatan: {
      golonganDarah: '',
      alergi: [],
      penyakitKronis: '',
      obatRutin: '',
    },
    kontakDarurat: {
      nama: '',
      hubungan: '',
      noHP: '',
    },
    tanggalMasuk: '',
    status: 'Aktif',
  };

  const [formData, setFormData] = useState<Murid>(
    initialData || defaultFormData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>
        {initialData ? 'Edit Data Murid' : 'Tambah Murid Baru'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Data Anak */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Data Anak
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Nama Lengkap'
                  value={formData.namaLengkap}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      namaLengkap: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Nama Panggilan'
                  value={formData.namaPanggilan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      namaPanggilan: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Jenis Kelamin</InputLabel>
                  <Select
                    value={formData.jenisKelamin}
                    label='Jenis Kelamin'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jenisKelamin: e.target.value as 'L' | 'P',
                      }))
                    }
                  >
                    <MenuItem value='L'>Laki-laki</MenuItem>
                    <MenuItem value='P'>Perempuan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type='date'
                  label='Tanggal Lahir'
                  value={formData.tanggalLahir}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tanggalLahir: e.target.value,
                    }))
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Agama'
                  value={formData.agama}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      agama: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Alamat'
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      alamat: e.target.value,
                    }))
                  }
                  multiline
                  rows={2}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Data Ayah */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Data Ayah
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Nama Ayah'
                  value={formData.orangTua.ayah.nama}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orangTua: {
                        ...prev.orangTua,
                        ayah: {
                          ...prev.orangTua.ayah,
                          nama: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Pekerjaan'
                  value={formData.orangTua.ayah.pekerjaan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orangTua: {
                        ...prev.orangTua,
                        ayah: {
                          ...prev.orangTua.ayah,
                          pekerjaan: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='No. HP'
                  value={formData.orangTua.ayah.noHP}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orangTua: {
                        ...prev.orangTua,
                        ayah: {
                          ...prev.orangTua.ayah,
                          noHP: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  value={formData.orangTua.ayah.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orangTua: {
                        ...prev.orangTua,
                        ayah: {
                          ...prev.orangTua.ayah,
                          email: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Data Ibu */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Data Ibu
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Nama Ibu'
                  value={formData.orangTua.ibu.nama}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orangTua: {
                        ...prev.orangTua,
                        ibu: {
                          ...prev.orangTua.ibu,
                          nama: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Pekerjaan'
                  value={formData.orangTua.ibu.pekerjaan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orangTua: {
                        ...prev.orangTua,
                        ibu: {
                          ...prev.orangTua.ibu,
                          pekerjaan: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='No. HP'
                  value={formData.orangTua.ibu.noHP}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orangTua: {
                        ...prev.orangTua,
                        ibu: {
                          ...prev.orangTua.ibu,
                          noHP: e.target.value,
                        },
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  value={formData.orangTua.ibu.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orangTua: {
                        ...prev.orangTua,
                        ibu: {
                          ...prev.orangTua.ibu,
                          email: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Informasi Kesehatan */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Informasi Kesehatan
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Golongan Darah</InputLabel>
                  <Select
                    value={formData.informasiKesehatan.golonganDarah}
                    label='Golongan Darah'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        informasiKesehatan: {
                          ...prev.informasiKesehatan,
                          golonganDarah: e.target.value,
                        },
                      }))
                    }
                  >
                    <MenuItem value='A'>A</MenuItem>
                    <MenuItem value='B'>B</MenuItem>
                    <MenuItem value='AB'>AB</MenuItem>
                    <MenuItem value='O'>O</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  label='Alergi (pisahkan dengan koma)'
                  value={formData.informasiKesehatan.alergi.join(', ')}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      informasiKesehatan: {
                        ...prev.informasiKesehatan,
                        alergi: e.target.value
                          .split(',')
                          .map((item) => item.trim()),
                      },
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Penyakit Kronis'
                  value={formData.informasiKesehatan.penyakitKronis}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      informasiKesehatan: {
                        ...prev.informasiKesehatan,
                        penyakitKronis: e.target.value,
                      },
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Obat Rutin'
                  value={formData.informasiKesehatan.obatRutin}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      informasiKesehatan: {
                        ...prev.informasiKesehatan,
                        obatRutin: e.target.value,
                      },
                    }))
                  }
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Kontak Darurat */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Kontak Darurat
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Nama'
                  value={formData.kontakDarurat.nama}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kontakDarurat: {
                        ...prev.kontakDarurat,
                        nama: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Hubungan'
                  value={formData.kontakDarurat.hubungan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kontakDarurat: {
                        ...prev.kontakDarurat,
                        hubungan: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='No. HP'
                  value={formData.kontakDarurat.noHP}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kontakDarurat: {
                        ...prev.kontakDarurat,
                        noHP: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Informasi Daycare */}
          <Box>
            <Typography variant='h6' gutterBottom>
              Informasi Daycare
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='Tanggal Masuk'
                  value={formData.tanggalMasuk}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tanggalMasuk: e.target.value,
                    }))
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label='Status'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Aktif'>Aktif</MenuItem>
                    <MenuItem value='Tidak Aktif'>Tidak Aktif</MenuItem>
                    <MenuItem value='Lulus'>Lulus</MenuItem>
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
