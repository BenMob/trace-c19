package com.tracecovid.entities;

/******************************************
This class models a single feedback Entity
*************************/

public class FeedbackModel{
    private long id;
    private String author;
    private String email;
    private long timestamp;

    public void Feedback(){};
    public void Feedback(long id, String author, String email, long timestamp){
        this.id = id;
        this.author = author;
        this.email = email;
        this.timestamp = timestamp;
    }
}