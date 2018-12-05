import React, { Component } from "react";
import { Platform, ScrollView, View, Picker } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";
// const Item = Picker.Item;

import SmartPicker from 'react-native-smart-picker'

export default class NoteDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: "2018",
            dates:[],
            expanded: false
            
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

        const data=[];
        for (let i = 0; i < (2018 - 1941); i++) {

            data.push(
                { date: (2018 - i) }
            )
        }

        return (

        <ScrollView >
            <View style={{ flex: 1, marginTop: 20 }}>
                {data.length > 0 ?
                    <ScrollView >
                        <SmartPicker

                            expanded={this.state.expanded}
                            selectedValue={this.state.selectedDate}
                            label='Note Date'
                            onValueChange={this.setDate.bind(this)}
                        >
                            {
                                data.map((ele, key) => {
                                    return (<Picker.Item label={ele.date.toString()} value={ele.date} key={key}/>)
                                })
                            }
                        </SmartPicker>
                        <Button block onPress={() => this.props.noteDate(this.state.selectedDate)}>
                            <Text>Done</Text>
                        </Button>
                    </ScrollView>
                    : <Spinner />}

            </View>

        </ScrollView>

        );
    }
}
