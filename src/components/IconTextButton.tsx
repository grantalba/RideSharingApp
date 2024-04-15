import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {FONTS, COLORS} from '@constants/theme';

type IconTextButton = {
  label: string;
  icon?: any;
  contentContainerStyle?: any;
  textLabelStyle?: any;
  onPress: (event: GestureResponderEvent) => void;
};

const IconTextButton = ({
  contentContainerStyle,
  icon,
  label,
  textLabelStyle,
  onPress,
}: IconTextButton): React.JSX.Element => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 55,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: COLORS.gray500,
      ...contentContainerStyle,
    },
    textLabelStyle: {
      color: COLORS.gray100,
      ...textLabelStyle,
      ...FONTS.l2,
    },
    iconContainer: {
      height: 30,
      width: 50,
      borderRadius: 15,
      justifyContent: 'flex-end',
    },
    textContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image
          source={icon}
          resizeMode="contain"
          style={styles.iconContainer}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLabelStyle}>{label}</Text>
      </View>
      <View style={styles.iconContainer} />
    </TouchableOpacity>
  );
};

export default IconTextButton;
