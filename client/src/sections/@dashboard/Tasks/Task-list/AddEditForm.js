import PropTypes from "prop-types"
import * as Yup from "yup"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useMemo, useState } from "react"
// form
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// @mui
import { styled } from "@mui/material/styles"
import { LoadingButton } from "@mui/lab"
import {
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  Alert,
} from "@mui/material"
// routes
// import { PATH_DASHBOARD } from "../../../routes/paths"
// components
import {
  FormProvider,
  RHFSwitch,
  //   RHFSelect,
  RHFEditor,
  RHFTextField,
  //   RHFRadioGroup,
  //   RHFUploadMultiFile,
} from "../../../../components/hook-form/"
import { useDispatch, useSelector } from "../../../../redux/store"
import { addTask, editTask, hasError } from "../../../../redux/slices/taskSlice"

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}))

// ----------------------------------------------------------------------

AddEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
}

export default function AddEditForm({ isEdit, currentTask }) {
  const history = useNavigate()

  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar()

  const { error } = useSelector((state) => state.Task)

  const [showErrorDiv, setShowErrorDiv] = useState(false)

  // Yup Validation
  const NewTaskSchema = Yup.object().shape({
    description: Yup.string().required("Name is required"),
    completed: Yup.string().required("Description is required"),
  })

  // default Values => uses useMemo hok
  const defaultValues = useMemo(
    () => ({
      description: currentTask?.description || "",
      completed: currentTask?.completed || false,
    }),
    [currentTask]
  )

  // above two needs to be send to useForm
  const methods = useForm({
    // resolver: yupResolver(NewTaskSchema), // validation
    defaultValues, // default values
  })

  // taking out methods from useForm
  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  useEffect(() => {
    if (isEdit && currentTask) {
      reset(defaultValues)
    }
    if (!isEdit) {
      reset(defaultValues)
    }
  }, [isEdit, currentTask])

  useEffect(() => {
    if (error) {
      setShowErrorDiv(true)
    }
  }, [error])

  const onSubmit = async (taskData) => {
    try {
      if (!isEdit) {
        dispatch(addTask(taskData))
          .then(() => enqueueSnackbar("Task Added Successfully!"))
          .then(() => history("/dashboard/view"))
          .catch((error) => dispatch(hasError(error.message)))
      } else {
        dispatch(editTask(currentTask._id, taskData))
          .then(() => enqueueSnackbar("Task Edited Successfully!"))
          .then(() => history("/dashboard/view"))
          .catch((error) => dispatch(hasError(error.message)))
      }
      // reset()
    } catch (error) {
      console.error("ERROR", error.message)
      // enqueueSnackbar(error.message)
    }
  }

  const handleError = (error) => {
    setTimeout(() => {
      setShowErrorDiv(false)
    }, 6000)
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {!!showErrorDiv && handleError(error)}
          <Card sx={{ p: 3, mt: 2 }}>
            <Stack spacing={3}>
              {/* <RHFTextField name="name" label="Task Name" /> */}

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor
                  sx={{ width: "100%", minHeight: 100 }}
                  name="description"
                />
              </div>
            </Stack>
            <RHFSwitch name="completed" label="Completed" />
          </Card>

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            sx={{ m: 2 }}
          >
            {!isEdit ? "Add Task" : "Save Changes"}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
