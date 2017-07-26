$(function () {
    var tickctr = 0,locked = 0;
    var current_user = JSON.parse(localStorage.getItem("current_user"));
    function render() {
        $.get('/todoshow?user='+current_user , function (data) {
           locked = data.locked;
            $('#task1').val(data.task1);
           $('#task2').val(data.task2);
           $('#task3').val(data.task3);
           if(data.done1 == 1) {
               locked = 1;
               $('#lock').css("background" ,"#c8ccd0");
               $('#tick1').css("color" , "#0BB667");
               //$('#task1').css("background", "#0BB667");
               $('#task1').val("Great ! Proud of you.");

           }
            if(data.done2 == 1) {
                locked = 1;
                $('#lock').css("background" ,"#c8ccd0");
                $('#tick2').css("color" , "#0BB667");
                //$('#task1').css("background", "#0BB667");
                $('#task2').val("Great ! Proud of you.");

            }
            if(data.done3 == 1) {
               console.log("three toh one hai");
                locked = 1;
                $('#lock').css("background" ,"#c8ccd0");
                $('#tick3').css("color" , "#0BB667");
                //$('#task1').css("background", "#0BB667");
                $('#task3').val("Great ! Proud of you.");

            }
            var mylocked = locked;
            if(mylocked === 1) {
                //locked = 1;
                $('#lock').css("background", "#c8ccd0");
                $('#lock').css("cursor", "help");
                $('#karle').css("min-height" , "300px");
                $('#karle').css("height" , "300px");
                $('#karle').css("overflow" , "hidden");
                $('#task1').prop('disabled', true);
                $('#task2').prop('disabled', true);
                $('#task3').prop('disabled', true);
                $('#codechef').css("display","block");
            }
        });
    }
    render();

    $('#lock').click(function (){
        console.log("idhar");
        if(locked !== 1) {
            console.log("udhar");
            //localStorage.setItem("locked"+current_user , "1");
            locked = 1;
            var val1 = $('#task1').val();
            var val2 = $('#task2').val();
            var val3 = $('#task3').val();

            $('#task1').prop('disabled', true);
            $('#task2').prop('disabled', true);
            $('#task3').prop('disabled', true);
            $.get('/todo?task1=' + val1 + '&task2=' + val2 + '&task3=' + val3+'&user='+current_user, function () {
                console.log("List of Tasks added in Server");
            });
            $.get('/setlocked?user='+current_user , function (data) {
                console.log("locked");
            });
            $('#lock').css("background", "#c8ccd0");
            $('#lock').css("cursor", "help");
            $('#karle').css("min-height" , "300px");
            $('#karle').css("height" , "300px");
            $('#karle').css("overflow" , "hidden");
            $('#codechef').css("display" , "block");

        }
    });
    
    $('#tick1').click(function () {
        if(locked === 1) {
            $.get('/todoclick?num=done1&user='+current_user,function () {
               console.log("done1 in server from client");
            });
        tickctr++;
       $('#tick1').css("color" , "#0BB667");
        //$('#task1').css("background", "#0BB667");
        $('#task1').val("Great ! Proud of you.");
        }
    });
    $('#tick2').click(function () {
        if(locked === 1) {
            $.get('/todoclick?num=done2&user='+current_user,function () {
                console.log("done2 in server from client");
            });
            tickctr++;
       $('#tick2').css("color" , "#0BB667");
        $('#task2').val("Great ! Proud of you.");}
        //$('#task2').css("background", "#0BB667");
    });
    $('#tick3').click(function () {
        if(locked === 1) {
            $.get('/todoclick?num=done3&user='+current_user,function () {
                console.log("done3 in server from client");
            });
        tickctr++;
       $('#tick3').css("color" , "#0BB667");
        $('#task3').val("Great ! Proud of you."); }
        //$('#task3').css("background", "#0BB667");
    });
    $('#break').click(function () {
       $('#facebook .fa').css("opacity","1");
        $('#smile').css("opacity","1");
       setTimeout(function () { $('#facebook .fa').css("opacity","0"); },30000);
       setTimeout(function () { $('#smile').attr("src" , "004.png") } , 180000);
        setTimeout(function () { $('#smile').attr("src" , "003.png") } , 300000);
    });
});