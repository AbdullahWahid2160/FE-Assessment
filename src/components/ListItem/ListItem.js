import React, { useState } from "react";
import "./ListItem.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const ListItem = ({ item, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
      setIsDeleting(false);
    }, 800);
  };

  const handleItemClick = (item) => {
    navigate(`/details/${item.name}`, { state: { university: item } });
  };

  return (
    <div
      className={`list-item-container ${isDeleting ? "fade-out" : ""}`}
      data-testid="Test Item"
    >
      <span className="item-name" onClick={() => handleItemClick(item)}>
        {item.name}
      </span>
      <button onClick={handleDelete} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default ListItem;
