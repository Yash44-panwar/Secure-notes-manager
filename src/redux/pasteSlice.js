import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

const pasteSlice = createSlice({
  name: "paste",
  initialState,                                   
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload

      if (!paste._id) {
        toast.error("Note ID missing. Cannot add.")
        return
      }

      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        toast.error("Note already exists")
        return
      }

      state.pastes.push(paste)
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success("Note added successfully")
    },

    updatePastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Note updated")
      } else {
        toast.error("Note not found for update")
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        state.pastes.splice(index, 1)
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success(" Note deleted successfully.")
      } else {
        toast.error("Note not found")
      }
    },

    resetPaste: (state) => {
      state.pastes = []
      localStorage.removeItem("pastes")
    }
  }
})

export const { addToPastes, updatePastes, removeFromPastes, resetPaste } = pasteSlice.actions

export default pasteSlice.reducer
