import React from "react"
import { NavLink } from "react-router-dom"

// export default function navbarConfig() {
//   return (
//     <>
//       <ul>
//         <li>
//           {">"}
//           <NavLink to="/dashboard/one"> Page One</NavLink>
//         </li>
//         <li>
//           {">"}
//           <NavLink to="/dashboard/app"> Page App</NavLink>
//         </li>
//       </ul>
//     </>
// }

// components
import SvgIconStyle from "../../../components/SvgIconStyle"

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const ICONS = {
  user: getIcon("ic_user"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
  banking: getIcon("ic_banking"),
  menuItem: getIcon("ic_menu_item"),
}

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "Task",
    items: [
      { title: "View", path: "/dashboard/view", icon: ICONS.dashboard },

      { title: "Add", path: "/dashboard/add", icon: ICONS.menuItem },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: "management",
  //   items: [
  //     {
  //       title: "user",
  //       path: "/dashboard/user",
  //       icon: ICONS.user,
  //       children: [
  //         { title: "account", path: "/dashboard/user/account" },
  //         { title: "Four", path: "/dashboard/user/four" },
  //         { title: "Five", path: "/dashboard/user/five" },
  //         { title: "Six", path: "/dashboard/user/six" },
  //       ],
  //     },
  //   ],
  // },
]

export default navConfig
