import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { LastLocationProvider } from 'react-router-last-location';

import CreatePage from './pages/create';
import ProfilePage from './pages/profile';
import StartPage from './pages/start';
import EditPage from './pages/edit';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route path="/create" component={CreatePage} />
          <Route path="/profile/:id" component={ProfilePage} />
          <Route path="/edit/:id" component={EditPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
