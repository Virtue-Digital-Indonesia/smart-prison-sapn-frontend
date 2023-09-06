import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// COMPONENT
import Header from './Header/Header'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import Footer from 'components/Footer/Footer'

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
import CloseIcon from '@mui/icons-material/Close'

// STYLES
import useStyles from './authorityUseStyles'

const Authority = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const initialColumns = [
    {
      field: 'no',
      headerName: 'No',
      minWidth: 15,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
    },
    {
      field: 'authorityName',
      headerName: 'Nama Kewenangan Pengguna',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'createdAt',
      headerName: 'Dibuat pada',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'updatedAt',
      headerName: 'Diperbarui pada',
      flex: 1,
      minWidth: 150,
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
          onClick={(e) => {
            setParamsID(params.id)
            setAnchorEditButton(e.currentTarget)
          }}
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
      no: 1,
      id: 1,
      authorityName: 'Superadmin',
      createdAt: '2022-03-17 14:16:07',
      updatedAt: '2022-03-17 14:16:07',
    },
    {
      no: 2,
      id: 2,
      authorityName: 'Administrator',
      createdAt: '2022-03-17 14:16:07',
      updatedAt: '2022-03-17 14:16:07',
    },
    {
      no: 3,
      id: 3,
      authorityName: 'Administrator',
      createdAt: '2022-03-17 14:16:07',
      updatedAt: '2022-03-17 14:16:07',
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
  const [paramsID, setParamsID] = useState(null)

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Header />

      {/* TABLE */}
      <Stack className={classes.tableContainer}>
        {/* TITLE */}
        <Stack className={classes.titleTableContainer}>
          <Typography fontSize={18} sx={{ color: 'white' }}>
            Daftar Data Kewenangan
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
        <Stack padding='0px 30px 30px 30px' minHeight='60vh'>
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
          {/* KELOLA */}
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
            >
              <SettingsIcon />
              <Typography>Kelola</Typography>
            </Stack>
          </MenuItem>

          {/* EDIT */}
          <MenuItem
            sx={{
              backgroundColor: 'white',
              ':hover': { backgroundColor: 'white' },
            }}
            onClick={() => {
              paramsID && navigate(`/authority/edit-authority/${paramsID}`)
              setAnchorEditButton(null)
            }}
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
            >
              <EditNoteIcon />
              <Typography>Edit</Typography>
            </Stack>
          </MenuItem>

          {/* HAPUS */}
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
            >
              <CloseIcon />
              <Typography>Hapus</Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default Authority
