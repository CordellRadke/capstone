import React, { Component } from 'react';
import Spinner from './Spinner'
import { Image, ScrollView, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Button, Thumbnail, Body } from 'native-base';
import { Images } from '../Themes'
import AddVehicleButton from './Styles/AddVehicleButton';
const backgroundImage = require("../Images/Dash-Icon.png");


export default class HomeOverview extends Component {
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

    handleDelete(vehicle, index) {
        this.setState({ loading: true }, function () {
            this.props.deleteVehicleRequest(this.state.user, vehicle, index)
            this.setState({ loading: false }, function () {

            })

        })
    }

    render() {

        return (
            // ******* The first if, renders loading spinner if firebase promise isn't returned yet.
            // ******* The second if, checks to make sure the user returned from firebase has vehicles.

            <ScrollView>

                <Container>
                    {this.state.loading ? <Spinner /> :
                        <Container>
                            {this.state.user.allVehicles ?
                                <ScrollView>
                                    {this.props.props.allVehicles.allVehiclesArray.map((ele, key) => {

                                        let dynamicAvatar = Images.background;
                                        { ele.photosReference !== undefined ? dynamicAvatar = { uri: `${ele.photosReference.referenceToUploadedPhotos[0]}` } : undefined }
                                        return (
                                            <Card style={{ flex: 0 }}>
                                                <CardItem>
                                                    <Left>

                                                        <Thumbnail source={dynamicAvatar} key={key}/>
                                                        <Body>
                                                            <Text>{ele.model_year + ' ' + ele.make_display + ' ' + ele.model_name}</Text>
                                                            <Text note>{ele.model_trim}</Text>
                                                        </Body>
                                                    </Left>
                                                    <Right>
                                                        <Button transparent onPress={() => this.handleDelete(ele, this.props.props.allVehicles.allVehiclesArray.indexOf(ele))} textStyle={{ color: '#87838B' }}>
                                                            <Icon name="close-circle" />
                                                            <Text>Delete</Text>
                                                        </Button>
                                                    </Right>
                                                </CardItem>
                                                
                                            </Card>
                                        )
                                    }) }
                                </ScrollView>
                                :
                                <Container>
                                    <Content style={{ padding: 50}}>
                                    <Text style={{fontSize:20, textAlign: 'center', marginTop: 200}}>Add Vehicle</Text>
                                        <Button style={AddVehicleButton.addVehicleButton} transparent onPress={() => this.props.navigation.navigate('VehicleCreateScreen')} >
                                            <Icon style={{ fontSize:100  }} type="FontAwesome" name='plus-circle' />
                                        </Button>
                                    
                                    </Content>
                                </Container>
                            }
                        </Container>}
                </Container>
            </ScrollView >
        );
    }
}