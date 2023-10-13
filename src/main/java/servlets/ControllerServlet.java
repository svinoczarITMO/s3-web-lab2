package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    // private ResultTable resultTable;

    public void doGet (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            getServletContext().getRequestDispatcher("/checkArea").forward(request, response);
        } catch (Exception e) {
            getServletContext().setAttribute("error", e.getMessage());
            request.getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}