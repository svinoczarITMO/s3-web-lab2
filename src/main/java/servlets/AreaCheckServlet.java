package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import data.CollisionData;

@WebServlet("/checkArea")
public class AreaCheckServlet extends HttpServlet {
    private Gson gson = new Gson();

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            float x = Float.parseFloat(request.getParameter("x"));
            float y = Float.parseFloat(request.getParameter("y"));
            float R = Float.parseFloat(request.getParameter("R"));
            double start = System.currentTimeMillis();
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
            DecimalFormat decimalFormat = new DecimalFormat("0.0000");
            String time = now.format(formatter);

            if (validate(x, y, R)) {
                boolean collision = checkHit(x, y, R);
                double execTime = (System.currentTimeMillis() - start) / 1000.0;
                String executionTime = decimalFormat.format(execTime);
                CollisionData data = new CollisionData(collision, x, y, R, time, executionTime);
                String jsonData = this.gson.toJson(data);

                PrintWriter out = response.getWriter();
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                out.println(jsonData);
                out.flush();
            }
        } catch (Exception e) {
            getServletContext().setAttribute("error", e.getMessage());
            request.getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    public boolean validate(float x, float y, float R) {
        if (3 < x || x < -5) {
            return false;
        }
        if (5 < y || y < -3) {
            return false;
        }
        if (R < 1 || 3 < R) {
            return false;
        }
        return true;
    }

    public boolean checkHit(float x, float y, float R) {
        // Triangle 2nd quarter.
        if (Math.abs(x) + Math.abs(y) <= R) { // FIXME rewrite if
            return true;
        }
        // Circle 3rd quarter.
        float dist = (float) Math.sqrt(x * x + y * y);
        if (dist < R && x < 0 && y < 0) {
            return true;
        }
        // Square 4th quarter.
        if (x < R && 0 < x || y < 0 && -0.5 * R < y) {
            return true;
        }
        return false;
    }
}