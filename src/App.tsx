import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './pages/Page1';
import Details from './pages/Details';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
