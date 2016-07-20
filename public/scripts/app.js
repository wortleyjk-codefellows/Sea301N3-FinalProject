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
    pets.all.forEach(function(pet, index) {
      if (pet.name.$t === name) {
        console.log('found pet with name ' + name + ' at pets.all[' + index + ']' );
      }
    });
  }

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
  }

  pets.isSpecialNeeds = function(pet) {
    console.log("running specialNeeds");
    if (pet.options.option) { //is defined
      var snOptsArray = pets.getSpecialNeedsOptions(pet.options.option)

      if (pets.$specialPet === 'specialNeeds') {
        return snOptsArray.indexOf('specialNeeds') !== -1
      } else {
        return snOptsArray.indexOf('specialNeeds') === -1
      }
      //if they want special-needs pets
        //return special-needs pets
      //else
        //return non-special-needs pets

    }
  }

  pets.isSenior = function(pet) {
    // console.log('running isSenior');
    console.log('isSenior: ' + pets.$seniorPet);
    if (pets.$seniorPet === 'Senior') {
      console.log(pet.age.$t);
      return pets.$seniorPet === pet.age.$t;
    } else {
      return pets.$seniorPet !== pet.age.$t;
    }
  }

  pets.isSizePet = function(pet) {
    console.log('petSize is running: ' + pets.$petSize);
    if (pets.$petSize === 'S') {
      console.log(pet.size.$t);
      return pets.$petSize === pet.size.$t;
    } else if (pets.$petSize === 'M') {
      console.log(pet.size.$t);
      return pets.$petSize === pet.size.$t;
    } else if (pets.$petSize === 'L') {
    console.log(pet.size.$t);
    return pets.$petSize === pet.size.$t;
  } else {
    return true;
  }
};

  pets.isSexPet = function (pet) {
    console.log('sexPet is running: ' + pets.$petSex);
    if (pets.$petSex === 'M') {
      console.log(pet.sex.$t);
      return pets.$petSex === pet.sex.$t;
    } else {
      console.log(pet.sex.$t);
      return pets.$petSex === pet.sex.$t;
    }
  }


  pets.requestPets = function(zip, animal) {
    $.getJSON('https://api.petfinder.com/pet.find?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&location=' + zip + '&animal=' + animal + '&count=100&output=full&callback=?')
  .done(function(petApiData) {
    pets.all = [];
    pets.all = petApiData.petfinder.pets.pet;
    pets.numberReturned();
  }).fail(function(err)
  { alert('Error retrieving data!');
});
};

pets.animal_wanted_click = function() {
  $('#stage-1-wrapper').off().on('click', '.petButton', function(e) {
    console.log('clicked an animal');
    pets.$petWanted = $(this).val();
    $('#noMatches').text('');
    pets.searchClick(pets.$petWanted);
  });
};

pets.searchClick = function(wanted) {
  $('#find-new-pet-btn').off().on('click', function() {
    var $zipSearch = $('#zipFind').val();
    console.log($zipSearch);
    pets.requestPets($zipSearch, pets.$petWanted);
  })
};

pets.numberReturned = function() {
  $('#numMatches').html(pets.all.length);
};

// Now i have to handle the deeper filtering and the push the information to the final results view.  and then push that to the details view.

pets.snr_spl = function() {
  $('#input-snr-cb').off().on('click', function(){
    pets.$seniorPet = this.value;
    console.log(pets.$seniorPet);
  });
  $('#input-spl-cb').off().on('click', function(){
    pets.$specialPet = this.value;
    console.log(pets.$specialPet);
  });
};

pets.howBig = function() {
  $('#petLargeness').off().on('change', function(){
    pets.$petSize = this.value;
    console.log(pets.$petSize);
  });
};

pets.assignedGender = function() {
  $('.sexRadio').off().on('click', function(){
    pets.$petSex = this.value;
    console.log(pets.$petSex);
  })
};

pets.noMatch = function() {
  if(pets.filtered.length <= 0) {
    $('#noMatches').text('Sorry there were no pets matching your criteria.  Please choose different options and search again.');
    $('#input-snr-cb').prop('checked', false);
    $('#input-spl-cb').prop('checked', false);
    // $('#petLargeness').empty();
    $('.sexRadio').prop('checked', false);
  }
}

// pets.toHtml = function() {
//   $('#show-me-btn').off().on('click', function(){
//     console.log('start handlebars function');
//     var $templateScript = $('#search-result-template').html();
//     var theTemplate = Handlebars.compile($templateScript);
//     var compiledHtml = theTemplate(pets);
//     $('#narrowResults').append(compiledHtml);
//     return theTemplate(this);
//   })
//  };


pets.pareDown = function() {
  $('#show-me-btn').off().on('click', function(){
    console.log('show me was clicked');
    if (pets.$seniorPet || pets.$specialPet) {
      console.log('form is valid');
      pets.filtered = pets.all
        .filter(function(pet) {
          console.log('checking if ' + pet + ' is senior');
           return pets.isSenior(pet);
         })
         .filter(function(pet) {
           console.log('checking if ' + pet + ' is special');
           return pets.isSpecialNeeds(pet);
         })
         .filter(function(pet) {
           console.log('checking if ' + pet + ' is size');
           return pets.isSizePet(pet)
         })
        .filter(function(pet) {
          console.log('checking if ' + pet + ' is sex');
          return pets.isSexPet(pet)
        })
        pets.noMatch();
    } else {
      console.log('you have to pick something');
      //if not, reject the form submission
    }


// need to write a function that if there are no matches, display a message to have them search/filter again.

    // then call .toHTML
  });
}

  // pets.with = function(attr) {
  //   return pets.all.filter(function(repo){
  //     return repo[attr];
  //   });
  // };
  pets.displayMatches = function() {
    pets.all.forEach(function(e){
      var source   = $("#search-result").html();
      var template = Handlebars.compile(source);
      var html    = template(e);
      $('#narrowResultsWrapper').append(html);
    });
  }


  pets.displayFullPetDetails = function(pet) { ///////////////////////////////////////////////////This is to display the full details of a selected pet.
    var fullDetailHtml = $('#petDetails').html();
    var fullDetailTemplate = Handlebars.compile(fullDetailHtml);
    var petView = fullDetailTemplate(pet);
    $('#Animal_Detail').append(petView);
    //Update the template in index.html ----- create some event on button that gets pet
    //Append somewhere ------ maybe call some other display function to hide everything else.
  };

  pets.seeMoreButton = function() {
    $('#someButton').on('click', function() {
      var petVal = $('#someButton').val();
      // var pet = // match petVal id to pets.all aray entry
      pets.all.forEach(function(pet) {
        if (petVal === pet.id) {
          var selectedPet = this;
          console.log(selectedPet);
        }
      });
      pets.displayFullPetDetails(SelectedPet);
      //Some CSS Hide and Show
    });
  };

  $(document).ready(function() {
    pets.animal_wanted_click();
    pets.searchClick();
    pets.snr_spl();
    pets.howBig();
    pets.assignedGender();
    pets.pareDown();
    // pets.toHtml();

  });

  module.pets = pets;
})(window);
