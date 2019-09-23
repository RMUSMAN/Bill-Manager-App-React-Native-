 //This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import {  ThemeProvider, Divider , Card, Header, Button} from 'react-native-elements';
import { Ionicons, FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import 'intl';
import 'intl/locale-data/jsonp/en-IN';
import 'intl/locale-data/jsonp/en';








const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 6 })

export default class Screen3 extends React.Component<{}> {

NextMonth=['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  constructor()
  {
    super();
    this.state ={
    TextInput_Name: '',
     Picker_Site: '',
     Picker_Site2: '',
    Picker_Month:'',
    TextInput_Unit:0,
    TextInput_Budget:0,
      Months:[],
      Units:[],
      Budgets:[],
    }
  }

getData()
{
   this.setState= ({
        //   TextInput_Name : this.props.navigation.state.params.name,
        //    Picker_Site : this.props.navigation.state.params.site1,
        //     Picker_Site2 : this.props.navigation.state.params.site2,
        //     Picker_Month : this.props.navigation.state.params.month,
        //     TextInput_Unit: this.props.navigation.state.params.unit,  
        //     TextInput_Budget: this.props.navigation.state.params.budget,
        // //   Months: [...this.props.navigation.state.param.months],
          //  Units: this.props.navigation.state.params.units,  
          //  Budgets: this.props.navigation.state.params.budgets,
            
            
      })
}
setArray =()=>{
   const { navigation } = this.props;
  
    const arr = navigation.getParam('months', 'not available');
   
// let newArray = [...this.props.navigation.state.param.months];
  this.setState=(
            {
                Months:[...arr]
            }
        )
   console.log(this.state.Months);
}
 componentDidMount(){
    this.getData();
   this.setArray();
         
  }
 
 getNext=(item)=>{
const currentIndex = this.NextMonth.indexOf(item);
const nextIndex = (currentIndex + 1);
 return this.NextMonth[nextIndex];


 }
 
 
  render() {

    const { navigation } = this.props;
     const name = navigation.getParam('name', 'name');
    const MonthsArray = navigation.getParam('months', '');
    const UnitsArray = navigation.getParam('units', 0);
    const BudgetsArray = navigation.getParam('budgets', 0);
    //   console.log("length is", MonthsArray.length)
    //  console.log("array is", name)
 
if(MonthsArray.length===0)
{
return ( 
   <View style={styles.Container}>
        <MaterialCommunityIcons
 name="flask-empty-outline" size={50} color="#409CF9" style={styles.icons} />
        <Text  style={styles.paragraph}> NO BILL HASS BEEN ADDED TO DISPLAY </Text>
        <View style={{flexDirection:'row'}}>
        <Button title='GO HOME'   buttonStyle={{paddingHorizontal:30, padding:10, marginRight:5}} titleStyle={{fontSize:12}} onPress={()=>this.props.navigation.navigate('First')}/>
        <Button title='CREATE' titleStyle={{fontSize:12}} buttonStyle={{paddingHorizontal:37, padding:10, marginLeft:5}} onPress={()=>this.props.navigation.navigate('Second')}/> 
      </View></View>
   
   
   );
}
else{
   return (



      <ScrollView >
 
       <View style={styles.MainContainer}>
     { MonthsArray.map((item, key)=>(

        <TouchableOpacity  style={styles.item}
       onPress={()=>this.props.navigation.navigate('Second',
           )}>

   <View style={styles.Bills}>
  <Text
   style={{marginBottom:0, padding:10,paddingRight:30,  paddingBottom:0, color:'#fff'}}>
    Total Consumed
  </Text>
  <View 
  style={{flexDirection:'row', height:110}}>
  <Text h4 
  style={{marginBottom: 25, paddingLeft:10, paddingRight:0, paddingTop:0, color:'#fff', fontWeight:'bold', fontSize:25}}>
    Rs. {typeof UnitsArray[key]!=="undefined" ? formatter.format(UnitsArray[key]*7) : 0 } 
     <Ionicons
 name="ios-arrow-round-up" 
 size={34} 
 color="#fff" 
 style={styles.icons, {marginTop:5}} />
    </Text>
   
    
 </View>
<Text style={{marginBottom: 0, padding:10,paddingRight:30,  paddingBottom:2, backgroundColor:'#B7E6F9', color:'#409CF9'}}>{name}
  </Text>
  <View 
  style={{flexDirection:'row',backgroundColor:'#B7E6F9', borderBottomEndRadius:5, borderBottomLeftRadius:5}}>
  <Text 
  style={{marginBottom: 0, paddingLeft:10, paddingRight:5,paddingBottom:10, backgroundColor:'#B7E6F9', color:'#409CF9', borderRadius:5}}>
   <MaterialCommunityIcons
 name="clock-outline" 
 size={21} 
 color="#409CF9"
  style={styles.icons} />
</Text>
 <Text style={{color:'#409CF9'}}>
  {MonthsArray[key]} to {this.getNext(MonthsArray[key])}
 </Text>
  
   </View>
  </View>

    </TouchableOpacity>
    ))}
    </View>
  </ScrollView>
    );
}    
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'flex-start',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius:5,
   
  
  },
  Container: {
    flex: 1,
    alignItems: 'center',
     margin:60,
     padding:20,
    

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
  item :{
    width: '50%',
   height:220,
  
  },
  Bills:{    
  margin:5,
  flexDirection:'column',
backgroundColor:'#409CF9', 
borderRadius:5,
padding:0,

  },
   icons: {
  
      resizeMode: 'contain',
      margin:5,
    
   fontWeight:'bold',
  
      

    },
});
 