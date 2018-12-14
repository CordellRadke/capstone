import React, { Component } from "react";
import { Platform, ScrollView, View, Picker, TextInput } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;

import SmartPicker from 'react-native-smart-picker'


export default class NoteTitlePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTitle: " ",
            titles:[],
          
            
        };


    }
    componentDidMount() {
    }

    componentDidUpdate() {
    }


    setTitle(newTitle) {
        this.setState({ selectedTitle: newTitle})
    }

    render() {

       

        return (

        <ScrollView >
            <View style={{ flex: 1, marginTop: 20 }}>
               
                    <ScrollView >
                        <TextInput
                            placeholder="e.g. Oil Changed"
                            onChangeText={this.setTitle.bind(this)}
                        >
                           
                        </TextInput>
                        <Button block onPress={() => this.props.noteTitle(this.state.selectedTitle)}>
                            <Text>Done</Text>
                        </Button>
                    </ScrollView>
                   

            </View>

        </ScrollView>

        );
    }
}
