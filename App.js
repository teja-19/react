import React from 'react'
import Add from './components/Add';
// import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Edit from './components/Edit';



const App = () => {

 
  return (
    <div className='container'>
       <h1>Todo App</h1><br/><br/>
          <div>
            {/* <Search/> */}
            <Add/>
          </div>
          {/* <Router>
        <Routes>
          <Route path='/' element={<Add/>}/>
          <Route path='/edit' element={<Edit/>}/>
        </Routes>
      </Router> */}
          


    </div>
  )
}

export default App
