import { ToastContainer, toast } from "react-toastify"
import React from "react"
import "react-toastify/dist/ReactToastify.css"

function notify(text, type = "info") {
  const notifyTypes = {
    info: toast.TYPE.INFO,
    error: toast.TYPE.ERROR,
    success: toast.TYPE.SUCCESS,
  }

  toast(text, {
    type: notifyTypes[type],
    hideProgressBar: true,
    position: "bottom-left",
    autoClose: 2000,
  })
}

function NotifyContainer(props) {
  return <ToastContainer limit={3} {...props} />
}

export { notify, NotifyContainer }
