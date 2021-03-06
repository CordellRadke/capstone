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

import firebase from 'firebase'
import { userVehicleCreateRequest, userVehiclePhotoUploadRequest } from '../Actions/vehicle-actions';
import { Images } from '../Themes'

import styles from './Styles/VehicleCreateScreenStyle'

class VehicleCreateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleYear: '', 
            vehicleMake: '', 
            vehicleModel: '', 
            vehicleTrim: '', 
            vehiclePhoto: [], 
            loading: false,
        }
        this.yearPicked = this.yearPicked.bind(this);
        this.makePicked = this.makePicked.bind(this);
        this.modelPicked = this.modelPicked.bind(this);
        this.trimPicked = this.trimPicked.bind(this);
        this.photoPicked = this.photoPicked.bind(this);
        this.submitPhoto = this.submitPhoto.bind(this);
        this.specificPhotoDelete = this.specificPhotoDelete.bind(this)
        this.submitVehicleInformation = this.submitVehicleInformation.bind(this);
    }

    componentDidUpdate() {
        console.log('VehicleCreateScreen did update', this.state)
    }
    componentDidMount() {
        console.log('vehicleCreateScreen', this.state)
    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 

    yearPicked(year) {
        this.setState({ vehicleYear: year, vehicleMake: '', vehicleModel: '', vehicleTrim: '', }, function () {
            console.log(this.state, 'Updated year')
        });

    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    makePicked(make) {
        this.setState({ vehicleMake: make, vehicleModel: '', vehicleTrim: '', }, function () {
            console.log(this.state, 'Updated Make')
        });
    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    modelPicked(model) {
        this.setState({ vehicleModel: model, vehicleTrim: '' }, function () {
            console.log(this.state, 'Updated Model')
        });
    }

    // Updates this containers/screens state from the static component user input
    // We allow the user to quickly click a stat on their vehicle to edit in case they mispressed. 
    // So we need to reset all choices after, just in case. 
    trimPicked(trim) {
        this.setState({ vehicleTrim: trim }, function () {
            console.log(this.state, 'Updated Trim')
        });
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


        //Here we fetch one last call with the selected trim.id to get an exact model. 

        axios.get(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel&model=` + `${this.state.vehicleTrim.id}` + `&sold_in_us=1`)
            .then((response) => {
                finalChoice = JSON.parse(response.data.slice(2, (response.data.length - 2)))
                console.log(finalChoice, 'FINAL CHOICCCEEEE')
                this.setState({ loading: true }, function () {

                })

                this.props.userVehicleCreateRequest(finalChoice, this.props.user.account)
                this.props.userVehiclePhotoUploadRequest(this.state.vehiclePhoto, this.props.user, this.state.vehicleYear).then(() => {
                    this.setState({ loading: false }, function () {

                    })
                    this.props.navigation.navigate('HomeScreen')

                })
            })
            .catch(function (error) {
                console.log(error);
            });



        Toast.show({
            text: 'We stored your ' + this.state.vehicleYear + ' ' + this.state.vehicleModel + ' in your Garage!',
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
                            <Title><Text>ADD VEHICLE</Text></Title>
                        </Body>
                    </Header>
                    <Container style={styles.Container}>

                        <View>
                            <Text style={styles.specsHeader}>Vehicle Specs:</Text>
                            <Text style={styles.specsInput} onPress={() => this.yearPicked('')} >Year: {this.state.vehicleYear}</Text>
                            <Text style={styles.specsInput} onPress={() => this.makePicked('')}>Make: {this.state.vehicleMake}</Text>
                            <Text style={styles.specsInput} onPress={() => this.modelPicked('')}>Model: {this.state.vehicleModel}</Text>
                            <Text style={styles.specsInput} onPress={() => this.trimPicked('')}>Trim: {this.state.vehicleTrim.name}</Text>
                            {/* Here we display all photos they uploaded */}
                            {/* TODO if they click a photo it will remove it  */}
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
                        </View>
                        <Content>
{/* Here we offer photo upload if they want.. */}
                            {!!this.state.vehicleMake && !!this.state.vehicleYear && !!this.state.vehicleModel && !!this.state.vehicleTrim && this.state.vehiclePhoto.length === 0 ? <VehiclePhotoPicker buttonText={'Are you sure you do not want to add a Photo?'} homeState={this.state} user={this.props.user} vehiclePhoto={this.photoPicked} /> : <VehiclePhotoPicker buttonText={'Upload Photo of Vehicle?'} homeState={this.state} user={this.props.user} vehiclePhoto={this.photoPicked} />}

                            {/* These next conditionals dynamically show based on completion of full vehicle information  */}
                            {!this.state.vehicleYear && <VehicleYearPicker vehicleYear={this.yearPicked} /> }

                            {!!this.state.vehicleYear && !this.state.vehicleMake && <VehicleMakePicker pickedYear={this.state.vehicleYear} vehicleMake={this.makePicked} /> }

                            {!this.state.vehicleModel && !!this.state.vehicleMake && <VehicleModelPicker homeState={this.state} vehicleModel={this.modelPicked} /> }

                            {!!this.state.vehicleModel && !!this.state.vehicleMake && this.state.vehicleTrim === '' && <VehicleTrimPicker homeState={this.state} vehicleTrim={this.trimPicked} /> }


                            



                            {/* If they don't upload photo change button text  */}
                            {this.state.vehicleMake !== '' && this.state.vehicleYear !== '' && this.state.vehicleModel !== '' && this.state.vehicleTrim !== '' && <Button style={{backgroundColor: 'green'}}block onPress={this.submitVehicleInformation}>
                                {this.state.vehiclePhoto !== '' ? <Text style={{fontSize: 20,color: 'white'}}>Save Vehicle</Text> : <Text>Not now, Save Vehicle</Text>}
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
        userVehicleCreateRequest: (vehicle, user) => dispatch(userVehicleCreateRequest(vehicle, user)),
        userVehiclePhotoUploadRequest: (photos, user, year) => dispatch(userVehiclePhotoUploadRequest(photos, user, year))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleCreateScreen)

