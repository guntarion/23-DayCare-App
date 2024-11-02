// app/master-data/murid/page.tsx
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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { MuridForm } from '@/components/forms/master-data/MuridForm';

// Import the Murid interface
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
  id?: number;
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

// Mock data - replace with actual data from your backend
const mockMurid: Murid[] = [
  {
    id: 1,
    namaLengkap: 'Almahyra Shaqueena Azkadina',
    namaPanggilan: 'Alma',
    jenisKelamin: 'P',
    tanggalLahir: '2020-05-15',
    agama: 'Islam',
    alamat: 'Jl. Mawar No. 123, Jakarta Selatan',
    orangTua: {
      ayah: {
        nama: 'Ahmad Zakaria',
        pekerjaan: 'Wiraswasta',
        noHP: '081234567890',
        email: 'ahmad.zakaria@email.com',
      },
      ibu: {
        nama: 'Sarah Amalia',
        pekerjaan: 'Dokter',
        noHP: '081234567891',
        email: 'sarah.amalia@email.com',
      },
    },
    informasiKesehatan: {
      golonganDarah: 'A',
      alergi: ['Kacang', 'Udang'],
      penyakitKronis: '',
      obatRutin: '',
    },
    kontakDarurat: {
      nama: 'Siti Aminah',
      hubungan: 'Nenek',
      noHP: '081234567892',
    },
    tanggalMasuk: '2023-09-01',
    status: 'Aktif',
  },
  // Add more mock data as needed
];

export default function MuridPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMurid, setSelectedMurid] = useState<Murid | undefined>(
    undefined
  );
  const [muridList, setMuridList] = useState<Murid[]>(mockMurid);

  const handleCreateNew = () => {
    setSelectedMurid(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (murid: Murid) => {
    setSelectedMurid(murid);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    // Add confirmation dialog here
    setMuridList((prev) => prev.filter((murid) => murid.id !== id));
  };

  const handleSubmit = (data: Murid) => {
    if (selectedMurid?.id) {
      // Update existing murid
      setMuridList((prev) =>
        prev.map((murid) =>
          murid.id === selectedMurid.id ? { ...data, id: murid.id } : murid
        )
      );
    } else {
      // Add new murid
      setMuridList((prev) => [
        ...prev,
        { ...data, id: Math.max(0, ...prev.map((m) => m.id || 0)) + 1 },
      ]);
    }
    setIsFormOpen(false);
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
        <Typography variant='h4'>Data Murid</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Tambah Murid
        </Button>
      </Box>

      {/* Murid Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Lengkap</TableCell>
              <TableCell>Nama Panggilan</TableCell>
              <TableCell>Tanggal Lahir</TableCell>
              <TableCell>Nama Ayah</TableCell>
              <TableCell>Nama Ibu</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='center'>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {muridList.map((murid) => (
              <TableRow key={murid.id}>
                <TableCell>{murid.namaLengkap}</TableCell>
                <TableCell>{murid.namaPanggilan}</TableCell>
                <TableCell>
                  {new Date(murid.tanggalLahir).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell>{murid.orangTua.ayah.nama}</TableCell>
                <TableCell>{murid.orangTua.ibu.nama}</TableCell>
                <TableCell>{murid.status}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    size='small'
                    onClick={() => handleEdit(murid)}
                    color='primary'
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() => murid.id && handleDelete(murid.id)}
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
        <MuridForm
          initialData={selectedMurid}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      </Dialog>
    </Box>
  );
}
