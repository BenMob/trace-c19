
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

@WebServlet(name = "UserServlet", urlPatterns ="/add-user")
public class UserServlet extends HttpServlet{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().print("Testing");
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        


        //aharris-sps-summer20:us-central1:trace-covid
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        String NewEmail= request.getParameter("NewEmail");
        String NewUser= request.getParameter("NewUser");
        String NewPass= request.getParameter("NewPass");
        String NewPassConfirm= request.getParameter("NewPassConfirmation");

        RequestDispatcher rs = request.getRequestDispatcher("signup.jsp");
        if(!NewPass.equals(NewPassConfirm)){
            request.setAttribute("error", "Passwords do not match");
            rs.forward(request, response);
             System.out.println("error creating user passwords do not match");
            return;
        }
        if(ValidationService.checkUser(NewEmail, NewUser)) 
        {
            request.setAttribute("error", "Email or username already taken");
            rs.forward(request, response);
             System.out.println("error creating user already taken");
        }
        else
        {
            if(ValidationService.createUser(NewEmail, NewUser, NewPass)){
                System.out.println("loggedIn " + NewEmail);
                rs = request.getRequestDispatcher("login.jsp"); 
                rs.forward(request, response);
                return;
            }
            request.setAttribute("error", "Error creating user");
            rs.forward(request, response);
        }
    }
}

