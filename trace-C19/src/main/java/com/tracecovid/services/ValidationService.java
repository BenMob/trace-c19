package com.tracecovid.services;

import java.sql.*;


public class ValidationService {
    public static boolean checkUser(String email,String username) 
    {
        boolean st =false;
        try {

            //loading drivers for mysql
            Class.forName("com.mysql.jdbc.Driver");

            //creating connection with the database
            //34.66.144.100
            Connection con = DriverManager.getConnection("jdbc:mysql://34.66.144.100:3306/applicationDatabase","application","password123");
            PreparedStatement ps = con.prepareStatement("select * from users where (email like ? or username like ?)");
            ps.setString(1, email);
            ps.setString(2, username);
            ResultSet rs =ps.executeQuery();
            st = rs.next();

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

            //loading drivers for mysql
            Class.forName("com.mysql.jdbc.Driver");

            //creating connection with the database
            //34.66.144.100
            Connection con = DriverManager.getConnection("jdbc:mysql://34.66.144.100:3306/applicationDatabase","application","password123");
            PreparedStatement ps = con.prepareStatement("insert into users (`email`, `username`, `password`) values (?,?,sha(?))");
            ps.setString(1, email);
            ps.setString(2, username);
            ps.setString(3, password);
            int rs =ps.executeUpdate();
            st=(rs>0);

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

            //loading drivers for mysql
            Class.forName("com.mysql.jdbc.Driver");

            //creating connection with the database
            //34.66.144.100
            Connection con = DriverManager.getConnection("jdbc:mysql://34.66.144.100:3306/applicationDatabase","application","password123");
            PreparedStatement ps = con.prepareStatement("select * from users where (email like ? or username like ?) and password=SHA(?)");
            ps.setString(1, email);
            ps.setString(2, username);
            ps.setString(3, pass);
            ResultSet rs =ps.executeQuery();
            st = rs.next();

        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return st;                 
    }   

}