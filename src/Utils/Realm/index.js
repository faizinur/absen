import 'react-native-get-random-values';
import Realm from "realm";
import { log } from '@Utils'
const { UUID } = Realm.BSON;
import dbOptions from './dbOptions';

const addData = (key, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const realm = await Realm.open(dbOptions);
            realm.write(() => realm.create(key, { ...payload, id: new UUID().toHexString() }));
            resolve(true)
        } catch (e) {
            log('reject addData ', e)
            reject(e)
        }
    })
}

const getData = async (key) => {
    if (key == '') return Promise.reject('key kosong')
    return new Promise(async (resolve, reject) => {
        try {
            let selectedData = '';
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                selectedData = JSON.parse(JSON.stringify(realm.objects(key)));
            });
            resolve(selectedData);
        } catch (error) {
            reject(error);
        }
    })
}

const removeData = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                let foundData = realm.objects(key)
                realm.delete(foundData)
                foundData = null;
            })
            //realm.close();
            resolve('OK');
        } catch (e) {
            reject(e);
        }
    })
}


const updateData = (key, updatedValue) => {
    return new Promise(async (resolve, reject) => {
        try {
            const realm = await Realm.open(dbOptions);
            let foundData = realm.objectForPrimaryKey(key, updatedValue.id);
            if (typeof (foundData) !== 'undefined') {
                Object.keys(foundData).map(key => foundData[key] = updatedValue[key])
                resolve(foundData);
            } else {
                reject(`Primary key ${updatedValue.productId} Not Found`);
            }
        } catch (e) {
            reject(e)
        }
    })
}

const closeConnection = async () => {
    try {
        log('close realm')
    } catch (e) {
        log('closeConnection ERR : ', e)
    }
}
export {
    addData,
    getData,
    removeData,
    closeConnection,
    updateData,

}