<%@ page import="data.CollisionData" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c2" %>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <%-- <script src="js/script.js" async defer></script> --%>
    </head>
     <body>
        <header>
            Babushkin Alexander Mikhailovich P3221 var: 2145
        </header>
        <div id="result-div">
            <table>
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Collision</th>
                    <th>Exec Time (ms)</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                <%
                    List<CollisionData> sessionList = (List<CollisionData>) session.getAttribute("sessionList");
                    if (sessionList != null && !sessionList.isEmpty()) {
                        CollisionData lastSession = sessionList.get(sessionList.size() - 1);
                %>
                <tr>
                    <td><%= lastSession.getX() %></td>
                    <td><%= lastSession.getY() %></td>
                    <td><%= lastSession.getR() %></td>
                    <td><%= lastSession.isCollision() %></td>
                    <td><%= lastSession.getExecutionTime() %></td>
                    <td><%= lastSession.getTime() %></td>
                </tr>
                <%
                    }
                %>
                </tbody>
            </table>
            <button onClick="window.location.replace('./index.jsp');" type="reset">←</button>
        </div>
    </body>
</html>