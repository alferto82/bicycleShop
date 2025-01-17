import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../Cart";
import { useCart } from "../../hooks/useCart";
jest.mock("src/hooks/useCart");

describe("Cart Component", () => {
  it("Show 'Your cart is empty' when cart has no elements", () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      handleRemoveFromCart: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("Show cart items when there are items in the cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        [
          { id: 1, name: "Frame", type: "Mountain", category: "Bicycle" },
          { id: 2, name: "Wheel", type: "Mountain", category: "Bicycle" },
        ],
      ],
      handleRemoveFromCart: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByText("Mountain - Frame")).toBeInTheDocument();
    expect(screen.getByText("Mountain - Wheel")).toBeInTheDocument();
  });

  it("Calls handleRemoveFromCart when remove button is clicked", () => {
    const handleRemoveFromCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        [
          { id: 1, name: "Frame", type: "Mountain", category: "Bicycle" },
          { id: 2, name: "Wheel", type: "Mountain", category: "Bicycle" },
        ],
      ],
      handleRemoveFromCart,
    });

    render(<Cart />);

    fireEvent.click(screen.getByText("Remove"));
    expect(handleRemoveFromCart).toHaveBeenCalledWith(0);
  });

  it("Displays multiple bikes correctly", () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        [
          { id: 1, name: "Frame", type: "Mountain", category: "Bicycle" },
          { id: 2, name: "Wheel", type: "Mountain", category: "Bicycle" },
        ],
        [
          { id: 3, name: "Frame", type: "Road", category: "Bicycle" },
          { id: 4, name: "Wheel", type: "Road", category: "Bicycle" },
        ],
      ],
      handleRemoveFromCart: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByText("Mountain - Frame")).toBeInTheDocument();
    expect(screen.getByText("Mountain - Wheel")).toBeInTheDocument();
    expect(screen.getByText("Road - Frame")).toBeInTheDocument();
    expect(screen.getByText("Road - Wheel")).toBeInTheDocument();
  });
});
