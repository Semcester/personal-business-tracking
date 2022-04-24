import React from "react"

const CancelButton = ({ label, onClick }) => (
  <button
    className="bg-cancelBtn hover:bg-gray-300 text-cancelTxt font-bold py-2 px-4 rounded w-44 h-10"
    onClick={onClick}
    data-testid="cancel-button"
  >
    {label}
  </button>
)

export default CancelButton
