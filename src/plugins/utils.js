import { collection, doc, getDocs, getDoc, getFirestore, query, where, addDoc, setDoc, orderBy, limit, startAfter, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../plugins/firebase';
import store from '../store/index';

const db = getFirestore(app);
const storage = getStorage(app);

// get data from databases
const getAll = async (collectionName, sorted = false, desc = false, sortedBy = '', limited = false, limitNumber = 1) => {
    let getQuery = null;
    let querySnapshot = null;

    if (sorted && limited == false) {
        getQuery = query(collection(db, collectionName), orderBy(sortedBy, desc ? 'desc' : 'asc'));
        querySnapshot = await getDocs(getQuery)
        return querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
    } else if (sorted == false && limited) {
        getQuery = query(collection(db, collectionName), limit(limitNumber));
        querySnapshot = await getDocs(getQuery);
        return querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } })
    } else if (sorted && limited) {
        getQuery = query(collection(db, collectionName), orderBy(sortedBy, desc ? 'desc' : 'asc'), limit(limitNumber))
        querySnapshot = await getDocs(getQuery);
        return querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } })
    }

    querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
}

const getStartAfterDescData = async (collectionName, lastVisible, sortedBy, limitNumber) => {
    const getQuery = query(collection(db, collectionName), orderBy(sortedBy, 'desc'), startAfter(lastVisible), limit(limitNumber));
    const querySnapshot = await getDocs(getQuery);
    return querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
}

const getDocCon = async (collectionName, param1, param2) => {
    const getQuery = query(collection(db, collectionName), where(param1, '==', param2));
    const querySnapshot = await getDocs(getQuery);
    const data = querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
    return data;
}

const getDocWithId = async (collectionName, id) => {
    const get = await getDoc(doc(db, collectionName, id));
    return get.data();
}

// set data to database
const addData = (collectionName, data) => {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, collectionName), data).then((docRef) => {
            resolve(docRef);
        }).catch((err) => {
            reject(err);
        })
    })
}

const setData = (collectionName, data, id) => {
    return new Promise((resolve, reject) => {
        setDoc(doc(db, collectionName, id), data, { merge: true }).then((docRef) => {
            resolve(docRef)
        }).catch((err) => {
            reject(err);
        })
    })
}

// update databases documents
const updateData = (collectionName, id, data) => {
    return new Promise((resolve, reject) => {
        updateDoc(doc(db, collectionName, id), data).then((e) => {
            resolve(e);
        }).catch((err) => {
            reject(err);
        })
    })
}
// delete data from database
const deleteDataNoConditional = async (collectionName, id) => {
    return new Promise((resolve, reject) => {
        deleteDoc(doc(db, collectionName, id)).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err);
        })
    })
}

// delete file in storage
const deleteFile = (url) => {
    return new Promise((resolve, reject) => {
        deleteObject(ref(storage, url)).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

// upload file or blob
const uploadAFile = (file, folder) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        uploadBytes(storageRef, file).then(async () => {
            const url = await getDownloadURL(storageRef)
            resolve(url)
        }).catch((err) => {
            reject(err);
        });
    })
}

// others
const getRealtimeUpdatePembayaran = (collectionName) => {
    const q = query(collection(db, collectionName), where('tanggal_pembayaran', '>', Date.now()));
    const p = query(collection(db, collectionName));
    onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
                store.dispatch('addNewPembayaranListrik', change.doc)
            }
        });
    });

    onSnapshot(p, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "removed") {
                store.dispatch('removeSavedPembayaranListrik', change.doc)
            }
        })
    })
}

const getDatesFromMilisecond = (milisecond) => {
    const tanggal = new Date(milisecond);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    return (days[tanggal.getDay()] + ', ' + tanggal.getDate() + ' ' + months[tanggal.getMonth()] + ' ' + tanggal.getFullYear());
}

const formatNumber = (number) => {
    let formated = new Intl.NumberFormat('de-De').format(number);
    return formated;
}

export {
    getAll,
    getDocCon,
    getDocWithId,
    uploadAFile,
    addData,
    setData,
    getStartAfterDescData,
    getDatesFromMilisecond,
    formatNumber,
    getRealtimeUpdatePembayaran,
    updateData,
    deleteDataNoConditional,
    deleteFile
};
