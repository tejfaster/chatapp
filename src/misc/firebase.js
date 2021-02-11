import firebase from 'firebase/app'

const config = {
    apiKey: "AIzaSyDrgK2LxwQtQ1e-4dYVJNoOqDo76F7PSpk",
    authDomain: "chatapp-782ab.firebaseapp.com",
    databaseURL: "https://chatapp-782ab-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatapp-782ab",
    storageBucket: "chatapp-782ab.appspot.com",
    messagingSenderId: "747154982710",
    appId: "1:747154982710:web:6e79397608ad10277f1597",
    measurementId: "G-FDN7E699VE"
}

const app =  firebase.initializeApp(config)
