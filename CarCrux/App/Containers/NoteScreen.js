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
import NoteTitlePicker from '../Components/noteTitle';
import NoteTextPicker from '../Components/noteText';



class NoteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            noteDate: '', 
            noteTitle: '', 
            noteText: '',
            loading: false,
            
        }
        this.datePicked = this.datePicked.bind(this);
        this.titlePicked = this.titlePicked.bind(this);
        this.textPicked = this.textPicked.bind(this);
        this.submitNoteInformation = this.submitNoteInformation.bind(this);
    }

    componentDidUpdate() {
        console.log('NoteScreen did update', this.state)
    }
    componentDidMount() {
        console.log('NoteScreen', this.state)
    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their note to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 

    datePicked(date) {
        this.setState({ noteDate: date, noteTitle: '', noteText: ''}, function () {
            console.log(this.state, 'Updated Date')
        });

    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their note to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    titlePicked(title) {
        this.setState({ noteTitle: title}, function () {
            console.log(this.state, 'Updated Title')
        });
    }

    // // Updates this containers/screens state from the static component user input
    // // We allow the user to quickly click a stat on their note to edit in case they mispressed. 
    // // So we need to reset all choices after, just in case. 
    textPicked(text) {
        this.setState({ noteText: text}, function () {
            console.log(this.state, 'Updated Text')
        });
    }

   
    submitNoteInformation() {

        let noteDetail = 
            {
            noteDate: this.state.noteDate,
            noteTitle: this.state.noteTitle,
            noteText: this.state.noteText,

            };
        

        console.log(this.props, 'NOTE%%%%ADDED%%%%%%%%', noteDetail)

              
                this.props.userNoteCreateRequest(noteDetail, this.props.user.account);
                
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
        // Here we dynamically render each option for note values after they have chosen
        // So first is Date > then we hide year and show Title > then we hide make and show Text, etc.

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
                            <Text onPress={() => this.titlePicked('')} >Title: {this.state.noteTitle}</Text>
                            <Text onPress={() => this.textPicked('')} >Text: {this.state.noteText}</Text>
                         
                           
                        </View>
                        <Content>


                            {/* These next conditionals dynamically show based on completion of full vehicle information  */}
                            {!this.state.noteDate && <NoteDatePicker noteDate={this.datePicked} /> }
                            {!!this.state.noteDate && !this.state.noteTitle &&<NoteTitlePicker noteTitle={this.titlePicked} /> }
                            {!!this.state.noteDate && !!this.state.noteTitle && !this.state.noteText &&<NoteTextPicker noteText={this.textPicked} homeState={this.state} /> }


                            {this.state.noteDate !== '' && this.state.noteTitle !== '' && this.state.noteText !=='' &&<Button style={{backgroundColor: 'green'}}block onPress={this.submitNoteInformation}>
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