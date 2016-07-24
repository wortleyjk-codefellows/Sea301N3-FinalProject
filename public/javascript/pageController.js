(function(module){
  var controller = {};

  $('body').on('click', '#mobile-menu', function() {
    $('#nav-selection').toggle(400);
  });

  $('body').on('click', '#greeting-page', function() {
    $('#body-wrapper').addClass('blur');
    $('#body-wrapper').addClass('darken');
    $('#greeting-page').fadeOut(400);
    $('#randomResultsWrapper').hide();
    $('#stage-1').slideDown(400);
  });

  $('body').on('click', '#homeLink', function() {
    $('#nav-selection').toggle();
    $('#noMatches').hide();
    $('section').slideUp(400);
    $('#randomResultsWrapper').hide();
    $('#greeting-page').slideDown(400);
    $('#zipFind').val('');
    pets.clearData();
  });
  $('body').on('click', '#randomPetMessage', function() {
    $('#randomPetMessage').fadeOut(400);
    $('#randomResultsWrapper').slideDown(400);
  });

  $('body').on('click', '#favoritesLink', function(e) {
    e.preventDefault();
    $('#nav-selection').toggle();
    $('section').slideUp(400);
    $('#savedPets').empty();
    pets.displaySavedPets();
    $('#favoritesSection').slideDown(400);
  });
  $('body').on('click', '#aboutLink', function(e) {
    e.preventDefault();
    $('#nav-selection').toggle();
    $('#body-wrapper').addClass('blur');
    $('#body-wrapper').addClass('darken');
    $('section').slideUp(400);
    $('#about').slideDown(400);
  });
  $('body').on('click', '#resourcesLink', function(e) {
    e.preventDefault();
    $('#nav-selection').toggle();
    $('section').slideUp(400);
    $('#resources').slideDown(400);
  });
  $('body').on('click', '.petButton', function(){
    $('section').slideUp(400);
    $('#searchSection').slideDown(400);
  });

  $('body').on('click', '.find-new-pet-btn', function(){
    if($('#zipFind').val() != ''){
      $('section').slideUp(400);
      $('#totalMatches').slideDown(400);
    }
    else{
      //do nothing
    }

  });
  $('body').on('click', '#search-btn-transition', function(){
    $('section').slideUp(400);
    $('#filterResults').slideDown(400);
  });

  $('body').on('click', '#randomResultsWrapper > div > .interestedButton', function(){
    $('section').slideUp(400);
    var buttonVal = $(this).val();
    pets.seeMoreButton(buttonVal,randomPets.all);
    $('#Animal_Detail').slideDown(400);
    $('section.section-wrapper').addClass('black-background');
    $('#back-search-btn').hide();
  });

  $('body').on('click', '#savedPets > .pet-summary-element > .interestedButton', function(){
    $('section').slideUp(400);
    var buttonVal = $(this).val();
    pets.seeMoreButton(buttonVal,JSON.parse(localStorage.getItem('savedPets')));
    $('section.section-wrapper').addClass('black-background');
    $('#Animal_Detail').slideDown(400);
    $('#back-search-btn').hide();
  });

  $('body').on('click', '#narrowResults > .pet-summary-element > .interestedButton', function() {
    $('section').slideUp(400);
    var buttonVal = $(this).val();
    pets.seeMoreButton(buttonVal,pets.all);
    $('section.section-wrapper').addClass('black-background');
    $('#Animal_Detail').slideDown(400);
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

$('body').on('click', '#back-search-btn', function() {
  $('section').slideUp(400);
  $('#narrowResults').slideDown(400);
});

$('body').on('click', '#save-pet-btn', function() {
    pets.setLocalStorage();
    console.log('clicked save pet button');
    //pets.interested
});

  $('.section-wrapper').hide(); //hides all initial sections first.
  $('#greeting-page').show();
  $('#nav-selection').hide();
  module.controller = controller;
})(window);
