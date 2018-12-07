import React, { Component } from "react";
import { Platform, ScrollView, View, Picker, TextInput } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;
import SmartPicker from 'react-native-smart-picker'

export default class NoteMileagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMileage: " ",
            miles: []
           
        };
    }
    componentDidMount() {
    }

    componentDidUpdate() {
    }


    setMileage(newMileage) {
        this.setState({
            selectedMileage: newMileage
        });
    }





    render() {
        
        return (
        <ScrollView >
            <View style={{ flex: 1, marginTop: 20 }}>
            
                    <ScrollView >
                        <TextInput
                            placeholder="100,000"
                            onChangeText={this.setMileage.bind(this)}
                        >
                        
                        </TextInput>
                        <Button block onPress={() => this.props.noteMileage(this.state.selectedMileage)}>
                            <Text>Done</Text>
                        </Button>
                    </ScrollView>
                

            </View>

        </ScrollView>
        );
    }
}
