import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./List/List";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </Router>
  );
};

export default App;
