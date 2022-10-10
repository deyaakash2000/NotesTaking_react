import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContex'
function Notesitem(props) {
  const noteDetails = useContext(noteContext)
  const {deleteNote} =noteDetails
  const{note,updateNote}=props
  return (
    <div className='col-md-3 my-3'>
      <div className="card ">
   <h3  className='mx-2'>Todo<span className="badge bg-secondary mx-3">{note.tag}</span></h3>
        <div className="card-body">
    <h5 className="card-title">{note.title}</h5>

    <p className="card-text">{note.description}</p>
    <div className="card-footer text-muted">
      {note.date}
    </div>
    <i className="fa-solid fa-trash mx-3 icone " onClick={()=>(deleteNote(note._id))}></i>
    <i className="fa-solid fa-pen-to-square mx-3 icone" onClick={()=>{updateNote(note)}}></i>
  </div>
</div>
    </div>
  )
}

export default Notesitem
