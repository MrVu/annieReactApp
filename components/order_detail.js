import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, Vibration, Modal, } from 'react-native';

export class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      itemID: this.props.navigation.state.params.itemID,
      token: this.props.navigation.state.params.token,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  //request get data
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
  updateStatus = (confirm, delivery, paid, cancel) => {
    Vibration.vibrate(70);
    var formData = new FormData();
    formData.append('confirm', confirm);
    formData.append('paid', paid);
    formData.append('delivery', delivery);
    formData.append('cancel', cancel);
    fetch('https://anniecosmetic.vn/api/orders/' + this.state.itemID + '/', { method: 'PATCH' , headers: {'Authorization': 'Token ' + this.state.token}, body : formData})
      .then((response) => response.json())
      .then((json) => {
        this.getData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setModalVisible(false);
        this.setState({ isLoading: false });
      });
  }
  //----------------------

  //Set modal visible
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  //end set modal visible

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
    const { data, isLoading, modalVisible } = this.state;

    return isLoading == true ? (<View style={styles.loading}><ActivityIndicator  size="large"/></View>) :(
      <View style={styles.container}>
        <View>
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {null}}>
            <View style={styles.modalView}>
              <View style={styles.modalInner}>
                <View style={styles.modalInnerHead}>
                  <Text style={styles.modalInHeadText}>CẬP NHẬT ĐƠN HÀNG</Text>
                </View>
                <View style={styles.modalContent}>
                  <TouchableOpacity onPress= {() => this.updateStatus(false, false, false, false)}>
                    <View style={styles.modalContentTxW}>
                      <Text style={styles.modalContentTx}>CHƯA XÁC NHẬN</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress= {() => this.updateStatus(true, false, false, false)}>
                    <View style={styles.modalContentTxW}>
                      <Text style={styles.modalContentTx}>ĐÃ XÁC NHẬN</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress= {() => this.updateStatus(true, true, false, false)}>
                    <View style={styles.modalContentTxW}>
                      <Text style={styles.modalContentTx}>ĐANG GIAO HÀNG</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress= {() => this.updateStatus(true, true, true, false)}>
                    <View style={styles.modalContentTxW}>
                      <Text style={styles.modalContentTx}>ĐÃ HOÀN THÀNH</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress= {() => this.updateStatus(false, false, false, true)}>
                    <View style={styles.modalContentTxW}>
                      <Text style={styles.modalContentTx}>HỦY ĐƠN HÀNG</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalClose}>
                  <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                  <Text style={styles.modalCloseText}>HỦY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
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
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boldAndUpper}>Tên khách hàng:</Text>
              <Text>{data.name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boldAndUpper}>Địa chỉ:</Text>
              <Text style = {{flexWrap: "wrap"}}>{ data.address } </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boldAndUpper}>Số điện thoại:</Text>
              <Text>{data.phone_number}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boldAndUpper}>Email:</Text>
              <Text>{data.email}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boldAndUpper}>Tình trạng: </Text>
              <Text style = {!!data.confirm && !!data.paid && !!data.delivery && !data.cancel ? styles.paid : data.confirm && !data.paid && !data.delivery && !data.cancel ? styles.confirm : !!data.confirm && !!data.delivery && !data.paid && !data.cancel ? styles.confirm : !!data.cancel ? styles.cancel : styles.not_confirm}>
                { !!data.confirm && !!data.paid && !!data.delivery && !data.cancel ? 'Đã hoàn thành': !!data.confirm && !data.paid && !data.delivery ? 'Đã xác nhận': !!data.confirm && !!data.delivery && !data.paid ? 'Đang giao hàng' : !!data.cancel ? 'Đã hủy' : 'Chưa xác nhận' }
              </Text>

            </View>
            <View>
            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
              <Text style={{color:'#bbb', textTransform:'uppercase', fontWeight:'bold'}}>Nhấn vào đây để thay đổi tình trạng đơn hàng</Text>
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
  container:{flex: 1},
  modalView:{flex:1, justifyContent: "center",alignItems: "center",backgroundColor: '#00000080'},
  modalInner:{backgroundColor:'#fff' , height: 300, width: 400},
  modalInnerHead:{backgroundColor:'#f48b8c', height:30, alignItems:'center', justifyContent: "center" },
  modalInHeadText:{color: '#fff', fontWeight:'bold', fontSize:15},
  modalClose:{alignItems:'center', marginTop:'auto', marginBottom:10},
  modalCloseText:{color: '#f48b8c',fontWeight:'bold', fontSize:15, width: 100, textAlign:'center' },
  modalContent : {alignItems:'center',flexDirection:'column', height:200, marginTop: 20, justifyContent:'center'},
  modalContentTxW:{ height:40, justifyContent:'center', borderBottomWidth: 1, borderBottomColor:'#bbb'},
  modalContentTx:{fontWeight:'bold', color: '#f48b8c'},
  info: {marginTop:10,marginLeft: '2.5%', borderBottomWidth:1, borderBottomColor:'#bbb', marginRight:'2.5%'},
  orderInfo :{padding:10,},
  header:{height:40, justifyContent:'center'},
  headerText: {color: '#f48b8c',marginTop:5,marginLeft:10, fontSize:15, fontWeight:'bold'},
  itemInfo :{width: '95%',marginTop:10,marginLeft: '2.5%',},
  items :{padding:10,flexDirection: 'row'},
  totalText:{padding: 10,fontSize:40,color: 'white',textTransform: 'uppercase',textAlign: 'center',},
  total:{backgroundColor: '#f48b8c',},
  infoHeader:{},
  infoHeaderText : {fontWeight: 'bold',color: '#f48b8c'},
  confirm:{textTransform: 'uppercase',color:'#f48b8c', fontWeight:'bold', textAlign:'center'},
  paid :{textTransform: 'uppercase',color:'#fff', backgroundColor: '#bbb', width:120, textAlign:'center'},
  not_confirm:{textTransform: 'uppercase',color: '#fff', backgroundColor: '#f48b8c', width:120, textAlign:'center', fontWeight:'bold'},
  cancel:{textTransform: 'uppercase',color:'red', fontWeight:'bold', width: 55, textAlign:'center'},
  boldAndUpper:{textTransform: 'uppercase', color:'gray', fontWeight:'bold', width:150},
  status: {width: 120, alignItems: 'center', marginLeft: 'auto'},
  loading:{flex: 1, alignItems: 'center',justifyContent:'center'},
});
export default OrderDetail
