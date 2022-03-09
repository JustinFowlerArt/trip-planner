import "whatwg-fetch";
import getBaseUrl from "./baseUrl";

const baseUrl = getBaseUrl();

export function getTrips() {
    return get("trips");
}

export function getSingleTrip(id) {
    return get(`trips/${id}`);
}

export function createTrips(data) {
    return put("trips", data);
}

export function updateTrip(id, data) {
    return patch(`trips/${id}`, data);
}

export function deleteTrips(id) {
    return del(`trips/${id}`);
}

function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}

// Can't call func delete since reserved word.
function del(url) {
    const request = new Request(baseUrl + url, {
        method: 'DELETE'
    });

    return fetch(request).then(onSuccess, onError);
}

function put(url, data) {
    const request = new Request(baseUrl + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return fetch(request).then(onSuccess, onError);
}

function patch(url, data) {
    const request = new Request(baseUrl + url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.log(error); // eslint-disable-line no-console
}