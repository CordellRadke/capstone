import React, { Component } from 'react'
import axios from 'axios'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image, TouchableHighlight, WebView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title, Toast, Card, CardItem, Thumbnail } from 'native-base';
import Spinner from '../Components/Spinner'
import styles from './Styles/YouTubeScreenStyle'
import NoteDetailStyles from './Styles/NotesDetailsScreen'


// import styles from './Styles/VehicleCreateScreenStyle'

class NoteDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: ''
        }
     

    }

    componentDidUpdate() {
        console.log(this.state)


    }


    componentDidMount() {
        console.log('Note Detail Screen mounted', this.props.navigation.state.params.note)
        this.setState({ note: this.props.navigation.state.params.note }, function () {
            console.log('Note Detail screen state after setting state', this.state)
        })
    }

   

    render() {

        return (
            
        
                <View>
                    <Header style={styles.headerTitle} >
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title><Text>Note Details</Text></Title>
                        </Body>
                    </Header>
                    <ScrollView>
            
                
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>

                              
                                <Body>
                                   <Text>Mileage: {this.state.note.noteMileage}</Text>
                                   <Text>Recorded On: {this.state.note.noteDate}</Text>
                                    
                                    <Text style={NoteDetailStyles.noteTitle}>{this.state.note.noteTitle}</Text>
                                    <Text style={NoteDetailStyles.noteText}>{this.state.note.noteText}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                       
                    </Card> 

                </ScrollView>
            </View>
           


        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailsScreen)