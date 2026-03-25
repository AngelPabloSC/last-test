import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GlobalTable from '@/components/common/GlobalTable';

import { useRequestActions } from '../hooks/useRequestActions';
import RequestViewDialog from './RequestViewDialog';
import RequestStatusDialog from './RequestStatusDialog';

const STATUS_MAP = {
  nueva:       { label: 'New',         bg: 'rgba(255,215,0,0.12)',   text: '#FFD700' },
  en_progreso: { label: 'In Progress', bg: 'rgba(96,165,250,0.12)',  text: '#60A5FA' },
  completada:  { label: 'Completed',   bg: 'rgba(74,222,128,0.12)',  text: '#4ADE80' },
  cancelada:   { label: 'Canceled',    bg: 'rgba(248,113,113,0.12)', text: '#F87171' },
};

const INITIAL_ROWS = [
  { id: 1, name: 'María García',  email: 'maria.garcia@email.com', phone: '(518) 555-0142',      status: 'nueva',       canApprove: true  },
  { id: 2, name: 'John Smith',    email: 'jsmith@outlook.com',     phone: '(518) 555-0298',      status: 'nueva',       canApprove: true  },
  { id: 3, name: 'Roberto López', email: 'rlopez@gmail.com',       phone: '(518) 555-0371',      status: 'en_progreso', canApprove: true  },
  { id: 4, name: 'Sarah Johnson', email: 'sjohnson@yahoo.com',     phone: '(518) 555-0455',      status: 'completada',  canApprove: false },
  { id: 5, name: 'David Chen',    email: 'dchen@gmail.com',        phone: '(518) 555-0187',      status: 'cancelada',   canApprove: false },
  { id: 6, name: 'Ana Martínez',  email: 'ana.martinez@email.com', phone: '(518) 555-0633',      status: 'nueva',       canApprove: true  },
  { id: 7, name: 'Carlos Rivera', email: 'crivera@hotmail.com',    phone: '(518) 555-0891',      status: 'en_progreso', canApprove: true  },
  { id: 8, name: 'Lisa Thompson', email: 'lisa.t@gmail.com',       phone: '(518) 555-0724',      status: 'completada',  canApprove: false },
];

function StatusBadge({ status }) {
  const s = STATUS_MAP[status];
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        borderRadius: 9999,
        px: 1.25,
        py: 0.5,
        fontSize: 11,
        fontWeight: 700,
        bgcolor: s.bg,
        color: s.text,
      }}
    >
      {s.label}
    </Box>
  );
}

const RequestsTable = () => {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const {
    viewDialog,
    statusDialog,
    handleUpdateStatus,
  } = useRequestActions();

  const onConfirmUpdateStatus = async (newStatus) => {
    const success = await handleUpdateStatus(newStatus);
    if (success && statusDialog.dialogContent) {
      setRows(prev => prev.map(r => r.id === statusDialog.dialogContent.id ? { ...r, status: newStatus } : r));
    }
  };

  const columns = [
    {
      name: 'name',
      label: 'Client',
      options: {
        customBodyRenderLite: (dataIndex) => (
          <Typography sx={{ width: { xs: 120, sm: 180 }, fontSize: { xs: 12, sm: 13 }, fontWeight: 600, color: 'white' }}>
            {rows[dataIndex].name}
          </Typography>
        ),
      },
    },
    {
      name: 'email',
      label: 'Email / Phone',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          return (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.25, width: { xs: 140, sm: 'auto' } }}>
              <Typography sx={{ fontSize: { xs: 11, sm: 13 }, color: '#AAAAAA' }}>{row.email}</Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 11 }, color: '#666' }}>{row.phone}</Typography>
            </Box>
          );
        },
      },
    },
    {
      name: 'service',
      label: 'Service',
      options: {
        customBodyRenderLite: (dataIndex) => (
          <Typography sx={{ width: { xs: 100, sm: 140 }, fontSize: { xs: 11, sm: 13 }, color: '#CCCCCC' }}>
            {rows[dataIndex].service}
          </Typography>
        ),
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        customBodyRenderLite: (dataIndex) => (
          <Box sx={{ width: { xs: 80, sm: 110 } }}>
            <StatusBadge status={rows[dataIndex].status} />
          </Box>
        ),
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        empty: true,
        sort: false,
        searchable: false,
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          return (
            <Box sx={{ width: { xs: 60, sm: 80 }, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                component="button"
                title="View details"
                onClick={() => viewDialog.handleOpenDialog(row)}
                sx={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#888',
                  display: 'flex',
                  p: 0,
                  transition: 'color 0.15s',
                  '&:hover': { color: 'white' },
                }}
              >
                <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box
                component="button"
                title="Update status"
                onClick={() => statusDialog.handleOpenDialog(row)}
                sx={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#888',
                  display: 'flex',
                  p: 0,
                  transition: 'color 0.15s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <EditOutlinedIcon sx={{ fontSize: 18 }} />
              </Box>
              {row.canApprove && (
                <Box
                  component="button"
                  title="Approve"
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#4ADE80',
                    display: 'flex',
                    p: 0,
                    transition: 'color 0.15s',
                    '&:hover': { color: '#86EFAC' },
                  }}
                >
                  <CheckOutlinedIcon sx={{ fontSize: 18 }} />
                </Box>
              )}
            </Box>
          );
        },
      },
    },
  ];

  return (
    <>
    <GlobalTable
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
            All Requests
          </Typography>
          <Box sx={{ borderRadius: 9999, bgcolor: 'rgba(255,215,0,0.12)', px: 1.25, py: 0.5 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main' }}>
              8 New
            </Typography>
          </Box>
        </Box>
      }
      data={rows}
      columns={columns}
    />
    <RequestViewDialog open={viewDialog.isOpen} onClose={viewDialog.handleCloseDialog} data={viewDialog.dialogContent} />
    <RequestStatusDialog open={statusDialog.isOpen} onClose={statusDialog.handleCloseDialog} data={statusDialog.dialogContent} onConfirm={onConfirmUpdateStatus} />
    </>
  );
};

export default RequestsTable;
