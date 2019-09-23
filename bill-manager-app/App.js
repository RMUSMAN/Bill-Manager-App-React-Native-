import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, Image, TouchableOpacity, Button } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons
 } from "@expo/vector-icons"

import {
  createDrawerNavigator,                                                                 createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import Screen1 from './pages/Screen1';
import Screen2 from './pages/Screen2';
import Screen3 from './pages/Screen3';
import Loading from './pages/Loading';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const firebaseConfig = {
    // ADD YOUR FIREBASE CREDENTIALS
    apiKey: "AIzaSyBuMftXI6N1FcbuNPIBcti-LAlM5gm5e4w",
    authDomain: "bill-manager-app.firebaseapp.com",
    databaseURL: "https://bill-manager-app.firebaseio.com",
    projectId: "bill-manager-app",
    storageBucket: "",
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

const Auth= createStackNavigator({
Login:{screen: Login},
SignUp:{screen: SignUp}

});


class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
         onPress={this.toggleDrawer.bind(this)}>
          
 <MaterialCommunityIcons
 name="menu" 
 size={32}
  color="white" 
   style={{ width: 32, height: 32, marginLeft: 10 }} />

         
        </TouchableOpacity>
      </View>
    );
  }
}
const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      title: 'BILL MANAGER',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
   
    headerRight: (
      <MaterialCommunityIcons
 name="logout-variant" 
 size={32}
  color="white" 
   style={{ width: 32, height: 32, marginRight: 10 }}
        onPress={
           () => firebase.auth().signOut()
      //  ()=>navigation.navigate('Auth')
          }
        
      />
    ),
      headerStyle: {
        backgroundColor: '#409CF9',
      },
      headerTintColor: '#fff',
    }),
  },
});


const Screen2_StackNavigator = createStackNavigator({
  Second: {
    screen: Screen2,

  },
});

const Screen3_StackNavigator = createStackNavigator({
  Third: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'BILL MANAGER',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: (
      <MaterialCommunityIcons
 name="logout-variant" 
 size={32}
  color="white" 
   style={{ width: 32, height: 32, marginRight: 10 }}
        onPress={
           () => firebase.auth().signOut()
      //  ()=>navigation.navigate('Auth')
          }
        
      />
    ),
      headerStyle: {
        backgroundColor: '#409CF9',
      },
      headerTintColor: '#fff',
    }
    
    ),
  },
});


const DrawerNavigatorExample = createDrawerNavigator({
  Screen1: {
    
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'HOME',
    },
  },

  Screen2: {
    //Title
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'CREATE',
    },
  },

  Screen3: {
    //Title
    screen: Screen3_StackNavigator,
    navigationOptions: {
      drawerLabel: 'VIEW',
    },
  },

});

export default createAppContainer(createSwitchNavigator(

{

Loading,
Auth,
DrawerNavigatorExample
},
{
initialRouteName: 'Loading'
}

));





//const mianNavigator= createStackNavigator({
//drawer: {
//  screen: DrawerNavigatorExample,
//}

//}); 


//export default createAppContainer(DrawerNavigatorExample);
