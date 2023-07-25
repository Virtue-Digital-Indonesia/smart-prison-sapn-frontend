import React, { useState, useEffect } from 'react'

// COMPONENTS
import CustomDataGridPro from 'components/Customs/CustomDataGridPro'

// MUIS
import { Typography, IconButton } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid-pro'

// MUI ICONS
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SortIcon from '@mui/icons-material/Sort'

// STYLES
import useStyles from './dataGridTableUseStyles'

const DataGridTable = (props) => {
  const {
    // BASE
    initialColumns,
    selectedColumnList,
    setSelectedColumnList,
    rows,
    // PAGINATION
    total,
    page,
    setPage,
    pageSize,
    setPageSize,
    // ORDER
    order,
    setOrder,
    orderBy,
    setOrderBy,
    // FILTER
    isFilterOn,
    setFilters,
    // SELECTION
    selectionModel,
    setSelectionModel,
    // GROUP BY ROW
    selectedGroupBy,
    getTreeDataPath,
    groupingColDef,
    // COLUMN GROUPING MODEL
    columnGroupingModel,
    ...otherProps
  } = props

  const dataGridApiRef = useGridApiRef()
  const classes = useStyles()

  const [sortModel, setSortModel] = useState([])

  const handleChangeRowsPerPage = (newPageSize) => {
    setPageSize(newPageSize.pageSize)
    setPage(newPageSize.page)
  }

  const handleSortModelChange = (model, details) => {
    setOrder(model[0] ? model[0].sort : null)
    setOrderBy(model[0] ? model[0].field : null)
    setSortModel(model)
  }

  const getSortIcon = (field) => {
    const currentSortModel = dataGridApiRef?.current?.getSortModel()

    let selectedIcon = <SortIcon className={classes.columnUnsortedIconAsc} />
    if (currentSortModel[0]) {
      if (currentSortModel[0].field === field) {
        if (currentSortModel[0].sort === 'asc') {
          selectedIcon = (
            <ArrowDropUpIcon
              className={`${classes.columnUnsortedIconAsc} ${classes.columnSortedIconAsc}`}
            />
          )
        } else if (currentSortModel[0].sort === 'desc') {
          selectedIcon = (
            <ArrowDropUpIcon
              className={`${classes.columnUnsortedIconAsc} ${classes.columnSortedIconDesc}`}
            />
          )
        }
      } else {
        if (currentSortModel[0].sort === 'asc') {
          selectedIcon = (
            <SortIcon
              className={`${classes.columnUnsortedIconAsc} ${classes.columnUnsortedIconAsc}`}
            />
          )
        } else if (currentSortModel[0].sort === 'desc') {
          selectedIcon = (
            <SortIcon
              className={`${classes.columnUnsortedIconAsc} ${classes.columnUnsortedIconDesc}`}
            />
          )
        }
      }
    }
    return selectedIcon
  }

  const handleSortIconClick = (field) => {
    const currentSortModel = dataGridApiRef.current.getSortModel()

    let newSortModel = []
    if (currentSortModel[0]) {
      if (currentSortModel[0].field === field) {
        if (currentSortModel[0].sort === 'asc') {
          newSortModel = [
            {
              field,
              sort: 'desc',
            },
          ]
        } else if (currentSortModel[0].sort === 'desc') {
          newSortModel = []
        }
      } else {
        newSortModel = [
          {
            field,
            sort: 'asc',
          },
        ]
      }
    } else if (!currentSortModel[0]) {
      newSortModel = [
        {
          field,
          sort: 'asc',
        },
      ]
    }

    handleSortModelChange(newSortModel)
  }

  const filterOnColumns = selectedColumnList.map((item) => {
    if (item.field !== 'actions') {
      return {
        renderHeader: (params) => (
          <>
            <Typography variant='inherit' className={classes.columnFilterText}>
              {item.headerName}
            </Typography>

            {/* SORT ICON */}
            {item.isSortShown && (
              <IconButton
                size='small'
                onClick={() => handleSortIconClick(item.field)}
                sx={{ marginLeft: '8px' }}
              >
                {getSortIcon(item.field)}
              </IconButton>
            )}
          </>
        ),
      }
    }

    return { renderHeader: null }
  })

  useEffect(() => {
    setSelectedColumnList((current) => {
      return current.map((item, index) => {
        return {
          ...item,
          renderHeader: filterOnColumns[index].renderHeader
            ? filterOnColumns[index].renderHeader
            : null,
          sortable: false,
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CustomDataGridPro
      // BASE
      columns={selectedColumnList}
      rows={rows}
      headerHeight={38}
      // PAGINATION
      page={page}
      pageSize={pageSize}
      onPaginationModelChange={handleChangeRowsPerPage}
      // onPageChange={(page, details) => console.log(page)}
      paginationMode='server'
      rowCount={total}
      // SORT
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      apiRef={dataGridApiRef}
      // GROUP BY ROW
      treeData={selectedGroupBy?.value ? true : false}
      getTreeDataPath={getTreeDataPath}
      groupingColDef={groupingColDef}
      defaultGroupingExpansionDepth={-1}
      // SELECTION
      // onCellClick={(params, event, details) =>
      //   handleCellClick(params, event, details)
      // }
      // onColumnHeaderClick={(params, event, details) =>
      //   handleColumnHeaderClick(params, event, details)
      // }
      selectionModel={selectionModel}
      // SETTINGS
      initialState={{
        pinnedColumns: {
          right: ['actions'],
        },
      }}
      columnGroupingModel={columnGroupingModel}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      {...otherProps}
    />
  )
}

export default DataGridTable
