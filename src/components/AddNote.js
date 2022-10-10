import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContex'
function AddNote() {
    const noteDetails = useContext(noteContext)
    const {addNote} =noteDetails
    const[note,setNote]=useState({
        title:"",
        description:"",
        tag :""
    })
    const handleClick=(e)=>{
      console.log("click");
      setNote({
        title:"",
        description:"",
        tag :""
      })
      addNote(note.title,note.description,note.tag)
     
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title"  value={note.title}onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="Description" className="form-label" >Description</label>
        <textarea className="form-control" id="description" rows="3" name='description' value={note.description}onChange={onChange}minLength={5} required ></textarea>
      </div>
      <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" value={note.tag}onChange={onChange} minLength={5} required/>
      </div>
      <button disabled={note.title.length < 5 || note.description.length } type="button" className="btn btn-primary" onClick={handleClick}>submit</button>
    </div>
  )
}

export default AddNote
