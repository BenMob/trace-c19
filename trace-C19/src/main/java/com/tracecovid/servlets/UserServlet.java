
package com.tracecovid.servlets;


import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tracecovid.services.ValidationService;

@WebServlet("/add-user")
public class UserServlet extends HttpServlet{

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //check valid password
        //check valid user
        //add user to database
        //aharris-sps-summer20:us-central1:trace-covid
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        String NewUser= request.getParameter("NewUser");
        String NewPass= request.getParameter("NewPass");
        
        if(ValidationService.checkUser("", NewUser, NewPass))
        {
            RequestDispatcher rs = request.getRequestDispatcher("Welcome");
            rs.forward(request, response);
        }
        else
        {
           out.println("Username or Password incorrect");
           RequestDispatcher rs = request.getRequestDispatcher("index.html");
           rs.include(request, response);
        }

    }
}

