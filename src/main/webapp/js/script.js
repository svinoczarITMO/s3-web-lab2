const table = document.getElementById('result-table');
const form = document.getElementById('form');
const error_div = document.getElementById('error_div')

var xhr = new XMLHttpRequest();
xhr.open('GET', 'php/get_results.php', true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.onload = function () {
    if (xhr.status === 200) {
        const savedResults = JSON.parse(xhr.responseText);
        // Отобразите сохраненные результаты в таблице
        savedResults.forEach(result => {
            // const currentTime = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
            const content = `<tr>
                                <td>${result.x}</td>
                                <td>${result.y}</td>
                                <td>${result.R}</td>
                                <td>${result.collision}</td>
                                <td>${result.exectime}</td>
                                <td>${result.time}</td>
                            </tr>`

            table.innerHTML += content;
        });
    } else {
        showError("Ooops! Something went wrong.", 2000)
        table.innerHTML = `<th width="16.6%">X</th>
                       <th width="16.6%">Y</th>
                       <th width="16.6%">R</th>
                       <th width="16.6%">res</th>
                       <th width="16.6%">execution time</th>
                       <th width="16.6%">time</th>`
    }
};
xhr.send();

document.getElementById("clear-table").addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/clear_results.php", true);
    xhr.send();
    table.innerHTML = `<th width="16.6%">X</th>
                       <th width="16.6%">Y</th>
                       <th width="16.6%">R</th>
                       <th width="16.6%">res</th>
                       <th width="16.6%">execution time</th>
                       <th width="16.6%">time</th>`
    setColorClick("clear-table", "green");
    setTimeout(function() {
        removeColorClick("clear-table", "green");
    }, 250);
});


let currentButtonId;
let x_values = [];

document.querySelectorAll(".x_val").forEach(function (button) {
    button.addEventListener("click", function (event) {
        x_values.push(event.target.value);
        changeColorSelect(button.id);
    });
});


form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const x = x_values[x_values.length - 1];
    const y = formData.get('y_field');
    const R = formData.get('R_value');

    formData.append('x_field', x);

    console.log(x, y, R);

    if (-4 <= x && x <= 4 && -3 <= y && y <= 5 && 1 <= R && R <= 5) {
        fetch('php/script.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                // const currentTime = new Date().toLocaleString();
                const content = `<tr>
                                <td>${result.x}</td>
                                <td>${result.y}</td>
                                <td>${result.R}</td>
                                <td>${result.collision}</td>
                                <td>${result.exectime}s</td>
                                <td>${result.time}</td>
                            </tr>`

                table.innerHTML += content;
            })
    } else {
        showError("Проверьте корректность введенных значений!\nx ∈ [-4; 4]\ny ∈ [-3; 5]\nR ∈ [1; 5]", 5000)
    }
})

function changeColorSelect(buttonId) {
    if (currentButtonId) {
        var previousButton = document.getElementById(currentButtonId);
        previousButton.classList.remove('green');
    }

    var button = document.getElementById(buttonId);
    button.classList.add('green');
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

function showError(msg, delay){
    error_div.innerText = msg;

    setTimeout(function() {
        error_div.innerText = "";

    }, delay);
}