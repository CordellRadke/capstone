import React, { Component } from 'react'
import axios from 'axios'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image, TouchableHighlight, WebView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title, Toast, Card, CardItem, Thumbnail } from 'native-base';
import Spinner from '../Components/Spinner'
// import Search from 'youtube-search'
import YTSearch from 'youtube-api-search';
import firebase from 'firebase'
import { userVehicleCreateRequest, userVehiclePhotoUploadRequest } from '../Actions/vehicle-actions';
import { Images } from '../Themes'
import styles from './Styles/YouTubeScreenStyle'


// import styles from './Styles/VehicleCreateScreenStyle'

class YouTubeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: '', repairRequest: '', youtubeVideoResults: [], toggleToolsNeeded: false, toggleRepairVideo: false, toggleShowInstructions: false,
        }
        this.searchYoutube = this.searchYoutube.bind(this)
        this.showYoutubeVideo = this.showYoutubeVideo.bind(this)

    }

    componentDidUpdate() {
        console.log(this.state)


    }


    componentDidMount() {
        console.log('Repair Screen mounted', this.props.navigation.state.params.vehicle)
        this.setState({ vehicle: this.props.navigation.state.params.vehicle }, function () {
            console.log('Repair screen state after setting state', this.state)
        })
    }

    searchYoutube() {


        YTSearch({ key: 'AIzaSyBN5FEo6ZuxY5oPpkc585qSW6lEnvjyvlY', term: this.state.vehicle.model_year + ' ' + this.state.vehicle.make_display + ' ' + this.state.vehicle.model_name + ' ' + this.state.repairRequest }, result => {
            this.setState({ youtubeVideoResults: result }, function () {

                console.log('firing search youtube', this.state);
            })
        });

    }

    showYoutubeVideo(videoId) {
        this.setState({ videoId: videoId }, function () {
            console.log('updated chosen video', this.state)
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
                            <Title><Text>Tutorial Videos</Text></Title>
                        </Body>
                    </Header>
                    <ScrollView>
            
                {/*{this.state.vehicle.photosReference ?*/}
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>

                                {/*<Thumbnail source={{ uri: this.state.vehicle.photosReference.referenceToUploadedPhotos[0] }} />*/}
                                <Body>
                                    <Text>{this.state.vehicle.model_year + ' ' + this.state.vehicle.make_display + ' ' + this.state.vehicle.model_name}</Text>
                                    <Text note>{this.state.vehicle.model_trim}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            {/* <Image source={{ uri: this.state.vehicle.photosReference.referenceToUploadedPhotos[0] }} style={{ height: 200, width: null, flex: 1 }} /> */}
                        </CardItem>

                        <CardItem>
                            <Body>
                                {/* //I have no idea why transmission is white/why this works.. but it does... */}
                                <Text>

                                    Transmission:   {this.state.vehicle.model_transmission_type === undefined ? 'Automatic' : this.state.vehicle.model_transmission_type}
                                </Text>
                                <Text>
                                    {`Horsepower: ` + this.state.vehicle.model_engine_power_hp}
                                </Text>

                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Let's get started...</Text>
                                <Text>Tell me what you need to fix and I'll do the rest.</Text>

                            </Body>
                        </CardItem>
                        <CardItem>
                            <Item rounded>
                                <Input placeholder='Ex. "Oil Change"' onChangeText={repairRequest => this.setState({ repairRequest })} />
                            </Item>

                        </CardItem>

                        <Button style={styles.searchButtons} block onPress={this.searchYoutube}>
                            <Text style={styles.searchText}>Go</Text>
                        </Button>


                        {/* //Showed after initial repair request */}
                        {this.state.youtubeVideoResults.length > 1 ?
                            <Content>
                                <Text>Okay, heres what I found...</Text>
                                
                                <Button style={styles.searchButtons} block onPress={() => this.setState({ toggleRepairVideo: !this.state.toggleRepairVideo })}>
                                    <Text style={styles.searchText}>Show Repair Videos</Text>
                                </Button>
                                {/* //show video results on request */}
                                {this.state.toggleRepairVideo ?
                                    this.state.youtubeVideoResults.map(ele => {

                                        return <Content>
                                            <CardItem>
                                                <WebView
                                                    source={{ uri: `https://www.youtube.com/embed/${ele.id.videoId}` }}
                                                    style={{ marginBottom: 20, height: 200, width: null, flex: 1 }}
                                                />
                                            </CardItem>
                                        </Content>
                                    }) : undefined}

                                
                            </Content> : undefined}


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
export default connect(mapStateToProps, mapDispatchToProps)(YouTubeScreen)