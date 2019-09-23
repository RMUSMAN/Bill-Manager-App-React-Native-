// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native'
import * as firebase from 'firebase';
export default class SignUp extends React.Component {
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
 
  handleSignUp = () => {
    const { email, password } = this.state
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
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  }
render() {
    return (
      <View style={styles.container}>
       <Image 
        style={styles.logo} 
        source={require('../image/main.png')} />
        <Text style={styles.heading}>Sign Up</Text>
        
        { this.state.errorMessage &&
          <Text style={{ color: 'red', marginHorizontal:20, width:'80%', backgroundColor:'green' }}>
            {this.state.errorMessage}
          </Text> }
         
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
         underlineColorAndroid={'transparent'}
          style={styles.textInput}
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
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
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


        <Button title="Sign Up" onPress={this.handleSignUp} />
        
       <TouchableOpacity style={styles.create}
          onPress={() => this.props.navigation.navigate('Login')}
        ><Text style={styles.col}>Already have an account? Login</Text></TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    alignItems: 'center',
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