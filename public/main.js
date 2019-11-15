$(function () {
    
    var $h1 = $('h1');
    var $zip = $("input[name='zip']");
    console.log('test in main js');
    $('form').on('submit', function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        var zipCode = $.trim($zip.val);
        $h1.text('Loading...');

        // Send an AJAX request
        var request = $.ajax({
            url: '/' + zipCode,
            dataType: 'json'
        });

        // When the request succeeds, update the header with the current temperature.
        request.done(function (data) {
            var temperature = data.temperature;
            // &#176; is the HTML character code for the degree symbol.
            $h1.html('It is ' + temperature + '&#176; in ' + zipCode + '.');
        });
        // If there's an error, make sure that an error is shown.
        request.fail(function() {
            $h1.text('Error!');
        });
    });
});