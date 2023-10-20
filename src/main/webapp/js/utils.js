const ERROR_DELAY = 5000;
const TABLE = $("#result-table");
let result_table_element_id = 1;
let result_table = $("#result-table");
let current_button;
let x_button;
let R_button;

export function redirectToMain() {
    window.location.href = "index.jsp";
}

export function areaCheckGetRequest(data, redirectToResult) {
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
                $
                window.location.replace("./result.jsp");
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

export function validate(x, y, R) {
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

export function setColorClick(elementId, className) {
    let element = $(`#${elementId}`);
    element.addClass(className);
}

export function removeColorClick(elementId, className) {
    let element = $(`#${elementId}`);
    element.removeClass(className);
}

export function changeColorSelect(buttonId) {
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

export function showError(msg, delay) {
    error_div.innerText = msg;

    setTimeout(function () {
        error_div.innerText = "";
    }, delay);
}