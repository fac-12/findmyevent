# 🎉 Find My Event - The pursuit of APIness 🎉

## The Project

Meet up uses the [eventful API](http://api.eventful.com/) and [Google Maps API](https://developers.google.com/maps/). The aim of the app is to allow a user to easily identify the events that are occurring in their area by inputing their post code.

#### User Stories
- As a user, I want to search for events occuring in my area.
- As a user, I want a simple interface with a single input field.
- As a user, I want to easily click on the markers to reveal event information.

## Project Objective
To build a web app that provides users with frequently updated content on a regular or continuous basis and allows users to search its content.

## How we built it
- Software architecture: use of module.exports and require for modularisation and consideration of server file structure. (add pictures)
- Backend code: server, router, handlers, JSON data, API, Request module
- Frontend code: DOM rendering
- Server side validation
- Deploying to Heroku


### Challenges
- Difficulties identifying a suitable API, we tried using the [Meet Up API](https://www.meetup.com/meetup_api/) but found the information returned to us was not very useful :-1: 
-  We kept getting this from our API call: 
```events: 
   { event: 
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ] }
```
- How to use [environment variables](https://github.com/dwyl/learn-environment-variables) to keep our secret keys away from prying eyes! 👀


### Things we learnt
- How to generate a [Google Map with mulitple markers and info windows](https://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/)
