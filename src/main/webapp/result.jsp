<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
        <script src="js/script.js" async defer></script>
    </head>
     <body>
        <header>
            Babushkin Alexander Mikhailovich P3221 var: 2145
        </header>
        <div id="result-div">
        Hit:${resultRow.isHit()}
        <br>
        X:${resultRow.getX()}
        <br>
        Y:${resultRow.getY()}
        <br>
        R:${resultRow.getR()}
        <br>
        Time:${resultRow.getFormattedTime()}
        <br>
        Execution time:${resultRow.getExecutionTime()}
        <br>
        <button class="return-buttons" onclick="redirectToMain()">Return</button>
        </div>
    </body>
</html>