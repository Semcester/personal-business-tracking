import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "jobs",
  initialState: { jobs: [], filteredJob: [], priority: 0, updatedItem: [] },
  reducers: {
    setJob: (state, action) => {
      state.jobs = action.payload.allData.sort(
        (a, b) => a.jobPriority - b.jobPriority
      )
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload)
      state.jobs.sort((a, b) => a.jobPriority - b.jobPriority)
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload.id)
    },

    updateJob: (state, action) => {
      const newArr = [...state.jobs]
      newArr.map((job) => {
        if (job.id === action.payload.id) {
          job.tags = action.payload.tags
          job.jobPriority = action.payload.jobPriorityUpdate
        }
        return state.jobs.sort((a, b) => a.jobPriority - b.jobPriority)
      })
    },
    searchJob: (state, action) => {
      state.filteredJob = action.payload
    },
    FilterJobByPriority: (state, action) => {
      state.priority = action.payload
    },
  },
})

export const {
  addJob,
  setJob,
  deleteJob,
  updateJob,
  searchJob,
  FilterJobByPriority,
} = userSlice.actions
export default userSlice.reducer
