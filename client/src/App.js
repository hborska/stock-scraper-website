import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Reddit from './components/pages/Reddit';
import Twitter from './components/pages/Twitter';
import IntroPage from './components/pages/IntroPage';
import About from './components/pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='pages'>
          <Switch>
            <Route exact path='/' component={IntroPage} />
            <Route exact path='/reddit' component={Reddit} />
            <Route exact path='/twitter' component={Twitter} />
            <Route exact path='/about/' component={About} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
