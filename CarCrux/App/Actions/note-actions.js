import firebase from 'firebase'
import { userSet, userCreate, userUpdate, loginRequest } from './auth-actions';
import { Platform } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'




const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


// ************ To be clear, in firebase the userNotes and User information are ONE object. ************
// ************ I'm only modularizing to keep auth actions cleaner ************
// ************ Notice we are still calling the auth-actions redux actions to update the total user object ************



export const userNoteCreateRequest = (note, user) => dispatch => {
    console.log('This user note got passed through', user, note)
    //create array to hold notes
    let allNotesArray = []
    //Push new note into said array
    allNotesArray.push(note);

    //Grab Snapshot at allNotes to either ADD to or CREATE it on first note. 
    firebase.database().ref('users/' + user.uid + '/allNotes').once('value').then(function (snapshot) {
        // this will either be null or populated with notes. 
        let username = snapshot.val();
        {
            //If null, set array we created earlier with their first car!
            username === null ? firebase.database().ref('users/' + user.uid + '/allNotes').set({
                allNotesArray
            }).then(() => {
                //Then grab new snapshot with this allvehicle array to update our redux store
                firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {

                    let username = snapshot.val();

                    //Edge case if database get screwed up, otherwise update redux store
                    { !username.account ? console.log('errrrrrrrrr') : dispatch(userSet(username)) }
                })
            }) :

                //Otherwise username !== null and we need to add old vehicles with new vehicles. 
                //Promise because #javascript
                Promise.all(username.allNotesArray.map(ele => {
                    allNotesArray.push(ele);
                })).then(() => {

                    //Store newly constructed array with all their vehicles
                    firebase.database().ref('users/' + user.uid + '/allNotes').set({
                        allNotesArray
                    }).then(() => {
                        //Grab snapshot to update redux store with all their vehicles. 
                        firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {

                            let username = snapshot.val();


                            //Edge case if database get screwed up, otherwise update redux store
                            { !username.account ? console.log('errrrrrrrrr') : dispatch(userSet(username)) }
                        })
                    })
                })

        }
    })



};



export const deleteNoteRequest = (user, note, index) => dispatch => {
    console.log('INSIDE NOTE DELETE', user, note)

    let listOfUrls = [];
    //Here we captures all the photos associated with this vehicle
    firebase.database().ref('users/' + user.account.uid + `/allNotes/allNotesArray/` + index).once('value').then(function (snapshot) {

        listOfUrls = snapshot.val();
        console.log(listOfUrls)
    }).then(() => {
        {
            
                
            firebase.database().ref('users/' + user.account.uid + `/allNotes/allNotesArray/` + index).remove();
            //Dispatch loginRequest to update our redux store!
            dispatch(loginRequest(user.account))
        }


    })
        .catch(error => console.log(error))
}




