
package com.tracecovid.servlets;


import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import com.tracecovid.services.ValidationService;

@WebServlet(name = "LoginServlet", urlPatterns ="/login")
public class LoginServlet extends HttpServlet{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().print("Testing");
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       
        //aharris-sps-summer20:us-central1:trace-covid
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        String NewUser= request.getParameter("User");
        String NewPass= request.getParameter("Pass");
        
        if(ValidationService.login(NewUser, NewUser, NewPass))
        {
            // RequestDispatcher rs = request.getRequestDispatcher("Welcome");
            // rs.forward(request, response);

            out.print("Login Successful");
        }
        else
        {
           out.println("Username or Password incorrect");
           RequestDispatcher rs = request.getRequestDispatcher("index.html");
           rs.include(request, response);
        }

    }
}

