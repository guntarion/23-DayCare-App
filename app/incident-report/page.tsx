// app/incident-report/page.tsx
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
} from '@mui/icons-material';
import { InsidenForm } from '@/components/forms/incident-report/InsidenForm';

interface Insiden {
  id: number;
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

// Mock data
const mockInsiden: Insiden[] = [
  {
    id: 1,
    tanggal: '2024-03-11',
    waktu: '10:30',
    namaMurid: 'Almahyra Shaqueena Azkadina',
    namaPengasuh: 'Siti Fatimah',
    jenisInsiden: 'terjatuh',
    lokasiKejadian: 'Area Bermain Indoor',
    tingkatKeparahan: 'ringan',
    deskripsiKejadian:
      'Terpeleset saat bermain di area bermain indoor. Tidak ada luka serius, hanya memar ringan di lutut.',
    pertolongan: 'Pembersihan area yang terluka dan pemberian kompres dingin',
    notifikasi: {
      waktu: '10:45',
      metode: 'whatsapp',
      dihubungi: 'Sarah Amalia (Ibu)',
    },
    tindakLanjut: 'Pemantauan kondisi lutut selama 24 jam',
    saksi: ['Nur Hidayah', 'Dewi Sartika'],
    status: 'closed',
  },
  {
    id: 2,
    tanggal: '2024-03-11',
    waktu: '13:15',
    namaMurid: 'Bassam Athaillah',
    namaPengasuh: 'Nur Hidayah',
    jenisInsiden: 'sakit',
    lokasiKejadian: 'Ruang Tidur',
    tingkatKeparahan: 'sedang',
    deskripsiKejadian:
      'Mengeluh sakit perut dan mual setelah tidur siang. Suhu tubuh normal.',
    pertolongan: 'Pemberian air putih dan pemantauan kondisi',
    notifikasi: {
      waktu: '13:20',
      metode: 'telepon',
      dihubungi: 'Ahmad Fauzi (Ayah)',
    },
    tindakLanjut: 'Orang tua akan menjemput untuk dibawa ke dokter',
    saksi: ['Dewi Sartika'],
    status: 'in_progress',
  },
];

export default function InsidenPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInsiden, setSelectedInsiden] = useState<Insiden | undefined>(
    undefined
  );
  const [insidenList, setInsidenList] = useState<Insiden[]>(mockInsiden);

  const handleCreateNew = () => {
    setSelectedInsiden(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (insiden: Insiden) => {
    setSelectedInsiden(insiden);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setInsidenList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (data: Insiden) => {
    if (selectedInsiden?.id) {
      // Update existing insiden
      setInsidenList((prev) =>
        prev.map((item) =>
          item.id === selectedInsiden.id ? { ...data, id: item.id } : item
        )
      );
    } else {
      // Add new insiden
      setInsidenList((prev) => [
        ...prev,
        { ...data, id: Math.max(0, ...prev.map((m) => m.id)) + 1 },
      ]);
    }
    setIsFormOpen(false);
  };

  const getStatusColor = (status: Insiden['status']) => {
    switch (status) {
      case 'open':
        return 'error';
      case 'in_progress':
        return 'warning';
      case 'closed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Insiden['status']) => {
    switch (status) {
      case 'open':
        return 'Terbuka';
      case 'in_progress':
        return 'Dalam Proses';
      case 'closed':
        return 'Selesai';
      default:
        return status;
    }
  };

  const getSeverityColor = (severity: Insiden['tingkatKeparahan']) => {
    switch (severity) {
      case 'ringan':
        return 'success';
      case 'sedang':
        return 'warning';
      case 'serius':
        return 'error';
      default:
        return 'default';
    }
  };

  const getSeverityLabel = (severity: Insiden['tingkatKeparahan']) => {
    switch (severity) {
      case 'ringan':
        return 'Ringan';
      case 'sedang':
        return 'Sedang';
      case 'serius':
        return 'Serius';
      default:
        return severity;
    }
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
        <Typography variant='h4'>Laporan Insiden</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Input Insiden
        </Button>
      </Box>

      {/* Insiden Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tanggal & Waktu</TableCell>
              <TableCell>Nama Murid</TableCell>
              <TableCell>Jenis Insiden</TableCell>
              <TableCell>Tingkat Keparahan</TableCell>
              <TableCell>Pengasuh</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='center'>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {insidenList.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {new Date(item.tanggal).toLocaleDateString('id-ID')}
                  <br />
                  {item.waktu}
                </TableCell>
                <TableCell>{item.namaMurid}</TableCell>
                <TableCell>
                  {item.jenisInsiden.charAt(0).toUpperCase() +
                    item.jenisInsiden.slice(1)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getSeverityLabel(item.tingkatKeparahan)}
                    color={getSeverityColor(item.tingkatKeparahan)}
                    size='small'
                  />
                </TableCell>
                <TableCell>{item.namaPengasuh}</TableCell>
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
        <InsidenForm
          initialData={selectedInsiden}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      </Dialog>
    </Box>
  );
}
