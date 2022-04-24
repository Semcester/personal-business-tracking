import React from "react"

const SaveButton = ({ label, onClick }) => (
  <button
    className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded w-44 h-10"
    onClick={onClick}
  >
    {label}
  </button>
)

export default SaveButton
