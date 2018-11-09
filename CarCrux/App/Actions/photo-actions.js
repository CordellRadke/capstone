import firebase from 'firebase'

// var storageRef = firebase.storage().ref();

export const profilePictureSet = user => ({
    type: 'PROFILE_PICTURE_SET',
    payload: user,
});


export const profilePictureUpdate = user => ({
    type: 'PROFILE_PICTURE_UPDATE',
    payload: user,
});


export const profilePictureUploadRequest = (file) => dispatch => {

    firebase.storage.ref().put(file).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
    });

};
