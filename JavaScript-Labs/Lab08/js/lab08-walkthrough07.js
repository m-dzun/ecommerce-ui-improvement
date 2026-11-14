
var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");

daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");

// document.write(daysOfWeek + "<br/>");

document.write("<table border=1>");

document.write("<tr>");

for (var i = 0; i < daysOfWeek.length; i++) {
    if (daysOfWeek[i].length < 4)
        day = daysOfWeek[i];
    else
        day = "<em>" + daysOfWeek[i] + "</em>";

    document.write("<th>" + day + "</th>");
}

document.write("</tr>");

for (var i = 1; i <= 30; i += 7) {
    document.write("<tr>");

    for (var j = i; j < i + 7 && j <= 30; j++) {
        document.write("<td>" + j + "</td>");
    }

    document.write("</tr>");
}

document.write("</table>");
