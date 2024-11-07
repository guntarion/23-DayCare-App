// app/messages/page.tsx
'use client';

import React, { FormEvent, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  IconButton,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Send as SendIcon,
  Campaign as BroadcastIcon,
  Message as MessageIcon,
  Close as CloseIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

// Types
interface Message {
  id: string;
  type: 'individual' | 'broadcast';
  recipient: string;
  childName?: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Child {
  id: string;
  name: string;
  parentName: string;
}

// Mock Data
const mockMessages: Message[] = [
  {
    id: '1',
    type: 'broadcast',
    recipient: 'Semua Orang Tua',
    content:
      'Pengumuman: Pemeriksaan kesehatan rutin akan dilaksanakan pada hari Jumat, 15 Maret 2024. Mohon membawa buku kesehatan anak.',
    timestamp: '2024-03-11T09:30:00',
    status: 'delivered',
  },
  {
    id: '2',
    type: 'individual',
    recipient: 'Ibu Sarah',
    childName: 'Almahyra Shaqueena',
    content:
      'Alhamdulillah, Almahyra hari ini sudah mulai bisa makan sendiri dengan baik.',
    timestamp: '2024-03-11T10:15:00',
    status: 'read',
  },
];

const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Almahyra Shaqueena',
    parentName: 'Ibu Sarah',
  },
  {
    id: '2',
    name: 'Bassam Athaillah',
    parentName: 'Ibu Fatima',
  },
];

interface MessageTemplate {
  id: string;
  type: 'individual' | 'broadcast';
  title: string;
  template: string;
  placeholders: string[];
  category:
    | 'perkembangan'
    | 'kesehatan'
    | 'kegiatan'
    | 'pengumuman'
    | 'rutinitas';
}

const messageTemplates: MessageTemplate[] = [
  // Individual Templates
  {
    id: 'tmpl1',
    type: 'individual',
    title: 'Laporan Perkembangan Harian',
    template:
      'Assalamualaikum, [nama_ortu]. Alhamdulillah, hari ini [nama_anak] menunjukkan perkembangan yang baik. [detail_perkembangan]. [nama_anak] juga [detail_aktivitas]. Untuk makanan, [detail_makan]. Waktu tidur siang sekitar [durasi_tidur].',
    placeholders: [
      'nama_ortu',
      'nama_anak',
      'detail_perkembangan',
      'detail_aktivitas',
      'detail_makan',
      'durasi_tidur',
    ],
    category: 'perkembangan',
  },
  {
    id: 'tmpl2',
    type: 'individual',
    title: 'Notifikasi Kesehatan',
    template:
      'Assalamualaikum, [nama_ortu]. Kami ingin menginformasikan bahwa [nama_anak] mengalami [kondisi_kesehatan] pada pukul [waktu]. Kami telah [tindakan_yang_dilakukan]. Mohon pantau kondisi [nama_anak] di rumah dan beri tahu kami jika ada perubahan.',
    placeholders: [
      'nama_ortu',
      'nama_anak',
      'kondisi_kesehatan',
      'waktu',
      'tindakan_yang_dilakukan',
    ],
    category: 'kesehatan',
  },
  {
    id: 'tmpl3',
    type: 'individual',
    title: 'Pencapaian Milestone',
    template:
      'Alhamdulillah, [nama_ortu]. Kami senang memberitahu bahwa [nama_anak] telah mencapai milestone baru hari ini: [detail_milestone]. Ini merupakan perkembangan yang sangat baik untuk usia [nama_anak].',
    placeholders: ['nama_ortu', 'nama_anak', 'detail_milestone'],
    category: 'perkembangan',
  },
  {
    id: 'tmpl4',
    type: 'individual',
    title: 'Kebutuhan Perlengkapan',
    template:
      'Assalamualaikum, [nama_ortu]. Mohon bantuan untuk melengkapi [jenis_perlengkapan] [nama_anak] karena [alasan]. Terima kasih atas perhatiannya.',
    placeholders: ['nama_ortu', 'nama_anak', 'jenis_perlengkapan', 'alasan'],
    category: 'rutinitas',
  },

  // Broadcast Templates
  {
    id: 'tmpl5',
    type: 'broadcast',
    title: 'Pengumuman Kegiatan',
    template:
      'Assalamualaikum Wr. Wb.\n\nDiberitahukan kepada Bapak/Ibu wali murid bahwa akan diadakan [nama_kegiatan] pada:\n\nHari/Tanggal: [tanggal]\nWaktu: [waktu]\nTempat: [tempat]\n\nUntuk kegiatan ini, mohon [instruksi_khusus].\n\nTerima kasih atas perhatiannya.\n\nWassalamualaikum Wr. Wb.',
    placeholders: [
      'nama_kegiatan',
      'tanggal',
      'waktu',
      'tempat',
      'instruksi_khusus',
    ],
    category: 'kegiatan',
  },
  {
    id: 'tmpl6',
    type: 'broadcast',
    title: 'Pengumuman Pemeriksaan Kesehatan',
    template:
      'Assalamualaikum Wr. Wb.\n\nDiberitahukan kepada Bapak/Ibu wali murid bahwa akan dilaksanakan [jenis_pemeriksaan] pada:\n\nHari/Tanggal: [tanggal]\nPetugas: [nama_petugas]\n\nMohon membawa:\n1. Buku KIA/Kesehatan anak\n2. [perlengkapan_tambahan]\n\nWassalamualaikum Wr. Wb.',
    placeholders: [
      'jenis_pemeriksaan',
      'tanggal',
      'nama_petugas',
      'perlengkapan_tambahan',
    ],
    category: 'kesehatan',
  },
  {
    id: 'tmpl7',
    type: 'broadcast',
    title: 'Pengumuman Libur',
    template:
      'Assalamualaikum Wr. Wb.\n\nDiberitahukan kepada Bapak/Ibu wali murid bahwa Daycare Al Muhajirin akan libur pada tanggal [tanggal_libur] dalam rangka [keterangan_libur]. Kegiatan daycare akan kembali normal pada tanggal [tanggal_masuk].\n\nWassalamualaikum Wr. Wb.',
    placeholders: ['tanggal_libur', 'keterangan_libur', 'tanggal_masuk'],
    category: 'pengumuman',
  },
  {
    id: 'tmpl8',
    type: 'broadcast',
    title: 'Pengingat Pembayaran',
    template:
      'Assalamualaikum Wr. Wb.\n\nMohon perhatian Bapak/Ibu wali murid untuk melakukan pembayaran biaya daycare untuk bulan [bulan] paling lambat tanggal [batas_waktu]. Pembayaran dapat dilakukan melalui [metode_pembayaran].\n\nWassalamualaikum Wr. Wb.',
    placeholders: ['bulan', 'batas_waktu', 'metode_pembayaran'],
    category: 'pengumuman',
  },
];

// Message Form Component
interface MessageFormProps {
  open: boolean;
  onClose: () => void;
  type: 'individual' | 'broadcast';
}

function MessageForm({ open, onClose, type }: MessageFormProps) {
  const [formData, setFormData] = useState({
    recipient: '',
    message: '',
    selectedTemplate: '',
    placeholderValues: {} as Record<string, string>,
  });

  const handleTemplateChange = (templateId: string) => {
    const template = messageTemplates.find((t) => t.id === templateId);
    if (template) {
      setFormData((prev) => ({
        ...prev,
        selectedTemplate: templateId,
        message: template.template,
        placeholderValues: template.placeholders.reduce(
          (acc, placeholder) => ({
            ...acc,
            [placeholder]: '',
          }),
          {}
        ),
      }));
    }
  };

  const handlePlaceholderChange = (placeholder: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      placeholderValues: {
        ...prev.placeholderValues,
        [placeholder]: value,
      },
    }));

    // Update message content with placeholder values
    const template = messageTemplates.find(
      (t) => t.id === formData.selectedTemplate
    );
    if (template) {
      let newMessage = template.template;
      Object.entries({
        ...formData.placeholderValues,
        [placeholder]: value,
      }).forEach(([key, val]) => {
        newMessage = newMessage.replace(`[${key}]`, val || `[${key}]`);
      });
      setFormData((prev) => ({ ...prev, message: newMessage }));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant='h6'>
            {type === 'broadcast'
              ? 'Kirim Pesan Broadcast'
              : 'Kirim Pesan Individual'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {type === 'individual' && (
              <FormControl fullWidth>
                <InputLabel>Pilih Anak</InputLabel>
                <Select
                  value={formData.recipient}
                  label='Pilih Anak'
                  onChange={(e) =>
                    setFormData({ ...formData, recipient: e.target.value })
                  }
                >
                  {mockChildren.map((child) => (
                    <MenuItem key={child.id} value={child.id}>
                      {child.name} - {child.parentName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Template Selection */}
            <FormControl fullWidth>
              <InputLabel>Pilih Template</InputLabel>
              <Select
                value={formData.selectedTemplate}
                label='Pilih Template'
                onChange={(e) => handleTemplateChange(e.target.value)}
              >
                <MenuItem value=''>
                  <em>Tanpa Template</em>
                </MenuItem>
                {messageTemplates
                  .filter((template) => template.type === type)
                  .map((template) => (
                    <MenuItem key={template.id} value={template.id}>
                      {template.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Placeholder Fields */}
            {formData.selectedTemplate && (
              <Card variant='outlined'>
                <CardContent>
                  <Typography variant='subtitle2' gutterBottom>
                    Isi Informasi
                  </Typography>
                  <Stack spacing={2}>
                    {messageTemplates
                      .find((t) => t.id === formData.selectedTemplate)
                      ?.placeholders.map((placeholder) => (
                        <TextField
                          key={placeholder}
                          label={placeholder
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                          value={formData.placeholderValues[placeholder] || ''}
                          onChange={(e) =>
                            handlePlaceholderChange(placeholder, e.target.value)
                          }
                          fullWidth
                          size='small'
                        />
                      ))}
                  </Stack>
                </CardContent>
              </Card>
            )}

            <TextField
              fullWidth
              label='Pesan'
              multiline
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <Button
              type='submit'
              variant='contained'
              startIcon={
                type === 'broadcast' ? <BroadcastIcon /> : <SendIcon />
              }
            >
              Kirim
            </Button>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
}

// Main Page Component
export default function MessagesPage() {
  const [messageFormOpen, setMessageFormOpen] = useState(false);
  const [messageType, setMessageType] = useState<'individual' | 'broadcast'>(
    'individual'
  );

  const handleOpenMessageForm = (type: 'individual' | 'broadcast') => {
    setMessageType(type);
    setMessageFormOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4'>Pesan</Typography>
        <Stack direction='row' spacing={2}>
          <Button
            variant='outlined'
            startIcon={<MessageIcon />}
            onClick={() => handleOpenMessageForm('individual')}
          >
            Kirim Pesan Individual
          </Button>
          <Button
            variant='contained'
            startIcon={<BroadcastIcon />}
            onClick={() => handleOpenMessageForm('broadcast')}
          >
            Kirim Broadcast
          </Button>
        </Stack>
      </Box>

      {/* Message History */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            {mockMessages.map((message) => (
              <Paper
                key={message.id}
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Chip
                          label={
                            message.type === 'broadcast'
                              ? 'Broadcast'
                              : 'Individual'
                          }
                          color={
                            message.type === 'broadcast' ? 'primary' : 'default'
                          }
                          size='small'
                        />
                        <Typography variant='subtitle1'>
                          {message.recipient}
                          {message.childName && ` - ${message.childName}`}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <TimeIcon fontSize='small' color='action' />
                        <Typography variant='caption' color='text.secondary'>
                          {new Date(message.timestamp).toLocaleString('id-ID')}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant='body1'>{message.content}</Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 1,
                      }}
                    >
                      <Chip
                        label={message.status}
                        size='small'
                        color={
                          message.status === 'read'
                            ? 'success'
                            : message.status === 'delivered'
                            ? 'primary'
                            : 'default'
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Message Form Dialog */}
      <MessageForm
        open={messageFormOpen}
        onClose={() => setMessageFormOpen(false)}
        type={messageType}
      />
    </Box>
  );
}
