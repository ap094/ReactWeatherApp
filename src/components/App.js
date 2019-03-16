import React from "react";
import Weather from "./weather";
import Form from "./Form";
import Titles from "./titles";

const Api_Key = "11c135f01945721cee17d80e03889d51";

class App extends React.Component {

  state = {

    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    e.preventDefault();   
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${Api_Key}`);
    const response = await api_call.json();

    console.log(response);

    if(city && country){
      if(country.length < 2 || country.length > 2)
      {
        this.setState({
          error: "Please input correct country code!"
        })
      }
      else{
        this.setState({
          temperature: response.main.temp,
          city: response.name,
          country: response.sys.country,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          error: ""
        })
      }
    }else{
      this.setState({
        error: "Please input search values..."
      })
    }

  }

  render() {

    return (
      <div className="weather">
          <Titles />
          <Form loadWeather={this.getWeather} />
          <Weather
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              error={this.state.error}
          />
      </div>
    )
  }
}

export default App;
