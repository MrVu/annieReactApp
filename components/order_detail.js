import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, Vibration } from 'react-native';

export class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      itemID: this.props.navigation.state.params.itemID,
      token: this.props.navigation.state.params.token,
    };
  }

  componentDidMount() {
    this.getData();
  }

  //get data
  getData = () => {
    fetch('https://anniecosmetic.vn/api/orders/' + this.state.itemID , { method: 'GET' , headers: {'Authorization': 'Token ' + this.state.token}})
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  //--------

  //Update => Patch method
  updateStatus = (status, value) => {
    Vibration.vibrate(70);
    var formData = new FormData();
    formData.append(status, value);
    fetch('https://anniecosmetic.vn/api/orders/' + this.state.itemID + '/', { method: 'PATCH' , headers: {'Authorization': 'Token ' + this.state.token}, body : formData})
      .then((response) => response.json())
      .then((json) => {
        this.getData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  //----------------------

  //update-button-action
  updateButton = () => {
    Vibration.vibrate(70);
    Alert.alert("Cập nhật", "Tình trạng đơn hàng", [
      { text: "Hủy cập nhật", onPress: () => null},
      { text: "Đã xác nhận", onPress: () => this.updateStatus('confirm', true)},
      { text: "Đã thanh toán", onPress: () => this.updateStatus('paid', true)},

    ]);
  };
  //--------------------

  //Navigation header
  static navigationOptions = {
      title: null,
  };
  //-------------------
  render() {
    const { data, isLoading } = this.state;

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Đơn hàng: { this.state.data.order_code } </Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>{this.state.data.total_cost}</Text>
        </View>
        <View style={styles.info}>
          <View style = {styles.infoHeader}>
          <Text style={styles.infoHeaderText}>THÔNG TIN KHÁCH HÀNG:</Text>
          </View>
          <View style={styles.orderInfo}>
            <View style={{flexDirection: 'row', height:20}}>
              <Text style={styles.boldAndUpper}>Tên khách hàng:</Text>
              <Text> {this.state.data.name}</Text>
            </View>
            <View style={{flexDirection: 'row',height:20}}>
              <Text style={styles.boldAndUpper}>Địa chỉ:</Text>
              <Text> { this.state.data.address } </Text>
            </View>
            <View style={{flexDirection: 'row',height:20}}>
              <Text style={styles.boldAndUpper}>Số điện thoại:</Text>
              <Text> { this.state.data.phone_number } </Text>
            </View>
            <View style={{flexDirection: 'row',height:20}}>
              <Text style={styles.boldAndUpper}>Email:</Text>
              <Text> { this.state.data.email } </Text>
            </View>
            <View style={{flexDirection: 'row',height:20}}>
              <Text style={styles.boldAndUpper}>Tình trạng: </Text>
              <TouchableOpacity onPress={() => this.updateButton()}>
              <Text style = {this.state.data.confirm && this.state.data.paid ? styles.paid : this.state.data.confirm && !this.state.data.paid ? styles.confirm : styles.not_confirm}>
                { this.state.data.confirm && this.state.data.paid ? 'Đã hoàn thành': this.state.data.confirm && !this.state.data.paid ? 'Đã xác nhận' : 'Chưa xác nhận' }
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.itemInfo}>
          <View style = {styles.infoHeader}>
          <Text style={styles.infoHeaderText}>SẢN PHẨM:</Text>
          </View>
          <FlatList
              data={this.state.data.items}
              keyExtractor = {(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View style={styles.items}>
                  <Text>{item.quantity} x {item.get_product_name} + {item.get_option_name} = {item.get_price}</Text>
                </View>
            }
          />

        </View>
    < /View>


      );
    }
}
const styles = StyleSheet.create({
  info: {backgroundColor: '#f1f1f1',marginTop:10,marginLeft: '2.5%', borderBottomWidth:1, borderBottomColor:'#bbb', marginRight:'2.5%'},
  orderInfo :{padding:10,},
  header:{height:40, justifyContent:'center'},
  headerText: {color: '#f48b8c',marginTop:5,marginLeft:10, fontSize:15, fontWeight:'bold'},
  itemInfo :{width: '95%',backgroundColor: '#f1f1f1',marginTop:10,marginLeft: '2.5%',},
  items :{padding:10,flexDirection: 'row'},
  totalText:{padding: 10,fontSize:40,color: 'white',textTransform: 'uppercase',textAlign: 'center',},
  total:{backgroundColor: '#f48b8c',},
  infoHeader:{},
  infoHeaderText : {fontWeight: 'bold',color: '#f48b8c'},
  confirm:{textTransform: 'uppercase',color:'#f48b8c', fontWeight:'bold'},
  paid :{textTransform: 'uppercase',color:'#fff', backgroundColor: '#bbb'},
  not_confirm:{textTransform: 'uppercase',color: '#fff', backgroundColor: '#f48b8c', width:120, textAlign:'center', fontWeight:'bold', marginRight: '5%'},
  boldAndUpper:{textTransform: 'uppercase', color:'gray', fontWeight:'bold', width:150},
  status: {width: 120, alignItems: 'center', marginLeft: 'auto'},
});
export default OrderDetail
