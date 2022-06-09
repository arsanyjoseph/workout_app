import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    progCopy: {
        warmup: {},
        cooldown: {},
        exercise: [],
        isRest: false,
        notes: {}
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const copyProgram = createAsyncThunk('program/copy', async (data)=> {
    try {
        return data
    } catch (error) {
        console.log(error)
    }
} )


export const progCopySlice = createSlice({
    name: 'progCopy',
    initialState,
    reducers: {
        reset: (state)=> {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.progCopy = {}
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(copyProgram.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(copyProgram.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.progCopy = action.payload
        })
        .addCase(copyProgram.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.progCopy = {}
        })
    }
})

export const {reset} = progCopySlice.actions
export default progCopySlice.reducer