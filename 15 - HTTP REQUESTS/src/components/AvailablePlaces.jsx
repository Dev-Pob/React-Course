import Places from './Places.jsx';
import {sortPlacesByDistance} from '../loc.js'
import { useState, useEffect } from 'react';
import ErrorPage from './Error.jsx';
import { fetchAvaiblePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching , setIsFetching] = useState(false);
  const [ availablePlaces, setAvailablePlaces] = useState([]);
  const [ error, setError] = useState();

  useEffect(()=> {
    async function fetchPlaces() {
      setIsFetching(true);

      try{
        const places = await fetchAvaiblePlaces();

        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance( 
            places, 
            position.coords.latitude, 
            position.coords.longitude)
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error){
        setError(error);
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, [])

if (error) {    
  return <ErrorPage title="An error occurred!" message={error.message} />;
}

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
