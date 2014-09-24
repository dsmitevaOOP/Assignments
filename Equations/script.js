$(document).ready(function() {
   game();
});

//returns integer in range [min...max]
var randomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var game = function () {
    //gets random integer and puts it in the middle
    var middle = randomInteger(3, 5);
    $('#middle span').html(middle);

    //creates an array and fills it with the initial values, also check that there are no two equal values in the array
    var arr = [];

    for (var i = 0; i < 4; i++) {

        var input = randomInteger(0, middle);

        if (jQuery.inArray(input, arr) == -1) {
            arr.push(input);
        } else {

            while (jQuery.inArray(input, arr) != -1) {
                input = randomInteger(0, middle);
            }

            arr.push(input);
        }
    }

    //puts the numbers in the HTML
    $('#top-left span').html(arr[0]);
    $('#bottom-left span').html(arr[1]);
    $('#top-right span').html(arr[2]);
    $('#bottom-right span').html(arr[3]);

    $('#button').click(function() {

        var selectors = [$('#first'), $('#second'), ($('#third')), ($('#fourth'))];
        var num = [],
            correct = false;

        //gets the values that the user has enetered and validates them
        for (var i = 0; i < 4; i++) {
            var temp = Number(selectors[i].val());
            num.push(temp);
            correct = correct || temp < 0 || temp > 5 || temp == "";
        }

        //if the values are not in the range [0...5] gives a message and resets the exercise
        if (correct) {
            $('#error').append("<span>Wrong Input: the numbers should be in range [0...5]</span>");
            setTimeout(function() {location.reload()}, 2000)
        }

        var errors = 0;

        //counts the errors
        for(var i = 0; i < 4; i++) {

            if (arr[i] + num[i] == middle) {
                selectors[i].css('background-color', 'green');
            } else {
                selectors[i].css('background-color', 'red');
                errors++;
            }
        }

        //if the errors are greater than 3 shows the correct results
        if (errors >= 3) {
            for (var i = 0; i < 4; i++) {
                selectors[i].css('background-color', 'green');
                selectors[i].val(middle - arr[i]);
            }
        }

        //restarts the exercise
        setTimeout(function() {location.reload()}, 2000)
    });
};