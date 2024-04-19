import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Container from '@components/Container';
import TextButton from '@components/TextButton';
import {SIZES, FONTS, COLORS} from '@constants/theme';
import RenderWhen from 'components/RenderWhen';
import {rideRequestState, RideRequestState} from '@constants/dummyData';
import Each from '@components/Each';
import {useAppDispatch} from '@utils/redux/hooks';
import {requestRide} from '@utils/redux/rideSlice';
import TravelInformation from '@components/TravelInformation';
import SidneySurprised from '@assets/images/SidneySurprised.svg';
import ProfileSection from '@components/ProfileSection';

const Homescreen = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [pressedMarker, setPressedMarker] =
    React.useState<RideRequestState | null>();
  const [rideRequests, setRideRequests] = React.useState<RideRequestState[]>(
    [],
  );
  const [showMap, setShowMap] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleMarkerPress = (item: RideRequestState) => {
    setPressedMarker(item);
    setModalVisible(true);
  };
  const handlePressButton = () => {
    if (pressedMarker) {
      setModalVisible(false);
      dispatch(requestRide(pressedMarker));
      navigation.navigate('Riderequest');
    }
  };

  const handlePressRetry = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRideRequests(rideRequestState);
    }, 3000);
  };

  React.useEffect(() => {
    // Simulating a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (rideRequests.length > 0) {
      setShowMap(true);
    }
  }, [rideRequests]);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
      backgroundColor: 'white',
      width: '100%',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
    },
    textButton: {
      marginHorizontal: SIZES.padding,
      marginBottom: insets.bottom,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      width: '100%',
      alignItems: 'center',
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    },
  });

  return (
    <Container>
      {showMap ? (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.container}
          zoomTapEnabled={false}
          zoomEnabled={false}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.1, // Adjust the latitude delta for zoom level
            longitudeDelta: 0.1, // Adjust the longitude delta for zoom level
          }}>
          <RenderWhen condition={!loading}>
            <>
              <Marker // Driver's current location
                pinColor={COLORS.negative600}
                coordinate={{latitude: 37.78825, longitude: -122.4324}}
                title="Your current location"
              />
              <RenderWhen // Ride request locations
                condition={rideRequests && rideRequests.length > 0}>
                <Each
                  of={rideRequests}
                  render={(item: RideRequestState) => {
                    const {latitude, longitude} = item?.pickupLocation;
                    return (
                      <Marker
                        key={item.id}
                        pinColor={COLORS.primary400}
                        coordinate={{
                          latitude,
                          longitude,
                        }}
                        onPress={() => handleMarkerPress(item)}
                      />
                    );
                  }}
                />
              </RenderWhen>
            </>
          </RenderWhen>
        </MapView>
      ) : (
        <RenderWhen condition={!loading}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              height: '80%',
              marginHorizontal: 20,
            }}>
            <SidneySurprised height={250} width={250} />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Text style={{...FONTS.h3, marginVertical: 20}}>Ooops!!</Text>
              <Text style={{...FONTS.l1, marginTop: 10}}>
                Something went wrong!
              </Text>
              <Text style={{...FONTS.l1}}>Please try again later.</Text>
            </View>

            <TextButton
              label={'Click to Retry'}
              contentContainerStyle={styles.textButton}
              onPress={() => handlePressRetry()}
            />
          </View>
        </RenderWhen>
      )}

      <RenderWhen condition={loading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </RenderWhen>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <ProfileSection
                fullName={pressedMarker?.userFullName}
                rate={400}
                modeOfPayment="ApplePay"
                distanceTravel={5.3}
              />

              <TravelInformation
                pickupLocationName={pressedMarker?.pickupLocation?.locationName}
                destinationLocationName={
                  pressedMarker?.destination?.locationName
                }
              />
            </View>
            <TextButton
              label={'More Information'}
              contentContainerStyle={styles.textButton}
              onPress={handlePressButton}
            />
          </View>
        </Pressable>
      </Modal>
    </Container>
  );
};

export default Homescreen;
