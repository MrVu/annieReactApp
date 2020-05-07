import React, { Component } from 'react';
import { StyleSheet, Modal,Text,View,TextInput, AsyncStorage, ActivityIndicator, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class profilePage extends Component {

  //init
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        token: '',
        userId: '',
        isLoading: true,
        clickcount:0,
        modalVisible:false,
        email:'',
      };
      //AsyncStorage.removeItem('userToken')
    }
  //end init

  //after mount
  componentDidMount() {
    this.getData();
  }
  //end after mount

  //get data from memory
    async getData() {
      try {
        let userToken = await AsyncStorage.getItem("userToken");
        let userId = await AsyncStorage.getItem('userId');
        let token = JSON.parse(userToken);
        let id = JSON.parse(userId);
        this.makeRequest(token, id);
        this.setState({token: token, userId: id});
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
  //end get data

  //send getRequest
  makeRequest = (token, userId) =>{
    fetch('https://anniecosmetic.vn/api/users/' + userId, { method: 'GET' , headers: {'Authorization': 'Token ' + token}})
      .then((response) => response.json())
      .then((json) => {
      this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  //end getRequest
  //patch Request
  makePatchRequest = (token, userId) =>{
    Vibration.vibrate(70);
    var formData = new FormData();
    console.log(this.state.email);
    formData.append('email', this.state.email)
    fetch('https://anniecosmetic.vn/api/users/' + userId + '/', { method: 'PATCH' , headers: {'Authorization': 'Token ' + token} , body : formData})
      .then((response) => response.json())
      .then((json) => {
        this.getData();
        this.setModalVisible(false);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  //end patch Request

  //Navigation headers
    static navigationOptions = {
        title: null,
        headerLeft: () => null,
        headerShown: false,
    };
  //end navigation headers

  //Logout button
  logoutListenter = () => {
    Vibration.vibrate(70);
    AsyncStorage.removeItem('userToken')
    this.props.navigation.navigate('Login')
  }
  //end logout button

  //Set modal visible
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  //end set modal visible

  //rendertemplate
  render(){
    const { data, isLoading, modalVisible, userId, token } = this.state;

    return isLoading == true ? (<View style={styles.loading}><ActivityIndicator  size="large"/></View>) :(

      <ScrollView style={styles.container}>
      <View>
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {null}}>
          <View style={styles.modalView}>
            <View style={styles.modalInner}>
              <View style={styles.modalInnerHead}>
                <Text style={styles.modalInHeadText}>CẬP NHẬT THÔNG TIN</Text>
              </View>
              <View style={styles.modalContent}>
              <View style={styles.inputContainer}>
                <Ionicons name="ios-mail" size={25} style={{ marginLeft:10, color: '#f48b8c'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
              </View>
              </View>
              <View style={styles.modalClose}>
                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                  <Text style={styles.modalCloseText}>HỦY</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.makePatchRequest(token, userId)}>
                  <Text style={styles.modalCloseText}>CẬP NHẬT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderText}>THÔNG TIN TÀI KHOẢN</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userName}>
            <Text style={styles.label}>TÊN ĐĂNG NHẬP: </Text>
            <Text>{this.state.data.username}</Text>
          </View>
          <View style={styles.userFullName}>
            <Text style={styles.label}>TÊN NHÂN VIÊN: </Text>
            <Text>{this.state.data.last_name} {this.state.data.first_name}</Text>
          </View>
          <View style={styles.userEmail}>
            <Text style={styles.label}>EMAIL: </Text>
            <Text>{this.state.data.email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <View style={styles.note}>
            <Text style={styles.noteLabel}>LƯU Ý: </Text>
            <Text style={styles.noteText}>Nhấn vào đây để thay đổi email</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.logout}>
          <TouchableOpacity style={styles.logoutTouch} onPress= {() => this.logoutListenter()}>
            <Ionicons name="ios-exit" size={25} style={styles.logoutIcon}/>
            <Text style={styles.logoutText}>Thoát tài khoản</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
  //end rendertemplate

}
//End class
const styles = StyleSheet.create({
  container: {marginTop: 40},
  modalView:{flex:1, justifyContent: "center",alignItems: "center",backgroundColor: '#00000080'},
  modalInner:{backgroundColor:'#fff' , height: 200, width: 400},
  modalInnerHead:{backgroundColor:'#f48b8c', height:30, alignItems:'center', justifyContent: "center" },
  modalInHeadText:{color: '#fff', fontWeight:'bold', fontSize:15},
  modalClose:{alignItems:'center', marginTop:'auto', marginBottom:10, flexDirection:'row', justifyContent:'center'},
  modalCloseText:{color: '#f48b8c',fontWeight:'bold', fontSize:15, width: 100, textAlign:'center' },
  modalContent : {alignItems:'center',flexDirection:'row', height:100, marginTop: 20, justifyContent:'center'},
  modalContentTx:{width:120, alignItems:'center', height:40, justifyContent:'center'},
  pageHeader:{backgroundColor: '#f48b8c', alignItems: 'center', justifyContent: 'center', height: 30, marginBottom: 20},
  pageHeaderText:{color:'#fff', fontWeight: 'bold', fontSize:15},
  logout: {marginTop:20, marginLeft:20},
  logoutTouch:{flexDirection: 'row'},
  logoutIcon:{width: 30, color: '#f48b8c'},
  logoutText:{fontSize:15, marginTop: 2},
  userInfo: {marginLeft:20},
  userFullName:{flexDirection: 'row', marginLeft: 5},
  label:{color: '#f48b8c', fontSize: 15, fontWeight: 'bold', width:140},
  userEmail:{flexDirection: 'row', marginLeft: 5},
  userName: {flexDirection: 'row', marginLeft: 5},
  note:{flexDirection: 'row', marginLeft: 25, marginTop:10},
  noteText:{color: '#bbb'},
  noteLabel:{color: '#bbb', fontSize: 15, fontWeight: 'bold'},
  loading:{flex: 1, alignItems: 'center',justifyContent:'center'},
  inputContainer: {borderWidth: 1,backgroundColor: '#fff',borderColor: '#bbb',borderRadius:30,borderBottomWidth: 1,width:250,height:45,marginBottom:20,flexDirection: 'row',alignItems:'center'},
  inputs:{ height:45, marginLeft:16, flex:1,},
});
export default profilePage
