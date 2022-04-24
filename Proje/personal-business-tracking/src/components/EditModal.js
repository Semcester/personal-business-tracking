import React, { useState, useEffect } from "react"
import { Modal, Input, Select, message } from "antd"
import SaveButton from "./buttons/SaveButton"
import CancelButton from "./buttons/CancelButton"
import { updateJob } from "../features/JobSlice"
import { useDispatch } from "react-redux"

const EditModal = ({ show, hide, jobName, priority, id }) => {
  const [updatedTag, setUpdatedTag] = useState()
  const dispatch = useDispatch()

  const { Option } = Select

  const updateSelectedJob = () => {
    let addPriority
    switch (updatedTag) {
      case "Urgent":
        addPriority = 1
        break
      case "Regular":
        addPriority = 2
        break
      case "Trivial":
        addPriority = 3
        break
      default:
        addPriority = 0
    }
    dispatch(
      updateJob({
        id: id,
        tags: [updatedTag],
        jobPriorityUpdate: addPriority,
      })
    )

    message.success("Job updated ✨")
    setUpdatedTag("")

    hide()
  }
  const handleChangeOption = (option) => {
    setUpdatedTag(option)
  }
  useEffect(() => {}, [updatedTag])

  return (
    <Modal
      visible={show}
      onOk={() => {
        updateSelectedJob()
      }}
      onCancel={hide}
      centered="true"
      destroyOnClose="true"
      className="grid place-items-center"
      footer={null}
    >
      <div className="grid items-center justify-center space-y-10 text-center">
        <h1 className="text-2xl font-bold">Job Edit</h1>
        <div className="grid space-y-5">
          <div className="grid text-left">
            <label className="">Job Name</label>
            <Input value={jobName} disabled={true}></Input>
          </div>
          <div className="grid text-left">
            <label>Job Priority</label>
            <Select
              placeholder="Choose"
              value={updatedTag}
              onChange={(option) => {
                handleChangeOption(option)
              }}
              allowClear
            >
              <Option value="Urgent">Urgent</Option>
              <Option value="Regular">Regular</Option>
              <Option value="Trivial">Trivial</Option>
            </Select>
          </div>
        </div>
        <div className="inline-flex items-center space-x-4">
          <CancelButton
            onClick={() => {
              hide()
            }}
            label="Cancel"
          ></CancelButton>
          <SaveButton
            label="Save"
            onClick={() => {
              updateSelectedJob()
            }}
          ></SaveButton>
        </div>
      </div>
    </Modal>
  )
}

export default EditModal
