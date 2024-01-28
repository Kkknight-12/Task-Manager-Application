import PropTypes from "prop-types"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
// @mui
import { styled } from "@mui/system"
import { Box } from "@mui/material"
//

// -----------------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}))

// Editor.propTypes = {
//     id: PropTypes.string.isRequired,
//     value
// }

export default function Editor({
  id = "Mast",
  error,
  value,
  onChange,
  simple = true,
  helperText,
  sx,
  ...other
}) {
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, { color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      //   handlers: { image: this.imageHandler },
    },
    clipboard: { matchVisual: false },
  }

  const formats = [
    "align",
    "background",
    "blockquote",
    "bold",
    "bullet",
    "code",
    "code-block",
    "color",
    "direction",
    "font",
    "formula",
    "header",
    "image",
    "indent",
    "italic",
    "link",
    "list",
    "script",
    "size",
    "strike",
    "table",
    "underline",
    "video",
  ]
  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <ReactQuill
          value={value}
          theme="snow"
          onChange={onChange}
          modules={modules}
          formats={formats}
          //   placeholder="Write Something..."
          {...other}
        />
      </RootStyle>
    </div>
  )
}
