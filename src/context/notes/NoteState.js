import { useState } from "react";
import NoteContext from "./noteContex";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzOTQxYTgzZmEwYTU4Y2JmOGU0YTY3In0sImlhdCI6MTY2NTIxODQ5OX0.H44Sqa6bCI1dWpw8Ry7Hpbvbwt3lrUb59uf0prGI_U8",
          
      },
    });
    const json = await response.json();

    setnotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzOTQxYTgzZmEwYTU4Y2JmOGU0YTY3In0sImlhdCI6MTY2NTIxODQ5OX0.H44Sqa6bCI1dWpw8Ry7Hpbvbwt3lrUb59uf0prGI_U8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };
  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzOTQxYTgzZmEwYTU4Y2JmOGU0YTY3In0sImlhdCI6MTY2NTI5NjIzMH0.jXzA6AWsUVgMq5t4Shf6q6Ngl_tbnn7h4bFb3JsVgWo",
      },
    });
      await response.json()
    const NewNode = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(NewNode);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzOTQxYTgzZmEwYTU4Y2JmOGU0YTY3In0sImlhdCI6MTY2NTI5NjIzMH0.jXzA6AWsUVgMq5t4Shf6q6Ngl_tbnn7h4bFb3JsVgWo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json  = await response.json()
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic for edit notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      }
    }
    setnotes(newNotes)
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
