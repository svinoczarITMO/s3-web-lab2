package servlets;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/checkArea")
public class AreaCheckServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            float x = Float.parseFloat(request.getParameter("x"));
            float y = Float.parseFloat(request.getParameter("y"));
            float R = Float.parseFloat(request.getParameter("R"));

            if (validate(x, y, R)) {
                ResultRow resRow = new ResultRow(); // FIXME Переделать под http сессию
                double start = System.nanoTime();
                resRow.setHit(checkHit(x, y, R));
                resRow.setX(x);
                resRow.setY(y);
                resRow.setR(R);
                resRow.setCurrentTime(LocalDateTime.now());

                double execTime = Math.round(((System.nanoTime() - start) * 0.00001) * 100.0) / 100.0;
                resRow.setExecutionTime(execTime);
                ResultTable resultTable = (ResultTable) request.getAttribute("resultTable");
                resultTable.addNewElement(resRow);
                getServletContext().setAttribute("resultRow", resRow);
                getServletContext().setAttribute("resultTable", resultTable);
            }
        } catch (Exception e) {
            getServletContext().setAttribute("error", e.getMessage());
            request.getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    public boolean validate(float x, float y, float R) {
        if (3 < x || x < -5 || 5 < y || y < -3 || R == 1 || R == 1.5 || R == 2 || R == 2.5 || R == 3)
            return false;
        return true;
    }

    public boolean checkHit(float x, float y, float R) {
        // Triangle 2nd quarter.
        if (Math.abs(x) + Math.abs(y) <= R) { //FIXME rewrite if
            return true;
        }
        // Circle 3rd quarter.
        float dist = (float)Math.sqrt(x*x + y*y);
        if (dist < R && x < 0 && y < 0) {
            return true;
        }
        // Square 4th quarter.
        if (x < R && 0 < x || y < 0 && -0.5*R < y) {
            return true;
        }
        return false;
    }
}