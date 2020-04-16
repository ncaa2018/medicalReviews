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

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Review;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      // Query to retrieve all reviews, sorted by most recent first.
    Query query = new Query("Review").addSort("time", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Review> reviews = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String text = (String) entity.getProperty("text");
      String newReview = (String) entity.getProperty("newReview");
      long time = (long) entity.getProperty("time");
      int age = (int) entity.getProperty("age");
    //   String race = (String) entity.getProperty("race");
    //   String conditions = (String) entity.getProperty("conditions");
    //   String hospitalName = (String) entity.getProperty("hospitalName");
      
      //int age = 10;
      String race = "Black";
      String conditions = "more stuff";
      String hospitalName = "Memorial";
      Review review = new Review(id, text, time, age, race, conditions, hospitalName); //creating different entities/comments from datastore to then load
      reviews.add(review);
    }

    Gson gson = new Gson();
    String json = gson.toJson(reviews);

    response.setContentType("application/json;");
    response.getWriter().println(json);

  }

    @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    

    // Get the input from the comment textbox and the time the comment was made
    String newReview = getParameter(request, "review", "");
    long time = System.currentTimeMillis();

    System.out.println("getting input");
    System.out.println(newReview);

    //storing comments in entities
    Entity reviewEntity = new Entity("Review");
    reviewEntity.setProperty("text", newReview);
    reviewEntity.setProperty("time", time); //so I can load the comments in an order based on time
    //will need to set other properties that I will want to filter
    reviewEntity.setProperty("age",age);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(reviewEntity);

    // Redirect back to the HTML page.
    response.sendRedirect("/index.html");

  }

    /**
   * @return the request parameter, or the default value of the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }

}
