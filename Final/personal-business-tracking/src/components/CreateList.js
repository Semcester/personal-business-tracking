import React from "react"
import { Form, Input, Button, Select, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { addJob } from "../features/JobSlice"

const { Option } = Select

const CreateList = () => {
  const dispatch = useDispatch()
  const jobsList = useSelector((state) => state.jobs.jobs)

  const [form] = Form.useForm()

  const onFinish = (e) => {
    let jobPriority
    if (e.priority === "Urgent") {
      jobPriority = 1
    } else if (e.priority === "Regular") {
      jobPriority = 2
    } else if (e.priority === "Trivial") {
      jobPriority = 3
    }
    let useData = {
      jobName: e.jobName,
      tags: [e.priority],
      id: Math.ceil(Math.random() * Date.now()),
      jobPriority: jobPriority,
    }
    let localData = JSON.parse(localStorage.getItem("jobs")) || []
    const findExist = jobsList.some((job) => job.jobName === e.jobName)

    if (findExist) {
      message.error("Job is already exist!")
    } else {
      dispatch(
        addJob({
          jobName: e.jobName,
          tags: [e.priority],
          id: Math.ceil(Math.random() * Date.now()),
          jobPriority: jobPriority,
        })
      )
      localData.push(useData)
      localStorage.setItem("jobs", JSON.stringify(localData))
      message.success("Job created 🤗")
      form.resetFields()
      return localData
    }
  }

  const onFinishFailed = (e) => {
    message.error("Please fill all area correctly 😫")
  }

  return (
    <>
      <div className="flex space-x-10  w-350  desktop:w-950 tablet:w-625 ">
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex items-end"
          size={{ width: "20px" }}
          form={form}
        >
          <Form.Item
            label="Job Name"
            name="jobName"
            className="w-150 desktop:w-700 tablet:w-350 "
            rules={[
              { required: true, message: "Please input your username!" },
              {
                pattern: /^[\w-ğüşöçİĞÜŞÖÇı\-\s]+$/,
                message: "Name can only include letters and numbers.",
              },
              {
                min: 1,
                max: 255,
                message: "Job name cannot exceed 255 characters",
              },
            ]}
          >
            <Input placeholder="Job Name" onChange={(e) => {}} />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "Please choose priority" }]}
            style={{ width: "150px", marginLeft: "10px" }}
          >
            <Select
              placeholder="Choose"
              style={{
                verticalAlign: "middle",
              }}
              allowClear
            >
              <Option value="Urgent">Urgent</Option>
              <Option value="Regular">Regular</Option>
              <Option value="Trivial">Trivial</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={
                <PlusOutlined
                  style={{
                    verticalAlign: "middle",
                  }}
                />
              }
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default CreateList
