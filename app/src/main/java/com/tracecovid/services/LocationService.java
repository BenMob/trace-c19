package com.tracecovid.services;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.tracecovid.entities.LocationModel;
import java.io.IOException;
import java.util.Enumeration;
import java.util.List;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;

/******************************************************************
This class will take static methods that perform different tasks
that are needed by the servlets to process Locations.
Tasks may involve things like querying, saving to datastore etc ...

This approach helps keep our servlets stay as small as possible

TODO: Create a method that queries the Locations submitted within the last 5 five days
****/

public final class LocationService extends Services{

/***************************************************************************************
    * This method creates a Location entity and populates all of its
    * properties from request parameters.
    *
    * @param: javax.servlet.http.HttpServletRequest
    * @return: com.google.appengine.api.datastore.Entity || -> Acceptable by Datatstore
    *
    ***/
    public static Entity createLocationEntity(HttpServletRequest request) throws IOException{
        // Create Entity Object that is acceptable by Datastore
        Entity locationEntity = new Entity("Locations");

        // Collects all parameter names as presented in <input> tags
        Enumeration<String> parameterNames = request.getParameterNames();

         // Adds each name and it's corresponding value in the entity Object
         while(parameterNames.hasMoreElements()){
             String name = parameterNames.nextElement();
             String property = request.getParameter(name);             
             locationEntity.setProperty(name, property);
         }
         
         // Adds timestamp
         locationEntity.setProperty("timestamp", (long)System.currentTimeMillis());
         return locationEntity;
    }

/************************************************************************* 
    * This method extracts data from a newly queried Loccation entity and  
    * and creates a com.tracecovid.entities.LocationModel using that data.
    * 
    * @param: com.google.appengine.api.datastore.Entity 
    * @return: com.tracecovid.services.Location 
    ***/
    public static LocationModel getLocationModel(Entity entity){
        final long id = entity.getKey().getId();
        final String zip = (String)entity.getProperty("zip");
        final String lat =  (String)entity.getProperty("latitude");
        final String lon =  (String)entity.getProperty("longitude");
        final String date = (String)entity.getProperty("date");
        final long ts = (long)entity.getProperty("timestamp");

        final LocationModel location = new LocationModel(id, zip, lat, lon, date, ts);
        return location;
    }


/************************************************************************
      * Queries all the Locations from datatsore in ascending order based on
      * timestamps.
      *
      * @return: locations 
      */
      public static ArrayList<LocationModel> getAllLocations(DatastoreService dataStore){
        ArrayList<LocationModel> locations = new ArrayList<>();
        try{
            Query query = new Query("Locations").addSort("timestamp", SortDirection.DESCENDING);
            PreparedQuery results = dataStore.prepare(query);

            for(Entity entity: results.asIterable()){
                locations.add(getLocationModel(entity)); 
            }
        }catch(Exception e){
            System.out.println(e + " -> Check getAllLocations() method");
        }
         
        return locations;
      }

/************************************************************************
      * Queries all the Locations from datatsore by zip code.
      *
      * @param: zip code
      * @return: locations 
      */

      public static ArrayList<LocationModel> getLocationsByZipCode(String zipCode){
        ArrayList<LocationModel> locations = new ArrayList<>();
        final DatastoreService dataStore = DatastoreServiceFactory.getDatastoreService();
        try{
            final Filter locationByZipCode = new FilterPredicate("zip", FilterOperator.EQUAL, zipCode);
            Query query = new Query("Locations").addSort("timestamp", SortDirection.DESCENDING).setFilter(locationByZipCode);
            PreparedQuery results = dataStore.prepare(query);

            // Load locations 
            for(Entity entity: results.asIterable()){
                locations.add(getLocationModel(entity));
            } 

            // If no Locations matched the zip code, the return all locations
            if(locations.isEmpty()){
                locations = getAllLocations(dataStore);
            }
        }catch(Exception e){
            System.out.println(e + " -> Check getLocationsByZipCode(String) method");
        }
        return locations;
      }
}

