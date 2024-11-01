import { useState , Fragment} from 'react';
import CoreConcepts from '../Components/CoreConcepts.jsx';
import Header from "../Components/Header/Header.jsx";
import Examples from '../Components/Examples.jsx';


function App() {

  return (
    <div>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </div>
  );
}


export default App;
