import React, { useEffect, useState } from "react"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useSnackbar } from "notistack"

//
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from "@mui/material"
// hooks
import useTable, {
  getComparator,
  emptyRows,
  sample,
} from "../../hooks/useTable"

//
import ProgressBar from "../../components/ProgressBar"
import { useDispatch, useSelector } from "../../redux/store"
// actions
import { getTask, deleteTask, deleteTasks } from "../../redux/slices/taskSlice"
//sections
import {
  ProductTableRow,
  ProductTableToolbar,
} from "../../sections/@dashboard/Tasks/Task-list"
// components
import Page from "../../components/Page"
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs"
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from "../../components/table"
import Iconify from "../../components/Iconify"

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Task", align: "left" },
  { id: "createdAt", label: "Create at", align: "left" },
  { id: "status", label: "Status", align: "center", width: 180 },
  // { id: "price", label: "Price", align: "right" },
  { id: "" },
]

// -----------------------------------------------------------------------------

export default function ViewTask() {
  const [tableData, setTableData] = useState([])
  const [filterName, setFilterName] = useState("")
  const { enqueueSnackbar } = useSnackbar()

  const { tasks, numberOfPages, error, currentPage, isLoading } = useSelector(
    (state) => state.Task
  )

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: "createdAt",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTask())
  }, [dispatch])

  useEffect(() => {
    if (tasks.length) {
      return setTableData(tasks)
    }
    setTableData([])
  }, [tasks])

  const handleFilterName = (filterName) => {
    setFilterName(filterName)
    setPage(0)
  }

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row._id !== id)
    enqueueSnackbar("Task Deleted.", { variant: "warning" })
    setSelected([])
    setTableData(deleteRow)
    dispatch(deleteTask(id))
    // dispatch(getTask())
  }

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row._id))
    if (selected.length > 1) {
      enqueueSnackbar("Multiple Task Deleted.", { variant: "warning" })
    } else {
      enqueueSnackbar("Task Deleted.", { variant: "warning" })
    }
    setSelected([])
    setTableData(deleteRows)
    dispatch(deleteTasks(selected))
    // dispatch(getTask())
  }

  const handleEditRow = (id) => {
    navigate(`/dashboard/edit/${id}`)
  }

  const dataFiltered = applySortFilter({
    tableData,
    // default values
    // orderBy -> name
    // order -> asc
    comparator: getComparator(order, orderBy),
    filterName,
  })

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!isLoading && !dataFiltered.length)

  /*
  CASE 1 loading false
  - 1-> initial loading state is false and we dont have data
  - const isNotFound = ( !false && !0 )
  - isNotFound = true ( not loading also no data )

  - 3-> when we are not loading, that means when we get the data from get API
  - and the length of that data is 0
  - assign 0 to isNotFound 
  - const isNotFound = ( !false && !0 )
  - isNotFound = true ( not loading but no data )
  - condition in return will reverse true to false
  - !isNotFound // false
  - seleton will not be shown
  - TableNoData will run

  - 4 -> else isNotFound will get the length of data 
  - const isNotFound = ( !false && !1 )
  - isNotFound = false ( not loading have data )
  - we reverse logic in return
  - !isNotFound , 
  - but the first condition of row will run
  - and skeleton will not be shown

  CASE 2 loading true
  - 2-> when loading we will get isLoading to true
  - ! operator will turn it to false
  - const isNotFound = ( !true && !0 )
  - isNotFound = false ( loading and no data )
  - !isNotFound in return will convert false
  - to true
  - !isNotFound // true 
  - seleton will be shown
  */

  const denseHeight = dense ? 60 : 80

  return (
    <>
      <ProgressBar />

      <Page title="Tasks: Task List">
        <Container maxWidth={"lg"}>
          <HeaderBreadcrumbs
            heading="Task List"
            links={[
              { name: "Dashboard", href: "/dashboard" },
              { name: "Task List" },
            ]}
            action={
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={"/dashboard/add"}
              >
                New Task
              </Button>
            }
          />

          <Card>
            <ProductTableToolbar
              filterName={filterName}
              onFilterName={handleFilterName}
            />

            <TableContainer sx={{ position: "relative" }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteRows(selected)}
                      >
                        <Iconify icon={"eva:trash-2-outline"} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={"medium"}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <ProductTableRow
                          key={row._id}
                          row={row}
                          selected={selected.includes(row._id)}
                          onSelectRow={() => onSelectRow(row._id)}
                          onDeleteRow={() => handleDeleteRow(row._id)}
                          onEditRow={() => handleEditRow(row._id)}
                        />
                      ) : (
                        !isNotFound && (
                          <TableSkeleton key={index} sx={{ height: 68 }} />
                        )
                      )
                    )}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>

            {/* pagination */}
            <Box sx={{ position: "relative" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dataFiltered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />

              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label="Dense"
                sx={{
                  px: 3,
                  py: 1.5,
                  top: 0,
                  position: { md: "absolute" },
                }}
              />
            </Box>
          </Card>
        </Container>
      </Page>
    </>
  )
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
  /*
  adding index number in array  
  */
  const stabilizedThis = tableData.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    /*
    - comparator paramter will be passed when 
    - getComparator annonymous return function will run
    */
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  tableData = stabilizedThis.map((el) => el[0])

  if (filterName) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
    // loop through array
    // filter
    // if description match filterName return array index
    // else return -1
    // 'testing task creation'.indexOf( 'testing' )
    // => 0 // index number in array
    tableData = tableData.filter(
      (item) =>
        item.description.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
  }

  return tableData
}
