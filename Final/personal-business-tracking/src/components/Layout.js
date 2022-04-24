import React from "react"
import TableList from "./Table"
import CreateList from "./CreateList"
import Logo from "../logo.png"
import { useSelector } from "react-redux"

const Layout = () => {
  const jobsList = useSelector((state) => state.jobs.jobs)
  return (
    <div className="grid place-items-center mt-24 ">
      <div className="header flex items-center w-350 desktop:w-950 tablet:w-625 border-b-2 mb-10">
        <img src={Logo} alt="logo" width="100px" height="100px" />
        <h1 className="text-2xl font-bold">Business Tracking</h1>
      </div>
      <CreateList />
      <div className="flex justify-between items-center w-350 desktop:w-950 tablet:w-625">
        <h1 className="text-xl font-bold">Job List</h1>
        <h4 className="text-sm">
          ({jobsList.length}/{jobsList.length})
        </h4>
      </div>
      <TableList />
      <div className="footer flex justify-between w-350 desktop:w-950 tablet:w-625 h-16 bg-gray-200 mt-32 mb-10 px-4 py-4">
        <div>
          <a
            href="https://github.com/Semcester/personal-business-tracking/tree/master/Final"
            className="flex items-center space-x-2 "
          >
            <div className="w-10 h-10 bg-orange-400 rounded-md grid place-items-center text-md font-bold text-orange-600">
              git
            </div>
            <p className="text-gray-600 ">repository</p>
          </a>
        </div>
        <p className="mt-1">©2022 Semih Senan</p>
      </div>
    </div>
  )
}

export default Layout
