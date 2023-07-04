/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

'use strict';

import { updateWeather, error404 } from "./api.js";
const defaultLocation = '#/weather?lat=12.98&lon=77.5927'; //banglore



const currentLoacation = function () {

    window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude } = res.coords;

         updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    });

}

/**
 * 
 * @param {string} query  searched query
 */

const searchedLocation = query => updateWeather(...query.split("&"));
// updatev weather ("lat=51.5073219","lon=-0.1274474")


const routes = new Map([
    ["/current-location", currentLoacation],
    ["/weather", searchedLocation]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.split("?") :
    [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function() {
    if(!window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
});