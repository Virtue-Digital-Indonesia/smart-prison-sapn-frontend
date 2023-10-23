import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import {
  Button,
  Stack,
  Menu,
  MenuItem,
  TextField,
  Typography,
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
import DialogDelete from 'components/DialogDelete/DialogDelete'

// SERVICE
import {
  getCameraList,
  deleteCamera,
  getRestartCameraService,
} from 'services/camera'

// STYLES
import useStyles from './cameraUseStyles'

// ROUTES
import { cameraRoutes } from './cameraRoutes'

// UTILS
import {
  setCameraDetailToLocalStorage,
  removeCameraDetailFromLocalStorage,
} from 'utilities/localStorage'

const Camera = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { auth, setLoading, setSnackbarObject } = useContext(AllPagesContext)

  const initialColumns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 1,
      maxWidth: 100,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
    },
    {
      field: 'nama',
      headerName: 'Nama Kamera',
      flex: 1,
      minWidth: 270,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'IP',
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
      field: 'status_fight_sholat',
      headerName: 'Perkelahian/Sholat',
      flex: 1,
      minWidth: 100,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value === 1 ? 'Perkelahian' : 'Sholat'),
    },
    {
      field: 'created_at',
      headerName: 'Dibuat Pada',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) =>
        moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
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
          onClick={(e) => {
            setCameraTempData(params.row)
            setAnchorEditButton(e.currentTarget)
          }}
        ></Button>
      ),
    },
  ]

  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [totalRow, setTotalRow] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [tableData, setTableData] = useState([])
  const [selectedColumnList, setSelectedColumnList] = useState(initialColumns)
  const [anchorEditButton, setAnchorEditButton] = useState(null)
  const [search, setSearch] = useState('')
  const [dialogDeleteCamera, setDialogDeleteCamera] = useState(null)
  const [cameraTempData, setCameraTempData] = useState(null)

  // HANDLE EDIT CAMERA
  const handleEditButtonClick = () => {
    setCameraDetailToLocalStorage(cameraTempData)
    navigate(`/camera/edit/${cameraTempData?.id}`)
  }

  // HANDLE DELETE CAMERA
  const handleDeleteCamera = async () => {
    const abortController = new AbortController()

    const resultDeleteAuthority = await deleteCamera(
      abortController.signal,
      auth.accessToken,
      cameraTempData.id
    )

    if (resultDeleteAuthority.status === 200) {
      setSnackbarObject({
        open: true,
        severity: 'success',
        title: 'Satu data kamera telah di hapus.',
        message: '',
      })
      getCameraListData(abortController.signal, auth.accessToken)
      setDialogDeleteCamera(null)
    } else {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: 'Gagal menghapus data kamera.',
        message: '',
      })
      setDialogDeleteCamera(null)
    }
  }

  // HANDLE RESTART SERVICE
  const handleRestartService = async () => {
    setLoading(true)
    const abortController = new AbortController()

    const resultRestartService = await getRestartCameraService(
      abortController.signal,
      auth.accessToken,
      cameraTempData.id
    )

    if (resultRestartService.status === 200) {
      setSnackbarObject({
        open: true,
        severity: 'success',
        title: 'Service kamera berhasil direstart.',
        message: '',
      })
      setLoading(false)
    } else {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: 'Service kamera gagal direstart.',
        message: '',
      })
      setLoading(false)
    }
    abortController.abort()
  }

  // GET CAMERA LIST
  const getCameraListData = async (inputSignal, inputToken) => {
    const queryParams = {
      page: pageNumber,
      size: pageSize,
    }

    const resultData = await getCameraList(
      inputSignal,
      inputToken,
      search,
      queryParams
    )

    if (resultData.status === 200) {
      setTotalRow(resultData?.data?.totalElements)
      setTableData(
        resultData.data.rows.map((item, index) => {
          return {
            ...item,
            no: index + 1,
          }
        })
      )
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getCameraListData(abortController.signal, auth.accessToken)
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  // REMOVE CAMERA DATA FROM LOCAL STORAGE
  useEffect(() => {
    setLoading(true)
    removeCameraDetailFromLocalStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack className={classes.root}>
      <Stack>
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
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant='outlined'
              placeholder='Search..'
              size='small'
            />
          </Stack>

          {/* DATA GRID */}
          <Stack height='33vw' padding='0px 30px 30px'>
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
                  zoom: 0.85,
                  padding: '2.5px 5px',
                  '&:first-of-type': { paddingBottom: 0, paddingTop: '7px' },
                  '&:last-child': { paddingTop: 0, paddingBottom: '7px' },
                },
              },
              '& .MuiList-root': {
                padding: 0,
              },
            }}
          >
            {/* EDIT */}
            <MenuItem
              sx={{
                backgroundColor: 'white',
                ':hover': { backgroundColor: 'white' },
              }}
              onClick={() => handleEditButtonClick()}
            >
              <Button
                className={classes.menuButton}
                startIcon={<EditNoteIcon />}
              >
                Edit
              </Button>
            </MenuItem>

            {/* HAPUS */}
            <MenuItem
              sx={{
                backgroundColor: 'white',
                ':hover': { backgroundColor: 'white' },
              }}
              onClick={() => {
                setAnchorEditButton(null)
                setDialogDeleteCamera(true)
              }}
            >
              <Button className={classes.menuButton} startIcon={<ClearIcon />}>
                Hapus
              </Button>
            </MenuItem>

            {/* RESTART */}
            <MenuItem
              sx={{
                backgroundColor: 'white',
                ':hover': { backgroundColor: 'white' },
              }}
              onClick={() => setAnchorEditButton(null)}
            >
              <Button
                className={classes.menuButton}
                startIcon={<PlayArrowIcon />}
                onClick={handleRestartService}
              >
                Restart Service
              </Button>
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />

      {/* DIALOG DELETE AUTHORITY */}
      <DialogDelete
        dialogDelete={dialogDeleteCamera}
        setDialogDelete={setDialogDeleteCamera}
        title='Apakah Anda yakin akan menghapus data ini ?'
        handleOkButtonClick={handleDeleteCamera}
      />
    </Stack>
  )
}

export default Camera
