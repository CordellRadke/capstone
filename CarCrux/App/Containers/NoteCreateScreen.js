import React, { Component } from 'react'
import axios from 'axios'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title, Toast, Spinner } from 'native-base';
// import Spinner from '../Components/Spinner'
import VehicleYearPicker from '../Components/vehicleYearPicker'
import VehicleMakePicker from '../Components/vehicleMakePicker'
import VehicleModelPicker from '../Components/vehicleModelPicker'
import VehicleTrimPicker from '../Components/vehicleTrimPicker'
import VehiclePhotoPicker from '../Components/vehiclePhotoPicker'
import DatePicker from 'react-native-datepicker'
import firebase from 'firebase'
import { userVehicleCreateRequest, userVehiclePhotoUploadRequest } from '../Actions/vehicle-actions';
import { Images } from '../Themes'

import styles from './Styles/VehicleCreateScreenStyle'

class NoteCreateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', 
            mileage: '', 
            date: '', 
            saleTax: '', 
            labor: '',
            other: '',
            comment: '',
            vehiclePhoto: [], 
            loading: false,
        }
       
        this.photoPicked = this.photoPicked.bind(this);
        this.submitPhoto = this.submitPhoto.bind(this);
        this.specificPhotoDelete = this.specificPhotoDelete.bind(this)
        this.submitVehicleInformation = this.submitVehicleInformation.bind(this);
    }

    componentDidUpdate() {
        console.log('NoteCreateScreen did update', this.state)
    }
    componentDidMount() {
        console.log('NoteCreateScreen', this.state)
    }

   
    photoPicked(photo) {
        // [...this.state.photoPool, source]
        console.log(photo)
        this.setState({ vehiclePhoto: [...this.state.vehiclePhoto, photo] }, function () {
            console.log(this.state, 'Updated Photo')
        });
    }

    specificPhotoDelete(photo) {
        let filteredArray = this.state.vehiclePhoto.filter(ele => ele.uri !== photo.uri)
        console.log(filteredArray)
        this.setState({ vehiclePhoto: filteredArray })
    }

    submitVehicleInformation() {
        console.log(this.props, '%%%%%%%%%%%%%%%%%%%')
        let finalChoice;


        Toast.show({
            text: 'We stored your note titled ' + this.state.title  +'! You can edit this later.',
            position: 'bottom',
            buttonText: 'Sounds Good',
            duration: 3000,
        })
        this.props.navigation.navigate('HomeScreen')
    }

    submitPhoto() {
        console.log('YOLOOOOOOOOOOOO')
        this.props.userVehiclePhotoUploadRequest(this.state.vehiclePhoto, this.props.user)

    }

    handleChange(text) {
        console.log(text)
    }

    render() {
       
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
                  
                            <Text>New Note:</Text>
                            
                            <TextInput placeholder="Title"></TextInput>
                            <TextInput placeholder="Today's Mileage"></TextInput>
                            <DatePicker
                                style={{width: 200}}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2018-01-01"
                                maxDate="2020-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                            <TextInput placeholder="$$$ Sales Tax"></TextInput>
                            <TextInput placeholder="$$$ Labor"></TextInput>
                            <TextInput placeholder="$$$ Other"></TextInput>
                            
                            <TextInput
                                placeholder="Comment e.g. Brake pads replaced"
                                multiline = {true}
                                numberOfLines = {4}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                            />
                            
                            
                            
                            {this.state.vehiclePhoto.length > 0 && this.state.vehiclePhoto.map((ele, key) => {

                                return <TouchableHighlight onPress={() => this.specificPhotoDelete(ele)} key={key}>
                                    <View>
                                        <Image
                                            style={{ width: 50, height: 50 }}
                                            source={{ uri: `${ele.uri}` }}
                                        />
                                        <Icon name="close" />
                                    </View>
                                </TouchableHighlight>

                            }) }
                       
                        <Content>
                            <VehiclePhotoPicker buttonText={'Upload Photo of Note?'} homeState={this.state} user={this.props.user} vehiclePhoto={this.photoPicked} />
                            <Button style={{backgroundColor: 'green'}}block onPress={this.submitNoteInformation}>
                                {this.state.vehiclePhoto !== '' ? <Text style={{fontSize: 20,color: 'white'}}>Save Note</Text> : <Text>Not now, Save Vehicle</Text>}
                            </Button> 
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
        userVehiclePhotoUploadRequest: (photos, user, year) => dispatch(userVehiclePhotoUploadRequest(photos, user, year))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreateScreen)

