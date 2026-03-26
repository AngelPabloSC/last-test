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
  'New':         { label: 'New',         bg: 'rgba(255,215,0,0.12)',   text: '#FFD700' },
  'In Progress': { label: 'In Progress', bg: 'rgba(96,165,250,0.12)',  text: '#60A5FA' },
  'Completed':   { label: 'Completed',   bg: 'rgba(74,222,128,0.12)',  text: '#4ADE80' },
  'Canceled':    { label: 'Canceled',    bg: 'rgba(248,113,113,0.12)', text: '#F87171' },
  // Compatibilidad con IDs locales por si el back devuelve lowercase
  nueva:       { label: 'New',         bg: 'rgba(255,215,0,0.12)',   text: '#FFD700' },
  en_progreso: { label: 'In Progress', bg: 'rgba(96,165,250,0.12)',  text: '#60A5FA' },
  completada:  { label: 'Completed',   bg: 'rgba(74,222,128,0.12)',  text: '#4ADE80' },
  cancelada:   { label: 'Canceled',    bg: 'rgba(248,113,113,0.12)', text: '#F87171' },
};

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP['New'];
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

const RequestsTable = ({ contactsData, tableState, fetchContacts, refreshContacts, filter = 'todas', search = '' }) => {
  const rows = contactsData?.data || [];

  const {
    viewDialog,
    statusDialog,
    handleUpdateStatus,
    getHistory,
  } = useRequestActions();

  const onConfirmUpdateStatus = async (newStatus, message) => {
    const success = await handleUpdateStatus(statusDialog.dialogContent, newStatus, message);
    if (success) {
      refreshContacts();
    }
  };

  const { count, currentPage, perPage } = tableState;

  const tableOptions = {
    serverSide: true,
    count: count,
    page: currentPage,
    rowsPerPage: perPage,
    rowsPerPageOptions: [10, 20, 30, 50],
    onTableChange: (action, tableState) => {
      const { page, rowsPerPage } = tableState;
      const apiPage = page + 1;
      if (action === "changePage" || action === "changeRowsPerPage") {
        fetchContacts(apiPage, rowsPerPage, page);
      }
    },
  };

  const columns = React.useMemo(() => [
    {
      name: 'names',
      label: 'Client',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          if (!row) return '...';
          return (
            <Typography sx={{ width: { xs: 120, sm: 180 }, fontSize: { xs: 12, sm: 13 }, fontWeight: 600, color: 'white' }}>
              {row.names || row.name || 'Sin nombre'}
            </Typography>
          );
        },
      },
    },
    {
      name: 'email',
      label: 'Email / Phone',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          if (!row) return '...';
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
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          if (!row) return '...';
          return (
            <Typography sx={{ width: { xs: 100, sm: 140 }, fontSize: { xs: 11, sm: 13 }, color: '#CCCCCC' }}>
              {row.service || 'General'}
            </Typography>
          );
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          if (!row) return '...';
          return (
            <Box sx={{ width: { xs: 80, sm: 110 } }}>
              <StatusBadge status={row.status} />
            </Box>
          );
        },
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
          if (!row) return null;
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
            </Box>
          );
        },
      },
    },
  ], [rows, viewDialog.handleOpenDialog, statusDialog.handleOpenDialog]);

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
              {count} Total
            </Typography>
          </Box>
        </Box>
      }
      loading={contactsData.loading}
      data={rows}
      columns={columns}
      options={tableOptions}
    />
    <RequestViewDialog
      open={viewDialog.isOpen}
      onClose={viewDialog.handleCloseDialog}
      data={viewDialog.dialogContent}
      getHistory={getHistory}
    />
    <RequestStatusDialog
      open={statusDialog.isOpen}
      onClose={statusDialog.handleCloseDialog}
      data={statusDialog.dialogContent}
      onConfirm={onConfirmUpdateStatus}
    />
    </>
  );
};

export default RequestsTable;
