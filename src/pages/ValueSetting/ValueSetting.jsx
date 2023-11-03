import { useState, useEffect, useContext } from 'react'
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
import CloseIcon from '@mui/icons-material/Close'

// COMPONENTS
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogDelete from 'components/DialogDelete/DialogDelete'
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// SERVICES
import { getValueSettingData, deleteValue } from 'services/valueSetting'

// STYLES
import useStyles from './valueSettingUseStyles'

// UTILS
import {
  setValueSettingToLocalStorage,
  removeValueSettingFromLocalStorage,
} from 'utilities/localStorage'

const ValueSetting = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { auth, setLoading, setSnackbarObject } = useContext(AllPagesContext)

  const initialColumns = [
    {
      field: 'no',
      headerName: 'ID',
      minWidth: 15,
      hide: false,
      isFilterShown: false,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'item',
      headerName: 'Sholat',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'takbir',
      headerName: 'Takbir',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'berdiri',
      headerName: 'Berdiri',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'sedekap',
      headerName: 'Sedekap',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'rukuk',
      headerName: 'Rukuk',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'sujud',
      headerName: 'Sujud',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'duduk',
      headerName: 'Duduk',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'salam',
      headerName: 'Salam',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'score',
      headerName: 'Nilai',
      flex: 1,
      minWidth: 110,
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
            setValueTempData(params.row)
            setAnchorOptionButton(e.currentTarget)
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

  const columnGroupingModel = [
    {
      groupId: 'Gerakan',
      children: [
        { field: 'takbir' },
        { field: 'sedekap' },
        { field: 'duduk' },
        { field: 'berdiri' },
        { field: 'rukuk' },
        { field: 'sujud' },
        { field: 'salam' },
      ],
    },
  ]

  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [totalRow, setTotalRow] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [tableData, setTableData] = useState([])
  const [selectedColumnList, setSelectedColumnList] = useState(initialColumns)
  const [anchorOptionButton, setAnchorOptionButton] = useState(null)
  const [valueTempData, setValueTempData] = useState(null)
  const [search, setSearch] = useState('')
  const [dialogDeleteValue, setDialogDeleteValue] = useState(null)

  // HANDLE DELETE VALUE
  const handleDeleteValue = async () => {
    const abortController = new AbortController()

    const resultDeleteAuthority = await deleteValue(
      abortController.signal,
      auth.accessToken,
      valueTempData.id
    )

    if (resultDeleteAuthority.status === 200) {
      setSnackbarObject({
        open: true,
        severity: 'success',
        title: 'Nilai berhasil dihapus.',
        message: '',
      })
      getAllValueSettings(abortController.signal)
      setDialogDeleteValue(null)
    } else {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: 'Gagal menghapus nilai.',
        message: '',
      })
      setDialogDeleteValue(null)
    }
  }

  // GET ALL VALUE SETTINGS
  const getAllValueSettings = async (inputSignal) => {
    const queryParams = {
      page: pageNumber,
      size: pageSize,
    }

    const resultData = await getValueSettingData(
      inputSignal,
      auth?.accessToken,
      search,
      queryParams
    )

    if (resultData.status === 200) {
      const newTableData = resultData?.data?.rows?.map((item, index) => {
        return {
          ...item,
          no: index + 1,
        }
      })
      setTableData(newTableData)
      setTotalRow(resultData?.data?.totalElements)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getAllValueSettings(abortController.signal)

    return () => {
      abortController.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, search])

  useEffect(() => {
    setLoading(true)
    removeValueSettingFromLocalStorage()
  }, [])

  return (
    <Stack className={classes.root}>
      <Stack>
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
            <TextField
              variant='outlined'
              placeholder='Search..'
              size='small'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>

          {/* DATA GRID */}
          <Stack padding='0px 30px 30px 30px' height='33vw'>
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
            anchorEl={anchorOptionButton}
            open={Boolean(anchorOptionButton)}
            onClose={() => setAnchorOptionButton(null)}
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
              onClick={() => {
                setValueSettingToLocalStorage(valueTempData)
                valueTempData.id &&
                  navigate(`/value-setting/edit/${valueTempData.id}`)
                setAnchorOptionButton(null)
              }}
            >
              <Stack
                width={104}
                height={40}
                sx={{
                  backgroundColor: '#e4eaec',
                  color: '#76838f',
                  paddingLeft: '7px',
                  ':hover': { backgroundColor: '#f3f7f9' },
                }}
                borderRadius='4px'
                direction='row'
                alignItems='center'
                justifyContent='left'
                spacing={1}
              >
                <EditNoteIcon />
                <Typography>Edit</Typography>
              </Stack>
            </MenuItem>

            {/* DELETE */}
            <MenuItem
              sx={{
                backgroundColor: 'white',
                ':hover': { backgroundColor: 'white' },
              }}
              onClick={() => {
                setAnchorOptionButton(null)
                setDialogDeleteValue(true)
              }}
            >
              <Stack
                width={104}
                height={40}
                sx={{
                  backgroundColor: '#e4eaec',
                  color: '#76838f',
                  paddingLeft: '7px',
                  ':hover': { backgroundColor: '#f3f7f9' },
                  marginTop: -1,
                }}
                borderRadius='4px'
                direction='row'
                alignItems='center'
                justifyContent='left'
                spacing={1}
              >
                <CloseIcon />
                <Typography>Hapus</Typography>
              </Stack>
            </MenuItem>
          </Menu>

          {/* DIALOG DELETE VALUE */}
          <DialogDelete
            dialogDelete={dialogDeleteValue}
            setDialogDelete={setDialogDeleteValue}
            title='Apakah Anda yakin akan menghapus data ini ?'
            handleOkButtonClick={handleDeleteValue}
          />
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default ValueSetting
