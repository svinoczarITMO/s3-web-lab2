const ERROR_DELAY = 5000;
const TABLE = $("#result-table");
let result_table_element_id = 1;
let result_table = $("#result-table");
let current_button;
let x_button;
let R_button;

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
    // console.log(`button class: ${button.attr(`class`)}`);
    button.addClass("green");
    current_button = button;
}

function showError(msg, delay) {
    error_div.innerText = msg;

    setTimeout(function () {
        error_div.innerText = "";
    }, delay);
}

function checkClickArea(x, y) {
    // var result = '';
    // if ((x >= 40 && x <= 345) && (y >= 45 && y<= 350)){
    //     const buttonsR = $('.R_val');
    //     let isActiveButtonR = false;
    //     buttonsR.forEach(button => {
    //         if (button.classList.contains('green')) {
    //             isActiveButtonR = true;
    //         }
    //     });
    //     if (isActiveButtonR){
    //         let valueR;
    //         buttonsR.forEach(button => {
    //             if (button.classList.contains('green')) {
    //                 valueR = button.dataset.value;
    //             }
    //         });
    //         let toSendX = ((x - 195) / 150 * valueR).toFixed(5);
    //         let toSendY = ((200 - y) / 155 * valueR).toFixed(5);
    //         if (toSendX >= -2 && toSendX <= 2 && toSendY >= -5 && toSendY <= 3 ){
    //             $.ajax({
    //                 type: "POST",
    //                 url: "/s3-web-lab2/controller",
    //                 async: false,
    //                 data: { "x": toSendX, "y": toSendY, "R": valueR },
    //                 success: function (data) {
    //                     window.location.replace('./result.jsp');
    //                 },
    //                 error: function (xhr, textStatus, err) {
    //                     console.log("readyState: " + xhr.readyState + "\n"+
    //                         "responseText: " + xhr.responseText + "\n"+
    //                         "status: " + xhr.status + "\n"+
    //                         "text status: " + textStatus + "\n" +
    //                         "error: " + err);
    //                 }
    //             });
    //         }else{
    //             result = 'Выход значений за пределы допустимого';
    //         }
    //     }else{
    //         result = 'Не активирован R';
    //     }
    // }else{
    //     result = 'Вы не попали в область';
    // }
}

// НАЧАЛО РАБОТЫ JS СРКИПТА
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
            showError(
                "Проверьте корректность введенных значений!\nx ∈ [-4; 4]\ny ∈ [-3; 5]\nR ∈ [1; 5]",
                5000
            );
        }
    });

    // let errorShow = document.querySelector('.checkInput');
    let svg = $('.coord img');
    svg.click(function (event) {
        let x = event.clientX;
        let y = event.clientY;
        let point = svg[0].createSVGPoint();
        point.x = x;
        point.y = y;
        let transformedPoint = point.matrixTransform(svg[0].getScreenCTM().inverse());
        // checkClickArea(transformedPoint.x, transformedPoint.y);
        console.log(transformedPoint)
    });

});