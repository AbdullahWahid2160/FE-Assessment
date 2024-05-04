import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Details.css"; // Import CSS file for styling

const DetailsPage = () => {
  const location = useLocation();
  const { university } = location.state;
  return (
    <div className="details-page-container">
      <h1>{university.name}</h1>
      <div className="details-section">
        <div className="detail-row">
          <strong>Country:</strong>
          <p>{university.country}</p>
        </div>
        <div className="detail-row">
          <strong>Domain:</strong>
          <p>{university.domains.join(", ")}</p>
        </div>
        <div className="detail-row">
          <strong>Website:</strong>
          <p>
            <a
              href={university.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {university.web_pages[0]}
            </a>
          </p>
        </div>
        <div className="detail-row">
          <strong>Alpha Two Code:</strong>
          <p>{university.alpha_two_code}</p>
        </div>
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button>Go Back to Listing Page</button>
      </Link>
    </div>
  );
};

export default DetailsPage;
