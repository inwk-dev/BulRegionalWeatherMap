//Assign weatherAPI key and url
const weatherApi = {
  key: "a319769fc93d4192a74141349212703",
  url: "http://api.weatherapi.com/v1/",
};

//Bulgarian regional cities
const regions = [
  "Blagoevgrad",
  "Burgas",
  "Dobrich",
  "Gabrovo",
  "Haskovo",
  "Kardzhali",
  "Kyustendil",
  "Lovech",
  "Montana",
  "Pazardzhik",
  "Pernik",
  "Pleven",
  "Plovdiv",
  "Razgrad",
  "Rousse",
  "Shumen",
  "Silistra",
  "Sliven",
  "Smolyan",
  "Sofia-grad",
  "StaraZagora",
  "Targovishte",
  "Varna",
  "VelikoTurnovo",
  "Yambol",
  "Vratsa",
  "Vidin"
];

//Download Weather Data from API on loading the page 
//and store it in local storage
function downloadData() {
  regions.forEach((region) => {
    fetch(`${weatherApi.url}current.json?key=${weatherApi.key}&q=${region}`)
      .then((res) => res.json())
      .then((result) => {
        let io = result.current;
        localStorage.setItem(region, JSON.stringify(io));
      });
  });
}

//Populate Weather data from localStorage
function populateDataFields() {}
document.querySelectorAll(".oblast").forEach((element) => {
  element.addEventListener("click", function (element) {
    element.preventDefault();
    //Get Element
    var pathEl = element.originalTarget.id;
    var name = element.originalTarget.attributes[2].value;
    
    //parse localStorage
    var o = JSON.parse(localStorage.getItem(pathEl));
    
    //Populate fields
    var h_region = document.getElementById("city");
    h_region.innerHTML=name;
     
    var imgD = document.getElementById("weather-icon")
    var link = o.condition.icon;
    imgD.setAttribute("src",link);
    
    var temp_c_span = document.getElementById("temp");
    var temp_c = o.temp_c;
    temp_c_span.innerHTML ='Температура/Temperature: ' + temp_c + '°C';
    
    var hum_span = document.getElementById("humidity");
    var humidity = o.humidity;
    hum_span.innerHTML ='Влажност/Humidity: ' + humidity + ' g/m3';

    var wind_dir_span = document.getElementById("wind_dir");
    var wind_dir = o.wind_dir;
    wind_dir_span.innerHTML = 'Посока на вятъра/Wind Direction: ' + wind_dir;

    var wind_vel_span = document.getElementById("wind_velocity");
    var wind_kph = o.wind_kph;
    wind_vel_span.innerHTML = 'Скорост/Wind Speed: ' + wind_kph + ' km/h';

    var wind_dir_span = document.getElementById("precipitation");
    var precip_mm = o.precip_mm;
    wind_dir_span.innerHTML = 'Валежи/Precipitation: ' + precip_mm + ' mm';


  });
});
