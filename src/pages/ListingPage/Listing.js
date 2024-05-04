import React, { useEffect } from "react";
import ListItem from "../../components/ListItem/ListItem";
import "./Listing.css"; // Import CSS file for styling
import { useDispatch, useSelector } from "react-redux";
import {
  searchedItems,
  sortedItems,
  deleteItem,
  fetchItemsAsync,
} from "../../features/Items/itemSlice.js";

const ListingPage = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.itemList.searchTerm);
  const filteredItems = useSelector((state) => state.itemList.filteredItems);

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  // Search items by name.
  const handleSearching = (e) => {
    const term = e.target.value;
    dispatch(searchedItems(term));
  };

  // Sort items Alphabetically.
  const handleSorting = () => {
    dispatch(sortedItems());
  };

  // Delete the selected item.
  const handleDeletion = (item) => {
    dispatch(deleteItem(item));
  };

  return (
    <div className="listing-page-container">
      <h1>List of all the Universities</h1>
      <div className="listing-section-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearching}
          className="search-input"
        />
        <button onClick={handleSorting} className="sort-btn">
          Sort A-Z
        </button>
      </div>
      <div className="item-list">
        {filteredItems?.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onDelete={() => handleDeletion(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
