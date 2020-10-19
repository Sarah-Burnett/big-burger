# Big-Burger restaurant

> Front-end landing page and CRUD booking form with HTML/SASS/vanilla JS bundled with parcel. <br> NodeJS/express back-end to serve client and booking REST API with MongoDB/mongoose.

Three responsive pages to site:
- Index - images, menu,  reviews slider, locations sliders and map modal
- Book - validated booking form to make a booking for the restaurant
- Booking - view booking from form/query string booking id which can be edited/deleted 

## To do
- Fix get time and put party as append to
- Testing
- Restaurant site to view and analyse bookings - routes and pug template started although need auth and filtering...
- Email to confirm booking

## Installation
``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server concurrently 
npm run dev

# Run the Express server only
npm start

# Run the client only
npm run client

#Server runs on http://localhost:5000 and client on http://localhost:3000
#Environment variables - MongoURI and TotalBookingSize
```
