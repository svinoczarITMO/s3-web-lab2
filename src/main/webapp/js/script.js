const ERROR_DELAY = 5000;
const TABLE = $("#result-table");

let currentButtonId;

if (localStorage.length > 0) {
    console.log(localStorage[0])
    Object.keys(localStorage).forEach((key) => {
        try {
            const result = JSON.parse(localStorage.getItem(key));
            const content = `<tr>
                <td>${result.x}</td>
                <td>${result.y}</td>
                <td>${result.R}</td>
                <td>${result.collision}</td>
                <td>${result.execTime}</td>
                <td>${result.time}</td>
                </tr>`;
            TABLE.innerHTML += content;
        } catch (error) {
            console.error(`Ошибка разбора JSON для ключа ${key}`);
        }
    });
} else {
    TABLE.innerHTML = `<th width="16.6%">X</th>
                    <th width="16.6%">Y</th>
                    <th width="16.6%">R</th>
                    <th width="16.6%">res</th>
                    <th width="16.6%">execution time</th>
                    <th width="16.6%">time</th>`;
}

function redirectToMain() {
    window.location.href = "index.jsp";
}

function areaCheckGetRequest(data, redirectToResult) {
    $.ajax({
        type: "GET",
        headers: {},
        url: "/s3-web-lab2/controller",
        async: false,
        data: data,
        success: function (responseData) {
            console.log(`responseData: ${responseData}`)
            console.log(`response.type: ${responseData.type}`)
            console.log(`response.x: ${responseData.x}`)
            console.log(`response.y: ${responseData.y}`)
            console.log(`response.R: ${responseData.R}`)
            console.log(`response.collision: ${responseData.collision}`)
            console.log(`response.execTime: ${responseData.executionTime}`)
            console.log(`response.time: ${responseData.time}`)
            localStorage.setItem(localStorage.length + 1, JSON.stringify({
                x: responseData.x,
                y: responseData.y,
                R: responseData.R,
                collision: responseData.collision,
                time: responseData.time,
                execTime: responseData.executionTime,
            }));
            const content = `<tr>
                     <td>${responseData.x}</td>
                     <td>${responseData.y}</td>
                     <td>${responseData.R}</td>
                     <td>${responseData.collision}</td>
                     <td>${responseData.executionTime}s</td>
                     <td>${responseData.time}</td>
                     </tr>`;
            TABLE.innerHTML += content;
            if (redirectToResult) {
                window.location.replace("./results.jsp");
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

function changeColorSelect(buttonId) {
    if (currentButtonId) {
        var previousButton = $(`#${currentButtonId}`);
        previousButton.removeClass("green");
    }

    var button = $(`#${buttonId}`);
    button.addClass("green");
    currentButtonId = buttonId;
}

function setColorClick(elementId, className) {
    var element = $(`#${elementId}`);
    element.addClass(className);
}

function removeColorClick(elementId, className) {
    var element = $(`#${elementId}`);
    element.removeClass(className);
}

function showError(msg, delay) {
    error_div.innerText = msg;

    setTimeout(function () {
        error_div.innerText = "";
    }, delay);
}

$(document).ready(function () {
    let clicked_points = [];

    $("#clear-table").on("click", function () {
        localStorage.clear();
        TABLE.innerHTML = `<th width="16.6%">X</th>
                       <th width="16.6%">Y</th>
                       <th width="16.6%">R</th>
                       <th width="16.6%">res</th>
                       <th width="16.6%">execution time</th>
                       <th width="16.6%">time</th>`;
        setColorClick("clear-table", "green");
        setTimeout(function () {
            removeColorClick("clear-table", "green");
        }, 250);
    });

    let x_values = [];
    $(".x_val").click(function (event) {
        x_values.push($(this).val());
        changeColorSelect($(this).attr("id"));
    });

    let R_values = [];
    $(".R_val").click(function (event) {
        R_values.push($(this).val());
        changeColorSelect($(this).attr("id"));
    });

    $("#input-form").submit(function (event) {
        event.preventDefault();
        const x = x_values[x_values.length - 1];
        const y = $("input[name='y_field']").val();
        const R = R_values[R_values.length - 1];

        console.log(x, y, R);

        if (validate(x, y, R)) {
            areaCheckGetRequest({ x: x, y: y, R: R }, false);
        } else {
            showError(
                "Проверьте корректность введенных значений!\nx ∈ [-4; 4]\ny ∈ [-3; 5]\nR ∈ [1; 5]",
                5000
            );
        }
    });
});
