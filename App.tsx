import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Onboarding from '@pages/Onboarding';
import Homescreen from '@pages/Homescreen';
import RideRequestDetailsScreen from '@pages/RideRequestDetailsScreen';
import store from 'utils/redux/store';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'Onboarding'}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Homescreen" component={Homescreen} />
            <Stack.Screen
              name="Riderequest"
              component={RideRequestDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
