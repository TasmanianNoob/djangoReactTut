import {useState, useEffect} from "react";
import api from "../api"
import Note from "../components/Note.jsx"
import "../styles/home.css"

function Home()
{
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes()
    }, []);

    const getNotes = () =>
    {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data)
                console.log(data)
            })
            .catch((err) => alert(err));
    }

    const deleteNote = (id) =>
    {
        api
            .delete(`/api/notes/delete/${id}`)
            .then((res) =>
            {
                if (res.status === 204)
                {
                    alert("Note was deleted!")
                }
                else
                {
                    alert("Failed to delete note.")
                }

                getNotes() // better to edit list
            })
            .catch((err) => alert(err))
    }

    const createNote = (e) =>
    {
        e.preventDefault()
        api
            .post("/api/notes/", {content, title})
            .then((res) =>
            {
                if (res.status === 201) alert("Note created!")
                else alert("Failed to create note.")

                getNotes();
            })
            .catch((err) => alert(err))
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) =>
            (
                <Note note={note} onDelete={deleteNote} key={note.id}></Note>
            ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor={"title"}>Title:</label>
            <br/>
            <input
                type={"text"}
                id={"title"}
                name={"title"}
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}/>
            <label htmlFor={"content"}>Content:</label>
            <br/>
            <textarea
                id={"content"}
                name={"content"}
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}/>
            <br/>
            <input type={"submit"} value={"Submit"}/>
        </form>
    </div>
}

export default Home