export function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let currentPosition = {
                lat: lat,
                lng: lng
            }
            console.log(currentPosition);
            return currentPosition;
        });
    }
}