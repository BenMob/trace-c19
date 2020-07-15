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
    public static boolean createUser(String email,String username,String password) 
    {
        boolean st =false;
        try {




        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return st;                 
    }   
    public static boolean login(String email,String username,String pass) 
    {
        boolean st =false;
        try {

          

        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return st;                 
    }   

}