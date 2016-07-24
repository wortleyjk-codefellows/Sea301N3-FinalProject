// this is the Ajax call to the petfinder api

(function(module) {
  var pets = {};
  pets.$petWanted = null;
  pets.$seniorPet = null;
  pets.$specialPet = null;
  pets.$petSize = null;
  pets.$petSex = null;
  pets.all = [];
  pets.filtered = [];

  pets.findByName = function(name) {
    pets.filtered.forEach(function(pet, index) {
      if (pet.name.$t === name) {
        console.log('found pet with name ' + name + ' at pets.all[' + index + ']' );
      }
    });
  };

  pets.getSpecialNeedsOptions = function(opt) {
    var outputOptions = [];
    if (Array.isArray(opt)) {
      outputOptions = opt.map(function(o) {
        return o.$t;
      });
    } else {
      outputOptions.push(opt.$t);
    }
    return outputOptions;
  };

  pets.isSpecialNeeds = function(pet) {
    // console.log('running specialNeeds');
    if (pet.options.option) { //is defined
      var snOptsArray = pets.getSpecialNeedsOptions(pet.options.option);

      if (pets.$specialPet === 'specialNeeds') {
        return snOptsArray.indexOf('specialNeeds') !== -1;
      } else {
        return snOptsArray.indexOf('specialNeeds') === -1;
      }
    }
  };

  pets.isSenior = function(pet) {
    if (pets.$seniorPet === 'Senior') {
      // console.log(pet.age.$t);
      return pets.$seniorPet === pet.age.$t;
    } else {
      return pets.$seniorPet !== pet.age.$t;
    }
  };

  pets.isSizePet = function(pet) {
    console.log('petSize is running: ' + pets.$petSize);
    if (pets.$petSize === 'S') {
      // console.log(pet.size.$t);
      return pets.$petSize === pet.size.$t;
    } else if (pets.$petSize === 'M') {
      // console.log(pet.size.$t);
      return pets.$petSize === pet.size.$t;
    } else if (pets.$petSize === 'L') {
      // console.log(pet.size.$t);
      return pets.$petSize === pet.size.$t;
    } else {
      return pet.size.$t;
    }
  };

  pets.isSexPet = function (pet) {
    if (pets.$petSex === 'M') {
      return pets.$petSex === pet.sex.$t;
    } else if (pets.$petSex === 'F'){
      return pets.$petSex === pet.sex.$t;
    } else {
      return pet.sex.$t;
    }
  };


  pets.requestPets = function(zip, animal) {
    $.getJSON('https://api.petfinder.com/pet.find?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&location=' + zip + '&animal=' + animal + '&count=100&output=full&callback=?')
  .done(function(petApiData) {
    pets.all = [];
    pets.all = petApiData.petfinder.pets.pet;
    pets.numberReturned();
  }).fail(function(err) {
    alert('Error retrieving data!');
  });
  };

  pets.animal_wanted_click = function() {
    $('#stage-1-wrapper').off().on('click', '.petButton', function(e) {
      pets.$petWanted = $(this).val();
      // $('#noMatches').text('');
      pets.searchClick(pets.$petWanted);
    });
  };

  pets.searchClick = function(wanted) {
    $('#zipFindForm').off().on('click', '.find-new-pet-btn', function(e) {
      e.preventDefault();
      var $zipSearch = $('#zipFind').val();
      if($zipSearch != ''){
        pets.requestPets($zipSearch, pets.$petWanted);
      }
      else{
        toastr.error('Please enter a zip code to continue')
      }
    });
  };

  pets.numberReturned = function() {
    $('#numMatches').html(pets.all.length);
  };

  pets.snr_spl = function() {
    $('#input-snr-cb').off().on('click', function(){
      pets.$seniorPet = this.value;
    });
    $('#input-spl-cb').off().on('click', function(){
      pets.$specialPet = this.value;
    });
  };

  pets.howBig = function() {
    $('#petLargeness').off().on('change', function(){
      pets.$petSize = this.value;
    });
  };

  pets.assignedGender = function() {
    $('.sexRadio').off().on('click', function(){
      pets.$petSex = this.value;
    });
  };

  pets.noMatch = function() {
    // if(pets.filtered.length <= 0) {
      console.log($('#noMatches'));
      $('#noMatches').show();
      $('#input-snr-cb').prop('checked', false);
      $('#input-spl-cb').prop('checked', false);
    // $('#petLargeness').empty();
      $('.sexRadio').prop('checked', false);
    // }
  };

  // .html('<h2>Sorry there were no pets matching your criteria.  Please choose different options and search again.</h2>');

  pets.pareDown = function() {
    // $('#show-me-btn').off().on('click', function(){
      console.log('running pareDown');
      // if (pets.$seniorPet || pets.$specialPet) {
        pets.filtered = pets.all
        .filter(function(pet) {
          return pets.isSenior(pet);
        })
         .filter(function(pet) {
           return pets.isSpecialNeeds(pet);
         })
         .filter(function(pet) {
           return pets.isSizePet(pet);
         })
        .filter(function(pet) {
          return pets.isSexPet(pet);
        });
        // pets.noMatch();
      // } else {
      //   console.error('you have to pick something');
      // }
    // });
  };
  pets.displayMatches = function() {
    if(pets.filtered.length > 0) {
      var source   = $('#search-result').html();
      var template = Handlebars.compile(source);
      pets.filtered.forEach(function(e){
        var html    = template(e);
        $('#narrowResults').append(html);
        controller.showResults();
      });
      pets.filtered = [];
    } else {
      pets.noMatch();
    }
  };

  pets.displaySavedPets = function() {
    pets.savedPets = JSON.parse(localStorage.getItem('savedPets'));
    pets.savedPets.forEach(function(e){
      var source   = $('#search-result').html();
      var template = Handlebars.compile(source);
      var html    = template(e);
      $('#savedPets').append(html);
    });
  };

  pets.displayFullPetDetails = function(pet) {
    var fullDetailHtml = $('#petDetails').html();
    var fullDetailTemplate = Handlebars.compile(fullDetailHtml);
    var petView = fullDetailTemplate(pet);
    $('#Animal_Detail_Wrapper').append(petView);
  };

  pets.selectedPet = null;
  pets.savedPets = [];

  pets.seeMoreButton = function(buttonVal,searchSource) {
    // if(pets.all.length != 0){
    //   //search pets.all
    //   pets.all.forEach(function(elem){
    //     if(buttonVal == elem.id.$t){
    //       console.log('found: '+elem.id.$t);
    //       pets.displayFullPetDetails(elem);
    //     }
    //   });
    // }
    // else if(pets.filtered.length !=0){
    //   //search pets.filtered
    //   pets.filtered.forEach(function(elem){
    //     if(buttonVal == elem.id.$t){
    //       pets.displayFullPetDetails(elem);
    //     }
    //   });
    // }
    // else if(randomPets.all.length!=0){
    //   randomPets.all.forEach(function(elem){
    //     if(buttonVal == elem.id.$t){
    //       pets.displayFullPetDetails(elem);
    //     }
    //   });
    // }
    // else{
    //   //use local storage to retrieve data
    //   petsArr = JSON.parse(localStorage.getItem('savedPets'));
    //   console.log(petsArr);
    //   petsArr.forEach(function(elem){
    //     if(buttonVal == elem.id.$t){
    //       pets.displayFullPetDetails(elem);
    //     }
    //   });
    // }
    searchSource.forEach(function(elem){
      if(buttonVal == elem.id.$t){
        pets.displayFullPetDetails(elem);
      }
    });
    // pets.filtered.forEach(function(pet) {
    //   if (buttonVal === pet.id.$t) {
    //     pets.selectedPet = pet;
    //   }
    // });
    // pets.displayFullPetDetails(pets.selectedPet);
  };

  pets.setLocalStorage = function() {
    // if (localStorage.savedPets) {
    //   console.log('localStorage exists');
    //   console.log(pets.savedPets);
    // }
    pets.savedPets.push(pets.selectedPet);
    console.log(pets.savedPets);
    localStorage.setItem('savedPets', JSON.stringify(pets.savedPets));
  };

  pets.clearData = function(){
    pets.all = [];
    pets.filtered = [];
  }

  $(document).ready(function() {
    pets.animal_wanted_click();
    pets.searchClick();
    pets.snr_spl();
    pets.howBig();
    pets.assignedGender();
    // pets.pareDown();
    $('#noMatches').hide();
    controller.showResults();
  });

  module.pets = pets;
})(window);
