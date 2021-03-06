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
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SedesListScreen from './SedesListScreen';
import SedeViewScreen from './SedeViewScreen';

var STORAGE_NEAR_SEDE_KEY = 'Odisseu.NearSedeID';
var REQUEST_API_SEDES = 'http://localhost:4000/api/sedes/';
var REQUEST_API_SEARCH_SEDES = 'http://localhost:4000/api/searchSedes/';

export default class OdisseuMobile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nearSedeID: "0",
      nearSede: [],
      locDevice: "0,0",
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    this.checkLocalStorage();
    this.checkCurrentPosition();
  }

  checkCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position.coords;
        this.setState({
          locDevice: initialPosition,
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  checkLocalStorage() {
    AsyncStorage.getItem(STORAGE_NEAR_SEDE_KEY).then((value) => {
      this.setState({
        nearSedeID: value
      });
    }).done();
  }

  fetchData(url) {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          nearSede: responseData.data
        });
      })
      .done();
  }

  onSedesButtonPress() {
    if(this.state.nearSede.id > 0){
      this.navigate(this.state.nearSede);
    } else {
      let sedeID = parseInt(this.state.nearSedeID);
      if(sedeID > 0) {
        this.fetchData(REQUEST_API_SEDES + sedeID);
      } else {
        this.fetchData(REQUEST_API_SEARCH_SEDES + this.state.locDevice.longitude + "," + this.state.locDevice.latitude);
        AsyncStorage.setItem(STORAGE_NEAR_SEDE_KEY, JSON.stringify(this.state.nearSede.id));
        this.setState({
          nearSedeID: this.state.nearSede.id,
        });
      }
    }
  }

  navigate(sede, type='Normal') {
    let name = this.state.nearSedeID;
  	this.props.navigator.push({
    	component: SedeViewScreen,
      passProps: {
        sede: sede,
        name: name,
      },
      type: type
    });
  }

  // http://localhost:4000/api/searchSedes/-15.581861,-56.0806837

  // <Text><Icon name="rocket" color="#900"/></Text>
  render() {
    return (
      <Swiper style={styles.wrapper}
        loop={false}
        showsButtons={true}
        dot={<View style={{backgroundColor:'rgba(255,255,255,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        activeDot={<View style={{backgroundColor: '#FFFFCC', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
        >
        <View style={styles.slide1}>
          <Image source={require('../images/bgSanzio-1.jpg')} style={styles.container} >
            <View style={styles.panel}>
              <Image source={require('../images/marcaNA.png')} style={styles.marca}/>
            </View>
            <View style={styles.panel}>
              <View style={{height:13}}/>
              <Text style={styles.sobreNA}>
                Nova Acrópole é uma organização internacional voltada às grandes causas da humanidade. Promove um resgate do melhor das culturas clássicas, unindo-as aos conhecimentos de ponta da área humanística, também propõe a aplicação prática destas ideias para que possamos ser homens novos e melhores, capazes de construir um mundo novo e melhor.
              </Text>
              <View style={{height:23}}/>
              <Text style={styles.sobreNA}>
                "Somos filósofos idealistas construindo um mundo melhor"
              </Text>
            </View>
          </Image>
        </View>
        <View style={styles.slide2}>
          <Image source={require('../images/bgSanzio-2.jpg')} style={styles.container} >
            <View style={styles.panel}>
              <Image source={require('../images/selo.png')} style={styles.selo}/>
            </View>
            <View style={styles.panel}>
              <View style={{height:100}}/>
              <Text style={styles.sobreNA}>
                Este é nosso programa de estudos voltado para adultos, e abarca os mais importantes sistemas de pensamento do Oriente e do Ocidente, com seus enfoques práticos, para que se aprenda a utilizar seu potencial de forma útil e eficaz.
              </Text>
            </View>
          </Image>
        </View>
        <View style={styles.slide3}>
          <Image source={require('../images/bgSanzio-3.jpg')} style={styles.container} >
            <View style={styles.panel}>
              <Image source={require('../images/phone-icon.png')} style={styles.phone}/>
            </View>
            <View style={styles.panel}>
              <View style={{height:80}}/>
              <Text style={styles.sobreNA}>
                Com o aplicativo será possivel conhecer todas as nossas sedes e seus eventos abertos para inscrição.
                {this.state.nearSedeID}
                {this.state.nearSede.id}
              </Text>
              <View style={{height:80}}/>
              <TouchableHighlight style={styles.button} underlayColor="#FFF6E5" onPress={() => this.onSedesButtonPress()} >
                <View>
                  <Text style={styles.sobreNA}><Icon name="paper-plane"/>   Encontrar a sede mais próxima</Text>
                </View>
              </TouchableHighlight>
            </View>
          </Image>
        </View>
      </Swiper>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  sobreNA: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    margin: 3,
    padding: 1,
    borderRadius: 40,
    backgroundColor: '#0F5641',
  },
  buttonText: {
    fontSize: 50,
    color: '#FFFFCC',
  },
  marca: {
    width: 229,
    height: 150,
  },
  selo: {
    width: 229,
    height: 200,
  },
  phone: {
    width: 164,
    height: 164,
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#000000',
  },
  panel: {
    width: 310,
    paddingTop: 25,
    paddingBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#000000',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#000000',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
