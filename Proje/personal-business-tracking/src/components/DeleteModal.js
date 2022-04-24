import React from "react"
import { Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import DeleteButton from "./buttons/DeleteButton"
import CancelButton from "./buttons/CancelButton"
import { deleteJob } from "../features/JobSlice"

const DeleteModal = ({ visible, hide, id }) => {
  const dispatch = useDispatch()

  const deleteSelectedJob = (id) => {
    dispatch(
      deleteJob({
        id,
      })
    )
    hide()
  }

  return (
    <Modal
      visible={visible}
      onCancel={hide}
      centered="true"
      destroyOnClose="true"
      className="grid place-items-center"
      footer={null}
    >
      <div className="ml-52">
        <ExclamationCircleOutlined
          fill="#D44E6E"
          style={{ fontSize: "70px", color: "#D82148" }}
        />
      </div>
      <h1 className="text-2xl font-bold ml-10 mt-4">
        Are you sure you want to delete it?
      </h1>
      <div className="flex items-center justify-center space-x-10">
        <CancelButton key={id} onClick={() => hide()} label="Cancel" />
        <DeleteButton onClick={() => deleteSelectedJob(id)} label="Delete" />
      </div>
    </Modal>
  )
}

export default DeleteModal
