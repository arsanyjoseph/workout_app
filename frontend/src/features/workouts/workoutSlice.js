import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import asyncFunc from '../../components/utils/asyncFuncs/asyncFuncs'

const initialState = {
    workouts: {
        warmups: [],
        exercises: [],
        cooldowns: []
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getExercises = createAsyncThunk('workouts/exercises', async (token)=> {
    try {
        return await asyncFunc.getItems('/api/workouts/exercise', token)
    } catch (error) {
    console.log(error)  
    }
} )


export const getWarmups = createAsyncThunk('workouts/warmups', async (token)=> {
    try {
        return await asyncFunc.getItems('/api/workouts/warmup', token)
    } catch (error) {
    console.log(error)  
    }
} )

export const getCooldowns = createAsyncThunk('workouts/cooldowns', async (token)=> {
    try {
        return await asyncFunc.getItems('/api/workouts/cooldown', token)
    } catch (error) {
    console.log(error)  
    }
} )

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        reset: (state)=> {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.workouts = {}
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getExercises.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getExercises.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.workouts.exercises = action.payload
        })
        .addCase(getExercises.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.workouts = {}
        })
        .addCase(getCooldowns.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getCooldowns.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.workouts.cooldowns = action.payload
        })
        .addCase(getCooldowns.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.workouts = {}
        })
        .addCase(getWarmups.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getWarmups.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.workouts.warmups = action.payload
        })
        .addCase(getWarmups.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.workouts = {}
        })
    }
})

export const {reset} = workoutsSlice.actions
export default workoutsSlice.reducer