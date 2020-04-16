
package com.google.sps.data;
import java.util.Date;

/** A comment within the comments section. */
public final class Review {

  private final long id;
  private final String text;
  private final Date date;
  private final int age;
  private final String race;
  private final String conditions;
  private final String hospital;
  

  public Review (long id, String text, long time,int age, String race, String conditions, String hospitalName) {
    this.id = id;
    this.text = text;
    this.date = new Date(time);
    this.age = age;
    this.race = race;
    this.conditions = conditions;
    this.hospital = hospitalName;
  }
}