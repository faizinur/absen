import {
    APP_CONFIG,
    ABSEN,
} from './types';

const AppConfigSchema = {
    name: APP_CONFIG,
    properties: {
        id: "string",
        key: "string?",
        value: "string?",
    },
    primaryKey: "id",
};

const AbsenSchema = {
    name: ABSEN,
    properties: {
        id: "string?",
        nama: "string?",
        nip: "string?",
        sandi: "string?",
        jamKerja: '{}', //{masuk, keluar},
        foto: '{}',//{masuk, keluar},
        geotaging: '{}', //{longitude, latitude, altitude}
    },
    primaryKey: "id",
};


const migrationAppConfigSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(APP_CONFIG);
    const newObjects = newRealm.objects(APP_CONFIG);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in AppConfigSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationAbsenSchemaSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(ABSEN);
    const newObjects = newRealm.objects(ABSEN);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in AbsenSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

export {
    AppConfigSchema,
    AbsenSchema,
    migrationAppConfigSchema,
    migrationAbsenSchemaSchema,
}