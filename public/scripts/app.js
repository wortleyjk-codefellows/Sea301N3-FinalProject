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
    console.log(pets.$seniorPet);
    if (pets.$seniorPet === 'Senior') {
      console.log(pet.age.$t);
      return pets.$seniorPet === pet.age.$t;
    } else {
      return pets.$seniorPet !== pet.age.$t;
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
    $petWanted = $(this).val();
    pets.searchClick($petWanted);
  });
};

pets.searchClick = function(wanted) {
  $('#find-new-pet-btn').off().on('click', function() {
    var $zipSearch = $('#zipFind').val();
    console.log($zipSearch);
    pets.requestPets($zipSearch, $petWanted);
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
    $specialPet = this.value;
    console.log($specialPet);
  });
};

pets.howBig = function() {
  $('#petLargeness').off().on('change', function(){
    $petSize = this.value;
    console.log($petSize);
  });
};

pets.assignedGender = function() {
  $('#sexRadio').off().on('click', function(){
    $petSex = this.value;
    console.log($petSex);
  })
};


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

pets.pareDown = function(){
  $('#show-me-btn').off().on('click', function(){
    console.log('show me was clicked');
    //check if at least one of senior & special needs is checked
    if (pets.$seniorPet || pets.$specialPet) {
      console.log('form is valid');
      //if yes, filter results
      pets.filtered = pets.all
        .filter(function(pet) {
           return pets.isSenior(pet);
         })
        //.filter(//check special needs)
    } else {

      //if not, reject the form submission
    }

      // pets.all.forEach(function(a){
      //   if (pets.$seniorPet === a.age.$t) {
      //     console.log('checked the if');
      //     pets.filtered.push(a);
      //   // } else if ($specialPet === a.options.0.$t || a.options.1.$t || a.options.2.$t || a.options.3.$t || a.options.4.$t || a.options.5.$t || a.options.6.$t || a.options.7.$t || a.options.8.$t) {
      //     console.log('special needs');
      //     pets.filtered.push(a);
      //   }
      //  else if ($petSize === a.size.$t) {
      //   pets.filtered.push(a);
      // } else if ($petSex === a.sex.$t) {
      //   pets.filtered.push(a);
      // }
    //})
    // then call .toHTML
  });
}



// +myProj.forEach(function(a){
//  +  $('#workDone').append(a.toHtml());
//  +});



  // pets.with = function(attr) {
  //   return pets.all.filter(function(repo){
  //     return repo[attr];
  //   });
  // };

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
