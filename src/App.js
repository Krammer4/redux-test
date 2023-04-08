import {useSelector, useDispatch} from 'react-redux'
import './App.css';
import { Counter } from './Components/Counter';
import { Users } from './Components/Users';


function App() {

  

  return (
    <div className="App">
      <Counter/>
      <Users/>
    </div>
  );
}

export default App;
