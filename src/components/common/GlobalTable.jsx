import React from 'react';
import PropTypes from 'prop-types';
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
  } = props;

  const parentTheme = useTheme();

  
  const mergedOptions = {
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
    ...options,
  };

  // Creación de un tema específico para la tabla que hereda del general
  const getMuiTheme = () =>
    createTheme({
      ...parentTheme,
      components: {
        ...parentTheme.components,
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: '#111', 
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
              backgroundColor: '#0A0A0A',
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
              backgroundColor: '#111',
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
              backgroundColor: '#111',
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
    });

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={mergedOptions}
      />
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
};

export default GlobalTable;
