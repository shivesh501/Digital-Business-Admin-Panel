
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './Components/Layout';
import Calendar from './pages/Calendar/Calendar';
import Boards from './pages/Board/Boards';
import DataGrid from './pages/DataGrid/DataGrid';
function App() {
  return (
      <div id="dashboard">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="Dashboard" element={<Dashboard />}></Route>
            <Route path="Calendar" element={<Calendar/>}></Route>
            <Route path="Board" element={<Boards/>}></Route>
            <Route path="Users" element={<DataGrid/>}></Route>
       
            
         
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
