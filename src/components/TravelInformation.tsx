import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {COLORS, FONTS} from '@constants/theme';

interface TravelInformation {
  pickupLocationName?: string;
  destinationLocationName?: string;
}

const TravelInformation = ({
  pickupLocationName = '',
  destinationLocationName = '',
}: TravelInformation): React.JSX.Element => {
  const styles = StyleSheet.create({
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
    <View style={styles.tripContainer}>
      <View style={styles.pinLocationContainer}>
        <Icon name="location-pin" size={30} color={COLORS.gray600} />
        <View style={styles.verticalDivider} />
        <Icon name="location-pin" size={30} color={COLORS.primary400} />
      </View>
      <View style={styles.pickupDestinationContainer}>
        <View style={styles.pickupDestination}>
          <Text style={FONTS.pr3}>Pickup location</Text>
          <Text style={FONTS.l1}>{pickupLocationName}</Text>
        </View>

        <View style={styles.horizontalDivider} />

        <View style={styles.pickupDestination}>
          <Text style={FONTS.pr3}>Destination</Text>
          <Text style={FONTS.l1}>{destinationLocationName}</Text>
        </View>
      </View>
    </View>
  );
};

export default TravelInformation;
