function sameAsShipping(shippingInputs) { //fill input same as shipping
  if(shippingInputs){
    for(field in shippingInputs){ //get shipping fields
      var fieldValue = shippingInputs[field]; //shipping field value

      //fill inputs
      if(field == 'fullName'){
        $('#billFullName').val(fieldValue);
      }
      if(field == 'building'){
        $('#billBuilding').val(fieldValue);
      }
      if(field == 'streetAddress'){
        $('#billStreetAddress').val(fieldValue);
      }
      if(field == 'city'){
        $('#billCity').val(fieldValue);
      }
      if(field == 'country'){
        $('#billCountry').val(fieldValue);
        $('.selectpicker').selectpicker('refresh');
      }
      if(field == 'zip'){
        $('#billZip').val(fieldValue);
      }
    }

  }
}

if (navigator.geolocation) { //get geolocation

 navigator.geolocation.getCurrentPosition(success, error);

 function success(position) {

     var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en&key=AIzaSyAWy2cU-yKGnCa_M1dfetguYeSZkygobQc';

     $.getJSON(GEOCODING).done(function(location) {

      //fill inputs
      $('#country, #billCountry').val(location.results[0].address_components[5].long_name);
      $('.selectpicker').selectpicker('refresh');

      $('#city, #billCity').val(location.results[0].address_components[2].long_name);
      $('#zip, #billZip').val(location.results[0].address_components[6].long_name);

     })

 }
 function error(err) {
     console.log(err)
 }

}
