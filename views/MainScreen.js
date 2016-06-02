'use strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import SedesListScreen from './SedesListScreen';

var REQUEST_API_SEDES = 'http://localhost:4000/api/sedes';

export default class MainScreen extends React.Component {

  constructor(props){
    super(props);
  }

  onSedesButtonPress() {
    this.props.navigator.push({
      component: SedesListScreen,
      title: 'Sedes'
    });
  }

  //
  render(){
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} underlayColor="#FFF6E5" onPress={() => this.onSedesButtonPress()} >
          <View>
            <Text>Icon name="rocket" color="#900"</Text>
            <Text style={{color: 'white'}}>Sedes Nova Acrópole Brasil</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF6E5', //E4FFDB
    margin: 1,
    padding: 7,
  },
  button: {
    margin: 3,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#0F5641',
  },
});
