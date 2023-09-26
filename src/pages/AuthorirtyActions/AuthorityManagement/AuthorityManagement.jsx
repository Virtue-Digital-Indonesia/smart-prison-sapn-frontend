import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

// COMPONENT
import Header from './Header/Header'

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
import { getUserAccess } from 'services/authority'

// STYLES
import useStyles from './authorityManagementUseStyles'

const AuthorityManagement = () => {
  const classes = useStyles()
  const { auth } = useContext(AllPagesContext)
  const { id } = useParams()

  const initialListTable = [
    {
      name: 'Pengaturan Nilai',
      akses: true,
      tambah: true,
      melihat: true,
      edit: true,
      hapus: true,
      exExcel: false,
      exPdf: false,
    },
    {
      name: 'All Camera',
      akses: false,
      tambah: false,
      melihat: false,
      edit: false,
      hapus: false,
      exExcel: false,
      exPdf: false,
    },
    {
      name: 'Camera',
      akses: false,
      tambah: false,
      melihat: false,
      edit: false,
      hapus: false,
      exExcel: false,
      exPdf: false,
    },
  ]

  const [listTable, setListTable] = useState(initialListTable)

  const handleCheckboxChange = (inputItem, inputValue, inputName) => {
    const newListTable = [...listTable].map((item) => {
      if (item.name === inputItem.name) item[inputName] = inputValue
      return item
    })

    setListTable(newListTable)
  }

  // GET USER ACCESS DATA
  const getUserAccesData = async (inputSignal, inputToken) => {
    const resultData = await getUserAccess(inputSignal, inputToken, id)

    console.log(resultData)
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
        }
      })

      console.log(newData)
    }
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
                    checked={item.akses}
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
                    checked={item.tambah}
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
                    checked={item.melihat}
                    name='melihat'
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
                    checked={item.edit}
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
                    checked={item.hapus}
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
                    checked={item.exExcel}
                    name='exExcel'
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
                    checked={item.exPdf}
                    name='exPdf'
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
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AuthorityManagement
