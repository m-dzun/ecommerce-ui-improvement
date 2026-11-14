function outputBox(num) {
  box = "<div class='movingDiv' id='div" + num + "'>";
    box += "This is div " + num;
    box += "</div>";
    return box;
}
var boxClass = 'movingDiv';
