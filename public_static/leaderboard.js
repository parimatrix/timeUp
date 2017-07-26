/**
 * Created by parikansh on 23/7/17.
 */
$(function () {
    var current_userr = JSON.parse(localStorage.getItem("current_user"));
    $.get('/getleaderboard' , function(data)
    {
        //$('#leadtable').html('');
        $('#leaderboard').append('<ul> </ul>')
        for(var i = 0; i<data.length;i++)
        {
            var j = i+1;
            if(data[i].username === current_userr)
            {
                $('#n3').html('');
                $('#n3').append(j);
            }
            $('#leaderboard ul').append('<li><span class="rank">'+j+'</span><span class="name">'+data[i].username+'</span><span class="points">'+data[i].points+ '</span> </li>')
            //$('#leadtable').append('<tr><td class="rank">'+j+'</td><td class="name">'+data[i].username+'</td> <td class="points">'+data[i].points+'</td></tr>');
        }
    })
    $('#leaderboardbutton').click(function () {
        $('body').addClass('temp');
        $('#closelead').css("display","block");
        $('#closelead').css("opacity","1");
       $('#leaderboard').css("margin-left" , "0px");
    });
    $('#closelead').click(function () {
        $('body').removeClass('temp');
        $('#closelead').css("opacity","0");
        $('#closelead').css("display","none");
        $('#leaderboard').css("margin-left" , "2000px");
    })
});
/*
app.get('/getleaderboard' , function (req,res) {
   var query = 'SELECT * FROM users';
   sql.notification(query,function (data) {
        data.sort(function(a,b) {
            return parseInt(a.points) - parseInt(b.price);
        }
        res.send(data);
   });
});
*/