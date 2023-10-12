<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>2st web lab</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
    <link rel='icon' href='img/favicon.ico' type='image/x-icon'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="js/script.js" async defer></script>
</head>

<body>
    <header>
        Babushkin Alexander Mikhailovich P3221 var: 3101
        <button id="clear-table" style="position: fixed; top: 5px; right: 10px; height: 40px;" >clear</button>
    </header>

    <table width="100%">
        <tr>
            <th with="100%">
                <form id="form">

                    <br>

                    <label for="x_value">X: </label>
                    <input id="buttonX1" class="x_val" type="button" onclick="changeColor('buttonX1')" name="x_value"
                        value="-4">-4
                    <input id="buttonX2" class="x_val" type="button" onclick="changeColor('buttonX2')" name="x_value"
                        value="-3">-3
                    <input id="buttonX3" class="x_val" type="button" onclick="changeColor('buttonX3')" name="x_value"
                        value="-2">-2
                    <input id="buttonX4" class="x_val" type="button" onclick="changeColor('buttonX4')" name="x_value"
                        value="-1">-1
                    <input id="buttonX5" class="x_val" type="button" onclick="changeColor('buttonX5')" name="x_value"
                        value="0">0
                    <input id="buttonX6" class="x_val" type="button" onclick="changeColor('buttonX6')" name="x_value"
                        value="1">1
                    <input id="buttonX7" class="x_val" type="button" onclick="changeColor('buttonX7')" name="x_value"
                        value="2">2
                    <input id="buttonX8" class="x_val" type="button" onclick="changeColor('buttonX8')" name="x_value"
                        value="3">3
                    <input id="buttonX9" class="x_val" type="button" onclick="changeColor('buttonX9')" name="x_value"
                        value="4">4

                    <br>
                    <br>

                    <label for="y_field">Y: </label>
                    <input type="text" placeholder="y" name="y_field" maxlength="17" required>

                    <br>
                    <br>

                    <label for="R_value">R: </label>
                    <button id="buttonR1" class="R_val" type="button" onclick="changeColor('buttonR1')" name="R_value"
                        value="1">1</button>
                    <button id="buttonR2" class="R_val" type="button" onclick="changeColor('buttonR2')" name="R_value"
                        value="1.5">1.5</button>
                    <button id="buttonR3" class="R_val" type="button" onclick="changeColor('buttonR3')" name="R_value"
                        value="2">2</button>
                    <button id="buttonR4" class="R_val" type="button" onclick="changeColor('buttonR4')" name="R_value"
                        value="2.5">2.5</button>
                    <button id="buttonR5" class="R_val" type="button" onclick="changeColor('buttonR5')" name="R_value"
                        value="3">3</button>

                    <br>
                    <br>

                    <button type="submit" name="submit">Отправить</button>
                </form>
            </th>
        </tr>
        <tr>
            <th width=100%>
                <div id="error_div"></div>
                <img src="img/coord.png" alt="BRUH" width="20%" height="20%">
            </th>
        </tr>
        <tr>
            <th width=100%>
                <table id="result-table" width="100%">
                    <th width="16.6%">X</th>
                    <th width="16.6%">Y</th>
                    <th width="16.6%">R</th>
                    <th width="16.6%">res</th>
                    <th width="16.6%">execution time</th>
                    <th width="16.6%">time</th>
                </table>
            </th>
        </tr>
    </table>

</body>

</html>