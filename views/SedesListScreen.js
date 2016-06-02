'use strict';

import React from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import ViewSedeScreen from './ViewSedeScreen';

var MOCKED_SEDES_DATA = [
  {"data":[{"url_ulisses":"http://www.acropole.org.br/brasil/sedes/ceara/fortaleza.html","url_maps":"https://www.google.com.br/maps/place/R.+Vicente+Leite,+2451+-+Aldeota,+Fortaleza+-+CE,+60170-151/@-3.749227,-38.499277,17z/data=!3m1!4b1!4m2!3m1!1s0x7c74896f2978afb:0xc77aab0bb8884c0e","url_instagram":"/","url_imagem":"http://www.acropolebrasil.com.br/ulisses/upload/images/topo_atual.jpg","url_facebook":"https://www.facebook.com/NA.Fortaleza","telefone":"(85) 3257-2777 / (85) 98212-8182","nome":"Fortaleza","localizacao_gps":"-3.7485627,-38.5006089","id":2,"estado":"Ceará","endereco":"R. Vicente Leite, 2451, Dionísio Torres","email":"fortaleza@acropole.org.br"},{"url_ulisses":"http://www.acropole.org.br/brasil/sedes/distritofederal/lagonorte.html","url_maps":"https://www.google.com/maps/place/Nova+Acr%C3%B3pole+de+Bras%C3%ADlia+-+Lago+Norte/data=!4m2!3m1!1s0x935a39a8ccc0eee5:0x88d8daedb3bdd5f8?gl=BR&hl=pt-BR","url_instagram":"http://instagram.com/acropolebrasilia","url_imagem":"http://www.acropolebrasil.com.br/ulisses/upload/images/topo_atual.jpg","url_facebook":"https://www.facebook.com/NABrasilia","telefone":"(61) 3468-5006 / (61) 8513-4179","nome":"Brasilia - Lago Norte","localizacao_gps":"-15.71357,-47.8896397","id":3,"estado":"Distrito Federal","endereco":"CA (Centro de Atividades) 09 lote 18, Lago Norte","email":"assessoria.acropole@gmail.com"},{"url_ulisses":"http://www.acropole.org.br/sedes/cuiaba.html","url_maps":"http://migre.me/iScUY","url_instagram":"https://www.instagram.com/novaacropolecuiaba","url_imagem":"http://www.acropolebrasil.com.br/ulisses/upload/images/topo_atual.jpg","url_facebook":"https://www.facebook.com/novaacropolecuiaba","telefone":"(65) 2129-9002 / 9919-1700","nome":"Cuiabá","localizacao_gps":"-15.581861,-56.0806837","id":1,"estado":"Mato Grosso","endereco":"Rua Mané Garrincha (ou Alta Floresta), n82, Bairro: Jardim Alvorada","email":"novaacropolecuiaba@gmail.com"}]}
];

var REQUEST_API_SEDES = 'http://localhost:4000/api/sedes';

export default class SedesListScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2,
      }),
      loaded: false,
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_API_SEDES)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
        });
      })
      .done();
  }

  render(){
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderSede.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderLoadingView(){
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  onRowPress(sede) {
    this.props.navigator.push({
      component: ViewSedeScreen,
      title: sede.nome,
      passProps: { sede: sede }
    });
  }

  renderSede(sede){
    return (
      <TouchableHighlight underlayColor="#FFFFFF" onPress={() => this.onRowPress(sede)} >
        <View style={styles.container}>
          <View style={styles.box}>
            <Image
              source={{uri: sede.url_imagem}}
              style={styles.picture}
            />
          </View>
          <View style={styles.rightContainers}>
            <Text style={styles.subTitulo}>{sede.estado}</Text>
            <Text style={styles.titulo}>{sede.nome}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
  rightContainers: {
    flex: 1,
    margin: 5,
  },
  listView: {
    paddingTop: 64,
    //margin: 10,
    backgroundColor: '#EDE6D5' //D7F5CE '#F5FCFF',
  },
  titulo: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  subTitulo: {
    textAlign: 'left'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  picture: {
    height: 60,
    width: 60,
    borderRadius: 10,
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
});
