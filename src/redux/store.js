import walletReducer from './walletSlice'
import { configureStore } from '@reduxjs/toolkit'

const KEY = "redux";
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState() {
    const state = store.getState()
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(KEY, serializedState);
    } catch (e) {
        // Ignore
    }
}

const store = configureStore({
    reducer: {
      wallet: walletReducer,
    },
    preloadedState: loadState()
})

// here we subscribe to the store changes
store.subscribe(saveState)

export default store