import React, { Component } from 'react';
import Spinner from './Spinner'
import { Alert, Image, ScrollView, View, ListView, Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Title, Icon, List, ListItem, Right, Left, Button, Thumbnail, Body} from 'native-base';
import { Images } from '../Themes'
import AddVehicleButton from './Styles/AddVehicleButton';
import NoteStyle from './Styles/NoteStyle';
import Styles from './Styles/InputStyle';
import HeaderStyle from './Styles/HeaderStyle';



export default class MaintHistory extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
        
            loading: true,  
            user: {},
           
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        // ********** This will always be undefined the first time this component mounts. 
        // However the Second time, props will already be loaded from the store **********
        {
            this.props.props ? this.setState({ user: this.props.props, loading: false }, function () {
            }) : undefined
        }
    }


    componentWillReceiveProps(nextProps) {
        // ******* When this component mounts the first time the firebase actions aren't complete and there isn't any user info
        // ******* When Firebase returns promise we will assign the database user to this.state.user
        // ******* We have to render everything in this component from this.state.user to avoid async errors

        this.setState({ user: nextProps.props, loading: false }, function () {
        });
    }

    handleDelete(note, index) {

      
            this.setState({ loading: true }, function () {
                this.props.deleteNoteRequest(this.state.user, note, index)
                this.setState({ loading: false }, function () {
        
                })
        
             })
       
    }



    render() {
     
        
        return (
            // ******* The first if, renders loading spinner if firebase promise isn't returned yet.
            // ******* The second if, checks to make sure the user returned from firebase has vehicles.
          
            <View style={{flex: 1}}>

                <Container>
                    {this.state.loading ? <Spinner /> :
                        <Container>
                            {this.state.user.allNotes ?
                                <ScrollView>
                                    {this.props.props.allNotes.allNotesArray.map((ele, key) => {
                            return (
                                                                    
                                <List style={{ flex: 0 }} key={key}>
                            
                                    <ListItem>
                                
                                        <Left>
                                    
                                            <Body>
                                                
                                                <Text note style={{color: 'black', fontWeight: 'bold'}}>{ele.noteTitle}</Text>
                                                <Text note>{ele.noteDate}</Text>
                                                
                                            </Body>
                                        </Left>
                                        
                                            <Button transparent onPress={() => this.props.navigation.navigate('NoteDetailsScreen', { note: ele })} textStyle={{ color: '#87838B' }}>
                                               
                                                <Text>VIEW</Text>
                                            </Button>
                                    
                                            <Button transparent 
                                                title="Delete Note" 
                                                onPress={() => Alert.alert(
                                                    'Delete Note',
                                                    'Are you sure you want to delete this note from your history?',
                                                
                                                    [

                                                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                                                        {text: 'Delete', onPress: () => this.handleDelete(ele, this.props.props.allNotes.allNotesArray.indexOf(ele))}


                                                    ],
                                                    { cancelable: true }
                                                )}
                                            >
                                                <Icon name="trash" />
                                                
                                                
                                        </Button>
                                      
                                    
                                    </ListItem>
                                  
                                   
                                </List>
                            
                            
                            )


                            }) }
                            
                            </ScrollView>
                            :
                            <Container>
                            <Content style={{ padding: 50}}>
                            <Text style={{fontSize:20, textAlign: 'center', marginTop: 200}}>Add Note</Text>
                            <Button style={AddVehicleButton.addVehicleButton} transparent onPress={() => this.props.navigation.navigate('NoteScreen')} >
                                <Icon style={{ fontSize:100  }} type="FontAwesome" name='plus-circle' />
                            </Button>

                            </Content>
                            </Container>
                            }
                            </Container>}
                            </Container>
            </View >
         );
                                     
                                      
    }
}




