// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.turbolinks
//= require foundation
//= require turbolinks
//= require_tree .

$(function(){ $(document).foundation(); });

$(document).on("page:change", function(){
    var data = $('body').data();
    $(document).trigger(data.controller + ':loaded');
    $(document).trigger(data.controller + '#' + data.action + ':loaded');
});

$(function(){
  $(document).on('items#show:loaded', function worker() {
    var bidId = $("#bid_item_id").val();
    var highBid = $("#nothing").val();
    var bidAmount = $("#bid_amount").val();
    $.ajax({
      type:'GET',
      url:'/items/' + bidId,
      success: function(data){
        var newBid = $(data).find("#nothing").val()
        if(newBid != highBid) {
          if(newBid >= bidAmount) {
            $("#bid_amount").replaceWith($(data).find("#bid_amount"));
          }
          $("#nothing").replaceWith($(data).find("#nothing"));

        }
        var timeoutVar = setTimeout(worker, 15000);
      }
    });
  });

  $(window).on('items#show:unload', function() {
    clearTimeout(timeoutVar);
    timeoutVar = 0;
  });

});
