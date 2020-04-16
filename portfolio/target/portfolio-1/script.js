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



/** returns comments directly without promises and adds them to the DOM 
 */

async function getReviews() {
  const response = await fetch('/data');
  console.log('Fetching data from server.');
  const reviews = await response.json();
  console.log(reviews);
  const reviewsElement = document.getElementById('reviews-container'); //where I would like to post the reviews that are fetched
  console.log(reviewsElement);
  //looping through reviews left
  reviews.forEach((review) => {
      reviewsElement.appendChild(createReviewElement(review));
  });
}


/** Creates an element that represents a review */
function createReviewElement(review) {
  const reviewElement = document.createElement('li'); //list item
  reviewElement.className = 'review';

//smaller elements that make up the review
  const textElement = document.createElement('span'); 
  textElement.innerText = review.text;

  const timeElement = document.createElement('span');
  timeElement.innerText = review.date;

  const ageElement = document.createElement('span');
  ageElement.innerText = review.age;

  const raceElement = document.createElement('span');
  raceElement.innerText = review.race;

  const conditionsElement = document.createElement('span'); //maybe make a list later
  conditionsElement.innerText = review.conditions;

  const hospitalNameElement = document.createElement('span');
  hospitalNameElement.innerText = review.hospital;
 

  reviewElement.appendChild(textElement);
  reviewElement.appendChild(timeElement);
  reviewElement.appendChild(ageElement);
  reviewElement.appendChild(raceElement);
  reviewElement.appendChild(conditionsElement);
  reviewElement.appendChild(hospitalNameElement);

  return reviewElement;
}

