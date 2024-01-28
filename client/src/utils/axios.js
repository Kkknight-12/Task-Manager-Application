import axios from "axios"
// config
import { HOST_API } from "../config"

// ----------------------------------------------------------------------

/*
- https://medium.datadriveninvestor.com/axios-instance-interceptors-682868f0de2d
- There are more options which can be set for a given axios instance, baseURL and headers are the most common.

*/
const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    "Content-Type": "application/json",
  },
  Accept: "*/*",
})
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxYjRlMjg3ZjA1NGJhYWU1MWE1OTIiLCJpYXQiOjE2NTY2OTk0MzR9.lHAdz-3WSx2py1V4MPn6zF7WBsDFY3BKxsXrnGbHus0  
*/

// axiosInstance.interceptors.request.use((req) => {
//   if (localStorage.getItem("accessToken")) {
//     req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
//   }

//   // with interceptors we need to return the request made
//   // so we can make the below request.
//   return req
// })

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
)

export default axiosInstance
