const ERROR_DELAY = 5000;
const TABLE = $("#result-table");

if (localStorage.length > 0) {
    localStorage.forEach((result) => {
        const content = `<tr>
            <td>${result.x}</td>
            <td>${result.y}</td>
            <td>${result.R}</td>
            <td>${result.collision}</td>
            <td>${result.execTime}</td>
            <td>${result.time}</td>
            </tr>`;
        TABLE.innerHTML += content;
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
        success: function (data) {
            response = data.json();
            localStorage.setItem(localStorage.length + 1, {
                x: response.x,
                y: response.y,
                R: response.R,
                collision: response.collision,
                time: response.time,
                execTime: response.execTime,
            });
            const content = `<tr>
                     <td>${result.x}</td>
                     <td>${result.y}</td>
                     <td>${result.R}</td>
                     <td>${result.collision}</td>
                     <td>${result.exectime}s</td>
                     <td>${result.time}</td>
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
    if (
        3 < x ||
        x < -5 ||
        5 < y ||
        y < -3 ||
        R == 1 ||
        R == 1.5 ||
        R == 2 ||
        R == 2.5 ||
        R == 3
    ) {
        return false;
    }
    return true;
}

function changeColorSelect(buttonId) {
    if (currentButtonId) {
        var previousButton = document.getElementById(currentButtonId);
        previousButton.classList.remove("green");
    }

    var button = document.getElementById(buttonId);
    button.classList.add("green");
    currentButtonId = buttonId;
}

function setColorClick(elementId, className) {
    var element = document.getElementById(elementId);
    element.classList.add(className);
}

function removeColorClick(elementId, className) {
    var element = document.getElementById(elementId);
    element.classList.remove(className);
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

let currentButtonId;
let x_values = [];

$(".x_val").forEach(function (button) {
    button.addEventListener("click", function (event) {
        x_values.push(event.target.value);
        changeColorSelect(button.id);
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const x = x_values[x_values.length - 1];
    const y = formData.get("y_field");
    const R = formData.get("R_value");

    formData.append("x_field", x);

    console.log(x, y, R);

    if (-4 <= x && x <= 4 && -3 <= y && y <= 5 && 1 <= R && R <= 5) {
        fetch("php/script.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                // const currentTime = new Date().toLocaleString();
                const content = `<tr>
                                <td>${result.x}</td>
                                <td>${result.y}</td>
                                <td>${result.R}</td>
                                <td>${result.collision}</td>
                                <td>${result.exectime}s</td>
                                <td>${result.time}</td>
                            </tr>`;

                TABLE.innerHTML += content;
            });
    } else {
        showError(
            "Проверьте корректность введенных значений!\nx ∈ [-4; 4]\ny ∈ [-3; 5]\nR ∈ [1; 5]",
            5000
        );
    }
});


});