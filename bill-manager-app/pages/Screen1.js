import React, { Component } from 'react';
import { StyleSheet, View, Text,Image} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';

export default class Screen1 extends Component {

  render() {
    return (
      <View style={styles.MainContainer}>
        <Image 
        style={styles.logo} 
        source={require('../image/main.png')} />
        <Text 
         style={styles.paragraph}> 
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... </Text>
        <View style={{flexDirection:'row'}}>
        <Button 
        title='GO TO LISTNING' 
        buttonStyle=
        {{paddingHorizontal:10, 
        padding:10, 
        marginRight:5}}
         titleStyle={{fontSize:12}}
        onPress={()=>this.props.navigation.navigate('Third')}/>
        <Button 
        title='CREATE'
        titleStyle={{fontSize:12}}
        buttonStyle={{paddingHorizontal:37,
         padding:10,
         marginLeft:5}}
        onPress={()=>this.props.navigation.navigate('Second')}/> 
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
     marginTop:50
  },
paragraph: {
    marginTop: 10,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#409CF9',
    paddingHorizontal:20
  },
  logo: {
    marginTop:30,
    height: 200,
    width: 200,
  }
});
