import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// COMPONENT
import Header from './Header/Header'
import Footer from 'components/Footer/Footer'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import {
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
} from '@mui/material/'

// SERVICE
import { getUserAccess, putManageUserAccess } from 'services/authority'

// STYLES
import useStyles from './authorityManagementUseStyles'

// UTILS
import { getTimeZoneOffset } from 'utilities/valueConverter'

const AuthorityManagement = () => {
  const classes = useStyles()
  const { auth, setSnackbarObject, setLoading } = useContext(AllPagesContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [listTable, setListTable] = useState([])

  // HANDLE CHECKBOX CHANGE
  const handleCheckboxChange = (inputItem, inputValue, inputName) => {
    const newListTable = [...listTable].map((item) => {
      if (item.name === inputItem.name) {
        if (inputName === 'akses') {
          item.akses = inputValue === true ? 1 : 0
          item.tambah = inputValue === true ? 1 : 0
          item.lihat = inputValue === true ? 1 : 0
          item.edit = inputValue === true ? 1 : 0
          item.hapus = inputValue === true ? 1 : 0
          item.ex_excel = inputValue === true ? 1 : 0
          item.ex_pdf = inputValue === true ? 1 : 0
        } else if (item.name === inputItem.name && item.akses === 1)
          item[inputName] = inputValue === true ? 1 : 0
      }

      return item
    })

    setListTable(newListTable)
  }

  // GET USER ACCESS DATA
  const getUserAccesData = async (inputSignal, inputToken) => {
    setLoading(true)
    const resultData = await getUserAccess(inputSignal, inputToken, id)

    if (resultData.status === 200) {
      const getAccessName = (inputName) => {
        if (inputName === 'group') return 'Kewenangan'
        else if (inputName === 'user') return 'Pengguna'
        else if (inputName === 'pengaturan_nilai') return 'Pengaturan Nilai'
        else if (inputName === 'camera') return 'Camera'
        else if (inputName === 'all_camera') return 'All Camera'
      }

      const newData = resultData?.data.map((item) => {
        return {
          ...item,
          name: getAccessName(item.name_controller),
          timezone_offset: getTimeZoneOffset(),
        }
      })

      const fileteredData = newData.filter(
        (item) => item.name_controller !== '#'
      )

      setListTable(fileteredData)
      setLoading(false)
    } else setLoading(false)
  }

  // HANDLE UPDATE BUTTON
  const handleUpdateButton = async () => {
    setLoading(true)
    const abortController = new AbortController()

    const resultUpdateUserAccess = await putManageUserAccess(
      abortController.signal,
      auth.accessToken,
      listTable
    )

    if (resultUpdateUserAccess.status === 200) {
      setLoading(false)
      setSnackbarObject({
        open: true,
        severity: 'success',
        title: 'Satu data kewenangan telah di kelola.',
        message: '',
      })
      navigate('/authority')
    } else {
      setLoading(false)
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: 'Gagal mengelola data kewenangan.',
        message: '',
      })
    }
    abortController.abort()
  }

  useEffect(() => {
    const abortController = new AbortController()

    getUserAccesData(abortController.signal, auth.accessToken)
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack className={classes.root}>
      <Stack>
        {/* HEADER */}
        <Header />

        {/* CONTENT */}
        <Stack className={classes.container}>
          {/* TABLE */}
          <Table className={classes.table}>
            {/* TABLE HEAD */}
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHeadName}>
                  Nama Module
                </TableCell>
                <TableCell align='center' className={classes.tableHeadCell}>
                  Akses
                </TableCell>
                <TableCell align='center' className={classes.tableHeadCell}>
                  Tambah
                </TableCell>
                <TableCell align='center' className={classes.tableHeadCell}>
                  Melihat
                </TableCell>
                <TableCell align='center' className={classes.tableHeadCell}>
                  Edit
                </TableCell>
                <TableCell align='center' className={classes.tableHeadCell}>
                  Hapus
                </TableCell>
                <TableCell align='center' className={classes.tableHeadCell}>
                  Ex. Excel
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ padding: '0px', maxWidth: '40px' }}
                >
                  Ex. Pdf
                </TableCell>
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody className={classes.tableBody}>
              {listTable.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableBodyName}>
                    | {item.name}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyCell}>
                    <Checkbox
                      disableRipple
                      checked={item.akses === 1 ? true : false}
                      name='akses'
                      onChange={(e) =>
                        handleCheckboxChange(
                          item,
                          e.target.checked,
                          e.target.name
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyCell}>
                    <Checkbox
                      disableRipple
                      checked={item.tambah === 1 ? true : false}
                      name='tambah'
                      onChange={(e) =>
                        handleCheckboxChange(
                          item,
                          e.target.checked,
                          e.target.name
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyCell}>
                    <Checkbox
                      disableRipple
                      checked={item.lihat === 1 ? true : false}
                      name='lihat'
                      onChange={(e) =>
                        handleCheckboxChange(
                          item,
                          e.target.checked,
                          e.target.name
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyCell}>
                    <Checkbox
                      disableRipple
                      checked={item.edit === 1 ? true : false}
                      name='edit'
                      onChange={(e) =>
                        handleCheckboxChange(
                          item,
                          e.target.checked,
                          e.target.name
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyCell}>
                    <Checkbox
                      disableRipple
                      checked={item.hapus === 1 ? true : false}
                      name='hapus'
                      onChange={(e) =>
                        handleCheckboxChange(
                          item,
                          e.target.checked,
                          e.target.name
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyCell}>
                    <Checkbox
                      disableRipple
                      checked={item.ex_excel === 1 ? true : false}
                      name='ex_excel'
                      onChange={(e) =>
                        handleCheckboxChange(
                          item,
                          e.target.checked,
                          e.target.name
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align='center' sx={{ padding: '0px' }}>
                    <Checkbox
                      disableRipple
                      checked={item.ex_pdf === 1 ? true : false}
                      name='ex_pdf'
                      onChange={(e) =>
                        handleCheckboxChange(
                          item,
                          e.target.checked,
                          e.target.name
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* BUTTON */}
          <Stack marginTop='24px' width='100px' marginLeft='24px'>
            <Button
              variant='contained'
              size='large'
              className={classes.buttonUpdate}
              onClick={handleUpdateButton}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default AuthorityManagement
