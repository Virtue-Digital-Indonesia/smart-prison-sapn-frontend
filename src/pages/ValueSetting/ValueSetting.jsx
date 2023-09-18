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

// COMPONENTS
import DataGridTable from 'components/DataGridTable/DataGridTable'
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// SERVICES
import { getValueSettingData } from 'services/valueSetting'

// STYLES
import useStyles from './valueSettingUseStyles'

const ValueSetting = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { auth, setLoading } = useContext(AllPagesContext)

  const initialColumns = [
    {
      field: 'id',
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
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'berdiri',
      headerName: 'Berdiri',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'sedekap',
      headerName: 'Sedekap',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'rukuk',
      headerName: 'Rukuk',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'duduk',
      headerName: 'Duduk',
      flex: 1,
      minWidth: 150,
      hide: false,
      isFilterShown: true,
      isSortShown: true,
      renderCell: (params) => (params.value !== '' ? params.value : '-'),
    },
    {
      field: 'score',
      headerName: 'Nilai',
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
            setSelectedValue(params.id)
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

  const columnGroupingModel = [
    {
      groupId: 'Gerakan',
      children: [
        { field: 'takbir' },
        { field: 'sedekap' },
        { field: 'duduk' },
        { field: 'berdiri' },
        { field: 'rukuk' },
      ],
    },
  ]

  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [totalRow, setTotalRow] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [tableData, setTableData] = useState([])
  const [tempTableData, setTempTableData] = useState([])
  const [selectedColumnList, setSelectedColumnList] = useState(initialColumns)
  const [anchorEditButton, setAnchorEditButton] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)

  // GET ALL VALUE SETTINGS
  const getAllValueSettings = async (inputSignal) => {
    setLoading(true)

    const queryParams = {
      page: pageNumber,
      size: pageSize,
    }

    const resultData = await getValueSettingData(
      inputSignal,
      auth?.accessToken,
      queryParams
    )

    if (resultData.status === 200) {
      const newTableData = resultData?.data?.rows?.map((item) => {
        return {
          ...item,
        }
      })
      setTableData(newTableData)
      setTempTableData(newTableData)
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
  }, [pageNumber, pageSize])

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
        <Stack padding='0px 30px 30px 30px'>
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
              onClick={() => navigate(`/value-setting/edit/${selectedValue}`)}
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
