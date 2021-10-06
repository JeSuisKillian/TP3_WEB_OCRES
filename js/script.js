

// Fonction appelée lors du chargement de la page
window.onload = function () { start(); };

function start() {
  let city = document.getElementById('city-input').value;

  if (city === "") {
    city = "paris";
  }

  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function (response) {
      // Récupère la donnée d'une API
      const data = response.data;
      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;

    })
    .catch(function (error) {
      // Affiche une erreur
      console.error(error);
    })

  apiWeather
    .fetchThreeDayForecast()
    .then(function (response1) {
      // Récupère la donnée d'une API
      const data = response1.data;
      // On récupère l'information principal
      const main = data.list[0].weather[0].main; //On prend le 1 er jour d'où le list[0] 
      const main1 = data.list[1].weather[0].main;//2e jour etc
      const main2 = data.list[2].weather[0].main;

      const description = data.list[0].weather[0].description;//1er jour
      const description1 = data.list[1].weather[0].description;
      const description2 = data.list[2].weather[0].description;

      const temp = data.list[0].temp.day;
      const temp1 = data.list[1].temp.day;
      const temp2 = data.list[2].temp.day;

      const icon = apiWeather.getHTMLElementFromIcon(data.list[0].weather[0].icon);
      const icon1 = apiWeather.getHTMLElementFromIcon(data.list[1].weather[0].icon);
      const icon2 = apiWeather.getHTMLElementFromIcon(data.list[2].weather[0].icon);

      // Modifier le DOM
      document.getElementById('tomorrow-forecast-main').innerHTML = main; // On envoie les données du bon jour
      document.getElementById('tomorrow-forecast-more-info').innerHTML = description;
      document.getElementById('tomorrow-icon-weather-container').innerHTML = icon;
      document.getElementById('tomorrow-forecast-temp').innerHTML = `${temp}°C`;

      document.getElementById('AfterTomorrow-forecast-main').innerHTML = main1;
      document.getElementById('AfterTomorrow-forecast-more-info').innerHTML = description1;
      document.getElementById('AfterTomorrow-icon-weather-container').innerHTML = icon1;
      document.getElementById('AfterTomorrow-forecast-temp').innerHTML = `${temp1}°C`;

      document.getElementById('FewDays-forecast-main').innerHTML = main2;
      document.getElementById('FewDays-forecast-more-info').innerHTML = description2;
      document.getElementById('FewDays-icon-weather-container').innerHTML = icon2;
      document.getElementById('FewDays-forecast-temp').innerHTML = `${temp2}°C`;
    })

    .catch(function (error) {
      // Affiche une erreur
      console.error(error);
    });
}
