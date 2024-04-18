import {getCurrentDateString} from 'utils/format';

interface Location {
  latitude: number;
  longitude: number;
  locationName?: string;
}

export interface RideRequestState {
  id: string; // Unique identifier for the ride
  userId: string; // ID of the user requesting the ride
  userFullName: string;
  driverId: string | null; // ID of the driver accepting the ride
  pickupLocation: Location;
  destination: Location;
  status:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off'; // Status of the ride request
  pickupTime: string | Date; // Time when the ride is scheduled for pickup
  timestamp: string | Date; // Timestamp of when the ride request was made
}

export const rideRequestState: RideRequestState[] = [
  {
    id: '1',
    userId: '1',
    userFullName: 'Grant Alba',
    driverId: '',
    pickupLocation: {
      latitude: 37.7544,
      longitude: -122.4477,
      locationName: 'Twin Peaks Summit',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '2',
    userId: '2',
    userFullName: 'Katrina Cruz',
    driverId: '',
    pickupLocation: {
      latitude: 37.7521,
      longitude: -122.4477,
      locationName: 'Twin Peaks Overlook',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '3',
    userId: '3',
    userFullName: 'Gyalu Cunanan',
    driverId: '',
    pickupLocation: {
      latitude: 37.751,
      longitude: -122.4476,
      locationName: 'Twin Peaks Boulevard',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '4',
    userId: '4',
    userFullName: 'John Doe',
    driverId: '',
    pickupLocation: {
      latitude: 37.7596,
      longitude: -122.4269,
      locationName: 'Mission Dolores Park',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '5',
    userId: '5',
    userFullName: 'Jane Doe',
    driverId: '',
    pickupLocation: {
      latitude: 37.7612,
      longitude: -122.4215,
      locationName: 'Valencia Street',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '6',
    userId: '6',
    driverId: '',
    userFullName: 'Carlotta Tolibas',
    pickupLocation: {
      latitude: 37.752,
      longitude: -122.4181,
      locationName: '24th Street Mission BART Station',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '7',
    userId: '7',
    userFullName: 'Ishan Villamar',
    driverId: '',
    pickupLocation: {
      latitude: 37.8199,
      longitude: -122.4783,
      locationName: 'Golden Gate Bridge',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '8',
    userId: '8',
    userFullName: 'Jaime Ruiz',
    driverId: '',
    pickupLocation: {
      latitude: 37.808,
      longitude: -122.4177,
      locationName: "Fisherman's Wharf",
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '9',
    userId: '9',
    userFullName: 'Moira Dela Torre',
    driverId: '',
    pickupLocation: {
      latitude: 37.7879,
      longitude: -122.4075,
      locationName: 'Union Square',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
  {
    id: '10',
    userId: '10',
    userFullName: 'Selene Tan',
    driverId: '',
    pickupLocation: {
      latitude: 37.802,
      longitude: -122.4485,
      locationName: 'Union Square',
    },
    destination: {
      latitude: 37.7368,
      longitude: -122.3728,
      locationName: 'India Basin Shoreline Park',
    },
    status: 'pending',
    pickupTime: getCurrentDateString(),
    timestamp: getCurrentDateString(),
  },
];
