import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';


export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'SERVICE HISTORY',
    headerStyle:{
      backgroundColor: '#D8E1FF',
      
    },
    headerTitleStyle:{
      color: '#595478',
      paddingLeft: 115
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {/* <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/add-car.png')
                  : require('../assets/images/add-car.png')
              }
              style={styles.welcomeImage}
            />
          </View> */}

         <View>
            <Text style={styles.getStartedText}>

                This will be the service history view.
                Users can add, delete, or view detailed records here.
            </Text>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#E8E8E8',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  
});
