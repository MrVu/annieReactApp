import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList , AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer,NavigationActions, StackActions,StackNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderList from './components/orders.js'
import OrderDetail from './components/order_detail.js'
import LoginView from './components/login.js'
import initPage from './components/init.js'
import deliveryPage from './components/delivery.js'

const DeliveryStack = createStackNavigator(
  {
    Delivery: {screen: deliveryPage}
  }
)
const RootStack = createStackNavigator(
{
  Init : {screen: initPage},
  Orders: { screen: OrderList  },
  Detail: { screen: OrderDetail },
  Login: {screen : LoginView},
},

);
RootStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'Login' ) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    }
}

const App = createBottomTabNavigator(
  {
    Home: { screen: RootStack },
    Docs: { screen: DeliveryStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-cart'
        } else if (routeName === 'Docs') {
          iconName = 'ios-basket';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#f48b8c',
      inactiveTintColor: '#bbb',
      showLabel: false,
    },
  }
);

export default createAppContainer(App);
