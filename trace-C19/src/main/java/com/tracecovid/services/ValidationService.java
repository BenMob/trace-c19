package com.tracecovid.services;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.Timestamp;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.IncompleteKey;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Query.*;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery;
import com.google.cloud.datastore.StructuredQuery.CompositeFilter;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;

import com.tracecovid.entities.UserModel;

import java.util.List;


public class ValidationService {
    public static boolean checkUser(String email,String username) 
    {
        boolean st =false;
        try {
            Datastore ds = DatastoreOptions.getDefaultInstance().getService();
            Query<Entity> query = Query.newEntityQueryBuilder().setKind("User").setFilter(PropertyFilter.eq("Email", email)).build();
            QueryResults<Entity> entities = ds.run(query);

            st = entities.hasNext();

            if (!st) {
                query = Query.newEntityQueryBuilder().setKind("User").setFilter(PropertyFilter.eq("Username", username)).build();
                entities = ds.run(query);
                st = entities.hasNext();
            }

        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return st;                 
    }
    public static boolean login(String email,String username,String pass) 
    {
        try {
            Datastore ds = DatastoreOptions.getDefaultInstance().getService();
            Query<Entity> query = Query.newEntityQueryBuilder().setKind("User").setFilter(PropertyFilter.eq("Email", email)).build();
            QueryResults<Entity> entities = ds.run(query);

            if (!entities.hasNext()) {
                query = Query.newEntityQueryBuilder().setKind("User").setFilter(PropertyFilter.eq("Username", username)).build();
                entities = ds.run(query);
            }

            Entity User = entities.next();
            if(User != null && User.getString("Password").equals(pass)){
                return true;
            }
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return false;           

    }   

     public static boolean createUser(String email,String username,String password) 
    {
        try {
            Datastore ds = DatastoreOptions.getDefaultInstance().getService();

            UserModel user = new UserModel();
            user.setEmail(email);
            user.setUserName(username);
            user.setPassword(password);

            user.save(ds);
            return true;
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return false;                 
    }   

}
