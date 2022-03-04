import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    walletAddress: "",
    walletProvider: ""
  },
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.walletAddress = action.payload.walletAddress
      state.walletProvider = action.payload.walletProvider
    },
    logout: (state) => {
      state.walletAddress = ""
      state.walletProvider = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = walletSlice.actions

export default walletSlice.reducer