import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

const GlobalTable = (props) => {
  const {
    title,
    data,
    columns = [],
    options,
    rowsSelected,
    onRowSelectionChange,
    customTheme,
    loading = false,
  } = props;

  const parentTheme = useTheme();

  const mergedOptions = React.useMemo(() => ({
    selectableRows: 'none',
    selectableRowsOnClick: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    responsive: 'simple',
    elevation: 0,
    rowsSelected,
    onRowSelectionChange,
    textLabels: {
      body: {
        noMatch: loading ? 'Cargando solicitudes...' : 'No se encontraron registros',
      }
    },
    ...options,
  }), [options, rowsSelected, onRowSelectionChange, loading]);

  const getMuiTheme = React.useMemo(() =>
    createTheme({
      ...parentTheme,
      components: {
        ...parentTheme.components,
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: '#000000', 
              backgroundImage: 'none',
              border: '1px solid #1F1F1F',
              borderRadius: '10px',
              color: '#fff',
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: '#000000',
              color: '#666',
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #1F1F1F',
              [parentTheme.breakpoints.down('sm')]: {
                padding: '8px 12px',
                fontSize: '10px',
              },
            },
            sortAction: {
              color: '#666',
              '& path': { color: '#666' },
            },
          },
        },
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              backgroundColor: '#000000',
              color: '#fff',
              borderBottom: '1px solid #1F1F1F',
              padding: '14px 24px',
              [parentTheme.breakpoints.down('sm')]: {
                padding: '10px 12px',
              },
            },
          },
        },
        MUIDataTableToolbar: {
          styleOverrides: {
            root: {
              backgroundColor: '#000000',
              color: '#fff',
            },
            titleText: {
              color: '#fff',
              fontWeight: 700,
            },
            icon: {
              color: '#888',
              '&:hover': {
                color: '#fff',
              },
            },
          },
        },
        MuiTablePagination: {
          styleOverrides: {
            root: {
              color: '#666',
            },
            selectIcon: {
              color: '#666',
            },
          },
        },
        ...customTheme?.components,
      },
    }), [parentTheme, customTheme]);

  return (
    <ThemeProvider theme={getMuiTheme}>
      <Box sx={{ position: 'relative' }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: '10px',
              backdropFilter: 'blur(1px)',
            }}
          >
            <CircularProgress size={30} />
          </Box>
        )}
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={mergedOptions}
        />
      </Box>
    </ThemeProvider>
  );
};

GlobalTable.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object,
  rowsSelected: PropTypes.arrayOf(PropTypes.number),
  onRowSelectionChange: PropTypes.func,
  customTheme: PropTypes.object,
  loading: PropTypes.bool,
};

export default GlobalTable;
