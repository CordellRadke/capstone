import React, { Component } from "react";
import { Platform, ScrollView, View, Picker, TextInput } from "react-native";
import Spinner from '../Components/Spinner'
import { Button, Text } from "native-base";



export default class NoteTextPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedText: " ",
            texts:[],
          
            
        };


    }
    componentDidMount() {
    }

    componentDidUpdate() {
    }
    

    setText(newText) {
        this.setState({ selectedText: newText})
    }

    render() {

       

        return (

        <ScrollView >
            <View style={{ flex: 1, marginTop: 20 }}>
           
                    <ScrollView >
                     
                             <TextInput
                                placeholder="Here you can add just about anything from part prices to what you got fixed on your vehicle today"
                                style={{borderTopWidth: 0}}
                                multiline = {true}
                                numberOfLines = {10}
                                onChangeText={this.setText.bind(this)}
                            >
                            
                            </TextInput>
                    
                        <Button block onPress={() => this.props.noteText(this.state.selectedText)}>
                            <Text>Done</Text>
                        </Button>
                    </ScrollView>
                   

            </View>

        </ScrollView>

        );
    }
}
