package servlets;

import com.google.gson.Gson;
import data.CollisionData;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet("/loadHistory")
public class LoadHistoryServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            HttpSession session = request.getSession(false);
            if (session != null) {
                List<CollisionData> sessionList = (List<CollisionData>) session.getAttribute("sessionList");
                Gson gson = new Gson();
                String json = gson.toJson(sessionList);
                response.setContentType("application/json");
                response.getWriter().write(json);
            } else {
                response.setStatus(404);
            }
        } catch (Exception e) {
            getServletContext().setAttribute("error", e.getMessage());
            request.getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

}