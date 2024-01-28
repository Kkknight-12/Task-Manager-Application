import { matchPath } from "react-router-dom"

// ----------------------------------------------------------------------

export { default as NavSectionVertical } from "./Navbar"

export function isExternalLink(path) {
  return path.includes("http")
}

/*  
// This is a React Router v5 app
import { matchPath } from "react-router-dom";

const match = matchPath("/users/123", {
  path: "/users/:id",
  exact: true, // Optional, defaults to false
  strict: false, // Optional, defaults to false
});


// This is a React Router v6 app
import { matchPath } from "react-router-dom";

const match = matchPath(
  {
    path: "/users/:id",
    caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
    end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
  },
  "/users/123"
);
*/

export function getActive(path, pathname) {
  return path ? !!matchPath({ path, end: false }, pathname) : false
}
