// Function to create a div box
function outputBox(count) {
    return "<div id='div" + count + "' class='movingDiv'>This is div " + count + "</div>";
}

window.addEventListener("load", function(){

    var divs = document.querySelectorAll(".movingDiv");

    for (i = 0; i < divs.length; i++)
    {
        divs[i].addEventListener("mouseover", function (e) {
            alert("triggered by " + e.target.id);
        });
    }

});