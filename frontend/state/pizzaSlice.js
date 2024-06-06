import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    size: "All"
}

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        changeSize(state, action) {
            state.size = action.payload
        },
    }
})

export const {
    changeSize
} = pizzaSlice.actions

export default pizzaSlice.reducer;