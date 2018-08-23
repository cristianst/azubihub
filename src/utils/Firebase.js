import firebaseApp from '../firebase.js';

const FirebaseApp = {};

FirebaseApp.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        firebaseApp.auth().onAuthStateChanged((user) => {
        	if (user) {
        	    resolve(user);
        	} else {
        	    reject('User not logged.');
        	}
        });
    });

};

FirebaseApp.createReport = (report) => {
    return firebaseApp.firestore().collection('reports')
        .add(report);   
};

FirebaseApp.deleteReport = (reportId) => {
    return firebaseApp.firestore().collection('reports')
        .doc(reportId)
        .delete()
};

FirebaseApp.getReport = (reportId) => {
    return firebaseApp.firestore().collection('reports')
        .doc(reportId)
        .get()
        .then(report => {
            return report.exists ? report.data() : null;
        });

};

FirebaseApp.updateReport = ({ reportId, report }) => {
    return firebaseApp.firestore().collection('reports')
        .doc(reportId)
        .update({
            ...report
        });
}

FirebaseApp.signOutUser = () => {
    return firebaseApp.auth().signOut();
}

export default FirebaseApp;