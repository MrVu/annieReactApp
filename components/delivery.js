import React, { Component } from 'react';
import { StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert, AsyncStorage, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
export class deliveryPage extends Component {
  //Navigation headers
    static navigationOptions = {
        title: null,
        headerLeft: () => null,
        headerShown: false,
    };
  //------------------
  render(){
    return(
      <ScrollView style={styles.container}>
        <View style={styles.brand}><Text style={styles.brand_text}>VẬN CHUYỂN: LALAMOVE</Text></View>
        <View style={styles.header}><Text style={styles.header_text}>BẢNG GIÁ DỊCH VỤ GIAO HÀNG NỘI THÀNH XE MÁY</Text></View>
        <View style={styles.body}>
          <View style={styles.leftBody}>
            <View style={styles.leftBodyText}>
              <Text style={{textAlign:'center', color:'#fff', fontWeight: 'bold', backgroundColor: '#f48b8c'}}>60 PHÚT</Text>
              <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold'}}>PHÍ BAN ĐẦU</Text>
              <Text style={{textAlign:'center'}}>20.000 VNĐ</Text>
              </View>
            </View>
          <View style={styles.rightBody}>
            <View style={styles.upperRightBody}>
                <View>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150}}>4KM</Text>
                  <Text style={{textAlign:'center', width: 150}}>Khoảng cách ban đầu</Text>
                </View>
                <View>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150}}>+5000 VNĐ</Text>
                  <Text style={{textAlign:'center', width: 150}}>Mỗi km tiếp theo</Text>
                </View>
            </View>
            <View style={styles.lowerRightBody}>
                <View>
                <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150}}>+25.000 VNĐ</Text>
                <Text style={{textAlign:'center', width: 150}}>Quay lại điểm nhận hàng</Text>
                </View>
                <View>
                <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold' , width: 150}}>40x40x40 CM</Text>
                <Text style={{textAlign:'center', width: 150}}>Kích thước tối đa</Text>
                </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.leftBody}>
            <View style={styles.leftBodyText}>
              <Text style={{textAlign:'center', color:'#fff', fontWeight: 'bold', backgroundColor: '#f48b8c'}}>2 GIỜ</Text>
              <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold'}}>PHÍ BAN ĐẦU</Text>
              <Text style={{textAlign:'center'}}>20.000 VNĐ</Text>
              </View>
            </View>
          <View style={styles.rightBody}>
            <View style={styles.upperRightBody}>
                <View>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150}}>5KM</Text>
                  <Text style={{textAlign:'center', width: 150}}>Khoảng cách ban đầu</Text>
                </View>
                <View>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150, width: 150}}>+4000 VNĐ</Text>
                  <Text style={{textAlign:'center', width: 150}}>Mỗi km tiếp theo</Text>
                </View>
            </View>
            <View style={styles.lowerRightBody}>
                <View>
                <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150}}>KHÔNG HỖ TRỢ</Text>
                <Text style={{textAlign:'center', width: 150}}>Quay lại điểm nhận hàng</Text>
                </View>
                <View>
                <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold' , width: 150}}>40x40x40 CM</Text>
                <Text style={{textAlign:'center', width: 150}}>Kích thước tối đa</Text>
                </View>
            </View>
          </View>
        </View>
        <View style={styles.block2}>
          <View style={styles.header}><Text style={styles.header_text}>DỊCH VỤ CỘNG THÊM</Text></View>
          <View style={styles.bodyBlock2}>
            <View style={styles.leftBody}>
              <View style={styles.leftBodyText}>
                  <View style={styles.eachTextLeftBody}>
                  <Text style={{textAlign:'center', color:'#fff', fontWeight: 'bold', backgroundColor: '#f48b8c'}}>THU HỘ</Text>
                  </View>
                  <View style={styles.eachTextLeftBody}>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold'}}>{'<'}1.000.000 VNĐ</Text>
                  <Text style={{textAlign:'center'}}>MIỄN PHÍ</Text>
                  </View>
                  <View style={styles.eachTextLeftBody}>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold'}}>{'<'}2.000.000 VNĐ</Text>
                  <Text style={{textAlign:'center'}}>+10.000 VNĐ</Text>
                  </View>
                  <View style={styles.eachTextLeftBody}>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold'}}>{'<'}3.000.000 VNĐ</Text>
                  <Text style={{textAlign:'center'}}>+15.000 VNĐ</Text>
                  </View>
                  <View style={styles.eachTextLeftBody}>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold'}}>{'>'}3.000.000 VNĐ</Text>
                  <Text style={{textAlign:'center'}}>KHÔNG HỖ TRỢ</Text>
                  </View>
              </View>
            </View>
            <View style={styles.rightBody2}>
              <View style={styles.upperRightBody2}>
                  <View>
                    <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150}}>THÙNG GIỮ NHIỆT</Text>
                    <Text style={{textAlign:'center', width: 150}}>Hỗ trợ miễn phí</Text>
                  </View>
                  <View>
                    <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150}}>GIAO HÀNG TẬN TAY</Text>
                    <Text style={{textAlign:'center', width: 150}}>+10.000 VNĐ</Text>
                  </View>
              </View>
              <View style={styles.lowerRightBody2}>
                  <View>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150}}>GIAO HÀNG ĐÊM, NGÀY LỄ</Text>
                  <Text style={{textAlign:'center', width: 150}}>Quay lại điểm nhận hàng</Text>
                  </View>
                  <View>
                  <Text style={{textAlign:'center', color:'#f48b8c', fontWeight: 'bold', width: 150 }}>NHIỀU ĐIỂM DỪNG</Text>
                  <Text style={{textAlign:'center', width: 150}}>Gói 60 phút: +5000/điểm</Text>
                  <Text style={{textAlign:'center', width: 150}}>Gói 2h: Không hỗ trợ</Text>
                  </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {marginTop: 40},
  brand:{alignItems: 'center'},
  brand_text:{color: '#f48b8c', fontSize: 30, fontWeight: 'bold'},
  header : {backgroundColor: '#f48b8c', height:30},
  header_text :{color: '#fff', textAlign: 'center', fontWeight: 'bold', marginTop: 5},
  body: {  flexDirection: 'row', height: 180, marginTop: 10, borderBottomWidth: 1, borderBottomColor:'#bbb', paddingBottom: 10 },
  bodyBlock2: {  flexDirection: 'row', height: 350, marginTop: 10, borderBottomWidth: 1, borderBottomColor:'#bbb', paddingBottom: 10 },
  leftBody: { width: '25%', alignItems:'center', borderRightWidth: 1, borderRightColor: '#bbb',justifyContent: 'center',},
  leftBodyText: {},
  rightBody: {width:'75%', alignItems:'center'},
  rightBody2: {width:'75%', marginTop: 60, alignItems:'center'},
  upperRightBody: {flexDirection: 'row', marginBottom: 5, height: 80},
  upperRightBody2: {flexDirection: 'row', marginBottom: 10, height: 150},
  lowerRightBody: {flexDirection: 'row'},
  lowerRightBody2: {flexDirection: 'row'},
  eachTextLeftBody: {marginBottom: 15},
  block2 : {marginTop: 20},
});
export default deliveryPage
