import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert, AsyncStorage, BackHandler, Vibration, ToastAndroid} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {email: '',password: '', token:'', clickcount:0,}
  }

  componentDidMount() {
    this.setState({email:'', password:'',});
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    //AsyncStorage.removeItem('userToken')
    this.backHandler.remove();
  }

  //Navigation header
  static navigationOptions = {
      title: 'Đăng nhập',
      headerLeft: () => null,
      headerShown: false,
      tabbarVisible : false,
  };

  //------------------------

  // check back button state
    _resetCount = () => {
      this.setState({clickcount:0});
      BackHandler.exitApp();
    }
    check=()=>{
      this.state.clickcount<2 ? ToastAndroid.show('Nhấn Back lần nữa để thoát', ToastAndroid.SHORT)  :this._resetCount()
        }
  //--------------------------

  //Backaction handler
  backAction = () => {
    this.setState({'clickcount':this.state.clickcount+1});
    setTimeout(() => {
                this.state.clickcount = 0
            }, 2000);
    this.check();
    return true
  };
  //-----------------------
  //AsyncStorage save
  async storeToken(token) {
    try {
       await AsyncStorage.setItem("userToken", JSON.stringify(token));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  //-----------------------

  success_request = (token) => {
    this.storeToken(token);
    this.props.navigation.replace('Orders', { 'token': token });
  }

  send_request = (email, password) => {
    var formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    fetch('https://anniecosmetic.vn/api/login', {method: 'POST', body : formData})
      .then((response) => response.json())
      .then((json) => {
        json.token ? this.success_request(json.token) : Alert.alert('Error', json.error);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  //login button func
  loginListener = (email, password) => {
    Vibration.vibrate(70);
    !email | !password ? Alert.alert("Thông báo","Xin nhập tên đăng nhập và mật khẩu") :this.send_request(email,password);
  }
  //------------

  //other button
  onClickListener = (viewId) => {
    Vibration.vibrate(70);
    Alert.alert("Xin lỗi", "Chúng tôi chưa cập nhật chức năng này");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-person" size={25} style={{ marginLeft:10, color: '#f48b8c'}}/>
          <TextInput style={styles.inputs}
              placeholder="Tên đăng nhập"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="ios-lock" size={25} style={{ marginLeft:10, color: '#f48b8c'}}  />
          <TextInput style={styles.inputs}
              placeholder="Mật khẩu"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.loginListener(this.state.email, this.state.password)}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Quên mật khẩu?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Đăng ký</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#f48b8c",
  },
  loginText: {
    color: 'white',
  }
});
export default LoginView
