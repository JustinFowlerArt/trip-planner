# Trip Planner
## Description
This project is a trip planning resource that allows you to create a list of possible trips, add expenses to each trip, and calculate a total cost for the trip. It also includes the ability to remove trips and expenses from the API. Future releases will also include the ability to rename trips, adjust names and pricing for each expense within a given trip, compare the cost of two or more trips, upload trip photos, and upload documents or other items to individual expenses.

## Instructions
### API
<pre>
Start API before starting client.
Run "npm install" in trip-planner-v2\api.
Run "npm start" to launch API.
Runs on http://localhost:5000/api/trips.
</pre>

### Client
<pre>
Run "npm install" in trip-planner-v2\client.
Run "npm start" for dev environment.
Run "npm run build" for production environment.
Runs on http://localhost:3000/.
Use http://localhost:3000/?useMockApi=true for loading mock data.
Mock data runs on http://localhost:3001/trips.
</pre>

## Features
### CSS Features
- A hamburger navigation menu that expands and collapses on mobile.
- Flexbox to organize content areas based on mobile or desktop views. Includes two media queries: 769px - changes navigation and main content layout to row instead of column and 1024px - increases font size and the size of trip cards.

### JavaScript Features
- Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app
- Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application
- Create and use a function that accepts two or more values (parameters), calculates or determines a new value based on those inputs, and returns a new value
- Create a web server with at least one route and connect to it from your application using ExpressJS
- Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX)
- Post to an external API and show that it has saved/persisted
- Create a form and save the values (on click of Submit button) to an external file
- Implement a log that records errors, invalid inputs, or other important events and writes them to a text file (API errors)
