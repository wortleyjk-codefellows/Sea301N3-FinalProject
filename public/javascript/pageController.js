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
  $('body').on('click', '#homeLink', function() {
    $('#nav-selection').toggle();
    $('#noMatches').hide();
    $('section').slideUp(400);
    $('#searchSection').slideDown();
  });
  $('body').on('click', '#favoritesLink', function(e) {
    e.preventDefault();
    $('#nav-selection').toggle();
    $('section').slideUp(400);
    $('#favoritesSection').slideDown(400);
  });
  $('body').on('click', '#aboutLink', function(e) {
    e.preventDefault();
    $('#nav-selection').toggle();
    $('section').slideUp(400);
    $('#about').slideDown(400);
  });


  $('body').on('click', '.petButton', function(){
    $('section').slideUp(400);
    $('#searchSection').slideDown(400);
  });

  $('body').on('click', '.find-new-pet-btn', function(){
    $('section').slideUp(400);
    $('#totalMatches').slideDown(400);
  });

  $('body').on('click', '#search-btn-transition', function(){
    $('section').slideUp(400);
    $('#filterResults').slideDown(400);
  });


  controller.showResults = function(){
    $('#filterGroupForm').on('submit', function(e){
      e.preventDefault();
      if (pets.$seniorPet || pets.$specialPet) {
        pets.pareDown();
        $('section').slideUp(400);
        pets.displayMatches();
        $('#narrowResults').slideDown(400);
    } else {
      console.error('pick an option')
    }
  });
};



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

  $('body').on('click', '#save-pet-btn', function() {
    pets.setLocalStorage();
    console.log('clicked save pet button');
    // pets.interested
  });

  $('section').hide(); //hides all initial sections first.
  $('#stage-1').show();
  $('#nav-selection').hide();
  module.controller = controller;
})(window);
