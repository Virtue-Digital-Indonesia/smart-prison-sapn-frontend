import { useState } from 'react'
// MUIS
import { Button, Stack, Typography, TextField } from '@mui/material'

// COMPONENTS
import DataGridTable from 'components/DataGridTable/DataGridTable'
import Footer from 'components/Footer/Footer'

// STYLES
import useStyles from './valueSettingUseStyles'

const ValueSetting = () => {
  const classes = useStyles()

  const initialColumns = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 15,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
    },
    {
      field: 'sholat',
      headerName: 'Sholat',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'takbir',
      headerName: 'Takbir',
      flex: 1,
      minWidth: 270,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'sedekap',
      headerName: 'Sedekap',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'duduk',
      headerName: 'Duduk',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'nilai',
      headerName: 'Nilai',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'opsi',
      headerName: 'Opsi',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: false,
      renderCell: (params) => (
        <Button onClick={() => alert('Hello World')}>Tes</Button>
      ),
    },
  ]

  const initialTableData = [
    {
      id: 1,
      sholat: 'Subuh',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 2,
      sholat: 'Dzuhur',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 3,
      sholat: 'Ashar',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 4,
      sholat: 'Subuh',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 5,
      sholat: 'Dzuhur',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 6,
      sholat: 'Ashar',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 7,
      sholat: 'Subuh',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 8,
      sholat: 'Dzuhur',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 9,
      sholat: 'Ashar',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 10,
      sholat: 'Dzuhur',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 11,
      sholat: 'Ashar',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 12,
      sholat: 'Dzuhur',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
    {
      id: 13,
      sholat: 'Ashar',
      takbir: 10,
      sedekap: 10,
      duduk: 10,
      nilai: 10,
    },
  ]

  const columnGroupingModel = [
    {
      groupId: 'Gerakan',
      children: [{ field: 'takbir' }, { field: 'sedekap' }, { field: 'duduk' }],
    },
  ]

  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [totalRow, setTotalRow] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [tableData, setTableData] = useState(initialTableData)
  const [selectedColumnList, setSelectedColumnList] = useState(initialColumns)

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Stack height='100px' width='100%'>
        HEader
      </Stack>

      {/* TABLE */}
      <Stack className={classes.tableContainer}>
        {/* TITLE */}
        <Stack className={classes.titleTableContainer}>
          <Typography fontSize={18} sx={{ color: 'white' }}>
            Daftar Data Nilai Sholat
          </Typography>
        </Stack>

        {/* SEARCH BAR */}
        <Stack
          direction='row'
          width='100%'
          justifyContent='flex-end'
          marginTop='20px'
          paddingRight='30px'
        >
          <TextField variant='outlined' placeholder='Search..' size='small' />
        </Stack>

        {/* DATA GRID */}
        <Stack height='85%' padding='0px 30px 30px 30px'>
          <DataGridTable
            // BASE
            initialColumns={initialColumns}
            selectedColumnList={selectedColumnList}
            setSelectedColumnList={setSelectedColumnList}
            rows={tableData}
            // PAGINATION
            total={totalRow}
            page={pageNumber}
            setPage={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            // ORDER
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            // COLUMN GROUPING MODEL
            columnGroupingModel={columnGroupingModel}
          />
        </Stack>

        {/* <DataGrid
          rows={tableData}
          columns={initialColumns}
          // checkboxSelection
          // disableRowSelectionOnClick
          columnGroupingModel={columnGroupingModel}
          experimentalFeatures={{ columnGrouping: true }}
        /> */}
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default ValueSetting
