
import React, { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import './home.css'


const Home = () => {
  const [city, setCity] = useState([])
  const [result, setResult] = useState('0')

  const changeHandler = e => {
    setCity(e.target.value)
   
  }



  
  const submitHandler = e => {
    e.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=24b9168e3b41ee0d13100e55f329cfb6`)
      .then(response => response.json())
      .then(result => {
        const kelvin = result.main.temp;
        const celcius = kelvin - 273.15
        setResult(Math.round(celcius)) 
      })
     
     
    
  }
  function DateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toDateString();
    document.getElementById('time').innerHTML = time;
    document.getElementById('date').innerHTML = date
  }
  setInterval(DateTime, 1000);
  return (
    <>
      <div className='container-fluid' id='container'>
        <div className='row'>
          <div className='col-12' id='weather'>
          <h1 className='title'>Weather Forecast </h1>
          <div className='text-center'> 
          <h1>{city}</h1>
                {
                 city.length ===0 && <h4>{               
                }</h4>
            }
            
              {
                result <= 23? (<img src='https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v5/Condition_Card/MostlyCloudyDayV2.svg' alt='' className='img-fluid'/>):
                (
                  <img src='https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v5/Condition_Card/MostlySunnyDay.svg' alt='' className='img-fluid'/>
                )
              }          
            <h1 className='result'> {result + '°C'}  </h1>
           
            </div>
            <form onSubmit={submitHandler}>
              <input type='text' placeholder='search ' value={city}   onChange={changeHandler} />
              <br/>
              <button type="submit">Submit</button>
              <button type="submit" onClick={()=>setCity("")}>Clear</button>

            </form>
           
            
            <div className='p-5'>
            <h1 id='time'></h1>
            <h1 id='date'></h1>
            </div>
           

          </div>
        </div>
      </div>


    </>
  )
}

export default Home

