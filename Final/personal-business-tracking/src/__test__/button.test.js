import React from "react"
import { render } from "@testing-library/react"
import DeleteButton from "../components/buttons/DeleteButton"
import CancelButton from "../components/buttons/CancelButton"

it("delete button render correctly", () => {
  const { queryByTestId } = render(<DeleteButton />)
  expect(queryByTestId("delete-button")).toBeTruthy()
})
it("cancel button render correctly", () => {
  const { queryByTestId } = render(<CancelButton />)
  expect(queryByTestId("cancel-button")).toBeTruthy()
})
