import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, SIZES, COLORS} from '@constants/theme';
import DefaultAvatar from '@assets/images/DefaultAvatar.svg';

interface ProfileSectionType {
  fullName?: string;
  rate?: number;
  modeOfPayment?: string;
  distanceTravel?: number;
}
const ProfileSection = ({
  fullName = '',
  rate = 0,
  modeOfPayment = '',
  distanceTravel = 0,
}: ProfileSectionType): React.JSX.Element => {
  const styles = StyleSheet.create({
    profileSection: {
      flexDirection: 'row',
      marginVertical: 20,
      width: '100%',
    },
    userInformationContainer: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 8,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

  return (
    <View style={styles.profileSection}>
      <DefaultAvatar height={SIZES.mediumAvatar} width={SIZES.mediumAvatar} />
      <View style={styles.userInformationContainer}>
        <View style={styles.textContainer}>
          <Text style={FONTS.l2}>{fullName}</Text>
          <Text style={FONTS.h4}>${rate}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{...FONTS.l3, color: COLORS.primary400}}>
            {modeOfPayment}
          </Text>
          <Text style={FONTS.pr3}>{distanceTravel} km</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileSection;
