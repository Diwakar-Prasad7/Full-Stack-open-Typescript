import React, { useState, useEffect } from 'react'
import diaryService from './dairyService'
import type { Visibility, Weather, DiaryEntry } from './types';
import axios from 'axios';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then(initialEntries => {
      setEntries(initialEntries)
    })
  }, [])

  const newDairyEntryAdd = (event: React.SyntheticEvent) => {
    event.preventDefault()
    diaryService.createNew({
      date,
      weather: weather,
      visibility: visibility,
      comment
    }).then(res => {setEntries(entries.concat(res))
      setDate('')
      setWeather(null)
      setVisibility(null)
      setComment('')
      }
    ).catch((error: unknown) => {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        if (typeof data === 'string') {
          setNotification(data);
        } else if (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string') {
          setNotification(data.error);
        } else {
          setNotification('Creation failed due to a server error.');
        }
      } else if (error instanceof Error) {
        setNotification(error.message);
      } else {
        setNotification('An unknown error occurred.');
      }

       setTimeout(() => {
        setNotification(null);
      }, 5000);
    })
  }

  return (
    <div>
      <div>
        {notification && (
          <p style={{ color: 'red' }}>
            {notification}
          </p>
        )}
        <h1>Add new Entry: </h1>
        <form onSubmit={newDairyEntryAdd}>
          <div><label>date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label></div>
          <div>
            <label>visibility: 
              <input
                type="radio"
                name="visibility"
                value="great"
                checked={visibility === 'great'}
                onChange={() => setVisibility('great')}
              />
              great
            </label>

            <label>
              <input
                type="radio"
                name="visibility"
                value="good"
                checked={visibility === 'good'}
                onChange={() => setVisibility('good')}
              />
              good
            </label>

            <label>
              <input
                type="radio"
                name="visibility"
                value="ok"
                checked={visibility === 'ok'}
                onChange={() => setVisibility('ok')}
              />
              ok
            </label>

            <label>
              <input
                type="radio"
                name="visibility"
                value="poor"
                checked={visibility === 'poor'}
                onChange={() => setVisibility('poor')}
              />
              poor
            </label>
          </div>
          <div>
            <label>weather: 
              <input
                type="radio"
                name="weather"
                checked={weather === 'sunny'}
                onChange={() => setWeather('sunny')}
              />
              sunny
            </label>

            <label>
              <input
                type="radio"
                name="weather"
                checked={weather === 'rainy'}
                onChange={() => setWeather('rainy')}
              />
              rainy
            </label>

            <label>
              <input
                type="radio"
                name="weather"
                checked={weather === 'cloudy'}
                onChange={() => setWeather('cloudy')}
              />
              cloudy
            </label>

            <label>
              <input
                type="radio"
                name="weather"
                checked={weather === 'stormy'}
                onChange={() => setWeather('stormy')}
              />
              stormy
            </label>

            <label>
              <input
                type="radio"
                name="weather"
                checked={weather === 'windy'}
                onChange={() => setWeather('windy')}
              />
              windy
            </label>
          </div>
          <div><label>comment <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} /></label></div>
          <button type='submit'>add</button>
        </form>
      </div>
      <div>
        <h1>Diary Entries:</h1>
        {entries.map(dairy => {
          return (
            <div key={dairy.id}>
              <h2>{dairy.date}</h2>
              <p>visibility: {dairy.visibility}</p>
              <p>weather: {dairy.weather}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
