import PropTypes from "prop-types"
// from
import { useFormContext, Controller } from "react-hook-form"
// @mui
import { FormHelperText, TextareaAutosize } from "@mui/material"
//
import Editor from "../editor"

// ----------------------------------------------------------------------

RHFEditor.propTypes = {
  name: PropTypes.string,
}

export default function RHFEditor({ name, sx, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextareaAutosize
          id={name}
          maxRows={4}
          style={{ ...sx }}
          value={field.value}
          onChange={field.onChange}
          {...other}
        />
      )}
    />
  )
  //   return (
  //     <Controller
  //       name={name}
  //       control={control}
  //       render={({ field, fieldState: { error } }) => (
  //         <Editor
  //           id={name}
  //           value={field.value}
  //           onChange={field.onChange}
  //           error={!!error}
  //           helperText={
  //             <FormHelperText error sx={{ px: 2, textTransform: "capitalize" }}>
  //               {error?.message}
  //             </FormHelperText>
  //           }
  //           {...other}
  //         />
  //       )}
  //     />
  //   )
}
