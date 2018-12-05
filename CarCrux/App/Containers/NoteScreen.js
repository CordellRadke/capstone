import React, { Component } from 'react'
import axios from 'axios'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title, Toast, Spinner } from 'native-base';
// import Spinner from '../Components/Spinner'

import firebase from 'firebase'
import { userNoteCreateRequest, userVehiclePhotoUploadRequest } from '../Actions/note-actions';
import { Images } from '../Themes'

import styles from './Styles/VehicleCreateScreenStyle'
import NoteDatePicker from '../Components/noteDate';

class NoteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //noteTitle: '', 
            noteDate: '', 
            //noteText: '', 
            loading: false,
        }
        this.datePicked = this.datePicked.bind(this);
        this.submitNoteInformation = this.submitNoteInformation.bind(this);
    }

    componentDidUpdate() {
        console.log('NoteScreen did update', this.state)
    }
    componentDidMount() {
        console.log('NoteScreen', this.state)
    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 

    datePicked(date) {
        this.setState({ noteDate: date}, function () {
            console.log(this.state, 'Updated Date')
        });

    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    // makePicked(make) {
    //     this.setState({ vehicleMake: make, vehicleModel: '', vehicleTrim: '', }, function () {
    //         console.log(this.state, 'Updated Make')
    //     });
    // }

    // // Updates this containers/screens state from the static component user input
    // // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // // So we need to reset all choices after, just in case. 
    // modelPicked(model) {
    //     this.setState({ vehicleModel: model, vehicleTrim: '' }, function () {
    //         console.log(this.state, 'Updated Model')
    //     });
    // }

    // // Updates this containers/screens state from the static component user input
    // // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // // So we need to reset all choices after, just in case. 
    // trimPicked(trim) {
    //     this.setState({ vehicleTrim: trim }, function () {
    //         console.log(this.state, 'Updated Trim')
    //     });
    // }

    // photoPicked(photo) {
    //     // [...this.state.photoPool, source]
    //     console.log(photo)
    //     this.setState({ vehiclePhoto: [...this.state.vehiclePhoto, photo] }, function () {
    //         console.log(this.state, 'Updated Photo')
    //     });
    // }

    // specificPhotoDelete(photo) {
    //     let filteredArray = this.state.vehiclePhoto.filter(ele => ele.uri !== photo.uri)
    //     console.log(filteredArray)
    //     this.setState({ vehiclePhoto: filteredArray })
    // }

    submitNoteInformation() {
        console.log(this.props, 'NOTE%%%%ADDED%%%%%%%%', this.state.noteDate)

              
                this.props.userNoteCreateRequest(this.state.noteDate, this.props.user.account);
                
                    this.setState({ loading: false }, function () {

                    });
                    this.props.navigation.navigate('HomeScreen');

        Toast.show({
            text: 'We stored your note in your History tab!',
            position: 'bottom',
            buttonText: 'Sounds Good',
            duration: 3000,
        })
        this.props.navigation.navigate('HomeScreen')
    }

    handleChange(text) {
        console.log(text)
    }

    render() {
        // Here we dynamically render each option for vehicle values after they have chosen
        // So first is YEAR > then we hide year and show MAKE > then we hide make and show MODEL, etc
        // All based on component did mount's API calls from the respective component
        return (
            <View>
                <ScrollView>
                    <Header style={styles.headerTitle} >
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title><Text>ADD NOTE</Text></Title>
                        </Body>
                    </Header>
                    <Container style={styles.Container}>

                        <View>
                            <Text>Note Details:</Text>
                            <Text onPress={() => this.datePicked('')} >Date: {this.state.noteDate}</Text>
                         
                           
                        </View>
                        <Content>


                            {/* These next conditionals dynamically show based on completion of full vehicle information  */}
                            {!this.state.noteDate && <NoteDatePicker noteDate={this.datePicked} homeState={this.state} /> }

                            


                            {this.state.noteDate !== '' && <Button style={{backgroundColor: 'green'}}block onPress={this.submitNoteInformation}>
                               <Text style={{fontSize: 20,color: 'white'}}>Save Note</Text>
                            </Button> }

                            {/*this.state.loading && <Spinner color='blue' /> */}
                        </Content>
                    </Container>
                </ScrollView>
            </View >

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
        userNoteCreateRequest: (note, user) => dispatch(userNoteCreateRequest(note, user)),
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteScreen)