import React from 'react';
import {Text, View, FlatList, Image, StyleSheet, Platform} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Container from '@components/Container';
import {SIZES, COLORS, FONTS} from '@constants/theme';
import constants, {OnboardingScreens} from '@constants/constants';
import TextButton from '@components/TextButton';
import {useAppDispatch} from '@utils/redux/hooks';
import {addUser} from '@utils/redux/userSlice';

const Onboarding = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [isLastPage, setIsLastPage] = React.useState<boolean>(false);
  const currentIndex = React.useRef<number>(0);
  const topFlatListRef = React.useRef<FlatList>(null);
  const bottomFlatListRef = React.useRef<FlatList>(null);
  const dispatch = useAppDispatch();

  const handlePressButton = () => {
    if (currentIndex.current < constants.onboarding_screens.length - 1) {
      currentIndex.current += 1;
      const nextIndex = currentIndex.current;
      const offset = nextIndex * SIZES.width;

      topFlatListRef?.current?.scrollToOffset({
        offset,
        animated: true,
      });

      bottomFlatListRef?.current?.scrollToOffset({
        offset,
        animated: true,
      });

      if (nextIndex === constants.onboarding_screens.length - 1) {
        setIsLastPage(true);
      }
    } else {
      // This is where we cache user => put in the Asyncstorage and Redux store so we can use it in the app
      dispatch(
        addUser({id: '1', userId: '1', userFullName: 'Niccolo Minguillan'}),
      );
      navigation.navigate('Homescreen');
    }
  };

  const renderTopFlatListItem = ({item}: {item: OnboardingScreens}) => {
    return (
      <View style={styles.topFlatListView}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={styles.imageContainer}
        />
      </View>
    );
  };

  const renderBottomFlatListItem = ({item}: {item: OnboardingScreens}) => {
    return (
      <View style={styles.topFlatListView}>
        <Text style={styles.titleStyle}>{item.title}</Text>
        <Text style={styles.descStyle}>{item.desc}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    topContainer: {
      flex: 2,
      backgroundColor: COLORS.primary50,
      paddingTop: Platform.OS === 'android' ? insets.top : 0,
    },
    topFlatListView: {
      width: SIZES.width,
      alignItems: 'center',
    },
    bottomFlatListView: {
      width: SIZES.width,
      alignItems: 'center',
      paddingHorizontal: SIZES.radius,
    },
    imageContainer: {
      width: SIZES.width * 0.8,
      height: SIZES.height * 0.8,
    },
    titleStyle: {
      ...FONTS.h1,
      textAlign: 'center',
      color: COLORS.primary100,
    },
    descStyle: {
      ...FONTS.pr2,
      marginTop: SIZES.radius,
      textAlign: 'center',
      color: COLORS.primary100,
    },
    svgCurved: {
      position: 'absolute',
      top: -100,
    },
    textButton: {
      marginHorizontal: SIZES.padding,
      marginBottom: insets.bottom,
    },
    bottomContainer: {
      flex: 1,
      backgroundColor: COLORS.gray900,
    },
  });

  return (
    <Container>
      {/* Image Flatlist */}
      <View style={styles.topContainer}>
        <FlatList
          ref={topFlatListRef}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          snapToInterval={SIZES.width}
          snapToAlignment="center"
          decelerationRate="fast"
          keyExtractor={item => `onboarding_screens_${item.id}`}
          data={constants.onboarding_screens}
          renderItem={renderTopFlatListItem}
        />
      </View>

      {/* Title and Description Lists */}
      <View style={styles.bottomContainer}>
        <Svg style={styles.svgCurved}>
          <Path
            d={`M0 20 Q ${SIZES.width / 2} 130 ${SIZES.width} 20 L ${
              SIZES.width
            } 100 L 0 100 Z`}
            fill={COLORS.gray900}
          />
        </Svg>

        <FlatList
          ref={bottomFlatListRef}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          snapToInterval={SIZES.width}
          snapToAlignment="center"
          decelerationRate="fast"
          keyExtractor={item => `onboarding_screens_title_${item.id}`}
          data={constants.onboarding_screens}
          renderItem={renderBottomFlatListItem}
        />

        <TextButton
          label={isLastPage ? "Let's Go" : 'Next'}
          contentContainerStyle={styles.textButton}
          onPress={handlePressButton}
        />
      </View>
    </Container>
  );
};

export default Onboarding;
