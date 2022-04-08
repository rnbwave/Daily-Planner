setInterval(function() {
    var today = moment().format("dddd, MMMM Do H:mm:ss");
    $("#currentDay").text(today);
}, 1000);

$(".saveBtn").each(function () {
    $(this).click(save)
});

var savedEvent = JSON.parse(localStorage.getItem("savedEvent")) || [];

function save() {
    var event = $(this).siblings('textarea').val();
    var currentHour = $(this).siblings('textarea').attr('name');
    var schedule = {currentHour, event};
    savedEvent.push(schedule);
    localStorage.setItem("savedEvent", JSON.stringify(savedEvent));
}

$("textarea").each(function () {
    var name = $(this).attr('name');
    var name1 = parseInt(name);
    var hour = moment().format("H")
    
    if (name1 == hour) {
        $(this).addClass("present")
    } else if (name1 < hour) {
        $(this).addClass("past");
    } else if (name1 > hour) {
        $(this).addClass("future")
    }

    if (savedEvent != null) {
        for (var i = 0; i < savedEvent.length; i++) {
            if (name == savedEvent[i].currentHour) {
                $(this).text(savedEvent[i].event);
            }
        }
    }
});
