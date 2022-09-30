import './styles.css';
import React, {useState, useEffect} from 'react';

import { Card } from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState ({ name:'', avatar: ''});

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);

  }

  useEffect(() =>{
    fetch('https://api.github.com/users/jhonatansiqueira')
    .then(response => response.json())
    .then(data=> {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
    .catch(error => console.error(error))

  }, []);

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil do responsável" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder='Digite o nome...'
        onChange={e => setStudentName (e.target.value)}
      />

      <button type='button' onClick={handleAddStudent}>
        Adicionar
        </button>

      {
        students.map(student => (
        <Card 
        key = {student.time}
        name={student.name} 
        time={student.time}
        />
        ))
      }

    </div>
  )
}
