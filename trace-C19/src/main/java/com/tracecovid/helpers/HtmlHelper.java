package com.tracecovid.helpers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

import com.tracecovid.entities.UserModel;

public class HtmlHelper {
    public static String NavBar(HttpServletRequest request) {
        UserModel user = (UserModel)request.getSession().getAttribute("user");
        String navBar = "<div class=\"collapse navbar-collapse\" id=\"navbarNav\">"
            + "<ul class=\"navbar-nav\">"
            + "<li class=\"nav-item\">"
            + "<a class=\"nav-link\" href=\"/index.jsp\">Home</a>"
            + "</li>"
            + "<li class=\"nav-item\">"
            + "<a class=\"nav-link\" href=\"#\">About Us</a>"
            + "</li>"
            + "<li class=\"nav-item\">"
            + "<a class=\"nav-link\" href=\"#\">Contact</a>"
            + "</li>";
        if (user != null) {
            navBar += "<li class=\"nav-item\">"
                + "<a class=\"nav-link\" href=\"profile.jsp\" target=\"_\">Profile</a>"
                + "</li>"
                + "<li class=\"nav-item\">"
                + "<a class=\"nav-link\" href=\"login\" target=\"_\">Log Out</a>"
                + "</li>";
        } else {
            navBar += "<li class=\"nav-item\">"
                + "<a class=\"nav-link\" href=\"signup.jsp\">Log In/Sign Up</a>"
                + "</li>";
        }
        navBar += "<li class=\"nav-item\">"
            + "<a class=\"nav-link\" href=\"#\" target=\"_\">Contribute</a>"
            + "</li>"
            + "</ul>"
            + "</div>";
        return navBar;
    }
}