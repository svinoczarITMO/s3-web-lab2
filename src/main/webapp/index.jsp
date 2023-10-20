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
    <div>
    <header>
        Babushkin Alexander Mikhailovich P3221 var: 2145
        <button id="clear-table" style="position: fixed; top: 5px; right: 10px; height: 40px;" >clear</button>
    </header>
    </div>

    <div class="main">
    <table width="100%">
        <tr>
            <th with="100%">
                <form id="input-form">

                    <br>

                    <label for="x_value">X: </label>
                    <button id="buttonX1" class="x_val" type="button" onclick="changeColorSelect('buttonX1')" name="x_value" value="-5">-5</button>
                    <button id="buttonX2" class="x_val" type="button" onclick="changeColorSelect('buttonX2')" name="x_value" value="-4">-4</button>
                    <button id="buttonX3" class="x_val" type="button" onclick="changeColorSelect('buttonX3')" name="x_value" value="-3">-3</button>
                    <button id="buttonX4" class="x_val" type="button" onclick="changeColorSelect('buttonX4')" name="x_value" value="-2">-2</button>
                    <button id="buttonX5" class="x_val" type="button" onclick="changeColorSelect('buttonX5')" name="x_value" value="-1">-1</button>
                    <button id="buttonX6" class="x_val" type="button" onclick="changeColorSelect('buttonX6')" name="x_value" value="0">0</button>
                    <button id="buttonX7" class="x_val" type="button" onclick="changeColorSelect('buttonX7')" name="x_value" value="1">1</button>
                    <button id="buttonX8" class="x_val" type="button" onclick="changeColorSelect('buttonX8')" name="x_value" value="2">2</button>
                    <button id="buttonX9" class="x_val" type="button" onclick="changeColorSelect('buttonX9')" name="x_value" value="3">3</button>

                    <br>
                    <br>

                    <label for="y_field">Y: </label>
                    <input type="text" placeholder="y" name="y_field" maxlength="17" required>

                    <br>
                    <br>

                    <label for="R_value">R: </label>
                    <button id="buttonR1" class="R_val" type="button" onclick="changeColorSelect('buttonR1')" name="R_value" value="1">1</button>
                    <button id="buttonR2" class="R_val" type="button" onclick="changeColorSelect('buttonR2')" name="R_value" value="1.5">1.5</button>
                    <button id="buttonR3" class="R_val" type="button" onclick="changeColorSelect('buttonR3')" name="R_value" value="2">2</button>
                    <button id="buttonR4" class="R_val" type="button" onclick="changeColorSelect('buttonR4')" name="R_value" value="2.5">2.5</button>
                    <button id="buttonR5" class="R_val" type="button" onclick="changeColorSelect('buttonR5')" name="R_value" value="3">3</button>

                    <br>
                    <br>

                    <button type="submit" name="submit">Отправить</button>
                </form>
            </th>
        </tr>
        <tr>
            <th width=100%>
                <div id="error_div"></div>
                <div class="window">
                    <svg width="400" height="400">
                        <%-- PALOCHKIN --%>
                        <line x1="0" y1="200" x2="400" y2="200" stroke="black" stroke-width="2"/>
                        <line x1="200" y1="0" x2="200" y2="400" stroke="black" stroke-width="2"/>
                        <%-- STRELOCHKI --%>
                        <polygon points="400,200 390,195 390,205" fill="black"/>
                        <polygon points="200,0 195,10 205,10" fill="black"/>

                        <%-- OTMETOCHKI X --%>
                        <line x1="50" y1="195" x2="50" y2="205" stroke="black" stroke-width="2"/>
                        <line x1="125" y1="195" x2="125" y2="205" stroke="black" stroke-width="2"/>
                        <line x1="275" y1="195" x2="275" y2="205" stroke="black" stroke-width="2"/>
                        <line x1="350" y1="195" x2="350" y2="205" stroke="black" stroke-width="2"/>
                        <line x1="450" y1="195" x2="450" y2="205" stroke="black" stroke-width="2"/>

                        <text x="45" y="220" font-size="13">-R</text>
                        <text x="110" y="220" font-size="13">-R/2</text>
                        <text x="265" y="220" font-size="13">R/2</text>
                        <text x="345" y="220" font-size="13">R</text>

                        <%-- OTMETOCHKI Y --%>
                        <line x1="195" y1="50" x2="205" y2="50" stroke="black" stroke-width="2"/>
                        <line x1="195" y1="125" x2="205" y2="125" stroke="black" stroke-width="2"/>
                        <line x1="195" y1="275" x2="205" y2="275" stroke="black" stroke-width="2"/>
                        <line x1="195" y1="350" x2="205" y2="350" stroke="black" stroke-width="2"/>
                        <line x1="195" y1="450" x2="205" y2="450" stroke="black" stroke-width="2"/>

                        <text x="180" y="55" font-size="13">R</text>
                        <text x="173" y="129" font-size="13">R/2</text>
                        <text x="169" y="279" font-size="13">-R/2</text>
                        <text x="180" y="355" font-size="13">-R</text>

                        <%-- a quarter of circle --%>
                        <path d="M 200 350 A 150 150 0 0 1 50 200 L 200 200 Z" fill="rgba(150, 228, 255, 0.5)" stroke="black"
                                stroke-width="1"/>

                        <%-- triangle --%>
                        <polygon points="50,200 200,200 200,50" fill="rgba(150, 228, 255, 0.5)" stroke="black"
                                stroke-width="1"></polygon>
                        <%-- pryamougol'nik --%>
                        <polygon points="200,200 350,200 350,250 200,250" fill="rgba(150, 228, 255, 0.5)" stroke="black"
                                stroke-width="1"></polygon>
                    </svg>
                </div>
                <%-- <div class="coord">
                    <img src="img/coord.png" alt="BRUH" width="20%" height="20%"> --%>
                    <%-- <svg xmlns="img/coord.svg" width="160px" height="160px" style="position: absolute; top: 213px; left: 500px;"> penis </svg> --%>
                    <%-- <svg xmlns="img/coord.svg"> penis </svg> --%>
                <%-- </div> --%>
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
    </div>
</body>

</html>