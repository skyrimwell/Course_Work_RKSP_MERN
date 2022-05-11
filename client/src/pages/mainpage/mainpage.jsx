import axios from 'axios'
import React, { useState, useContext, useCallback } from 'react'
import './mainpage.css'
import { AuthContext } from '../../context/AuthContext'
function MainPage() {

  const [text, setText] = useState('')
  const { userId } = useContext(AuthContext)
  const [notes, setNotes] = useState([])


  // const getNotes = useCallback(async () => {
  //   try {
  //     await axios.get('/api/Notes/', {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       params: { userId }
  //     }).then((response) => setNotes(response.data))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [userId])

  const getNote = useCallback(async () => {
    try {
      await axios.get('/api/notes', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {userId}
      })
      .then((response) => setNotes(response.data))
    } catch (error) {
      console.log(error)
    }
  }, [userId])

  const createNote = useCallback(async () => {
    if (!text) return null;
    try {
      await axios.post('/api/Notes/addNote', { text, userId }, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          setNotes([...notes], response.data)
          setText('')
          getNote()
        })
    } catch (error) {
      console.log(error);
    }
  }, [text, userId, notes, getNote])

  const removeNote = useCallback(async (id) => {
    try {
      await axios.delete(`/api/Notes/delete/${id}`, {id}, {
        headers: { 'Content-Type': 'application/json'}
      })
      .then(() => getNote())  
    } catch (error) {
      console.log(error)
    }
  }, [getNote])

  return (
    <div className='container flex items-center justify-center h-screen '>
      <div className="main-page">
        <h4>Добавить заметку</h4>
        <form className='form form-login w-full max-w-sm' onSubmit={e => e.preventDefault()}>
          <div className='row flex items-center border-b border-teal-500 py-2'>
            <div className='input-field col'></div>
            <input
              type='text'
              id='text'
              name='input'
              className='validate appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <label htmlFor='input'>Заметка</label>
          </div>
          <div className="row">
            <button
              className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4  py-1 px-2 rounded'
              onClick= {createNote}
            >
              Сохранить
            </button>
          </div>
        </form>

        <h3>Добавленные заметки:</h3>
        <button 
          className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4  py-1 px-2 rounded'
          onClick={getNote}      
        >
          Показать заметки
        </button>
        <div className="notes">
          {
            notes.map((note, index) => {
              return (
                <div className="row notes-item" key={index}>
                  <div className="col notes-num text-purple">{index + 1}</div>
                  <div className="col notes-text text-purple">{note.text}</div>
                  <div className="col notes-buttons text-purple">
                    <button><svg className="w-6 h-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></button>
                    <button><svg className="w-6 h-6 text-purple" fill="orange" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></button>
                    <button onClick={() => removeNote(note._id)}><svg className="w-6 h-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg></button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MainPage