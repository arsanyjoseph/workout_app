import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import usersService from './usersService'

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAllUsers = createAsyncThunk('auth/getUsers', async (token, thunkAPI)=> {
    try {
        return await usersService.getAllUsers(token)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reset: (state)=> {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.users = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getAllUsers.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload
        })
        .addCase(getAllUsers.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.users = []
        })
    }
})

export const {reset} = usersSlice.actions
export default usersSlice.reducer