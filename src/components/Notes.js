import React,{useContext, useEffect,useRef,useState} from 'react'
import noteContext from '../context/notes/noteContex'
import Notesitem from './Notesitem'
import AddNote from './AddNote'
function Notes() {
  const noteDetails = useContext(noteContext)
  const {notes,fetchNotes,editNote} =noteDetails
  useEffect(()=>{
    fetchNotes()
  })
  const ref = useRef(null)
  const refClose = useRef(null)
  const[note,setNote]=useState({
    id:"",
    etitle:"",
    edescription:"",
    etag :""
})

  const updateNote=(currentnote)=>{
    ref.current.click()
    setNote({
      id:currentnote._id,
      etitle : currentnote.title,                                     
      edescription:currentnote.description,
      etag : currentnote.tag
    })
  }
  const handleClick=(e)=>{
    refClose.current.click()
     editNote(note.id,note.etitle,note.edescription,note.etag)

   
  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
    <AddNote/>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="etitle" name="etitle"  value={note.etitle}onChange={onChange} minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="Description" className="form-label" >Description</label>
        <textarea className="form-control" id="edescription" rows="3" name='edescription' value={note.edescription}onChange={onChange}minLength={5} required></textarea>
      </div>
      <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">Tag</label>
        <input type="text" className="form-control" id="etag" name="etag" value={note.etag}onChange={onChange} minLength={5} required/>
      </div>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length <5 || note.edescription.length <5} type="button" className="btn btn-primary" onClick={handleClick}>Update Change</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
      <h1>Your Notes</h1>
      {
        notes.map((note)=>{
          return <Notesitem note={note} updateNote={updateNote}/>
        })
      }
     
    </div>
    </>
  )
}

export default Notes
