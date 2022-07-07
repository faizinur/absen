import { log } from '@Utils';
import { watchPosition, clearWatch } from './Location';
import haversine from 'haversine';
const Fencing = {
    centerPoint: {
        latitude: null,
        longitude: null,
    },
    polygon: [],
    init: (latitude = null, longitude = null, radius = 500) => {
        if (latitude != null && longitude != null) {
            Fencing.polygon = Fencing.convert([parseFloat(latitude), parseFloat(longitude)], radius, 20);
            Fencing.centerPoint = { latitude, longitude, }
        }
    },
    startMonitoring: async () => {
        watchPosition(
            ({ coords: { latitude, longitude } }) => {
                let userInsideFence = Fencing.inside({ lat: latitude, lng: longitude }, Fencing.polygon);
                if (!userInsideFence) {
                    let offset = haversine(Fencing.centerPoint, { longitude, latitude }, { unit: 'meter' })
                    global?.showToast(`anda berada ${offset} meter dari sekolah`, 2000, 'danger')
                }
            },
            err => {
                log(err)
            }
        )
    },
    stopMonitoring: async () => clearWatch(),
    convert: (coordinate, radius, numberOfSegment = 360) => {
        let flatCoordinates = [];
        for (var i = 0; i < numberOfSegment; i++) {
            var bearing = 2 * Math.PI * i / numberOfSegment;
            var result = Fencing.offset(coordinate, radius, bearing);
            flatCoordinates.push(result);
        }
        flatCoordinates.push(flatCoordinates[0]);

        return flatCoordinates;
    },
    offset: (coordinate, radius, bearing) => {
        let [latitude, longitude] = coordinate;
        let lat1 = (latitude * Math.PI) / 180.0;
        let lon1 = (longitude * Math.PI) / 180.0;
        let dByR = radius / 6378137;

        let lat = Math.asin(
            Math.sin(lat1) * Math.cos(dByR) +
            Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing)
        );
        let lon = lon1 + Math.atan2(
            Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1),
            Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat)
        );
        lon = (Number(((lon + 3 * Math.PI) - (Math.floor((lon + 3 * Math.PI) / (2 * Math.PI)) * (2 * Math.PI))).toPrecision(8))) - Math.PI;
        return { lat: (lat * 180 / Math.PI), lng: (lon * 180 / Math.PI) };
    },
    inside: (point, polygon) => {
        let x = point.lat, y = point.lng;

        var inside = false;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            var xi = polygon[i].lat, yi = polygon[i].lng;
            var xj = polygon[j].lat, yj = polygon[j].lng;

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    },
}

export default Fencing;