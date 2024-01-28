import { useEffect, useState } from "react"
import { paramCase } from "change-case"
import { useParams, useLocation } from "react-router-dom"
// @mui
import { Alert, Container } from "@mui/material"
// redux
import { useDispatch, useSelector } from "../../redux/store"
// import { getProducts } from "../../redux/slices/product"
// routes
// import { PATH_DASHBOARD } from "../../routes/paths"
// hooks
// import useSettings from "../../hooks/useSettings"
// components
import Page from "../../components/Page"
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs"
import AddEditForm from "../../sections/@dashboard/Tasks/Task-list/AddEditForm"
// actions
import { getTask } from "../../redux/slices/taskSlice"
import { useSnackbar } from "notistack"

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  // const { themeStretch } = useSettings()

  const dispatch = useDispatch()

  const { pathname } = useLocation()
  const isEdit = pathname.includes("edit")

  const { tasks } = useSelector((state) => state.Task)
  const { id } = useParams()
  const currentTask = tasks.find((task) => paramCase(task._id) === id)

  useEffect(() => {
    dispatch(getTask())
  }, [dispatch])

  return (
    <Page title="Ecommerce: Create a new product">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Create a new task" : "Edit task"}
          links={[
            { name: "Dashboard", href: "/dashboard" },

            { name: !isEdit ? "New Task" : "Edit Task" },
          ]}
        />

        <AddEditForm isEdit={isEdit} currentTask={currentTask} />
      </Container>
    </Page>
  )
}
