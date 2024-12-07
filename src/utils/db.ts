import { openDB } from 'idb';

const DB_NAME = 'weatherApp';
const STORE_NAME = 'weatherData';

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        },
    });
};

export const saveWeatherData = async (id: string, data: any, lat: number, lon: number) => {
    const db = await initDB();
    await db.put(STORE_NAME, { id, data, lat, lon, timestamp: Date.now() });
};

export const getWeatherData = async (id: string) => {
    const db = await initDB();
    return db.get(STORE_NAME, id);
};

