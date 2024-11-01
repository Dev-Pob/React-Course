import reactImg from 'C:/Users/Pio/Desktop/REACT/PROGRAMMING/3 - REACT ESSENTIALS/01-starting-project - Copia/src/assets/react-core-concepts.png'
import "./Header.css"
const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header(){
const description = reactDescriptions[genRandomInt(reactDescriptions.length)];
  return(
    <header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {description} React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
  );
}