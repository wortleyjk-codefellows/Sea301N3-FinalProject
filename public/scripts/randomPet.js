(function(module) {
  var randomPets = {};
  randomPets.all = [];

randomPets.getRandom = function() {
  console.log('running getRandom');
  $.getJSON('https://api.petfinder.com/pet.getRandom?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&age=Senior&output=full&count=6&callback=?')
.done(function(petApiData) {
  console.log(petApiData);
  randomPets.all = [];
  randomPets.all = petApiData.petfinder.pet;
  console.log(randomPets.all);
}).fail(function(err)
{ alert('Error retrieving data!');
});
};

// here we need to forEAch over each item in the array, if special needs = true, then push that to the corresponding section/handlebars.  NOT SURE IF I NEED TO MAP THEM INTO A NEW ARRAY AND THEN DO THAT.





$(document).ready(function() {
  randomPets.getRandom();
});

module.pets = randomPets;
})(window);
