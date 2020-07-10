package com.tracecovid.entities;
/*****************
 * This is the class modeling a Location Entity
 ***/

public class LocationModel{
    private final int MIN_ZIP = 00001;
    private final int MAX_ZIP = 99950;
    
    private long id;
    private String zip;
    private String latitude;
    private String longitude;
    private String date;
    private long timestamp;

    public LocationModel(long id , String zip, String lat, String lon, String date, long timestamp){
        if(Integer.parseInt(zip) < this.MIN_ZIP || Integer.parseInt(zip) > this.MAX_ZIP){
            throw new IllegalArgumentException("Zip Code " + zip + " is out of range. Range = (0001 - 99950)");
        }

        this.id = id;
        this.zip = zip;
        this.latitude = lat;
        this.longitude = lon;
        this.date = date;
        this.timestamp = timestamp;
    }

    @Override
    public String toString(){
        return("Id: " + this.id + ",  " + 
        "Zip: " + this.zip + ",  " +
        "Latitude: " + this.latitude + ",  " +
        "Longitude: " + this.longitude + ",  " +
        "Date: " + this.date + ",  " +
        "Timestamp: " + this.timestamp); 
    }
}