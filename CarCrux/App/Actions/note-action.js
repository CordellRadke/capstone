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
    console.log('This user got passed through', user, note)
    //create array to hold notes
    let allNotesArray = []
    //Push new note into said array
    allNotesArray.push(note[0]);

    //Grab Snapshot at allNotes to either ADD to or CREATE it on first note. 
    firebase.database().ref('users/' + user.uid + '/allNotes').once('value').then(function (snapshot) {
        // this will either be null or populated with notes. 
        let username = snapshot.val();
        {
            //If null, set array we created earlier with their first note!
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

                //Otherwise username !== null and we need to add old notes with new notes. 
                //Promise because #javascript
                Promise.all(username.allNotesArray.map(ele => {
                    allNotesArray.push(ele);
                })).then(() => {

                    //Store newly constructed array with all their notes
                    firebase.database().ref('users/' + user.uid + '/allNotes').set({
                        allNotesArray
                    }).then(() => {
                        //Grab snapshot to update redux store with all their notes. 
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

export const userNotePhotoUploadRequest = (photos, user, year) => dispatch => {
    console.log('Inside notePhotoUpload Actions', photos, user)

    let referenceToUploadedPhotos = [];

    return new Promise((resolve, reject) => {
        photos.map(ele => {
            let mime = 'application/octet-stream'

            let uri = ele.uri
            let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let sessionId = new Date().getTime()
            let uploadBlob = null
            let imageRef = firebase.storage().ref('noteImages/' + `${user.account.uid}`).child(`${sessionId}`)

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    referenceToUploadedPhotos.push(url)
                    console.log('ARRAY OF URLS WHILE PUSHING', referenceToUploadedPhotos)
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    })
        .then(() => {
            //I did this to not go home until photos are done uploading. 

            let notes;
            firebase.database().ref('users/' + user.account.uid + `/allNotes/allNotesArray`).limitToFirst(1).once('value').then(function (snapshot) {
                // ******** This method is straight from their docs ********
                // ******** It returns whatever is found at the path xxxxx/users/user.uid ********
                notes = snapshot.val();
            }).then(() => {
                console.log('ARRAY OF URLS BEFORE SETTING', referenceToUploadedPhotos)
                // let lastNote = notes.length - 1;
                firebase.database().ref('users/' + user.account.uid + `/allNotes/allNotesArray/` + `${Object.keys(notes)[0]}` + `/photosReference`).set({
                    referenceToUploadedPhotos
                }).then(() => {
                    dispatch(loginRequest(user.account))
                })
            })


        })


};

export const deleteNoteRequest = (user, note, index) => dispatch => {
    console.log('INSIDE NOTE DELETE', user, note)

    let listOfUrls = [];
    //Here we captures all the photos associated with this vehicle
    firebase.database().ref('users/' + user.account.uid + `/allNotes/allNotesArray/` + index + `/photosReference/referenceToUploadedPhotos`).once('value').then(function (snapshot) {

        listOfUrls = snapshot.val();
        console.log(listOfUrls)
    }).then(() => {
        {
            //if not null then there are photos to delete
            listOfUrls !== null ?
                //Then we delete these photos from STORAGE
                firebase.storage().refFromURL(`${listOfUrls[0]}`).delete().then(() => {
                    //Then we delete the note information from DATABASE
                    firebase.database().ref('users/' + user.account.uid + `/allNotes/allNotesArray/` + index).remove();
                    //Dispatch loginRequest to update our redux store!
                    dispatch(loginRequest(user.account))

                }) :
                //otherwise no photos just delete data from database
                firebase.database().ref('users/' + user.account.uid + `/allNotes/allNotesArray/` + index).remove();
            //Dispatch loginRequest to update our redux store!
            dispatch(loginRequest(user.account))
        }


    })
        .catch(error => console.log(error))
}




