import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 

import './App.css';

import Home from './Home/Home';
import Login from './Login/Login';
import Recupero from './Login/Recupero';
import Squadre from './Squadre/Squadre';
import CreaSquadra from './Squadre/CreaSquadra';
import Anagrafica from './Anagrafica/Anagrafica';
import NuovoTesserato from './Anagrafica/NuovoTesserato';
import Profilo from './Profilo/Profilo';
import Squadra from './Squadre/Squadra';
import ModificaProfilo from './Profilo/ModificaProfilo';
import ModificaSquadra from './Squadre/ModificaSquadra';
import NuovaPass from './Login/NuovaPass'
import Eventi from "./Eventi/Eventi"
import Evento from './Eventi/Evento';
import NuovoEvento from './Eventi/NuovoEvento';
import Stats from './Stats/Stats';


function App() {
 
  return (
    <Router>
      <div className="App">
        <Switch>

          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/recupero">
            <Recupero />
          </Route>
          <Route exact path="/nuovaPass/:token">
            <NuovaPass />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/squadre">
            <Squadre />
          </Route>
          <Route exact path="/squadra/:id">
            <Squadra />
          </Route>
          <Route exact path="/squadra/:id/modifica">
            <ModificaSquadra />
          </Route>
          <Route exact path="/creaSquadra">
            <CreaSquadra />
          </Route>
          <Route exact path="/anagrafica">
            <Anagrafica />
          </Route>
          <Route exact path="/anagrafica/:id">
            <Profilo />
          </Route>
          <Route exact path="/anagrafica/:id/modifica">
            <ModificaProfilo />
          </Route>
          <Route exact path="/creaTesserato">
            <NuovoTesserato />
          </Route>
          <Route exact path="/eventi">
            <Eventi />
          </Route>
          <Route exact path="/evento/:id">
            <Evento />
          </Route>
          <Route exact path="/creaEvento">
            <NuovoEvento />
          </Route>
          <Route exact path="/stats">
            <Stats />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
