import React, {useState, useEffect} from "react";
import api from './services/api.js';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response => setRepositories(response.data));
  },[])

  async function handleAddRepository() {
    let newRepository = {
      title: `New repo ${Date.now()}`,
    }
    const response = await api.post('repositories', newRepository);
    newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`);
    
    if(!response)
      return
    
    const index = repositories.findIndex(p=> p.id === id);
    
    if(index<0)
      return    
    
    const newRepositories = [... repositories];
    newRepositories.splice(index, 1);
    
    setRepositories(newRepositories); 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>          
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
