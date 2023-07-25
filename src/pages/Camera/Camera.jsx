import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// MUIS
import {
  Button, Stack, Menu, MenuItem,
  TextField, Typography
} from '@mui/material'

// MUI ICONS
import SettingsIcon from '@mui/icons-material/Settings'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EditNoteIcon from '@mui/icons-material/EditNote'
import ClearIcon from '@mui/icons-material/Clear'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// COMPONENTS
import DataGridTable from 'components/DataGridTable/DataGridTable'
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// STYLES
import useStyles from './cameraUseStyles'

// DATA DUMMY
import { cameraData } from 'pages/DataDummy'

// ROUTES
import { cameraRoutes } from './cameraRoutes'

const Camera = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const initialColumns = [
    {
      field: 'id',
      headerName: 'No',
      flex: 1,
      maxWidth: 100,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
    },
    {
      field: 'title',
      headerName: 'Nama Kamera',
      flex: 1,
      minWidth: 270,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'ip',
      headerName: 'IP',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'port',
      headerName: 'Port',
      flex: 1,
      minWidth: 60,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'type',
      headerName: 'Perkelahian/Sholat',
      flex: 1,
      minWidth: 100,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'creation_date',
      headerName: 'Dibuat Pada',
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
      minWidth: 100,
      hide: false,
      isFilterShown: true,
      isSortShown: false,
      renderCell: (params) => (
        <Button
          className={`no-zoom ${classes.settingButton}`}
          startIcon={<SettingsIcon />}
          endIcon={<ArrowDropDownIcon />}
          onClick={(e) => setAnchorEditButton(e.currentTarget)}
        >
        </Button>
      ),
    },
  ]
  
  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [totalRow, setTotalRow] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [tableData, setTableData] = useState(cameraData)
  const [selectedColumnList, setSelectedColumnList] = useState(initialColumns)
  const [anchorEditButton, setAnchorEditButton] = useState(null)

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Header breadcrumbList={[cameraRoutes[0], cameraRoutes[1]]} />

      {/* TABLE */}
      <Stack className={classes.tableContainer}>
        {/* TITLE */}
        <Stack className={classes.titleTableContainer}>
          <Typography fontSize={18} sx={{ color: 'white' }}>
            Daftar Data Kamera
          </Typography>
        </Stack>

        {/* SEARCH BAR */}
        <Stack
          direction='row'
          width='100%'
          justifyContent='flex-end'
          margin='20px 0 10px'
          paddingRight='30px'
        >
          <TextField variant='outlined' placeholder='Search..' size='small' />
        </Stack>

        {/* DATA GRID */}
        <Stack
          minHeight={'34.7vw'}
          height={tableData * 52 + 48}
          padding='0px 30px 30px'
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
          />
        </Stack>

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
              '& .MuiMenuItem-root': {
                zoom: 0.85, padding: '2.5px 5px',
                '&:first-child' : {paddingBottom: 0, paddingTop: '7px'},
                '&:last-child' : {paddingTop: 0, paddingBottom: '7px'},
              },
            },
            '& .MuiList-root': {
              padding: 0
            },
          }}
        >
          <MenuItem onClick={() => setAnchorEditButton(null)}>
            <Button className={classes.menuButton} startIcon={<EditNoteIcon />}>Edit</Button>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEditButton(null)}>
            <Button className={classes.menuButton} startIcon={<ClearIcon />}>Hapus</Button>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEditButton(null)}>
            <Button className={classes.menuButton} startIcon={<PlayArrowIcon />}>Restart Service</Button>
          </MenuItem>
        </Menu>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default Camera
