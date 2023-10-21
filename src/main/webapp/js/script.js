let result_table_element_id = 1;
let result_table = $("#result-table");
let current_button;
let x_button;
let R_button;

function areaCheckGetRequest(data, redirectToResult) {
    $.ajax({
        type: "GET",
        headers: {},
        url: "/s3-web-lab2/controller",
        async: false,
        data: data,
        success: function (responseData) {
            console.log(
                `response.x: ${responseData.x}, response.y: ${responseData.y}, response.R: ${responseData.R},\n` +
                    `response.collision: ${responseData.collision}, response.execTime: ${responseData.executionTime}, response.time: ${responseData.time}`
            );
            sessionStorage.setItem(
                sessionStorage.length + 1,
                JSON.stringify({
                    x: responseData.x,
                    y: responseData.y,
                    R: responseData.R,
                    collision: responseData.collision,
                    time: responseData.time,
                    execTime: responseData.executionTime,
                })
            );
            const content = `<tr>
                     <td>${responseData.x}</td>
                     <td>${responseData.y}</td>
                     <td>${responseData.R}</td>
                     <td>${responseData.collision}</td>
                     <td>${responseData.executionTime}s</td>
                     <td>${responseData.time}</td>
                     </tr>`;
            result_table.append(content);
            result_table_element_id += 1;
            if (redirectToResult) {
                window.location.href = "./result.jsp";
            } else {
                console.log("successful request");
            }
        },
        error: function (xhr, textStatus, error) {
            console.log(
                "readyState: " +
                    xhr.readyState +
                    "\n" +
                    "responseText: " +
                    xhr.responseText +
                    "\n" +
                    "status: " +
                    xhr.status +
                    "\n" +
                    "text status: " +
                    textStatus +
                    "\n" +
                    "error: " +
                    error
            );
        },
    });
}

function validate(x, y, R) {
    if (3 < x || x < -5) {
        console.log("X BRUH");
        return false;
    }
    if (5 < y || y < -3) {
        console.log("Y BRUH");
        return false;
    }
    if (R < 1 || 3 < R) {
        console.log("R BRUH");
        return false;
    }
    return true;
}

function setColorClick(elementId, className) {
    let element = $(`#${elementId}`);
    element.addClass(className);
}

function removeColorClick(elementId, className) {
    let element = $(`#${elementId}`);
    element.removeClass(className);
}

function changeColorSelect(buttonId) {
    let button = $(`#${buttonId}`);
    console.log(`current_button_id: ${current_button}`);
    if (current_button) {
        if (x_button && button.attr(`class`) === "x_val") {
            x_button.removeClass("green");
            x_button = button;
        }
        if (R_button && button.attr(`class`) === "R_val") {
            R_button.removeClass("green");
            R_button = button;
        }
    }
    button.addClass("green");
    current_button = button;
}

function showError(msg, delay) {
    error_div.innerText = msg;

    setTimeout(function () {
        error_div.innerText = "";
    }, delay);
}

$(document).ready(function () {
    if (sessionStorage.length > 0) {
        console.log(sessionStorage[0]);
        Object.keys(sessionStorage).forEach((key) => {
            try {
                const result = JSON.parse(sessionStorage.getItem(key));
                // if (result.x) {
                    const content = `<tr>
                    <td>${result.x}</td>
                    <td>${result.y}</td>
                    <td>${result.R}</td>
                    <td>${result.collision}</td>
                    <td>${result.execTime}</td>
                    <td>${result.time}</td>
                    </tr>`;
                    result_table.append(content);
                // } else {
                    // console.log("Произошло что-то странное при загрузке страницы")
                // }
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
            showError(
                "Проверьте корректность введенных значений!\nx ∈ [-5; 3]\ny ∈ [-3; 5]\nR ∈ [1; 3]",
                5000
            );
        }
    });

    $(".window svg").click(function (event) {
        let clicked_points = [];
        if (R_button) {
            const x = event.offsetX;
            const y = event.offsetY;

            const R = R_button.val();

            let point = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );
            point.setAttribute("cx", x);
            point.setAttribute("cy", y);
            point.setAttribute("r", "3");
            point.setAttribute("fill", "blue");

            $("svg").append(point);

            let normalizedX = (((x - 200) * 2 * R) / 300).toFixed(2);
            let normalizedY = (((200 - y) * 2 * R) / 300).toFixed(2);

            console.log(`x: ${x}, normX: ${normalizedX}`);
            console.log(`y: ${y}, normY: ${normalizedY}`);
            console.log(clicked_points[clicked_points.length - 1]);

            areaCheckGetRequest(
                { x: normalizedX, y: normalizedY, R: R },
                false
            );
        } else {
            showError("Укажите параметр R!", 5000);
        }
    });
});
