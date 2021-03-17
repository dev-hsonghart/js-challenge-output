const geocoder = new google.maps.Geocoder; 
const latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
geocoder.geocode(
  {'location': latlng}, 
  function(results, status) {
    console.log(results, status);
   });