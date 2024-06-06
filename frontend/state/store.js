import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import pizzaReducer from './pizzaSlice'

export const resetStore = () => configureStore({
  reducer: {
    filters: pizzaReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,

    // add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware)
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ,
})

export const store = resetStore()
