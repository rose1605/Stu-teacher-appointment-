// firebaseConfig.js
const firebaseConfig = {
    apiKey: "AIzaSyBv41Hwkx9I9sGIqKJgKatD0eINd2l9t_w",
    authDomain: "student-teacher-appointm-52b64.firebaseapp.com",
    projectId: "student-teacher-appointm-52b64",
    storageBucket: "student-teacher-appointm-52b64.appspot.com",
    messagingSenderId: "984500662013",
    appId: "1:984500662013:web:13c38e91a8ea639ee49894",
    measurementId: "G-PBM8JFRRDP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();