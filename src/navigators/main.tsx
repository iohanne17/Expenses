import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Expenses from '@Screens/expenses';

const MainNav = createNativeStackNavigator();

const Stack = () => {
  return (
    <MainNav.Navigator initialRouteName={'expenses'}>
      <MainNav.Screen name={'expenses'} component={Expenses} />
    </MainNav.Navigator>
  );
};

export default Stack;
