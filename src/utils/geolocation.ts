export interface GeolocationPosition {
    latitude: number;
    longitude: number;
}

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(`Error getting location: ${error.message}`);
                }
            );
        } else {
            reject('Geolocation is not supported by this browser.');
        }
    });
};