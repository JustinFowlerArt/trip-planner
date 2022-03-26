import "whatwg-fetch";
import getBaseUrl from "./baseUrl";

const baseUrl = getBaseUrl();

function fetchData(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}

function postData(url, data) {
    const request = new Request(baseUrl + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return fetch(request).then(onSuccess, onError);
}

function patchData(url, data) {
    const request = new Request(baseUrl + url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return fetch(request).then(onSuccess, onError);
}

// Can't call func delete since reserved word.
function deleteData(url) {
    const request = new Request(baseUrl + url, {
        method: 'DELETE'
    });

    return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.log(error); // eslint-disable-line no-console
}

export function getTrips() {
    return fetchData("trips");
}

// No being used currently. Can be used for search later.
export function getSingleTrip(id) {
    return fetchData(`trips/${id}`);
}

export function createTrip(data) {
    return postData("trips", data);
}

export function updateTrip(id, data) {
    return patchData(`trips/${id}`, data);
}

export function deleteTrip(id) {
    return deleteData(`trips/${id}`);
}
