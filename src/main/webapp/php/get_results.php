<?php
session_start();

// Проверяем, есть ли сохраненные результаты в сессии
if (isset($_SESSION['results'])) {
    $savedResults = $_SESSION['results'];
} else {
    $savedResults = array(); // Если результатов нет, создаем пустой массив
}

// Отправляем сохраненные результаты в формате JSON
header('Content-type: application/json');
echo json_encode($savedResults);
