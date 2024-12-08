import {openDB} from 'idb';

const DB_NAME = 'weatherApp';
const STORE_NAME = 'weatherData';

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {keyPath: 'id'});
            }
        },
    });
};

export const saveWeatherData = async (id: string, data: any, lat: number, lon: number, city: string, state: string, country: string, currentLocation:boolean) => {
    const db = await initDB();
    await db.put(STORE_NAME, {id, data, lat, lon, city, state, country, currentLocation});
};

export const getAllWeatherData = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};

export const getWeatherDataById = async (id: string) => {
    const db = await openDB(DB_NAME, 1);
    return db.get(STORE_NAME, id);
};

export const deleteWeatherDataById = async (id: string) => {
    const db = await openDB(DB_NAME, 1);
    await db.delete(STORE_NAME, id);
};