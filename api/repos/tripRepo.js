import fs from "fs";

const FILE_NAME = './assets/trips.json';

let tripRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let trip = JSON.parse(data).find(t => t.id == id);
        resolve(trip);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let trips = JSON.parse(data);
        // Perform search
        if (searchObject) {
          trips = trips.filter(
            t => (searchObject.id ? t.id == searchObject.id : true) &&
              (searchObject.name ? t.name.toLowerCase().indexOf(searchObject.name) >= 0 : true));
        }

        resolve(trips);
      }
    });
  },
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let trips = JSON.parse(data);
        trips.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(trips), function (err) {
          if (err) {
            reject(err);
          }
          else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let trips = JSON.parse(data);
        let trip = trips.find(t => t.id == id);
        if (trip) {
          Object.assign(trip, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(trips), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let trips = JSON.parse(data);
        let index = trips.findIndex(t => t.id == id);
        if (index != -1) {
          trips.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(trips), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(index);
            }
          });
        }
      }
    });
  }
};

export default tripRepo;