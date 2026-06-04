const apiKey = "b1a9b67bb7db3e5aa10fd1786c911856";

// Live Date & Time
function updateTime() {

    const now = new Date();

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById("date").innerHTML =
        now.toLocaleDateString("en-US", dateOptions);

    document.getElementById("time").innerHTML =
        now.toLocaleTimeString();
}

updateTime();
setInterval(updateTime, 1000);


// Weather Fetch Function
async function getWeather() {

    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod == "404") {
            alert("City not found");
            return;
        }

        document.getElementById("cityName").innerHTML = data.name;

        document.getElementById("temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        document.getElementById("humidity").innerHTML =
            "💧 Humidity: " + data.main.humidity + "%";

        document.getElementById("wind").innerHTML =
            "🌬 Wind: " + data.wind.speed + " km/h";

        document.getElementById("icon").src =
            "https://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png";

    } catch (error) {

        alert("Error fetching weather data");
        console.log(error);

    }
}