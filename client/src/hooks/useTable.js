import { useState } from "react"
// ----------------------------------------------------------------------

export default function useTable(props) {
  const [dense, setDense] = useState(props?.defaultDense || false)

  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || "name")

  const [order, setOrder] = useState(props?.defaultOrder || "asc")

  const [page, setPage] = useState(props?.defaultCurrentPage || 0)

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5)

  const [selected, setSelected] = useState(props?.defaultSelected || [])

  const onSort = (id) => {
    const isAsc = orderBy === id && order === "asc"
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(id)
    }
  }

  const onSelectRow = (id) => {
    // checking if the id sent is inside the array
    // -1 if not
    // 0 if yes
    const selectedIndex = selected.indexOf(id)
    // console.log("selectedIndex", selectedIndex)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      console.log("PRESETNt")
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      // console.log("selectedIndex", selectedIndex)
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const onSelectAllRows = (checked, newSelecteds) => {
    // console.log("checked", checked) // true  | false
    // newSelecteds is an array of all rowId
    if (checked) {
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const onChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const onChangeDense = (event) => {
    setDense(event.target.checked)
  }

  // filter

  return {
    dense,
    order,
    page,
    setPage,
    orderBy,
    rowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
  }
}

// ----------------------------------------------------------------------

export function descendingComparator(a, b, orderBy) {
  //   console.log("descendingComparator", a, b)
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

// HOF -> return another function
export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function emptyRows(page, rowsPerPage, arrayLength) {
  /*
  - Math Login  
  - initial page = 0
  - we need to find how many empty rows we need at the end of list
  - so size of table dont change ( shrink )
  - suppose -> array length = 8, rows per page = 5
  - Page 1    Page 2
  -   |        |
  -   |        |
  -   |        |
  -   |      empty row
  -   |      empty row
  - calculate rows for page 1
  - as we call page 1 -> page 0
  - we increase the page by 1
  - page = 0 + 1 = 1
  - page * rows per page => 1 * 5 = 5
  - 5 - array length (8) = -3 -> Math.max will take 0 over -3
  - calculate rows for page 2
  - page = 1 + 1 = 2
  - 2 * 5 = 10
  - 10 - array length (8) = 2 -> Math.max will take 2 over 0
  - so on page 2 we need 2 empty rows to maintain the length of table
  */
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0
}
