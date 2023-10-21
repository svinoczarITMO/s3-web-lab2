function redirectToMain() {
    window.location.href = "./index.jsp";
}

$(document).ready(function () {
    let result = JSON.parse(sessionStorage.getItem(sessionStorage.length - 1));
    const result_content = `<div id="result-div">
                            x:${result.x}
                            <br>
                            y:${result.y}
                            <br>
                            R:${result.R}
                            <br>
                            collision:${result.collision}
                            <br>
                            execution time:${result.execTime}
                            <br>
                            time:${result.time}
                            <br>`;
    $("#result-div").html(result_content);
});
