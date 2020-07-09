package com.tracecovid.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/outLocation")
public class OutgoingLocationServlet extends HttpServlet{
    //public void init() throws ServletException{
        //zipCode ="lat.get()"
    //}
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
        //response.setContentType("text/html");
        //PrintWriter out = response.getWriter();
        //out.println("<h1>" + zipCode+"</h1>" );
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        
    }
}