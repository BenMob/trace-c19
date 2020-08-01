package com.tracecovid.services;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

import com.google.appengine.api.datastore.Entity;
// import com.google.appengine.api.datastore.FullEntity;
// import com.google.appengine.api.datastore.IncompleteKey;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query.*;
import com.google.appengine.api.datastore.Query;
// import com.google.appengine.api.QueryResults;
// import com.google.appengine.api.datastore.StructuredQuery;
// import com.google.appengine.api.datastore.StructuredQuery.CompositeFilter;
// import com.google.appengine.api.datastore.StructuredQuery.PropertyFilter;

import com.tracecovid.entities.UserModel;

import java.util.List;


public class ValidationService {
    public static boolean checkUser(String email,String username) 
    {
        boolean st =false;
        try {
            DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
            Filter filterByEmail = new FilterPredicate("Email", FilterOperator.EQUAL, email);
            Query query = new Query("User").setFilter(filterByEmail);
            // QueryResults<Entity> entities = ds.run(query);
            PreparedQuery results = datastore.prepare(query);
            for (Entity entity : results.asIterable()) {
                st = true;
                break;                
            } 

            if (!st) {
                Filter filterByUsername = new FilterPredicate("Username", FilterOperator.EQUAL, email);
                query = new Query("User").setFilter(filterByUsername);
                results = datastore.prepare(query);
                for (Entity entity : results.asIterable()) {
                    st = true;
                    break;                
                } 
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return st;                 
    }
    public static UserModel login(String email,String username,String pass) 
    {
        try {
            DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
            Filter filterByEmail = new FilterPredicate("Email", FilterOperator.EQUAL, email);
            Query query = new Query("User").setFilter(filterByEmail);
            PreparedQuery results = datastore.prepare(query);
            boolean got_email =  false;
            for (Entity entity : results.asIterable()) {
                got_email = true;
                if (entity != null && entity.getProperty("Password").equals(pass)) {
                    return new UserModel(entity);
                }
            }
            if (!got_email) {
                Filter filterByUsername = new FilterPredicate("Username", FilterOperator.EQUAL, email);
                query = new Query("User").setFilter(filterByUsername);
                results = datastore.prepare(query);
                for (Entity entity : results.asIterable()) {
                    got_email = true;
                    if (entity != null && entity.getProperty("Password").equals(pass)) {
                        return new UserModel(entity);
                    }
                }
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return null;           

    }   

     public static boolean createUser(String email,String username,String password) 
    {
        try {
            UserModel user = new UserModel();
            user.setEmail(email);
            user.setUserName(username);
            user.setPassword(password);
            user.save();
            return true;
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return false;                 
    }   

}
