package com.tracecovid.servlets;

import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.tracecovid.services.LocationService;
import com.tracecovid.entities.LocationModel;
import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/outLocation")
public class OutgoingLocationServlet extends HttpServlet{
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        List<LocationModel> locations = LocationService.getLocationsByZipCode(DatastoreServiceFactory.getDatastoreService(), request.getParameter("zip"));

        //Prints Query results log on the console
        System.out.println("\n\n\n--- QUERYING ZIP: " + request.getParameter("zip"));
        locations.forEach(loc -> {
            System.out.println(loc.toString());
        });
        System.out.println("\n\n\n");
        
        response.setContentType("application/json;");
        response.getWriter().println(LocationService.toJson(locations));
    }
}