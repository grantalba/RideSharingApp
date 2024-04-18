import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Container from '@components/Container';
import {useAppSelector} from '@utils/redux/hooks';
import {FONTS, SIZES, COLORS} from '@constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileSection from 'components/ProfileSection';
import TravelInformation from 'components/TravelInformation';
import TextButton from '@components/TextButton';

const RideRequestDetailsScreen = (): React.JSX.Element => {
  const {pickupLocation, destination, userFullName, timestamp} = useAppSelector(
    state => state.ride,
  );

  // Calculate midpoint between pickup and dropoff coordinates
  const midPoint = {
    latitude: (pickupLocation.latitude + destination.latitude) / 2,
    longitude: (pickupLocation.longitude + destination.longitude) / 2,
  };

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
      backgroundColor: 'transparent',
      borderColor: COLORS.negative300,
      borderWidth: 1,
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
          onPress={() => {}}
        />
        <TextButton
          label="Decline"
          contentContainerStyle={styles.declineButton}
          labelStyle={{color: COLORS.negative300}}
          onPress={() => {}}
        />
      </View>
    </Container>
  );
};

export default RideRequestDetailsScreen;
