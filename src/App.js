import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import './App.css';
import { useEffect, useState } from 'react';
import GanttPage from './pages/GanttPage';
import Navbar from "./components/Navbar";
import Resources from './pages/Resources';
import AddResource from './pages/AddResource';
import EditResource from './pages/EditResource';
import { Switch } from '@material-ui/core';
function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState("")

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                {/* <Switch>  */}
                <Routes>
                    <Route path="/" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
                    <Route path="/gantt" element={<GanttPage />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/add-resource" element={<AddResource />} />
                    <Route path="/edit-resource" element={<EditResource />} />
                </Routes>
                {/* </Switch> */}
            </BrowserRouter>
            {/* <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/faq" component={Faq} />
                </Switch>
            </Router> */}
        </div>
    );
}

export default App;