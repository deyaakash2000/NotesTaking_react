import React ,{useContext}from 'react'
import noteContext from '../context/notes/noteContex'; 
import Navbar from './Navbar';
const About = () => {
  // const a = useContext(noteContext)
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   a.update()
  // });
  return (
    <>
      <Navbar/>
        <h1>This is About</h1>
        this is About Aakash
    </>
  )
}

export default About
