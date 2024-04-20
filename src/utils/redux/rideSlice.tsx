import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RideRequestState} from '@constants/dummyData';
import {getCurrentDateString} from '@utils/format';

const initialState: RideRequestState = {
  id: '',
  userId: '',
  userFullName: '',
  driverId: null,
  driverName: null,
  pickupLocation: {
    latitude: 0,
    longitude: 0,
    locationName: '',
  },
  destination: {
    latitude: 0,
    longitude: 0,
    locationName: '',
  },
  status: 'pending',
  pickupTime: getCurrentDateString(),
  timestamp: getCurrentDateString(),
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    requestRide(state, action: PayloadAction<RideRequestState>) {
      return {...state, ...action.payload};
    },
    acceptRide(state, action) {
      state.driverId = action.payload.driverId;
      state.driverName = action.payload.driverName;
      state.pickupTime = getCurrentDateString();
      state.status = 'accepted';
    },
    declineRide(state) {
      state.driverId = null;
      state.driverName = null;
      state.status = 'declined';
    },
    startRide(state) {
      state.status = 'started';
    },
    pickUpRide(state) {
      state.status = 'picked-up';
    },
    dropOffRide(state) {
      state.status = 'dropped-off';
    },
  },
});

export const {
  requestRide,
  acceptRide,
  declineRide,
  startRide,
  pickUpRide,
  dropOffRide,
} = rideSlice.actions;

export default rideSlice.reducer;
