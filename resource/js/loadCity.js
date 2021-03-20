
function getPosition(){
  navigator.geolocation.getCurrentPosition(function(position){
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = function(result, status){
      if (status === kakao.maps.services.Status.OK){
        let locate = result[0].address_name;
        console.log(locate)
      }
    };
  geocoder.coord2RegionCode(position.coords.longitude, position.coords.latitude, callback)
  })
}


function init(){
  getPosition()
}

init();
