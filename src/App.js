import './App.css';
import AddNote from './components/AddNote';



function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Заметки</h1>
        <AddNote />
      </div>
    </div>
  );
}

export default App;