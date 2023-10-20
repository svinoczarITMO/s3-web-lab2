import {redirectToMain} from './script.js';
import {areaCheckGetRequest} from './script.js';
import {validate} from './script.js';
import {setColorClick} from './script.js';
import {removeColorClick} from './script.js';
import {changeColorSelect} from './script.js';
import {showError} from './script.js';

$(document).ready(function () {
    if (sessionStorage.length > 0) {
        console.log(sessionStorage[0]);
        Object.keys(sessionStorage).forEach((key) => {
            try {
                const result = JSON.parse(sessionStorage.getItem(key));
                const content = `<tr>
                    <td>${result.x}</td>
                    <td>${result.y}</td>
                    <td>${result.R}</td>
                    <td>${result.collision}</td>
                    <td>${result.execTime}</td>
                    <td>${result.time}</td>
                    </tr>`;
                result_table.append(content);
            } catch (error) {
                console.error(`Ошибка разбора JSON для ключа ${key}`);
            }
        });
    } else {
        const content = `<th width="16.6%">X</th>
                        <th width="16.6%">Y</th>
                        <th width="16.6%">R</th>
                        <th width="16.6%">res</th>
                        <th width="16.6%">execution time</th>
                        <th width="16.6%">time</th>`;
        result_table.html(content);
        result_table_element_id += 1;
    }

    $("#clear-table").click(function () {
        sessionStorage.clear();
        const content = `<th width="16.6%">X</th>
                        <th width="16.6%">Y</th>
                        <th width="16.6%">R</th>
                        <th width="16.6%">res</th>
                        <th width="16.6%">execution time</th>
                        <th width="16.6%">time</th>`;
        result_table.html(content);
        setColorClick("clear-table", "green");
        setTimeout(function () {
            removeColorClick("clear-table", "green");
        }, 250);
    });

    $(".x_val").click(function (event) {
        x_button = $(this);
        changeColorSelect($(this).attr("id"));
    });

    $(".R_val").click(function (event) {
        R_button = $(this);
        changeColorSelect($(this).attr("id"));
    });

    $("#input-form").submit(function (event) {
        event.preventDefault();
        const x = x_button.val();
        const y = $("input[name='y_field']").val();
        const R = R_button.val();

        console.log(x, y, R);

        if (validate(x, y, R)) {
            areaCheckGetRequest({ x: x, y: y, R: R }, true);
        } else {
            showError("Проверьте корректность введенных значений!\nx ∈ [-5; 3]\ny ∈ [-3; 5]\nR ∈ [1; 3]", 5000);
        }
    });

    $('.window svg').click(function(event) {
        let clicked_points = [];
        if (R_button) {
            const x = event.offsetX;
            const y = event.offsetY;

            const R = R_button.val();

            let point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('cx', x);
            point.setAttribute('cy', y);
            point.setAttribute('r', '3');
            point.setAttribute('fill', 'blue');

            $('svg').append(point);

            let normalizedX = (((x - 200) * 2 * R) / 300).toFixed(2);
            let normalizedY = (((200 - y) * 2 * R) / 300).toFixed(2);

            console.log(`x: ${x}, normX: ${normalizedX}`)
            console.log(`y: ${y}, normY: ${normalizedY}`)
            console.log(clicked_points[clicked_points.length-1])

            areaCheckGetRequest({"x": normalizedX, "y": normalizedY, "R": R}, false)
        } else {
            showError("Укажите параметр R!", 5000);
        }
      });
});