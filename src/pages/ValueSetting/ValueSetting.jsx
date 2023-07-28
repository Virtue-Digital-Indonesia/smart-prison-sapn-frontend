import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// MUIS
import {
  Button,
  Stack,
  Typography,
  TextField,
  Menu,
  MenuItem,
} from '@mui/material'

// MUI ICONS
import SettingsIcon from '@mui/icons-material/Settings'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EditNoteIcon from '@mui/icons-material/EditNote'

// COMPONENTS
import DataGridTable from 'components/DataGridTable/DataGridTable'
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// STYLES
import useStyles from './valueSettingUseStyles'

const ValueSetting = () => {
  const classes = useStyles()
  const navigate = useNavigate()

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
        <Button
          className='no-zoom'
          startIcon={<SettingsIcon />}
          endIcon={<ArrowDropDownIcon />}
          onClick={(e) => setAnchorEditButton(e.currentTarget)}
          sx={{
            backgroundColor: '#f2a654',
            borderColor: '#f2a654',
            color: '#ffffff',
            padding: '9px 8px 9px 22px',

            ':hover': {
              backgroundColor: '#f2a65490',
              borderColor: '#f2a65490',
            },
          }}
          disableRipple
        />
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
  const [totalRow, setTotalRow] = useState(initialTableData.length)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [tableData, setTableData] = useState(initialTableData)
  const [selectedColumnList, setSelectedColumnList] = useState(initialColumns)
  const [anchorEditButton, setAnchorEditButton] = useState(null)

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Header />

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
        <Stack
          minHeight={'34.7vw'}
          height={tableData * 52 + 48}
          padding='0px 30px 30px 30px'
        >
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

        {/* MENU ITEM */}
        <Menu
          anchorEl={anchorEditButton}
          open={Boolean(anchorEditButton)}
          onClose={() => setAnchorEditButton(null)}
          className='no-zoom'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{
            '@media only screen and (max-height: 820px)': {
              '& .MuiMenuItem-root': { zoom: 0.85 },
            },
            '& .MuiList-root': {
              paddingTop: 0,
              paddingBottom: 0,
            },
            '& .MuiButtonBase-root': {
              paddingRight: 1,
              paddingLeft: 1,
            },
          }}
        >
          <MenuItem
            sx={{
              backgroundColor: 'white',
              ':hover': { backgroundColor: 'white' },
            }}
            onClick={() => setAnchorEditButton(null)}
          >
            <Stack
              width={84}
              height={40}
              sx={{
                backgroundColor: '#e4eaec',
                color: '#76838f',
                ':hover': { backgroundColor: '#f3f7f9' },
              }}
              borderRadius='4px'
              direction='row'
              alignItems='center'
              justifyContent='center'
              spacing={1}
              onClick={() => navigate(
                '/value-setting/edit/1'
                //`/value-setting/edit/${inputParams.id}`
              )}
            >
              <EditNoteIcon />
              <Typography>Edit</Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default ValueSetting
