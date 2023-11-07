import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

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

// COMPONENTS
import DataGridTable from 'components/DataGridTable/DataGridTable'
import DialogDelete from 'components/DialogDelete/DialogDelete'
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// STYLES
import useStyles from './userUseStyles'

// ROUTES
import { userRoutes } from './userRoutes'

// SERVICES
import { getAllUsersData, deleteUser } from 'services/user'

// UTILS
import {
  setUserSettingToLocalStorage,
  removeUserSettingFromLocalStorage,
} from 'utilities/localStorage'

const User = () => {
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
      field: 'name_group',
      headerName: 'Kewenangan',
      flex: 1,
      minWidth: 200,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'name_user',
      headerName: 'Nama',
      flex: 1,
      minWidth: 190,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      minWidth: 190,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
    },
    {
      field: 'created_at',
      headerName: 'Dibuat Pada',
      flex: 1,
      minWidth: 230,
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
            setUserTempData(params.row)
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
  const [userTempData, setUserTempData] = useState(null)
  const [search, setSearch] = useState('')
  const [dialogDeleteValue, setDialogDeleteValue] = useState(null)
  const [isDataGridLoading, setIsDataGridLoading] = useState(false)

  // HANDLE DELETE USER
  const handleDeleteUser = async () => {
    setLoading(true)
    const abortController = new AbortController()

    const resultDeleteAuthority = await deleteUser(
      abortController.signal,
      auth.accessToken,
      userTempData.id
    )

    if (resultDeleteAuthority.status === 200) {
      setLoading(false)
      setSnackbarObject({
        open: true,
        severity: 'success',
        title: 'Satu data pengguna telah dihapus.',
        message: '',
      })
      getAllUsers(abortController.signal)
      setDialogDeleteValue(null)
    } else {
      setLoading(false)
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: 'Gagal menghapus data pengguna.',
        message: '',
      })
      setDialogDeleteValue(null)
    }
  }

  // GET ALL USERS
  const getAllUsers = async (inputSignal) => {
    setIsDataGridLoading(true)
    const queryParams = {
      page: pageNumber,
      size: pageSize,
    }

    const resultData = await getAllUsersData(
      inputSignal,
      auth?.accessToken,
      search,
      queryParams
    )

    if (resultData.status === 200) {
      const newTableData = resultData?.data?.rows?.map((item, index) => {
        return {
          ...item,
          id: item.id_user,
          no: index + 1,
        }
      })
      setTableData(newTableData)
      setTotalRow(resultData?.data?.totalElements)
      setIsDataGridLoading(false)
    } else {
      setIsDataGridLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getAllUsers(abortController.signal)

    return () => {
      abortController.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, search])

  useEffect(() => {
    removeUserSettingFromLocalStorage()
  }, [])

  return (
    <Stack className={classes.root}>
      <Stack>
        {/* HEADER */}
        <Header breadcrumbList={[userRoutes[0], userRoutes[1]]} />

        {/* TABLE */}
        <Stack className={classes.tableContainer}>
          {/* TITLE */}
          <Stack className={classes.titleTableContainer}>
            <Typography fontSize={18} sx={{ color: 'white' }}>
              Daftar Data Pengguna
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
              variant='outlined'
              placeholder='Search..'
              size='small'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>

          {/* DATA GRID */}
          <Stack minHeight='55vh' maxHeight='65vh' padding='0px 30px 30px'>
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
                  '&:last-child': { paddingBottom: '7px' },
                },
              },
              '& .MuiList-root': {
                padding: 0,
              },
            }}
          >
            <MenuItem
              sx={{
                backgroundColor: 'white',
                ':hover': { backgroundColor: 'white' },
              }}
              onClick={() => {
                setUserSettingToLocalStorage(userTempData)
                userTempData.id && navigate(`/user/edit/${userTempData.id}`)
                setAnchorEditButton(null)
              }}
            >
              <Button
                className={classes.menuButton}
                startIcon={<EditNoteIcon />}
              >
                Edit
              </Button>
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: 'white',
                ':hover': { backgroundColor: 'white' },
              }}
              onClick={() => {
                setAnchorEditButton(null)
                setDialogDeleteValue(true)
              }}
            >
              <Button className={classes.menuButton} startIcon={<ClearIcon />}>
                Hapus
              </Button>
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />

      {/* DIALOG DELETE VALUE */}
      <DialogDelete
        dialogDelete={dialogDeleteValue}
        setDialogDelete={setDialogDeleteValue}
        title='Apakah Anda yakin akan menghapus data ini ?'
        handleOkButtonClick={handleDeleteUser}
      />
    </Stack>
  )
}

export default User
