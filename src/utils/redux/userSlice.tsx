import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  id: string;
  userId: string;
  userFullName: string;
}

const initialState: UserState = {
  id: '',
  userId: '',
  userFullName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.userId = action.payload.userId;
      state.userFullName = action.payload.userFullName;
    },
  },
});

export const {addUser} = userSlice.actions;

export default userSlice.reducer;
