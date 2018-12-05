import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Item, Left, Body, Right, Button, Icon, Title, Drawer, Footer, FooterTab, Card, CardItem } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import HomeOverview from '../Components/HomeOverview'
import MaintHistory from '../Components/MaintHistory'
import Dashboard from '../Components/Dashboard'
import { deleteVehicleRequest } from '../Actions/vehicle-actions'
import { deleteNoteRequest } from '../Actions/note-actions'



import styles from './Styles/HomeScreenStyle'


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, dashActive: false, historyActive: false, videoActive: false, garageActive: false, headerTitle: 'Garage', user: {}
    }
    this.openDrawer = this.openDrawer.bind(this);
  }

  componentDidUpdate() {
    const { navigate } = this.props.navigation
  }

  componentDidMount() {
    this.setState({ garageActive: true })
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

  onGaragePress() {
    this.setState({ garageActive: true, historyActive: false, dashActive: false, videoActive: false, headerTitle: 'Garage' }, function () {
      // do something with new state
    });
    //this.setState = ({ garageActive: true })
  }

  onHistoryPress() {
    this.setState({ historyActive: true, garageActive: false, videoActive: false, dashActive: false, headerTitle: 'History' }, function () {
      // do something with new state
    });
    // this.setState = ({ historyActive: true })
  }

  onVideoPress() {
    this.setState({ videoActive: true, historyActive: false, garageActive: false, dashActive: false, headerTitle: 'Videos' }, function () {
      // do something with new state
    });
  }

  onDashBoardPress() {
    this.setState({ dashActive: true, historyActive: false, garageActive: false, videoActive: false, headerTitle: 'Dash' }, function () {
      
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
     <Header style={{backgroundColor: '#595478'}}>
          
            <Title style={{ fontSize: 10 }} >Welcome Back {this.props.user.account.username}</Title>
            <Body>
              <Text style={{color: 'white', fontSize: 20 , marginLeft: 60}}>{this.state.headerTitle}</Text>
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
                <MenuItem onPress={() => this.props.navigation.navigate('NoteScreen')} >Add New Note</MenuItem>
                <MenuDivider />
                <MenuItem onPress={() => this.onLogoutPress(this.props.navigation)}>Logout</MenuItem>
              </Menu>
            </Right>
          </Header>

          {/** ALL TAB NAVIGATION */}
 
          {/* Show Garage from tab at bottom.  */}
          {this.state.garageActive && <HomeOverview navigation={this.props.navigation} props={this.props.user} deleteVehicleRequest={this.props.deleteVehicleRequest} /> }
          {/* Show MaintHistory from tab at bottom */}
          {this.state.historyActive && <MaintHistory navigation={this.props.navigation} props={this.props.user} deleteNoteRequest={this.props.deleteNoteRequest}/> }
          {/* Show DashScreen from tab at bottom */}
          {this.state.dashActive && <Dashboard navigation={this.props.navigation} props={this.props.user} /> }
          

        {/* FOOTER */}
       
        <Footer>
       
          <FooterTab style={{backgroundColor:'#595478'}}>
          <Button vertical onPress={() => this.onGaragePress()} active={this.state.garageActive}>
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
    deleteNoteRequest: (user, note, index) => dispatch(deleteNoteRequest(user, note, index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
