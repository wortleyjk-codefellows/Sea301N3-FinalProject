(function(module){
  var controller = {};
  // $('section').hide(); //hides all initial sections first.
  // $('#stage-1').show();
  $('#nav-selection').slideUp(400);
  module.controller = controller;
})(window);


controller.displayFullPetDetails = function(pet) {
  var fullDetailHtml = $('#petDetails').html();
  var fullDetailTemplate = handlebars.compile(fullDetailHtml);
  fullDetailTemplate(pet);
  //Update the template in index.html ----- create some event on button that gets pet
};
