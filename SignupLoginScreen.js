import React, {Component} from 'react';
import { View,
   StyleSheet,
    Text,
     Image,
      TouchableOpacity,
       TextInput,
        Alert,
         Modal,
          KeyboardAvoidingView,
           ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { render } from 'react-dom';

export default class SignupLoginScreen extends Component{
    constructor(){
        super()
        this.state={ 
          emailId :'',
          password : '',
          firstName : '',
          lastName : '',
          address : '',
          contact : '',
          confirmPassword : '',
          isModalVisible : ''
        }
    }

userLogin = (emailId, password) =>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
        return Alert.alert("Successfully Login")
    })
    .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    })
}

userSignUp = (emailId, password, confirmPassword) =>{
  if(password !== confirmPassword){
    return Alert.alert("Password doesn't match\nCheck your password")
  }
  else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      db.collection('users').add({
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        address:this.state.address,
        mobile_number:this.state.contact,
        email_id:this.state.emailId
      })
      return Alert.alert(
        'User added successfully',
        '',
        [
          {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
        ]
      );
    })
    .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    return Alert.alert(errorMessage)
  });
}
}

showModal = ()=>{
  return(
    <Modal 
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
      <View style={styles.modalContainer}>
        <ScrollView style = {{width:'100%'}}>
          <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
            <Text style = {styles.modalTitle}>Registration</Text>
            <TextInput 
            style = {styles.formTextInput}
            placeholder = {"First name"}
            maxlength = {10}
            onChangeText={(text)=>{
              this.setState ({
                firstName: text
              })
            }}
            />

            <TextInput
            style = {styles.formTextInput}
            placeholder = {"Last name "}
            maxlength = {10}
            onChangeText={(text)=>{
              this.setState ({
                lastName: text
              })
            }}
            />           

            <TextInput
            style ={styles.formTextInput}
            placeholder = {"Contact"}
            maxlength = {10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState ({
                contact: text
              })
            }}
            />

            <TextInput
            style = {styles.formTextInput}
            placeholder = {"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}   
            />

            <TextInput
            style = {styles.formTextInput}
            placeholder = {"Email"}
            keyboardType = {'email-address'}
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
            />

            <TextInput
            style = {styles.formTextInput}
            placeholder = {"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
            />

            <TextInput
            style = {styles.formTextInput}
            placeholder = {"Confirm Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
            />

            <View style = {styles.modalBackButton}>
              <TouchableOpacity
              style = {styles.registerButton}
              onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.stateConfirmPassword)
              }
              >
                <Text style = {styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
              <View style = {styles.modalBackButton}>
                <TouchableOpacity
                 style = {styles.cancelButton}
                 onPress={()=>
                  this.setState({
                    "isModalVisible":false
                  })
                 }>
                   <Text style = {{colour:"#ff5722"}}>Cancel</Text>
                 
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
}

render(){
    return(
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            {
              this.showModal()
            }

            <Text style={styles.title}>Barter</Text>
            <Text style = {{colour: '#ff8a65'}}>A Trading Method</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style = {{colour: '#ff5722', fontSize: 18, fontWeight: 'bold', marginLeft: 55}}>Email ID</Text>
            <View style = {{alignItems: 'center'}}>
            <TextInput
            style={styles.loginBox}
            placeholder="example@barter.com"
            placeholderTextColor = "#ffff"
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
          </View>
  
         <Text style = {{colour: '#ff5722', fontSize: 18, fontWeight: 'bold', marginLeft: 55}}>PASSWORD</Text>
         <View style = {{alignItems: 'center'}}>
          <TextInput
            style={styles.loginBox}
            secureTextEntry = {true}
            placeholder="password"
            placeholderTextColor = "#ffff"
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          />
          </View>
          <View style = {{alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
              >
              <Text style={{colour: '#ff5722', fontSize: 18, fontWeight: 'bold'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.setState({
                  "isModalVisible":true
                })
              }}
              >
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
          </View>
          </View>      
      )
}
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffe0b2'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff9d00'
  },
  loginBox:{
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor : '#ffab91',
    fontSize: 20,
    marginBottom:20,
    marginTop: 5
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ffff",
    elevation:10
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },   
})
