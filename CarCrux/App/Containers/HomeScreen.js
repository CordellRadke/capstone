import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Item, Left, Body, Right, Button, Icon, Title, Drawer, Footer, FooterTab, Card, CardItem } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import HomeOverview from '../Components/HomeOverview'
import { deleteVehicleRequest } from '../Actions/vehicle-actions'



import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, dashActive: false, historyActive: false, NewEventActive: false, OverviewActive: false, headerTitle: 'My Vehicles', user: {}
    }
    this.openDrawer = this.openDrawer.bind(this);
  }

  componentDidUpdate() {
    const { navigate } = this.props.navigation
  }

  componentDidMount() {
    this.setState({ OverviewActive: true })
    // this.state.user.length === 0 ? this.state.loading === true : this.state.loading === false
  }
  componentWillReceiveProps(nextProps) {
    this.state.user.length === 0 ? this.setState({ user: nextProps.user, loading: true }) : undefined

  }



  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  setMenuRef = ref => {
    this.menu = ref;
  };


  setMenuRef = ref => {
    this.menu = ref;
  };

  menu = null;

  hideMenu = () => {
    this.menu.hide();
  };

  showMenu = () => {
    this.menu.show();
  };

  // *************** These the the three bottons on the bottom nav.

  onDashboardPress() {
    this.setState({ dashActive: true, historyActive: false, OverviewActive: false, NewEventActive: false, headerTitle: 'History' }, function () {
      // do something with new state
    });
    // this.setState = ({ dashActive: true })
  }

  onHistoryPress() {
    this.setState({ historyActive: false, OverviewActive: false, NewEventActive: false, headerTitle: 'History' }, function () {
      // do something with new state
    });
    // this.setState = ({ historyActive: true })
  }

  onNewEventPress() {
    this.setState({ historyActive: false, OverviewActive: false, NewEventActive: true, headerTitle: 'New Entry' }, function () {
      // do something with new state
    });
  }

  onOverviewPress() {
    this.setState({ historyActive: false, OverviewActive: true, NewEventActive: false, headerTitle: 'My Overview' }, function () {
      // do something with new state
    });

  }

  onVehicleCreatePress(props) {
    props.navigate('VehicleCreateScreen')
    this.menu.hide();
  }

  onLogoutPress(props) {
    // ******** Sign user out of Firebase Auth ********
    firebase.auth().signOut().then(function () {
      console.log('Signed User out')
    }).catch(function (error) {
      console.log('Something went wrong');
    });
    // ******** Navigate to splash Login page ********
    props.navigate('LoginScreen')
    this.menu.hide();
  }
  render() {


    return (
      // ******** This is the Header and Tab Navigation ********
      <View style={{ flex: 1 }}>
          <Header style={{backgroundColor:'#595478'}}>
            <Body>
              <Text style={{fontSize:20, color:'white', marginLeft:117}}>GARAGE</Text>
              <Title style={{ fontSize: 10 }} >Welcome Back {this.props.user.account.username}</Title>
            </Body>
            <Right>
              <Menu
                ref={this.setMenuRef}
                style={{ alignSelf: 'flex-end' }}
                button={
                <Button transparent onPress={this.showMenu}>
                  <Icon name='settings' />
                </Button>
                } >
                {<MenuItem onPress={() => this.onVehicleCreatePress(this.props.navigation)}>Add New Vehicle</MenuItem>}
                <MenuItem onPress={() => this.props.navigation.navigate('SettingsScreen')} >Settings</MenuItem>
                <MenuDivider />
                <MenuItem onPress={() => this.onLogoutPress(this.props.navigation)}>Logout</MenuItem>
              </Menu>
            </Right>
          </Header>


          {/* Show Garage from tab at bottom.  */}
          {this.state.OverviewActive && <HomeOverview navigation={this.props.navigation} props={this.props.user} deleteVehicleRequest={this.props.deleteVehicleRequest} /> }
          {/* Show MaintHistory from tab at bottom */}
          {this.state.historyActive && <MaintHistory navigation={this.props.navigation} props={this.props.user} /> }

        {/* FOOTER */}
        
        <Footer>
          <FooterTab style={{backgroundColor:'#595478', tabActiveBgColor:'red'}}>
          <Button vertical onPress={() => this.onOverviewPress()} active={this.state.OverviewActive}>
              <Icon name="home" />
              <Text style={{color: 'white'}}>Garage</Text>
            </Button>
            <Button vertical onPress={() => this.onDashBoardPress()} active={this.state.dashActive}>
              <Icon type="FontAwesome" name="tachometer" />
              <Text style={{color: 'white'}}>Dashboard</Text>
            </Button>
            <Button vertical onPress={() => this.onHistoryPress()} active={this.state.historyActive}>
              <Icon type="FontAwesome" name="wrench" />
              <Text style={{color: 'white'}}>History</Text>
            </Button>
            <Button vertical onPress={() => this.onNewEventPress()} active={this.state.NewEventActive}>
              <Icon type="FontAwesome" active name="play" />
              <Text style={{color: 'white'}}>Videos</Text>
            </Button>
          </FooterTab>
        </Footer>
        
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  if (state.user.account) {
    return {
      user: state.user
    }
  } else {
    return {}
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (user) => dispatch(loginRequest(user)),
    deleteVehicleRequest: (user, vehicle, index) => dispatch(deleteVehicleRequest(user, vehicle, index)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
