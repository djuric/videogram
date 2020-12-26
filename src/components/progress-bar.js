import React from "react"

function ProgressBar() {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-info spinner-border-lg m-2"
        style={{ width: "80px", height: "80px" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default ProgressBar
