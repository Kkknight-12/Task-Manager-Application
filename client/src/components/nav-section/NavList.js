import { useState } from "react"
import { useLocation } from "react-router-dom"
// @mui
import { List, Collapse } from "@mui/material"
//
import { NavItemRoot, NavItemSub } from "./NavItem"
import { getActive } from "."
// ----------------------------------------------------------------------

export function NavListRoot({ list, isCollapse }) {
  const { pathname } = useLocation()

  const active = getActive(list.path, pathname)

  const [open, setOpen] = useState(active)

  const hasChildren = list.children

  // if (hasChildren) {
  //   console.log("hasChildren")
  //   // will render user
  //   return (
  //     <>
  //       <NavItemRoot
  //         item={list}
  //         isCollapse={isCollapse}
  //         active={active}
  //         open={open}
  //         onOpen={() => setOpen(!open)}
  //       />

  //       {!isCollapse && (
  //         <Collapse in={open} timeout="auto" unmountOnExit>
  //           <List component="div" disablePadding>
  //             {(list.children || []).map((item) => (
  //               <NavListSub key={item.title + item.path} list={item} />
  //             ))}
  //           </List>
  //         </Collapse>
  //       )}
  //     </>
  //   )
  // }

  // will render App, Banking, One, Two, Three
  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />
}

// ----------------------------------------------------------------------

function NavListSub({ list }) {
  const { pathname } = useLocation()

  const active = getActive(list.path, pathname)

  const [open, setOpen] = useState(active)

  const hasChildren = list.children
  //   if (hasChildren) {
  //     return (
  //       <>
  //         <NavItemSub
  //           item={list}
  //           onOpen={() => setOpen(!open)}
  //           open={open}
  //           active={active}
  //         />

  //         <Collapse in={open} timeout="auto" unmountOnExit>
  //           <List component="div" disablePadding sx={{ pl: 3 }}>
  //             {(list.children || []).map((item) => (
  //               <NavItemSub
  //                 key={item.title + item.path}
  //                 item={item}
  //                 active={getActive(item.path, pathname)}
  //                 sx={{ border: 1 }}
  //               />
  //             ))}
  //           </List>
  //         </Collapse>
  //       </>
  //     )
  //   }

  return <NavItemSub item={list} active={active} />
}
