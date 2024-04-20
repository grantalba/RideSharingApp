import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Container from '@components/Container';
import {useAppDispatch, useAppSelector} from '@utils/redux/hooks';
import {FONTS, SIZES, COLORS} from '@constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileSection from 'components/ProfileSection';
import TravelInformation from 'components/TravelInformation';
import TextButton from '@components/TextButton';
import {acceptRide, declineRide} from 'utils/redux/rideSlice';
import RenderWhen from 'components/RenderWhen';

const RideRequestDetailsScreen = (): React.JSX.Element => {
  // const {pickupLocation, destination, userFullName} = useAppSelector(
  //   state => state.ride,
  // );

  const [loading, setLoading] = React.useState<boolean>(true);
  const rideRequest = useAppSelector(state => state.ride);
  const {pickupLocation, destination, userFullName} = rideRequest;

  const {userFullName: driverFullName, userId} = useAppSelector(
    state => state.user,
  );
  const dispatch = useAppDispatch();

  // Calculate midpoint between pickup and dropoff coordinates
  const midPoint = {
    latitude: (pickupLocation.latitude + destination.latitude) / 2,
    longitude: (pickupLocation.longitude + destination.longitude) / 2,
  };

  const handleAcceptOnPress = () => {
    Alert.alert(
      'Accept the ride?',
      'Are you sure you want to accept the ride?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () =>
            dispatch(
              acceptRide({driverId: userId, driverName: driverFullName}),
            ),
        },
      ],
    );
  };

  const handleDeclineOnPress = () => {
    Alert.alert(
      'Decline the ride?',
      'Are you sure you want to decline the ride?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Ok', onPress: () => dispatch(declineRide())},
      ],
    );
  };

  React.useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    console.log(JSON.stringify(rideRequest, null, 2));
  }, [rideRequest]);

  const styles = StyleSheet.create({
    content: {
      width: SIZES.width - 16,
      alignSelf: 'center',
      marginTop: 5,
    },
    mapView: {
      width: SIZES.width,
      height: Platform.select({android: 200, ios: 300}),
    },
    icon: {marginLeft: 10},
    bookingIdContainer: {
      width: '100%',
      flexDirection: 'row',
      marginBottom: SIZES.margin,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bookingIdTitle: {...FONTS.l3, flex: 1},
    bookingIdValue: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookingTextValue: {...FONTS.l3},
    bottomSection: {
      width: SIZES.width - 16,
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 10,
      marginBottom: 30,
      justifyContent: 'flex-end',
    },
    acceptButton: {
      marginHorizontal: SIZES.padding,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    declineButton: {
      marginHorizontal: SIZES.padding,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: loading ? COLORS.gray200 : 'transparent',
      borderColor: loading ? COLORS.gray100 : COLORS.negative300,
      borderWidth: 1,
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    },
  });

  return (
    <Container
      header={{
        shouldDisplayBack: true,
        pageTitle: 'Ride Request',
      }}>
      <View style={styles.content}>
        <View style={styles.bookingIdContainer}>
          <Text style={styles.bookingIdTitle}>Booking ID:</Text>
          <View style={styles.bookingIdValue}>
            <Text style={styles.bookingTextValue}>XASDKFJ321</Text>
            <TouchableOpacity>
              <Icon name="content-copy" size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        scrollEnabled={false}
        zoomEnabled={false}
        initialRegion={{
          latitude: midPoint.latitude,
          longitude: midPoint.longitude,
          latitudeDelta:
            Math.abs(pickupLocation.latitude - destination.latitude) * 1.5,
          longitudeDelta:
            Math.abs(pickupLocation.longitude - destination.longitude) * 1.5,
        }}>
        <Marker coordinate={pickupLocation} title="Pickup Location" />
        <Marker coordinate={destination} title="Dropoff Location" />
        <Polyline
          coordinates={[pickupLocation, destination]}
          strokeWidth={2}
          strokeColor="blue"
        />
      </MapView>

      <RenderWhen condition={loading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </RenderWhen>

      <View style={styles.content}>
        <ProfileSection
          fullName={userFullName}
          rate={400}
          modeOfPayment="ApplePay"
          distanceTravel={5.2}
        />
      </View>
      <View style={styles.content}>
        <TravelInformation
          pickupLocationName={pickupLocation?.locationName}
          destinationLocationName={destination?.locationName}
        />
      </View>
      <View style={styles.bottomSection}>
        <TextButton
          label="Accept"
          contentContainerStyle={styles.acceptButton}
          onPress={handleAcceptOnPress}
          disabled={loading ? true : false}
        />
        <TextButton
          label="Decline"
          contentContainerStyle={styles.declineButton}
          labelStyle={{color: loading ? COLORS.gray100 : COLORS.negative300}}
          onPress={handleDeclineOnPress}
          disabled={loading ? true : false}
        />
      </View>
    </Container>
  );
};

export default RideRequestDetailsScreen;
