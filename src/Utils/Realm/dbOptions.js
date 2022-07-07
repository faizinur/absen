import {
    AppConfigSchema,
    AbsenSchema,
    migrationAppConfigSchema,
    migrationAbsenSchemaSchema,
} from './schema';

let key = new Int8Array(64);
key[0] = 10;
key[2] = 69;
key[21] = 10;
key[32] = 1;
key[44] = 9;
key[50] = 0;
key[60] = 4;
key[64] = 9;
key[62] = 5;

const version = 1;

export default dbOptions = {
    path: "AbsenGuruDB",
    schema: [
        AppConfigSchema,
        AbsenSchema,
    ],
    schemaVersion: version,
    encryptionKey: key,
    migration: (oldRealm, newRealm) => {
        if (oldRealm.schemaVersion < version) {
            migrationAppConfigSchema(oldRealm, newRealm);
            migrationAbsenSchemaSchema(oldRealm, newRealm);
        }
    },
}
