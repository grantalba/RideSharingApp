import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Container from '@components/Container';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import DefaultAvatar from '@assets/images/DefaultAvatar.svg';
import TextButton from '@components/TextButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SIZES, FONTS, COLORS} from '@constants/theme';
import RenderWhen from 'components/RenderWhen';
import {rideDummyData, RideDummyData} from '@constants/dummyData';
import Each from '@components/Each';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Homescreen = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [pressedMarker, setPressedMarker] =
    React.useState<RideDummyData | null>();
  const [rideRequests, setRideRequests] = React.useState<RideDummyData[] | []>(
    [],
  );

  const handleMarkerPress = (item: RideDummyData) => {
    setPressedMarker(item);
    setModalVisible(true);
  };
  const handlePressButton = () => {};

  React.useEffect(() => {
    // Simulating a loading delay
    setTimeout(() => {
      setLoading(false);
      setRideRequests(rideDummyData);
    }, 2000);
  }, []);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
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
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    closeButton: {
      marginTop: 10,
      backgroundColor: '#2196F3',
      borderRadius: 20,
      padding: 10,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
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
    modalInformationContainer: {
      flexDirection: 'row',
      marginVertical: 20,
      width: '100%',
    },
    modalInformationSection: {
      justifyContent: 'space-between',
      height: 70,
      marginLeft: 20,
    },
    modalUserInformationContainer: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 8,
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textNameStyle: {
      ...FONTS.pr3,
      marginLeft: 5,
      lineHeight: 16,
    },
    tripContainer: {flexDirection: 'row', width: '100%', marginBottom: 50},
    pinLocationContainer: {alignItems: 'center'},
    verticalDivider: {
      height: 80,
      width: 3,
      backgroundColor: COLORS.gray300,
    },
    horizontalDivider: {
      width: '100%',
      height: 2,
      backgroundColor: COLORS.gray300,
      marginVertical: 20,
    },
    pickupDestinationContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      marginLeft: 10,
    },
    pickupDestination: {justifyContent: 'space-evenly'},
  });

  return (
    <Container>
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
            <Each
              of={rideRequests}
              render={(item: RideDummyData) => {
                const {latitude, longitude} = item.pickupLocation;
                return (
                  <Marker
                    key={item.id}
                    pinColor={COLORS.primary400}
                    coordinate={{latitude, longitude}}
                    onPress={() => handleMarkerPress(item)}
                  />
                );
              }}
            />
          </>
        </RenderWhen>
      </MapView>

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
              <View style={styles.modalInformationContainer}>
                <DefaultAvatar
                  height={SIZES.mediumAvatar}
                  width={SIZES.mediumAvatar}
                />
                <View style={styles.modalUserInformationContainer}>
                  <View style={styles.textContainer}>
                    <Text style={FONTS.l2}>{pressedMarker?.userFullName}</Text>
                    <Text style={FONTS.h4}>$400</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={{...FONTS.l3, color: COLORS.primary400}}>
                      Applepay
                    </Text>
                    <Text style={FONTS.pr3}>5.3 km</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tripContainer}>
                <View style={styles.pinLocationContainer}>
                  <Icon name="location-pin" size={30} color={COLORS.gray600} />
                  <View style={styles.verticalDivider} />
                  <Icon
                    name="location-pin"
                    size={30}
                    color={COLORS.primary400}
                  />
                </View>
                <View style={styles.pickupDestinationContainer}>
                  <View style={styles.pickupDestination}>
                    <Text style={FONTS.pr3}>Pickup location</Text>
                    <Text style={FONTS.l1}>
                      {pressedMarker?.pickupLocation.locationName}
                    </Text>
                  </View>

                  <View style={styles.horizontalDivider} />

                  <View style={styles.pickupDestination}>
                    <Text style={FONTS.pr3}>Destination</Text>
                    <Text style={FONTS.l1}>
                      {pressedMarker?.destination.locationName}
                    </Text>
                  </View>
                </View>
              </View>
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
