import { useState } from 'react'
// MUIS
import { Button, Stack } from '@mui/material'

// COMPONENTS
import DataGridTable from 'components/DataGridTable/DataGridTable'

const ValueSetting = () => {
  const initialColumns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 110,
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
    <Stack width='100%' height='100%' padding='100px'>
      {/* TABLE */}
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
  )
}

export default ValueSetting
