import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  Button,
  Picker,
  TextInput,
  Alert,
} from 'react-native';
import { ThemeProvider, Divider, Card, Header } from 'react-native-elements';
import Icon from 'react-native-ionicons';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default class Screen2 extends Component<{}> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Title', 'CREATE (STEP 1)'),
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#409CF9'),
      },

      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('First')}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color="#fff"
            style={{ width: 32, height: 32, marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    };
  };
  constructor() {
    super();

    this.state = {
      ViewArray: [],
      Disable_Button: false,
      TextInput_Name: '',
      Picker_Site: 'My Home',
      Picker_Site2: 'Bedroom AC',
      Picker_Month: 'jan',
      NameStatus: false,
      MonthStatus: false,
      ErrorMessage:false,               
      UnitStatus: false,
      BudgetStatus: false,
      TextInput_Unit: 0,
      TextInput_Budget: 0,
      Textdata: [],
      Month: [],
      Budget: [],
    };

    this.animatedValue = new Animated.Value(0);

    this.Array_Value_Index = 0;
  }

  Add_New_View_Function = () => {
  
   // var x = this.state.Textdata[this.state.Textdata.length - 1].toString().length;
    // console.log(this.state.Textdata[this.state.Textdata.length - 1]);
    // console.log(x);


    

    if (
      this.state.Month.includes(undefined) || this.state.Month.length==0 || this.state.MonthStatus==false
    ) {
      Alert.alert('Month is required');
    }
  else if (
      this.state.Textdata.includes(undefined) ||
      this.state.UnitStatus == false
    ) {
  
       Alert.alert('units are required');
      }
    

    else {





      this.setState({ MonthStatus: false, UnitStatus:false, ErrorMessage:false });
      this.animatedValue.setValue(0);

      let New_Added_View_Value = { Array_Value_Index: this.Array_Value_Index };

      this.setState(
        {
          Disable_Button: true,
          ViewArray: [...this.state.ViewArray, New_Added_View_Value],
        },
        () => {
          Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            this.Array_Value_Index = this.Array_Value_Index + 1;

            this.setState({ Disable_Button: false });
          });
        }
      );
    }
  };
  updateState = (index, value) => {
    // function get() {
    //   var x = value.toString().length;
    //   console.log('x is', x);
    //   if (x > 4) {
    //     Alert.alert('unit should be less tahn 4');
    //   }
    // }
 
    const Textdata = [...this.state.Textdata];
    Textdata[index] = value;
    this.setState({ Textdata: Textdata, UnitStatus:true });
  };

  updateBudget = (index, value) => {
    const Budget = [...this.state.Budget];
    Budget[index] = value;
    this.setState({ Budget: Budget });
  };

  onValueChange(index: number, value: string) {
 //   console.log(value);
     if (value == '') {
//       console.log('value is empty', value);
//  console.log('month are', this.state.Month);
      this.setState({MonthStatus:false});
     }
    else{ this.setState({MonthStatus:true});
    // }
    // else{
    const Month = [...this.state.Month];
    Month[index] = value;
    this.setState({ Month: Month, ErrorMessage:false});
  }
  }

  removeItem = (id) => {
  console.log("index is",id);
  console.log("months are",this.state.Month);
  console.log("Units are are",this.state.Textdata);
  console.log("viewArray are",this.state.ViewArray);

   const Month = [...this.state.Month];
   Month.splice(id+1, 1);
   this.setState({ Month: Month, MonthStatus: true});
   const Textdata = [...this.state.Textdata];
   Textdata.splice(id+1, 1);
  
   this.setState({ Textdata: Textdata, UnitStatus:true});
    const Budget = [...this.state.Budget];
   Budget.splice(id+1, 1);
   console.log("deleted unit is",Budget);
   this.setState({ Budget: Budget});


  const ViewArray =[...this.state.ViewArray];
  ViewArray.splice(id, 1);
 this.setState({ ViewArray:ViewArray});
 // console.log("after months are",Month);
 // console.log("after Units are",Textdata);
  console.log("after viewArray are",ViewArray)

    this.setState(() => ({

     
      // Month: this.state.Month.splice(index + 1, 1),
      // Textdata: this.state.Textdata.splice(index + 1, 1),
      // Budget: this.state.Budget.splice(index + 1, 1),
      // MonthStatus: true,
      // UnitStatus: true,
      
    }));
   
  }

  OnSubmit = () => {
    if (this.state.TextInput_Name == '') {
      this.setState({ NameStatus: true });
    } else if (
      this.state.Month.includes(undefined) ||
      this.state.MonthStatus == false
    ) {
      Alert.alert('Month is required');
    }
    else if (
      this.state.Textdata.includes(undefined) || this.state.Textdata.includes("") ||
      this.state.UnitStatus == false
    ) {
      Alert.alert('Units are is required');
    }

     else {
      this.setState({ NameStatus: false });
      this.props.navigation.navigate('Third', {
        name: this.state.TextInput_Name,
        site1: this.state.Picker_Site,
        site2: this.state.Picker_Site2,
        month: this.state.Picker_Month,
        unit: this.state.TextInput_Unit,
        budget: this.state.TextInput_Budget,
        months: this.state.Month,
        units: this.state.Textdata,
        budgets: this.state.Budget,
      });
    }
  };

  render() {
    const AnimationValue = this.animatedValue.interpolate({
      inputRange: [0, 1],

      outputRange: [-59, 0],
    });

    let Render_Animated_View = this.state.ViewArray.map((item, key) => {
      if (key == this.Array_Value_Index) {
        return (
          <Animated.View
            key={key}
            style={[
              styles.Animated_View_Style,
              {
                opacity: this.animatedValue,
                transform: [{ translateY: AnimationValue }],
              },
            ]}>
            <Text style={styles.View_Inside_Text}>
              This Is Row {item.Array_Value_Index}
            </Text>
          </Animated.View>
        );
      } else {
        return (
          <View key={item.key} style={styles.Animated_View_Style}>
            <View style={{ width: '10%' }}>
              <MaterialCommunityIcons
                name="calendar-text"
                size={32}
                color="#409CF9"
                style={{ marginTop: 15 }}
              />
            </View>
            <View style={{ width: '80%', paddingLeft: 12 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingHorizontal: 0,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '42%',
                    height: 19,
                    marginRight: 5,
                    marginTop: 0,
                  }}>
                  <Picker
                    style={{
                      height: 19,
                      color: '#409CF9',
                      width: '100%',
                      marginTop: 0,
                      marginBottom: 11,
                    }}
                    selectedValue={this.state.Month[key + 1]}
                    onValueChange={itemValue =>
                      this.onValueChange(key + 1, itemValue)
                    }>
                    <Picker.Item label="select" value={this.state.Month[key + 1]} disabled/>
                   
                    <Picker.Item label="jan" value="jan" />
                    <Picker.Item label="Feb" value="feb" />
                    <Picker.Item label="mar" value="mar" />
                    <Picker.Item label="apr" value="apr" />
                    <Picker.Item label="may" value="may" />
                    <Picker.Item label="jun" value="jun" />
                    <Picker.Item label="jul" value="jul" />
                    <Picker.Item label="aug" value="aug" />
                    <Picker.Item label="sep" value="sep" />
                    <Picker.Item label="oct" value="oct" />
                    <Picker.Item label="nov" value="nov" />
                    <Picker.Item label="dec" value="dec" />
                  </Picker>
                  <Divider style={{ backgroundColor: '#409CF9', height: 1 }} />
                
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 20,
                    marginRight: 5,
                    marginTop: 5,
                  }}>
                  <TextInput
                  placeholder="units"
                    style={{
                    //  selfAlign: 'strech',
                       height: 26,
                      color: '#409CF9',
                      borderBottomColor: '#409CF9',
                      borderBottomWidth: 1,
                      paddingBottom:10
                    }}
                    keyboardType="numeric"
                    underlineColorAndroid={'transparent'}
                    value={this.state.Textdata[key+1]}
                    onChangeText={val => this.updateState(key + 1, val)}
                  />
                </View>
                <View
                  style={{
                    width: '30%',
                    height: 20,
                    marginRight: 10,
                    marginTop: 5,
                  }}>
                  <TextInput
                   placeholder="budget"
                    style={{
                      selfAlign: 'strech',
                      height: 26,
                      color: '#409CF9',
                      borderBottomColor: '#409CF9',
                      borderBottomWidth: 1,
                       paddingBottom:10
                    }}
                    underlineColorAndroid={'transparent'}
                    keyboardType="numeric"

                    value={this.state.Budget[key+1]}
                    onChangeText={val => this.updateBudget(key + 1, val)}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: '10%' }}>
              <MaterialCommunityIcons
                name="delete"
                size={32}
                color="#409CF9"
                style={{ marginTop: 15 }}
                onPress={() => this.removeItem(key)}
              />
            </View>
          </View>
        );
      }
    });

    return (
      <View style={styles.MainContainer}>
        <ScrollView
          style={{ paddingBottom: 50, marginBottom: 60, paddingHorizontal: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '10%' }}>
              <MaterialCommunityIcons
                name="notebook"
                size={32}
                color="#409CF9"
                style={styles.icons}
              />

              <MaterialCommunityIcons
                name="comment-question"
                size={32}
                color="#409CF9"
                style={styles.icons}
              />

              <MaterialCommunityIcons
                name="radioactive"
                size={32}
                color="#409CF9"
                style={styles.icons}
              />

              <MaterialCommunityIcons
                name="calendar-text"
                size={32}
                color="#409CF9"
                style={{ marginTop: 50 }}
              />
            </View>

            <View style={{ width: '90%', flex: 1, padding: 2 }}>
              <Text style={styles.TextLabel}>Bill Name</Text>
              <TextInput
                style={styles.input}
                placeholder="name"
                underlineColorAndroid={'transparent'}
                onChangeText={TextInputValue =>
                  this.setState({
                    TextInput_Name: TextInputValue,
                    NameStatus: false,
                  })
                }
              />
              {this.state.NameStatus ? (
                <Text style={{ fontSize: 14, color: 'red', textAlign: 'left' }}>
                  {' '}
                  Please enter name{' '}
                </Text>
              ) : null}
              <Text style={styles.TextLabel}>Select Site</Text>
              <Picker
                style={styles.PickerStyle}
                selectedValue={this.state.Picker_Site}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ Picker_Site: itemValue })
                }>
                <Picker.Item label="My Home" value="My Home" />
                <Picker.Item label="My Office" value="My office" />
              </Picker>

              <Divider style={{ backgroundColor: '#409CF9', height: 1 }} />
              <Text style={styles.TextLabel}>Select Site</Text>
              <Picker
                style={styles.PickerStyle}
                selectedValue={this.state.Picker_Site2}
                onValueChange={(itemValue1, itemIndex1) =>
                  this.setState({ Picker_Site2: itemValue1 })
                }>
                <Picker.Item label="Bedroom AC" value="Bedroom AC" />
                <Picker.Item label="Office Ac" value="office AC" />
              </Picker>
              <Divider style={{ backgroundColor: '#409CF9', height: 1 }} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 20,
                  paddingHorizontal: 0,
                }}>
                <View
                  style={{
                    width: '35%',
                    height: 10,
                    marginTop: 8,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#409CF9',
                      fontWeight: 'bold',
                    }}>
                    Select Month
                  </Text>
                </View>
                <View style={{ width: '25%', height: 10, marginTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#409CF9',
                      fontWeight: 'bold',
                    }}>
                    Unit Rate
                  </Text>
                </View>
                <View style={{ width: '33%', height: 10, marginTop: 5}}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#409CF9',
                      fontWeight: 'bold',
                    }}>
                    Budget
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 6,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '37%',
                    height: 20,
                    marginRight: 5,
                    marginTop: 0,
                  }}>
                  <Picker
                    style={{
                      height: 20,
                      color: '#409CF9',
                      width: '100%',
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                    selectedValue={this.state.Month[0]}
                    onValueChange={itemValue =>
                      this.onValueChange(0, itemValue)
                    }>
                    <Picker.Item  label="select" textStyle={{color: 'red'}} value={this.state.Month[0]}  disabled/>
                 
                    <Picker.Item label="jan" value="jan" />
                    <Picker.Item label="Feb" value="feb" />
                    <Picker.Item label="mar" value="mar" />
                    <Picker.Item label="apr" value="apr" />
                    <Picker.Item label="may" value="may" />
                    <Picker.Item label="jun" value="jun" />
                    <Picker.Item label="jul" value="jul" />
                    <Picker.Item label="aug" value="aug" />
                    <Picker.Item label="sep" value="sep" />
                    <Picker.Item label="oct" value="oct" />
                    <Picker.Item label="nov" value="nov" />
                    <Picker.Item label="dec" value="dec" />
                  </Picker>
                  <Divider style={{ backgroundColor: '#409CF9', height: 1 }} />
                </View>
                <View
                  style={{
                    width: '23%',
                    height: 20,
                    marginRight: 5,
                    marginTop: 5,
                  }}>
                  <TextInput
                  placeholder="units"
                    style={{
                      selfAlign: 'strech',
                      height: 26,
                      color: '#409CF9',
                      borderBottomColor: '#409CF9',
                      borderBottomWidth: 1,
                      paddingBottom:9
                    }}
                    keyboardType="numeric"
                    underlineColorAndroid={'transparent'}
                    onChangeText={val => this.updateState(0, val)}
                  />
                </View>
                <View
                  style={{
                    width: '27%',
                    height: 20,
                    marginRight: 10,
                    marginTop: 5,
                  }}>
                  <TextInput
                  placeholder="budget"
                    style={{
                      selfAlign: 'strech',
                      height: 26,
                      color: '#409CF9',
                      borderBottomColor: '#409CF9',
                      borderBottomWidth: 1,
                      paddingBottom:9
                    }}
                    underlineColorAndroid={'transparent'}
                    keyboardType="numeric"
                    onChangeText={val => this.updateBudget(0, val)}
                  />
                </View>
              </View>
            </View>
          </View>

          {Render_Animated_View}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.TouchableOpacityStyle}
            disabled={this.state.Disable_Button}
            onPress={this.Add_New_View_Function}>
            <MaterialCommunityIcons name="plus" size={25} color="#409CF9" />
            <Text style={{ color: '#409CF9', fontSize: 16 }}>Add More</Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            bottom: 0,
            height: 50,
            width: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            borderTopColor: '#409CF9',
            borderTopWidth: 1,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.next}
            onPress={this.OnSubmit}
            // onPress={()=>this.props.navigation.navigate('Third',
            //  {
            //   name : this.state.TextInput_Name,
            //   site1 : this.state.Picker_Site,
            //   site2 : this.state.Picker_Site2,
            //   month : this.state.Picker_Month,
            //   unit : this.state.TextInput_Unit,
            //   budget: this.state.TextInput_Budget,
            //   months:this.state.Month,
            //   units:this.state.Textdata,
            //   budgets:this.state.Budget,

            //  })}
          >
            <Text
              style={{ fontSize: 24, color: '#409CF9', fontWeight: 'bold' }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 0,

    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },

  Animated_View_Style: {
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 5,
    flexDirection: 'row',
    padding: 2,
    position:'relative'
  },

  View_Inside_Text: {
    color: '#fff',
    fontSize: 24,
  },

  TouchableOpacityStyle: {
    alignItems: 'center',
    width: 100,
    height: 30,
    justifyContent: 'center',
    left: 40,
    marginTop: 15,
    flexDirection: 'row',
  },

  icons: {
    resizeMode: 'contain',

    marginTop: 35,
  },
  input: {
    selfAlign: 'strech',
    height: 30,
    marginBottam: 30,
    color: '#409CF9',
    borderBottomColor: '#409CF9',
    borderBottomWidth: 1,
  },
  TextLabel: {
    fontSise: 14,
    color: '#409CF9',
    marginTop: 20,
  },
  PickerStyle: {
    height: 30,
    color: '#409CF9',
  },
  next: {
    position: 'absolute',
    width: 500,
    left: '80%',
    bottom: 10,
    backgroundColor: '#fff',
  },
});
