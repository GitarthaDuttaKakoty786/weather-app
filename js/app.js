// Step 3: Write the Fetch Function
async function fetchWeatherData(city) {
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


// Step 4: Modify the Existing Event Listener
document.getElementById('search-button').addEventListener('click', function() {
    // Get the value from the city input field
    const city = document.getElementById('city-input').value; 
    
    // Check if the input is empty
    if (city.trim() !== "") {
        // Call the new fetch function with the city name
        fetchWeatherData(city);
    } else {
        console.log("Please enter a city name.");
    }
});




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
async function fetchWeatherData(city) {
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
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city.trim() !== "") {
        fetchWeatherData(city);
    } else {
        console.log("Please enter a city name.");
    }
});