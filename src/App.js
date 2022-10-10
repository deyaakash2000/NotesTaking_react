
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Contact from './components/Contact';
// import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
  {/* <Alert message={"this is alert"}/> */}
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/contact" element={<Contact/>}/>
    </Routes>
  </BrowserRouter>
  </NoteState>
    </>
  );
}

export default App;
