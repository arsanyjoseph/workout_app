import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import workoutsReducer from '../features/workouts/workoutSlice';
import progCopyReducer from '../features/progCopy/progCopy';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    workouts: workoutsReducer,
    progCopy: progCopyReducer,
  },
});
