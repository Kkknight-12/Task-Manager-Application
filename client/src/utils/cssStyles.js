import { alpha } from "@mui/material/styles"

// ----------------------------------------------------------------------

/* 
 - [value] will help in returning single matching value
 - if [value] is not written whole object will be returned

  const obj = { t: 'top', r: 'right', l: 'left' };
  console.log(obj['t']); // 'top'
  const obj = { t: 'top', r: 'right', l: 'left' }['l'];
  console.log(obj); // 'left'
*/
function getDirection(value = "bottom") {
  return {
    top: "to top",
    right: "to right",
    bottom: "to bottom",
    left: "to left",
  }[value]
}

// ----------------------------------------------------------------------

export default function cssStyles(theme) {
  return {
    bgBlur: (props) => {
      const color =
        props?.color || theme?.palette.background.default || "#000000"

      const blur = props?.blur || 6
      const opacity = props?.opacity || 0.8
      // console.log('props', props); // opacity: 0.64
      // console.log('COLOR', color); // #161C24 -> dark AND #fff -> light
      /*  
      - theme?.palette.background.default -> changes when you switch between the dark and light mode
      - console.log('theme?.palette.background.default', theme?.palette.background.default);
      - #161C24 -> dark AND #fff -> light
      */

      return {
        // https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
        backdropFilter: `blur(${blur}px)`, // blur(6px)
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile => blur(6px)
        backgroundColor: alpha(color, opacity), // rgba(22, 28, 36, 0.8)
      }
    },
    bgGradient: (props) => {
      const direction = getDirection(props?.direction)
      const startColor = props?.startColor || `${alpha("#000000", 0)} 0%`
      const endColor = props?.endColor || "#000000 75%"

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor});`,
      }
    },
    bgImage: (props) => {
      const url = props?.url || "/assets/bg_gradient.jpg"
      const direction = getDirection(props?.direction)
      const startColor =
        props?.startColor || alpha(theme?.palette.grey[900] || "#000000", 0.88)
      const endColor =
        props?.endColor || alpha(theme?.palette.grey[900] || "#000000", 0.88)

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor}), url(${url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }
    },
  }
}
