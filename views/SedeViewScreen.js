'use strict';

import React from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  Linking,
  TouchableHighlight,
  View
} from 'react-native';

export default class OpenURLButton extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    url: React.PropTypes.string,
  };

  handleClick() {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }

  render() {
    return (
      <TouchableHighlight underlayColor="#FFF6E5"
        onPress={this.handleClick.bind(this)}>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.value}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class SedeViewScreen extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    url: React.PropTypes.string,
  };

  constructor(props){
    super(props);
  }

  handleOpenURL() {
    var url = this.props.sede.url_maps;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <View style={styles.card}>
            <TouchableHighlight underlayColor="#FFF6E5" onPress={this.handleOpenURL.bind(this)}>
              <Image
                resizeMode="contain"
                source={{uri: 'http://maps.googleapis.com/maps/api/staticmap?zoom=17&scale=2&size=640x400&markers=' + this.props.sede.localizacao_gps}}
                style={styles.pictureMap}
              />
            </TouchableHighlight>
            <View style={styles.containerBox}>
              <View style={styles.box}>
                <Image
                  source={{uri: this.props.sede.url_imagem}}
                  style={styles.picture}
                />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.subTitulo}>{this.props.sede.estado}</Text>
                <Text style={styles.titulo}>{this.props.sede.nome}</Text>
              </View>
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.subTitulo}>{this.props.sede.endereco}</Text>
              <Text style={styles.subTitulo}>{this.props.sede.telefone}</Text>
              <Text style={styles.subTitulo}>{this.props.sede.email}</Text>
              <OpenURLButton value='Site' url={this.props.sede.url_ulisses} />
              <Text style={styles.subTitulo}>{this.props.name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: '#EDE6D5',
      margin: 1,
      padding: 7,
    },
    containerBox: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 5,
      marginLeft: 5,
    },
    containerTitle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      marginTop: 5,
      marginLeft: 10,
      marginBottom: 10,
    },
    view: {
      flex: 1,
      paddingTop: 64,
    },
    card: {
      margin: 3,
      //borderRadius: 10,
      backgroundColor: '#FFF6E5',
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0
      }
    },
    box: {
      height: 60,
      width: 60,
      margin: 3,
      backgroundColor: "#000000",
      borderRadius: 10,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0
      }
    },
    pictureMap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      width: null,
      height: 221,
      //resizeMode: Image.resizeMode.contain,
    },
    picture: {
      height: 60,
      width: 60,
      borderRadius: 10,
    },
    titulo: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'left',
    },
    subTitulo: {
      textAlign: 'left'
    },
  });
