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
    return new Promise((resolve, reject) => {
        firebaseApp.firestore().collection('reports')
            .add(report)
            .then(ref => {
                resolve(ref);
            })
            .catch(e => {
                reject(e);
            });
    });
};

FirebaseApp.deleteReport = (reportId) => {
    return new Promise((resolve, reject) => {
        firebaseApp.firestore().collection('reports')
            .doc(reportId)
            .delete()
            .then(() => {
                resolve("Deleted");
            })
            .catch((e) => {
                reject(e);
            })
    });
}

FirebaseApp.getReport = (reportId) => {
    return new Promise((resolve, reject) => {
        firebaseApp.firestore().collection('reports')
        .doc(reportId)
        .get()
        .then((report) => {
            if(report.exists){
                resolve(report.data());
            } else {
                reject("Report doesnt exist");
            }
        })
        .catch(e => {
            reject(e);
        });
    });
};

export default FirebaseApp;