// Step 3: Write the Fetch Function
/*async function fetchWeatherData(city) {
    // ⚠️ IMPORTANT: Replace 'YOUR_API_KEY' with your actual key from OpenWeatherMap
   
    const apiKey ='c1a9ef630b3b2c0a4412fab4d6748c3a';
    
    
    // Construct the API URL using the city name and your key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
    
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl); 

        // Check for 404 (City not found)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for city: ${city}`);
        }

        // Parse the JSON response
        const data = await response.json(); 

        // Log the data for testing (Step 5)
        console.log('Weather data:', data); 

        // Future Lab: Call a function to update the DOM here
        // updateWeatherDisplay(data);

    } catch (error) {
        console.error('Error fetching weather data:', error); 
    }
}
*/

// Step 4: Modify the Existing Event Listener
/*document.getElementById('search-button').addEventListener('click', function() {
    // Get the value from the city input field
    const city = document.getElementById('city-input').value; 
    
    // Check if the input is empty
    if (city.trim() !== "") {
        // Call the new fetch function with the city name
        fetchWeatherData(city);
    } else {
        console.log("Please enter a city name.");
    }
});*/


/* Experiment 9: Task 1 - Simulate Geolocation Data */
/* Experiment 11: Task 2 - Geolocation Error Simulation */
function getUserLocation() {
    
    // NEW CODE FOR LAB 11: 20% chance of failure (random number is > 0.8)
    const isLocationAvailable = Math.random() > 0.2; 
    
    if (!isLocationAvailable) {
        throw new Error("Failed to detect location. Geolocation data is unavailable.");
    }
    
    // If successful, return the fixed coordinates
    return {
        latitude: 40.7128,
        longitude: -74.0060
    };
}

/* Experiment 12: Task 3 - Implement and Display Weather Icons */
function getWeatherIcon(condition) {
    // Maps a weather condition string to a simple emoji icon
    switch (condition) {
        case "Sunny":
            return "☀️"; // Sun emoji
        case "Cloudy":
            return "☁️"; // Cloud emoji
        case "Rainy":
            return "🌧️"; // Rain cloud emoji
        case "Snowy":
            return "❄️"; // Snowflake emoji
        case "Partly Cloudy":
            return "🌤️"; // Sun behind cloud emoji
        case "Thunderstorms":
            return "⛈️"; // Thunder cloud emoji
        case "Haze":
            return "🌫️"; // Fog/Haze emoji
        default:
            return "❓"; // Question mark for unknown
    }
}




/* Experiment 8: Simulating the 3-Day Weather Forecast */
/* Experiment 10: Task 2 - Location-Based Simulation */
function fetchWeatherData(city, latitude, longitude) { 
    
    // NEW CODE FOR LAB 11: Validate the city input
    if (typeof city !== 'string' || city.trim() === "") {
        throw new Error("Invalid city name. Please provide a valid city.");
    }
    // Define the list of possible weather conditions
    const weatherConditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Partly Cloudy", "Thunderstorms", "Haze"];
    
    const forecast = []; 
    const currentDate = new Date(); 

    // Loop 3 times to generate data for Day 1, Day 2, and Day 3
    for (let i = 0; i < 3; i++) {
        
        // Advance the date by one day in each loop
        currentDate.setDate(currentDate.getDate() + 1);

        // Calculate date parts
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; 
        
        // Generate random temperature between -10°C and 35°C, with one decimal place
        const temperature = (Math.random() * 45 - 10).toFixed(1); 

        // Randomly pick a condition from the array
        const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        
        // Generate random humidity between 40% and 99%
        const humidity = Math.floor(Math.random() * (99 - 40 + 1) + 40); 

        // Get the short name of the day (e.g., "Mon", "Tue")
        const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' }); 

       // Calculate icon based on the random condition
       const icon = getWeatherIcon(condition); // <--- NEW LINE 1

       // Push the complete day's data object to the forecast array
        forecast.push({
         date: `${month}/${day}`,
        dayName: dayName,
       temperature: parseFloat(temperature),
       condition: condition,
      humidity: humidity, 
       // ADDED FOR LAB 12
      icon: icon, // <--- NEW LINE 2
       latitude: latitude,
      longitude: longitude
        });
    }

    // Return the array of 3-day forecast objects
    return forecast;
}


// Function to update the DOM elements with fetched data
function updateWeatherDisplay(data) {
    // Round the temperature for display
    const temp = Math.round(data.main.temp);
    
    // Capitalize the first letter of the description for presentation
    const description = data.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
    // Update the HTML elements
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `${temp}°C`;
    document.getElementById('weather-description').textContent = description;
}

// Modify the existing fetchWeatherData function to call the new update function
 async function fetchCurrentWeatherAPI(city) {
    const apiKey = 'c1a9ef630b3b2c0a4412fab4d6748c3a'; // Ensure your key is here!
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for city: ${city}`);
        }

        const data = await response.json();
        
        // ********************************************
        // Call the new function to display the data!
        // ********************************************
        updateWeatherDisplay(data); 

        console.log('Weather data:', data); // Keep this for Lab 5 screenshot evidence
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// (Keep your existing event listener below)
// (Keep your existing event listener below)
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    
    // The weather API call is separate from the forecast error handling
    if (city.trim() !== "") {
       fetchCurrentWeatherAPI(city); 
        
        // START NEW CODE FOR LAB 11: TRY...CATCH
        try {
            // 1. Get location (Might throw Geolocation Error)
            const location = getUserLocation(); 
            
            // 2. Get forecast (Must pass city and might throw Invalid City Error)
            // NOTE: fetchWeatherData now accepts 3 args
            const forecastData = fetchWeatherData(city, location.latitude, location.longitude); 
            
            // 3. Log success with icons and detailed output (Task 4)
        console.log('--- 3-Day Forecast for:', city, '---');
        forecastData.forEach(dayForecast => {
            console.log(`Date: ${dayForecast.date} (${dayForecast.dayName})`);
            // Logs Condition and Icon
            console.log(`Condition: ${dayForecast.condition} ${dayForecast.icon}`); 
            console.log(`Temperature: ${dayForecast.temperature.toFixed(1)}°C`);
            console.log(`Humidity: ${dayForecast.humidity.toFixed(1)}%`);
            console.log(`Location: (${dayForecast.latitude}, ${dayForecast.longitude})`);
            console.log('---------------------------');
        });
        
        // You can keep the old simple log too, but the detailed one is better for the screenshot
        // console.log('3-Day Forecast Data (Raw):', forecastData);

        } catch (error) {
            // 4. If any error occurs (location or city validation), log the message
            console.error('Forecast Error:', error.message);
        }
        // END NEW CODE FOR LAB 11: TRY...CATCH
        
    } else {
        // This handles the empty city input case
        console.log("Please enter a city name.");
    }
}); 