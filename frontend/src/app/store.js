import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import workoutsReducer from '../features/workouts/workoutSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    workouts: workoutsReducer
  },
});
