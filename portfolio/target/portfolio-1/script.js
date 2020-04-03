// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['I once had 7 wisdom teeth!','I have not ate a physical banana. Ever.',
      'I lived on Capitol Hill in DC for a semester in high school! #SEGL',
      'I am an Outside Hitter in volleyball.',
      '"Nothing softens the wounds of your ancestors like the sweetness of your existence."'
      ,'I did a summer homestay in Peru in high school!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}


/** returns comments directly without promises and adds them to the DOM 
 */

async function getComments() {
  const response = await fetch('/data');
  console.log('Fetching data from server.');
  const comments = await response.json();
  console.log(comments);
  const commentsElement = document.getElementById('comments-container'); //where I would like to post the comments that are fetched
  console.log(commentsElement);
  comments.forEach((comment) => {
      commentsElement.appendChild(createCommentElement(comment));
  })
}


/** Creates an element that represents a comment */
function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const textElement = document.createElement('span');
  textElement.innerText = comment.text;

  const timeElement = document.createElement('time');
  timeElement.innerText = comment.date;
   

  commentElement.appendChild(textElement);
  commentElement.appendChild(timeElement);

  return commentElement;
}

/** Creates a map and adds it to the page. */
function createMap() {
    console.log("entering map");
    //creating a map with properties
  const map = new google.maps.Map(
      document.getElementById('map-rwanda'), {
          mapTypeId: 'satellite',
          draggable: true,
      center: {lat: -1.944960, lng: 30.062040}, zoom: 11});

    //creating markers for places I've been
    const kigali = new google.maps.Marker({
    position: {lat: -1.944960, lng: 30.062040},
    map: map,
    label: '3',
    title: 'Kigali, Rwanda'
  });
    const trujillo = new google.maps.Marker({
    position: {lat: -8.111840, lng: -79.028670},
    map: map,
    label: '1',
    title: 'Trujillo, Peru'
  });
    const laHabana = new google.maps.Marker({
    position: {lat: 23.113592, lng: -82.366592},
    map: map,
    label: '2',
    title: 'Havana, Cuba'
  });


kigali.setMap(map);
trujillo.setMap(map);
laHabana.setMap(map);
}
