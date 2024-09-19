import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [file, setFile] = useState(null); 
  const [summary, setSummary] = useState(''); 

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleGenerateSummary = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log("Réponse reçue : ", response.data);  // Log pour vérifier la réponse
  
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier:', error);
      }
    } else {
      alert('Veuillez importer un fichier !');
    }
  };
  
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center">Générateur de Résumés Automatiques</h1>

        <div className="upload-section">
          <input type="file" onChange={handleFileUpload} className="form-control" />
        </div>

        <div className="summary-section">
          <button onClick={handleGenerateSummary} className="btn btn-primary">Générer un Résumé</button>
        </div>

        {summary && (
          <div className="summary-result">
            <h2>Résumé Généré :</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>

      <footer>
        <p>&copy; 2024 - Générateur de Résumés | Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default App;
