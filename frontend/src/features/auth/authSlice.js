import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI)=> {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI)=> {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const logout = createAsyncThunk('auth/logout', async ()=> {
    try {
        return await authService.logout()
    } catch (error) {
        const message = error.toString()
    }
})


export const uploadImage = createAsyncThunk('auth/avatar', async (data)=> {
    return data
} )

export const resetUser = createAsyncThunk('auth/avatar', async (data)=> {
    return data
} )

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state)=> {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state)=> {
            state.user = null
        })
        .addCase(uploadImage.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(uploadImage.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.user.avatarLink = action.payload
        })
        .addCase(uploadImage.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer