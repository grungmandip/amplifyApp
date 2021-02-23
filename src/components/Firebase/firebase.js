import app from 'firebase/app';
import 'firebase/auth';

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };
const config = {
    apiKey: 'AIzaSyANZUl3xhELbnszkZnZ3DcY4ShSNDlbTQw',
    authDomain: 'fir-inreact-ee7ab.firebaseapp.com',
    databaseURL: 'https:fir-inreact-ee7ab.firebaseio.com',
    projectId: 'fir-inreact-ee7ab',
    storageBucket: 'fir-inreact-ee7ab.appspot.com',
    messagingSenderId: '304162485178',
};

class Firebase {

    constructor() {
        app.initializeApp(config)

        this.auth = app.auth();
    }

    // *** AUTH API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;

