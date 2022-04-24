import React from "react"

const DeleteButton = ({ label, onClick }) => (
  <button
    className="bg-buttonColor hover:bg-pink-900 text-white font-bold py-2 px-4 rounded w-44 h-10"
    onClick={onClick}
    data-testid="delete-button"
  >
    {label}
  </button>
)

export default DeleteButton
