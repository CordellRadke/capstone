import React, { Component } from "react";
import { Platform, ScrollView, View, Picker } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;

import SmartPicker from 'react-native-smart-picker'
import DatePicker from 'react-native-datepicker'

export default class NoteDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: "2019-01-01",
            dates:[],
          
            
        };


    }
    componentDidMount() {
    }

    componentDidUpdate() {
    }


    setDate(newDate) {
        this.setState({ selectedDate: newDate})
    }

    render() {

       

        return (

        <ScrollView >
            <View style={{ flex: 1, marginTop: 20 }}>
               
                    <ScrollView >
                        <DatePicker
                            date={this.state.selectedDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                          
                            onDateChange={this.setDate.bind(this)}
                        >
                           
                        </DatePicker>
                        <Button block onPress={() => this.props.noteDate(this.state.selectedDate)}>
                            <Text>Done</Text>
                        </Button>
                    </ScrollView>
                   

            </View>

        </ScrollView>

        );
    }
}
