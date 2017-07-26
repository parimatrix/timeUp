$(function() {
    $('#preview').click(function () {
        
        var inp_comp = $('#comp_inp').val();
        $('#company').html(inp_comp);
        
        var sub_inp = $('#sub_inp').val();
        $('#heading').html(' "Your Name" has invited you to:<br><span style="color: #EE263B">'+ sub_inp+'</span>');
        
        var content = $('#mess_inp').val();
        $('#content').text = '';
        $('#content').append(content);
        
        var org_inp = $('#org_inp').val();
        $('#organiser').html(org_inp);
    });
});