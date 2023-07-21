// CONSTANTS
import { colors } from 'constants/colors'

// MUIS
import { DataGridPro } from '@mui/x-data-grid-pro'
import { gridClasses } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'

const CustomDataGridPro = styled(
  ({
    className,
    checkboxSelection = false,
    pagination = true,
    headerHeight = 48,
    pageSize = 10,
    componentsProps,
    rowHeight = 52,
    columnGroupingModel,
    ...props
  }) => (
    <DataGridPro
      experimentalFeatures={{ columnGrouping: true }}
      disableRowSelectionOnClick
      columnGroupingModel={columnGroupingModel}
      checkboxSelection={checkboxSelection}
      rowHeight={rowHeight}
      columnHeaderHeight={headerHeight}
      pagination={pagination}
      rowsPerPageOptions={[10, 25, 50, 100]}
      disableColumnMenu
      pageSize={pageSize}
      componentsProps={{
        ...componentsProps,
        pagination: {
          SelectProps: {
            MenuProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  fontSize: 13,
                },
              },
            },
          },
        },
      }}
      {...props}
      className={className}
    />
  )
)(({ theme }) => ({
  border: 'none',
  fontSize: 16,
  color: 'black',

  // STRIPPED ROW
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: '#f3f7f94d',
  },
  // HEADER
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none',
  },
  '& .MuiDataGrid-sortIcon': {
    color: colors.primary,
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    padding: 0,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
  },
  '& .MuiDataGrid-pinnedColumnHeaders': {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },

  // COLUMN
  '& .MuiDataGrid-pinnedColumns': {
    boxShadow: 'none',
    backgroundColor: 'unset',
    '& .MuiDataGrid-cell': {
      padding: 0,
    },
  },
  '[data-field="actions"] > *': {
    display: 'none',
  },
  '.MuiDataGrid-row.Mui-hovered [data-field="actions"] > *': {
    display: 'unset',
  },

  // ROW
  '& .MuiDataGrid-row:hover': {
    backgroundColor: colors.backgroundGrey,
  },
  '& .MuiDataGrid-row.Mui-hovered': {
    backgroundColor: colors.backgroundGrey,
  },
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: colors.textSecondary,
  },
  '& .MuiDataGrid-row.Mui-selected:hover': {
    backgroundColor: colors.backgroundGrey,
  },
  '& .MuiDataGrid-row.Mui-selected.Mui-hovered': {
    backgroundColor: colors.backgroundGrey,
  },

  // CELL
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },

  // PAGINATION
  '& .MuiTablePagination-selectLabel': {
    fontSize: 13,
  },
  '& .MuiTablePagination-select': {
    fontSize: 13,
  },
  '& .MuiTablePagination-displayedRows': {
    fontSize: 13,
  },
  '& .MuiIconButton-root': {
    padding: 8,
  },
}))

export default CustomDataGridPro
