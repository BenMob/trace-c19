package com.tracecovid.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.tracecovid.services.LocationService;
import com.google.appengine.api.datastore.Entity;

@WebServlet("/inLocation")
public class IncomingLocationServlet extends HttpServlet{
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{

     // Creates a location Entity and saves it to datastore and redirects to index.html 
        Entity location = LocationService.createLocationEntity(request);
        LocationService.save(location);
        response.sendRedirect("index.html");
    }
}