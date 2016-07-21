(function(module){
  var controller = {};
  // $('.petButton').on('click',function(){
  //   $('section').hide();
  //   $('#searchSection').slideDown(400);
  // });

  // $('#find-new-pet-btn').on('click', function(){
  //   $('section').hide();
  //   $('#narrowResults').toggle();
  //   alert('test')
  // });

  $('body').on('click', '.mobile-menu', function() {
    $('#nav-selection').toggle();
  });

  $('body').on('click', '.tab', function(e) {
    e.preventDefault();
    $('section').slideUp(400);


  });

  $('body').on('click', '.petButton', function(){
    $('section').slideUp(400);
    $('#searchSection').slideDown(400);
  });

  $('body').on('click', '#find-new-pet-btn', function(){
    $('section').slideUp(400);
    $('#totalMatches').slideDown(400);
  });
  $('body').on('click', '#search-btn-transition', function(){
    $('section').slideUp(400);
    $('#filterResults').slideDown(400);
  });
  $('body').on('click', '#show-me-btn', function(){
    $('section').slideUp(400);
    pets.displayMatches();
    $('#narrowResults').slideDown(400);
  });
  $('body').on('click', '#interested', function() {
    $('section').slideUp(400);
    var buttonVal = $(this).val();
    pets.seeMoreButton(buttonVal);
    $('#Animal_Detail').slideDown(400);
  });
  $('body').on('click', '#back-search-btn', function() {
    $('section').slideUp(400);
    $('#narrowResults').slideDown(400);
  });

  $('section').hide(); //hides all initial sections first.
  $('#stage-1').show();
  $('#nav-selection').hide();
  module.controller = controller;
})(window);
