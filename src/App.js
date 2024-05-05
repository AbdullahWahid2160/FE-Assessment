import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingPage from "./pages/ListingPage/Listing";
import DetailsPage from "./pages/DetailsPage/Details";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* This default page will be the Listing Page. */}
          <Route path="/" element={<ListingPage />} />
          {/* This will be the Details Page for each Item . */}
          <Route path="/details/:itemId" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
