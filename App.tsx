/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/config/store';
import {MainStack} from './src/navigators';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppProvider} from './src/providers/mainProvider';

const MainNav = createNativeStackNavigator();

const App = () => {
  const navigationRef = useNavigationContainerRef() as any;
  const routeNameRef = useRef() as any;
  return (
    <Provider store={store}>
      <AppProvider>
        {({isAuthenticated}) => (
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.getCurrentRoute().name;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef?.getCurrentRoute().name;
              if (previousRouteName !== currentRouteName) {
                //track screen here
              }

              // Save the current route name for later comparison
              routeNameRef.current = currentRouteName;
            }}>
            <MainNav.Navigator
              initialRouteName={'main'}
              screenOptions={{headerShown: false}}>
              {/**use is authenticated value to switch between stacks */}
              {isAuthenticated && (
                <MainNav.Screen
                  name={'auth'}
                  options={{headerShown: false}}
                  component={MainStack}
                />
              )}
            </MainNav.Navigator>
          </NavigationContainer>
        )}
      </AppProvider>
    </Provider>
  );
};

export default App;
