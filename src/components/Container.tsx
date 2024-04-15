import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Container = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      flexDirection: 'column',

      // Paddings to handle safe area
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default Container;
