$(document).ready(function() {

    $('[id^="gateway_"]').click(function(){
        var gateway_action = $(this).attr('id');
        console.log(gateway_action);
        var jsonObj = {};
        jsonObj['action'] = gateway_action.split('_').pop();

        $.ajax({
            type: 'POST',
            dataType: "json",
            data: jsonObj,
            url: 'control/packet_forwarder',
            success: function(response) {
              setTimeout(function()
              {
                location.reload(true);
              }, 2000);
            }
        });
    });

});
