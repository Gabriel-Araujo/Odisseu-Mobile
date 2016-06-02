import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  AsyncStorage,
  StyleSheet,
  Navigator,
  StatusBar,
  Image,
  Alert,
  Text,
  View
} from 'react-native';
import IntroScreen from './views/IntroScreen';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

var STORAGE_NEAR_SEDE_KEY = 'Odisseu.NearSedeID';
var REQUEST_API_SEDES = 'http://localhost:4000/api/sedes/';
var REQUEST_API_SEARCH_SEDES = 'http://localhost:4000/api/searchSedes/';

class OdisseuMobile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nearSedeID: "0",
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    AsyncStorage.getItem(STORAGE_NEAR_SEDE_KEY).then((value) => {
        this.setState({
          nearSedeID: value
        });
    }).done();
  }

  renderScene(route, navigator) {
		return <route.component navigator={navigator} {...route.passProps} />

    //return React.createElement(route.component, { ...this.props, ...route.passProps, route, navigator } )
  }

  render() {
    return (
      <Navigator
  		style={ styles.container }
  		renderScene={ this.renderScene }
  		initialRoute={{ component: IntroScreen }}
  		/>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('OdisseuMobile', () => OdisseuMobile);
