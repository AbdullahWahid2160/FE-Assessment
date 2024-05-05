import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ListItem from "./ListItem";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";

user.setup();

// Mock useNavigate hook
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Create a mock Item
const mockItem = {
  name: "Test University",
};

// Create a mock delete function
const mockDelete = jest.fn();

describe(ListItem, () => {
  it("renders each item's name", () => {
    const { getByText } = render(<ListItem item={mockItem} />);
    const itemName = getByText(mockItem.name);
    expect(itemName).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    // Render the ListItem component with the mockDelete function
    render(<ListItem item={mockItem} onDelete={mockDelete} />);
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    // Click the delete button
    await user.click(deleteBtn);
    setTimeout(async () => {
      // Ensure that the mockDelete function is called as it should have been after 800ms.
      expect(mockDelete).toHaveBeenCalledTimes(1);
    }, 800);
  });

  it("navigates to details page when item name is clicked", async () => {
    // Render the ListItem component
    const { getByText } = render(<ListItem item={mockItem} />);
    const wholeItemCard = getByText(mockItem.name);
    expect(wholeItemCard).toBeInTheDocument();
    // Click the item name
    await user.click(wholeItemCard);
    // Ensure that the navigate function is called
    expect(mockNavigate).toHaveBeenCalledWith(`/details/${mockItem.name}`, {
      state: { university: { name: mockItem.name } },
    });
  });
});
