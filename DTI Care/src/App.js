import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Letters from './pages/Letters';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Sidebar />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/letters" component={Letters} />
            <Route path="/services" component={Services} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;