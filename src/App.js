import React, { Component } from 'react'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './Login';
import Technologies from './components/Technology/Technologies';
import Sport from './components/Sports/Sport';
import National from './components/national/National';
import International from './components/International/International';
import Header from './Header';
import CreateTech from './components/Technology/CreateTech';
import CreateSports from './components/Sports/CreateSports';
import CreateNational from './components/national/CreateNational';
import CreateInternational from './components/International/CreateInternational';
import TechItems from './components/Technology/TechItems';
import SportItems from './components/Sports/SportItems';
import NationalItems from './components/national/NationalItems';
import InterNationalItems from './components/International/InterNationalItems';
import EditTech from './components/Technology/EditTech';
import EditSport from './components/Sports/EditSport';
import EditNational from './components/national/EditNational';
import EditInterNational from './components/International/EditInterNational'
class App extends Component {
  render() {
    return(
      <Router>
        <div className="" >
        <Header />
            <Route exact path="/" component={Login} /> 
            <Route exact path="/create_technologies" component={CreateTech} />
            <Route exact path="/technologies/:id" component={TechItems} />
            <Route exact path="/technologies/editTech/:id" component={EditTech} />
            <Route exact path="/editSport/:id" component={EditSport} />
            <Route exact path="/editNational/:id" component={EditNational} />
            <Route exact path="/editInterNational/:id" component={EditInterNational} />
            <Route exact path="/create_sports" component={CreateSports} />
            <Route exact path="/create_national" component={CreateNational}  />
            <Route exact path="/create_international" component={CreateInternational}  />
            <Route exact path="/technologies" component={Technologies}  />
            <Route exact path="/sports" component={Sport} />
            <Route exact path="/sports/:id" component={SportItems} />
            <Route exact path="/national" component={National}  />
            <Route exact path="/national/:id" component={NationalItems}  />
            <Route exact path="/international" component={International} />
            <Route exact path="/international/:id" component={InterNationalItems} />
        </div>
      </Router>
    )
  }
}
export default App