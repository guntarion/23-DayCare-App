// app/communication-log/page.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';
import { KomunikasiForm } from '@/components/forms/communication-log/KomunikasiForm';

interface Komunikasi {
  id: number;
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

// Mock data
const mockKomunikasi: Komunikasi[] = [
  {
    id: 1,
    tanggal: '2024-03-11',
    waktu: '09:30',
    arah: 'pengasuh_ke_ortu',
    namaMurid: 'Almahyra Shaqueena Azkadina',
    namaPengasuh: 'Siti Fatimah',
    namaOrangTua: 'Sarah Amalia',
    jenisKomunikasi: 'whatsapp',
    topik: 'Perkembangan Harian',
    isiPesan:
      'Alhamdulillah, hari ini Alma sangat aktif dalam kegiatan mengaji dan berhasil menghafal surat Al-Falaq dengan baik.',
    tindakLanjut: 'Orang tua diminta untuk mengulang hafalan di rumah',
    status: 'selesai',
  },
  {
    id: 2,
    tanggal: '2024-03-11',
    waktu: '13:45',
    arah: 'ortu_ke_pengasuh',
    namaMurid: 'Bassam Athaillah',
    namaPengasuh: 'Nur Hidayah',
    namaOrangTua: 'Ahmad Fauzi',
    jenisKomunikasi: 'telepon',
    topik: 'Informasi Kesehatan',
    isiPesan:
      'Bassam sedang dalam masa pemulihan dari flu. Mohon bantuan untuk memastikan dia minum obat setelah makan siang.',
    tindakLanjut: 'Pengasuh akan memantau kondisi dan memastikan minum obat',
    status: 'perlu_tindakan',
  },
];

export default function KomunikasiPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedKomunikasi, setSelectedKomunikasi] = useState<
    Komunikasi | undefined
  >(undefined);
  const [komunikasiList, setKomunikasiList] =
    useState<Komunikasi[]>(mockKomunikasi);

  const handleCreateNew = () => {
    setSelectedKomunikasi(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (komunikasi: Komunikasi) => {
    setSelectedKomunikasi(komunikasi);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setKomunikasiList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (data: Komunikasi) => {
    if (selectedKomunikasi?.id) {
      // Update existing komunikasi
      setKomunikasiList((prev) =>
        prev.map((item) =>
          item.id === selectedKomunikasi.id ? { ...data, id: item.id } : item
        )
      );
    } else {
      // Add new komunikasi
      setKomunikasiList((prev) => [
        ...prev,
        { ...data, id: Math.max(0, ...prev.map((m) => m.id)) + 1 },
      ]);
    }
    setIsFormOpen(false);
  };

  const getStatusColor = (status: Komunikasi['status']) => {
    return status === 'perlu_tindakan' ? 'warning' : 'success';
  };

  const getStatusLabel = (status: Komunikasi['status']) => {
    return status === 'perlu_tindakan' ? 'Perlu Tindakan' : 'Selesai';
  };

  const getKomunikasiTypeIcon = (arah: Komunikasi['arah']) => {
    return arah === 'pengasuh_ke_ortu' ? <ArrowForward /> : <ArrowBack />;
  };

  const getKomunikasiTypeLabel = (arah: Komunikasi['arah']) => {
    return arah === 'pengasuh_ke_ortu'
      ? 'Pengasuh → Orang Tua'
      : 'Orang Tua → Pengasuh';
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
        <Typography variant='h4'>Log Komunikasi</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Tambah Komunikasi
        </Button>
      </Box>

      {/* Komunikasi Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tanggal & Waktu</TableCell>
              <TableCell>Arah</TableCell>
              <TableCell>Nama Murid</TableCell>
              <TableCell>Topik</TableCell>
              <TableCell>Jenis</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='center'>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {komunikasiList.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {new Date(item.tanggal).toLocaleDateString('id-ID')}
                  <br />
                  {item.waktu}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getKomunikasiTypeIcon(item.arah)}
                    {getKomunikasiTypeLabel(item.arah)}
                  </Box>
                </TableCell>
                <TableCell>{item.namaMurid}</TableCell>
                <TableCell>{item.topik}</TableCell>
                <TableCell>
                  <Chip
                    label={
                      item.jenisKomunikasi === 'langsung'
                        ? 'Langsung'
                        : item.jenisKomunikasi === 'telepon'
                        ? 'Telepon'
                        : 'WhatsApp'
                    }
                    size='small'
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(item.status)}
                    color={getStatusColor(item.status)}
                    size='small'
                  />
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    size='small'
                    onClick={() => handleEdit(item)}
                    color='primary'
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() => handleDelete(item.id)}
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form Dialog */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth='md'
        fullWidth
      >
        <KomunikasiForm
          initialData={selectedKomunikasi}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      </Dialog>
    </Box>
  );
}
