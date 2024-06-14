import React, { useEffect, useState, useRef} from 'react'
import './Weather.css'


const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);
    //add api calling function before the return statement
    const inputRef = useRef()
    const search = async (city)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: Math.floor(data.wind.speed),
                temperature: Math.floor(data.main.temp),
                location: data.name,

            })
            
        } catch (error) {
            
        }
    }

    //hooks
    useEffect( ()=>{
        search("tokyo")
    }, [] )

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <svg onClick={()=>search(inputRef.current.value)} className='search-icon'xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>        
        </div>

        <div className='temp'>
            <h1>{weatherData.temperature}°C</h1>
            <p className='city'>{weatherData.location}</p>
        </div>

       {/* last two columns */}


        <div className='weather-data'>
            <div className='col'>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
            <div className='col'>
                <p>{weatherData.windSpeed} kmh</p>
                <span>Wind-speed</span>
            </div>
        </div>
    </div>
    
  )
}

export default Weather