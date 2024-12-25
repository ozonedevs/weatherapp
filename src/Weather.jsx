import {useState, useEffect} from 'react'
function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=auto:ip&aqi=no`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        } else {
          setWeather(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [API_KEY]);
  if (loading) return <div> Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    location: { name, region, country, localtime },

    current: {
      temp_c,
      temp_f,
      condition: { text, icon },
      wind_kph,
      feelslike_c,
    },
  } = weather;

  return (
    <>
      <h1>
        Weather in {name}, {region}, {country}
      </h1>
      <h2>Local Time: {localtime}</h2>
      <div>
        <img src={icon} alt={text} />
        <p>
          <strong>
            Temperature: {temp_c} °C or {temp_f} °F
          </strong>
        </p>
        <p>
          <strong> Feels Like: {feelslike_c} °C</strong>
        </p>

        <p>
          <strong> Wind: {wind_kph} kph</strong>
        </p>
      </div>
    </>
  );
}

export default Weather;

