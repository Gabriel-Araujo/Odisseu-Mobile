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

  configureScene(route, routeStack) {
    if(route.type == 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom
    }
    return Navigator.SceneConfigs.PushFromRight
  }

  renderScene(route, navigator) {
		return <route.component navigator={navigator} {...route.passProps} />

    //return React.createElement(route.component, { ...this.props, ...route.passProps, route, navigator } )
  }

  render() {
    return (
      <Navigator
    		style={ styles.container }
        configureScene={ this.configureScene }
    		renderScene={ this.renderScene }
    		initialRoute={{ component: IntroScreen }}
        navigationBar={
             <Navigator.NavigationBar
               style={ styles.nav }
               routeMapper={NavigationBarRouteMapper} />}
  		/>
    );
  }

}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
        	 underlayColor="transparent"
           onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>
  	)}
  	else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if (route.onPress) return ( <TouchableHighlight
    														onPress={ () => route.onPress() }>
                                <Text style={ styles.rightNavButtonText }>
                                  	{ route.rightText || 'Right Button' }
                                </Text>
                              </TouchableHighlight> )
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>MY APP TITLE</Text>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
  	height: 60,
    backgroundColor: '#efefef'
  },
});

AppRegistry.registerComponent('OdisseuMobile', () => OdisseuMobile);
