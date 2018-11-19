import React, { Component } from 'react'
import axios from 'axios'
import { ScrollView, Text, KeyboardAvoidingView, View, ListView, TextInput, StatusBar, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import Spinner from '../Components/Spinner'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import firebase from 'firebase'
import { userVehicleCreateRequest, userVehiclePhotoUploadRequest } from '../Actions/vehicle-actions';
import { Images } from '../Themes'
import AddVehicleButton from './Styles/AddVehicleButton';
import DatePicker from 'react-native-datepicker'


let data = []

export default class MaintHistory extends Component {

    constructor(props) {
        super(props);
    
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    
        this.state = {
          listViewData: data,
          newNote: "",
         
        }
    
      }
    
      componentDidMount() {
    
      
        var that = this
    
        firebase.database().ref('users/notes').on('child_added', function (data) {
    
          var newData = [...that.state.listViewData]
          newData.push(data)
          that.setState({ listViewData: newData })
    
        })
    
      }
    
      addRow(data) {
    
        var key = firebase.database().ref('users/notes').push().key
        firebase.database().ref('users/notes').child(key).set({ name: data })
      }
    
      async deleteRow(secId, rowId, rowMap, data) {
    
        await firebase.database().ref('notes/' + data.key).set(null)
    
        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1)
        this.setState({ listViewData: newData });
    
      }
    
      showInformation() {
    
      }
    
      render() {
        return (
          <Container >
            <Header style={{backgroundColor: 'white'}}>
              <Content>
                <Item>
                  <Input
                    onChangeText={(newNote) => this.setState({ newNote })}
                    placeholder="Add Note"
                  />
                  <Button onPress={() => this.addRow(this.state.newNote)}>
                    <Icon name="add" />
                  </Button>
                </Item>
              </Content>
            </Header>
    
            <Content>
              <List
                enableEmptySections
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                renderRow={data =>
                  <ListItem>
                    <Text> {data.val().name}</Text>
                  </ListItem>
                }
                renderLeftHiddenRow={data =>
                  <Button full onPress={() => alert(data.val().name)} >
                    <Icon name="information-circle" />
                  </Button>
                }
                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                  <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                    <Icon name="trash" />
                  </Button>
    
                }
    
                leftOpenValue={-75}
                rightOpenValue={-75}
    
              />
    
            </Content>
          </Container>
        );
      }
   
}



