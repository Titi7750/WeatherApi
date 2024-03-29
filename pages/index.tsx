import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios'
import { BsSearch } from 'react-icons/bs'

export default function Home() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.get(url);
    setWeather(res.data);
    setLoading(false);
    console.log(res.data);
    setCity('');
  }

  const addCity = (e) => {
    setCity(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Home page</h1>
        <form onSubmit={fetchWeather}>
          <input type="text" value={city} onChange={addCity} placeholder='Choississez une ville pour connaître son temps' />
          <button type="submit"><BsSearch /></button>
        </form>
        {loading && <p>Loading...</p>}
        {weather.main && (
          <div>
            <h2>{weather.name}</h2>
            <p>{weather.main.temp}°C</p>
            <p>{weather.main.humidity} humidity</p>
          </div>
        )}
      </main>
    </>
  )
}
