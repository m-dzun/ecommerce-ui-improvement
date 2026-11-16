$(function() {

    // Hide loading animation initially
    $('.animLoading').hide();

    $("#consume").click(function() {

        // Show loading animation
        $('.animLoading').show();

        var url =
            "http://www.randyconnolly.com/funwebdev/services/travel/cities.php";

        $.get(url)

            // done will happen first
            .done(function(data) {

                $.each(data, function(index, value) {

                    var li = $('<li/>').html(value.name);

                    li.appendTo("div#results ul");

                });

            })

            // if error occurs will execute, but before always()
            .fail(function(xhr, status, error) {

                alert("failed loading data - status=" + status +
                      " error=" + error);

            })

            // always should be last
            .always(function(data) {

                $('.animLoading').fadeOut("slow");

            });

    });

});