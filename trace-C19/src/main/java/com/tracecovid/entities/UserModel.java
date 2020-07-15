package com.tracecovid.entities;
import java.util.Date;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Entity.Builder;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreException;
import com.google.cloud.datastore.Key;
import com.google.cloud.Timestamp;

public class UserModel{ 
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
        username = input.getString("Username");
        email = input.getString("Email");
        password = input.getString("Password");
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
    public boolean save(Datastore dataStore){
        Builder entity;
        if(key == null){
            Key taskKey = dataStore.allocateId(dataStore.newKeyFactory().setKind("User").newKey());
            entity = Entity.newBuilder(taskKey).set("Created_At", Timestamp.now());
        } else {
            entity = Entity.newBuilder(key);
        }
        entity.set("Username", username)
            .set("Email", email)
            .set("Password", password) // TODO: Salt and hash password for security
            .set("Updated_At", Timestamp.now());
            
        try{
            dataStore.put(entity.build());
        }
        catch(DatastoreException ex){
            return false;
        }
        return true;
    }

}