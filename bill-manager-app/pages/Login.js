// Login.js
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,Image   } from 'react-native'
import * as firebase from 'firebase';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';


class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Title', 'BILL MANAGER'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#409CF9'),
      },

      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
    
    };
  };





  state = { email: '', password: '',ReqEmail:false, FineEmail:false, ReqPassword:false,
  PasswordLength: false,  errorMessage: null }

    // TODO: Firebase stuff...
    handleLogin = () => {
  const { email, password } = this.state

      console.log(email);
      console.log(password);
if(email=='')
{
  this.setState({ ReqEmail: true })
}
else if(!email.includes('@'))
{
  this.setState({ FineEmail: true })
}
else if(password=='')
{
  this.setState({ ReqPassword: true })
}
else if(password.length<6){
this.setState({PasswordLength: true })
}
else{
  firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('DrawerNavigatorExample'))
      .catch(error => this.setState({ errorMessage: error.message }))
}
}
   
  
  render() {
    return (
      <View style={styles.container}>
       <Image 
        style={styles.logo} 
        source={require('../image/main.png')} />
        <Text style={styles.heading}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email , ReqEmail:false, FineEmail:false })}
          value={this.state.email}
        />
 {this.state.ReqEmail ? (
                <Text style={{ fontSize: 14, color: 'red', textAlign: 'left',width: '80%', }}>
                 Email is required
                </Text>
              ) : null}
 {this.state.FineEmail ? (
                <Text style={{ fontSize: 14, color: 'red', textAlign: 'left',width: '80%', }}>
                 Email sholud have @ sign
                </Text>
              ) : null}

        <TextInput
          secureTextEntry
          underlineColorAndroid={'transparent'}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password, ReqPassword:false, PasswordLength:false })}
          value={this.state.password}
        />
{this.state.ReqPassword ? (
                <Text style={{ fontSize: 14, color: 'red', textAlign: 'left',width: '80%', }}>
            Password is required
                </Text>
              ) : null}
{this.state.PasswordLength ? (
                <Text style={{ fontSize: 14, color: 'red', textAlign: 'left',width: '80%',marginBottom:10 }}>
            Password length sholud be greater then 6
                </Text>
              ) : null}


        <Button title="Login" style={{marginTop:20, paddingHorizontal:20}} onPress={this.handleLogin} />


        <TouchableOpacity style={styles.create}
          onPress={() => this.props.navigation.navigate('SignUp')}
        ><Text style={styles.col}>Don't have an account? Sign Up</Text></TouchableOpacity>
      </View>
    )
  }
}
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center'
  },
  textInput: {
   
    width: '80%',
   selfAlign: 'strech',
    height: 40,
    margin:10,
    marginBottam: 10,
    color: '#409CF9',
    borderBottomColor: '#409CF9',
    borderBottomWidth: 2,
  },
  create:
  {
bottom:0,
marginTop:30,
  },
col:{
    color: '#409CF9',
  },
   logo: {
    marginTop:30,
    height: 150,
    width: 150,
  },
  heading:{
  color: '#409CF9',
  fontSize:20,
  fontWeight:'bold'

  }
})