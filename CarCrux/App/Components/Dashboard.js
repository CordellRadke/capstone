import React, { Component } from 'react';
import Spinner from './Spinner'
import { Image, ScrollView, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Button, Thumbnail, Body } from 'native-base';
import { Images } from '../Themes'
import AddVehicleButton from './Styles/AddVehicleButton';
import Styles from './Styles/InputStyle'
const backgroundImage = require("../Images/Dash-Icon.png");


export default class Dashboard extends Component {
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

            <View style={{flex: 1}}>

                <Container>
                    {this.state.loading ? <Spinner /> :
                        <Container>
                            {this.state.user.allVehicles ?
                                <ScrollView>
                                    {this.props.props.allVehicles.allVehiclesArray.map((ele, key) => {

                                        let dynamicAvatar = Images.background;
                                        { ele.photosReference !== undefined ? dynamicAvatar = { uri: `${ele.photosReference.referenceToUploadedPhotos[0]}` } : undefined }
                                        return (
                                            <Card style={{ flex: 0 }} key={key}>
                                                <CardItem>
                                                    <Left>

                                                        <Thumbnail source={dynamicAvatar}  />
                                                        <Body>
                                                            <Text>{ele.model_year + ' ' + ele.make_display + ' ' + ele.model_name}</Text>
                                                            <Text note>{ele.model_trim}</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>
                                                <CardItem cardBody>
                                                    <Image source={dynamicAvatar} style={{ height: 200, width: null, flex: 1 }} />
                                                </CardItem>

                                                <CardItem>
                                                    <Body>
                                                        {/* //I have no idea why transmission is white/why this works.. but it does... */}
                                                        <Text>

                                                            Transmission:   {ele.model_transmission_type === undefined ? 'Automatic' : ele.model_transmission_type}
                                                        </Text>
                                                        <Text>
                                                            {`Horsepower: ` + ele.model_engine_power_hp}
                                                        </Text>

                                                    </Body>
                                                </CardItem>
                                                <CardItem>
                                                    <Right>
                                                        <Button transparent onPress={() => this.props.navigation.navigate('YouTubeScreen', { vehicle: ele })} textStyle={{ color: '#87838B' }}>
                                                            <Icon style={Styles.iconWrenchStyle} name="build" />
                                                            <Text style={Styles.fixItButton}>Fix it Now!</Text>
                                                        </Button>
                                                    </Right>

                                                    
                                                </CardItem>
                                            </Card>
                                        )
                                    })}
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
            </View >
        );
    }
}