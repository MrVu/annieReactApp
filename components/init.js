import React, { Component } from 'react';
import { StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert, AsyncStorage, ActivityIndicator, StatusBar, } from 'react-native';

export class initPage extends Component {
  constructor(props) {
    super(props);
    //AsyncStorage.removeItem('userToken')
    this.getToken();
  }
  onLoad = () => {
  this.props.navigation.addListener('didFocus', () => this.getToken())
  }
  componentDidMount() {
    this.onLoad();
  }

  //Navigation headers
    static navigationOptions = {
        title: null,
        headerLeft: () => null,
        headerShown: false,
    };
  //------------------

  async getToken() {
    try {
      let userToken = await AsyncStorage.getItem("userToken");
      let token = JSON.parse(userToken);
      const mainPage = !!token ? 'Orders' : 'Login';
      this.props.navigation.navigate(mainPage)
    }
    catch (error) {
      console.log("Something went wrong", error);
    }
  }


  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default initPage
