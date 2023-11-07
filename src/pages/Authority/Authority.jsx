import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// COMPONENT
import Header from './Header/Header'
import DataGridTable from 'components/DataGridTable/DataGridTable'
import Footer from 'components/Footer/Footer'
import DialogDelete from 'components/DialogDelete/DialogDelete'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

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

// SERVICE
import { getAuthorityList, deleteAuthority } from 'services/authority'

// STYLES
import useStyles from './authorityUseStyles'

// UTILS
import {
  setAuthorityToLocalStorage,
  removeAuthorityFromLocalStorage,
} from 'utilities/localStorage'

const Authority = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { auth, setLoading, setSnackbarObject } = useContext(AllPagesContext)

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
      field: 'name_group',
      headerName: 'Nama Kewenangan Pengguna',
      flex: 1,
      minWidth: 110,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'create_at',
      headerName: 'Dibuat pada',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) =>
        moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'modified_at',
      headerName: 'Diperbarui pada',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) =>
        params.value ? moment(params.value).format('YYYY-MM-DD HH:mm:ss') : '-',
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
          size='small'
          startIcon={<SettingsIcon />}
          endIcon={<ArrowDropDownIcon />}
          onClick={(e) => {
            setAuthorityTempData(params.row)
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

  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [totalRow, setTotalRow] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [tableData, setTableData] = useState([])
  const [selectedColumnList, setSelectedColumnList] = useState(initialColumns)
  const [anchorOptionButton, setAnchorOptionButton] = useState(null)
  const [authorityTempData, setAuthorityTempData] = useState(null)
  const [search, setSearch] = useState('')
  const [dialogDeleteAuthority, setDialogDeleteAuthority] = useState(null)
  const [isDataGridLoading, setIsDataGridLoading] = useState(false)

  // HANDLE DELETE AUTHORITY
  const handleDeleteAuthority = async () => {
    setLoading(true)
    const abortController = new AbortController()

    const resultDeleteAuthority = await deleteAuthority(
      abortController.signal,
      auth.accessToken,
      authorityTempData.id
    )

    if (resultDeleteAuthority.status === 200) {
      setLoading(false)
      setSnackbarObject({
        open: true,
        severity: 'success',
        title: 'Satu data kewenangan telah di hapus.',
        message: '',
      })
      getAuthorityListData(abortController.signal, auth.accessToken)
      setDialogDeleteAuthority(null)
    } else {
      setLoading(false)
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: 'Gagal menghapus data kewenangan.',
        message: '',
      })
      setDialogDeleteAuthority(null)
    }
  }

  // GET AUTHORITY LIST
  const getAuthorityListData = async (inputSignal, inputToken) => {
    setIsDataGridLoading(true)
    const queryParams = {
      page: pageNumber,
      size: pageSize,
    }
    const resultData = await getAuthorityList(
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
            id: item.id_group,
            no: index + 1,
          }
        })
      )
      setIsDataGridLoading(false)
    } else {
      setIsDataGridLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getAuthorityListData(abortController.signal, auth.accessToken)
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageNumber, pageSize])

  // REMOVE AUTHORITY LOCAL STORAGE DATA
  useEffect(() => {
    removeAuthorityFromLocalStorage()
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
            <TextField
              variant='outlined'
              placeholder='Search..'
              size='small'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>

          {/* DATA GRID */}
          <Stack padding='0px 30px 30px 30px' minHeight='55vh' maxHeight='65vh'>
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
              loading={isDataGridLoading}
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
            {/* KELOLA */}
            <MenuItem
              sx={{
                backgroundColor: 'white',
                ':hover': { backgroundColor: 'white' },
              }}
              onClick={() => {
                authorityTempData.id &&
                  navigate(`/authority/manage/${authorityTempData.id}`)
                setAnchorOptionButton(null)
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
                setAuthorityToLocalStorage(authorityTempData)
                authorityTempData.id &&
                  navigate(`/authority/edit-authority/${authorityTempData.id}`)
                setAnchorOptionButton(null)
              }}
            >
              <Stack
                width={84}
                height={40}
                sx={{
                  backgroundColor: '#e4eaec',
                  color: '#76838f',
                  ':hover': { backgroundColor: '#f3f7f9' },
                  marginTop: -1,
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
              onClick={() => {
                setAnchorOptionButton(null)
                setDialogDeleteAuthority(true)
              }}
            >
              <Stack
                width={84}
                height={40}
                sx={{
                  backgroundColor: '#e4eaec',
                  color: '#76838f',
                  ':hover': { backgroundColor: '#f3f7f9' },
                  marginTop: -1,
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

          {/* DIALOG DELETE AUTHORITY */}
          <DialogDelete
            dialogDelete={dialogDeleteAuthority}
            setDialogDelete={setDialogDeleteAuthority}
            title='Apakah Anda yakin akan menghapus data ini ?'
            handleOkButtonClick={handleDeleteAuthority}
          />
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default Authority
