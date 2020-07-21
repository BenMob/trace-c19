package com.tracecovid.entities;
import java.util.Date;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.DatastoreServiceFactory;

// import com.google.appengine.api.datastore.Entity.Builder;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Key;
// import com.google.appengine.api.datastore.Key;

import java.io.Serializable;

public class UserModel implements Serializable { 
    private Key key;
    private String username;
    private String email;
    private String password;

    public UserModel(){
        key = null;
        username = "";
        email = "";
        password = "";
    }
    public UserModel(Entity input){
        key = input.getKey();
        username = (String)input.getProperty("Username");
        email = (String)input.getProperty("Email");
        password = (String)input.getProperty("Password");
    }
    public String getUserName(){
        return username;
    }
    public void setUserName(String UserName){
        username = UserName;
    }
     public String getPassword(){
        return password;
    }
     public void setPassword(String Password){
        password = Password;
    }
     public String getEmail(){
        return email;
    }
     public void setEmail(String Email){
        email = Email;
    }

    @Override
    public String toString() {
        return "UserModel [key=" + key + "username=" + username + ", email=" + email + "]";
    }

    public boolean save(){
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity=new Entity("User");
        Date date = new Date();
        entity.setProperty("Username", username);
        entity.setProperty("Email", email);
        entity.setProperty("Password", password); // TODO: Salt and hash password for security
        entity.setProperty("Updated_At", date.toString());
            
        try{
            datastore.put(entity);
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

}