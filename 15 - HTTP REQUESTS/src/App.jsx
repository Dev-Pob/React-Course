import { useRef, useState, useCallback, useEffect } from 'react';
import ErrorPage from './components/Error.jsx';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces, fetchUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();
  
  const [isFetching , setIsFetching] = useState(false);
  const [ error, setError] = useState();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatingPlace, setErrorUpdatingPlace] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(()=>{
    async function fetchPlaces() {
      setIsFetching(true);
      try{
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      }catch(error){
        setError({ message: error.message || 'Failed to fetch user places',});
      }
      setIsFetching(false);
    };

    fetchPlaces();
  }, [])

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try{
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    }catch(error){
      setUserPlaces(userPlaces);
      setErrorUpdatingPlace({
        message: error.message || 'Failed to update places',
      });
    }
    
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try{
      await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
    }catch(error){
      setUserPlaces(userPlaces);
      setErrorUpdatingPlace({
        message: error.message || 'Failed to delete places',
      });
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError(){
    setErrorUpdatingPlace(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlace} onClose={handleError}>
        {errorUpdatingPlace && (
        <ErrorPage 
          title="An error occured" 
          message={errorUpdatingPlace.message} 
          onConfirm={handleError}
        />
        )}
        </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <ErrorPage 
          title="An error occured" 
          message={error.message}
        />}
        {!error && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          loadingText="Fetching"
          isLoading={isFetching}
          onSelectPlace={handleStartRemovePlace}
        />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
