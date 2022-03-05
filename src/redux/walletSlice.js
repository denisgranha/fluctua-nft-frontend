import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    walletAddress: "",
    walletProvider: "",
    askWallet: false
  },
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.walletAddress = action.payload.walletAddress
    },
    chooseWallet: (state, action) => {
      state.walletProvider = action.payload.walletProvider
    },
    toogleAskWallet: (state)=> {
      state.askWallet = !state.askWallet
    },
    logout: (state) => {
      state.walletAddress = ""
      state.walletProvider = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, chooseWallet, toogleAskWallet } = walletSlice.actions

export default walletSlice.reducer