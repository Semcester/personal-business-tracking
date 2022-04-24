import React, { useState, useEffect } from "react"
import DeleteModal from "./DeleteModal"
import EditModal from "./EditModal"
import { Button, Table, Tag, Space, Input, Select } from "antd"
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { searchJob, setJob, FilterJobByPriority } from "../features/JobSlice"

import axios from "axios"

const TableList = () => {
  const dispatch = useDispatch()

  const jobsList = useSelector((state) => {
    const filteredJob = state.jobs.filteredJob
    const searchByPriority = state.jobs.priority
    if (state.jobs.filteredJob !== []) {
      if (state.jobs.priority > 0) {
        return state.jobs.jobs.filter(
          (job) => job.jobPriority === searchByPriority
        )
      }
      return state.jobs.jobs.filter((job) =>
        job.jobName.toLowerCase().includes(filteredJob)
      )
    } else if (searchByPriority > 0) {
      return state.jobs.jobs.filter(
        (job) => job.jobPriority === searchByPriority
      )
    }
  })

  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)
  const [visibleEditModal, setVisibleEditModal] = useState(false)
  const [jobNameDisplay, setJobNameDisplay] = useState("")
  const [priority, setPriority] = useState([])
  const [deleteId, setDeleteID] = useState()
  const [editId, setEditID] = useState()

  const { Option } = Select

  useEffect(() => {
    getAllData()
  }, [])

  const getAllData = async () => {
    let localStorageData = await JSON.parse(localStorage.getItem("jobs"))
    let allData
    try {
      await axios.get("http://localhost:8080/jobs").then((res) => {
        allData = res.data
        if (localStorage.getItem("jobs") !== null) {
          localStorageData.forEach((job) => {
            res.data.push(job)
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
    dispatch(
      setJob({
        allData: allData,
      })
    )
  }

  const hideDeleteModal = () => {
    setVisibleDeleteModal(false)
  }
  const openDeleteModal = (id) => {
    setDeleteID(id)

    setVisibleDeleteModal(true)
  }
  const hideEditModal = () => {
    setVisibleEditModal(false)
  }
  const openEditModal = (jobsList) => {
    setVisibleEditModal(true)
    setJobNameDisplay(jobsList.jobName)
    setPriority(jobsList.tags)
    setEditID(jobsList.id)
  }

  const handleByPriority = (option) => {
    let setPrioritySearch
    switch (option) {
      case "Urgent":
        setPrioritySearch = 1
        break
      case "Regular":
        setPrioritySearch = 2
        break
      case "Trivial":
        setPrioritySearch = 3
        break
      default:
        setPrioritySearch = 0
    }

    dispatch(FilterJobByPriority(setPrioritySearch))
  }
  const handleSearch = (e) => {
    e.preventDefault()
    if (e.target.value !== "") {
      dispatch(searchJob(e.target.value.toLowerCase()))
    } else if (e.target.value === "") {
      dispatch(searchJob(e.target.value))
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "jobName",
      width: 1030,
      onCell: () => {
        return {
          style: {
            whiteSpace: "warp",
            maxWidth: 150,
          },
        }
      },
      render: (text) => (
        <p
          title={text}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Priority",
      dataIndex: "tags",
      width: 100,
      sorter: (a, b) => a.jobPriority - b.jobPriority,
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green"
            if (tag === "Urgent") {
              color = "red"
            } else if (tag === "Regular") {
              color = "gold"
            } else if (tag === "Trivial") {
              color = "blue"
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      width: 100,

      render: (id, jobsList) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              openEditModal(jobsList)
            }}
            key={jobsList.index}
          />
          <EditModal
            show={visibleEditModal}
            hide={hideEditModal}
            jobName={jobNameDisplay}
            priority={priority}
            id={editId}
          />
          <Button
            onClick={() => {
              openDeleteModal(id)
            }}
            danger
            icon={<DeleteOutlined />}
          />
          <DeleteModal
            visible={visibleDeleteModal}
            hide={hideDeleteModal}
            id={deleteId}
          />
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="flex space-x-10 w-350  desktop:w-950 tablet:w-625   bg-searchBg px-4 py-4">
        <Input
          placeholder="Job Name"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e)}
          className="laptop:w-3/4 w-1250"
        />
        <div>
          <Select
            placeholder="Priority(all)"
            allowClear
            style={{ width: "100px" }}
            onChange={(option) => handleByPriority(option)}
          >
            <Option value="Urgent">Urgent</Option>
            <Option value="Regular">Regular</Option>
            <Option value="Trivial">Trivial</Option>
          </Select>
        </div>
      </div>
      <Table
        pagination={{ pageSize: 10 }}
        className="table w-350  desktop:w-950 tablet:w-625 "
        columns={columns}
        dataSource={jobsList}
        rowKey="id"
      />
    </>
  )
}

export default TableList
