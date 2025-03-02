import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import TrafficGame from "../TrafficGame";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock DragDropContext since we can't test actual dragging in JSDOM
jest.mock("react-beautiful-dnd", () => ({
  DragDropContext: ({ children }) => children,
  Droppable: ({ children }) =>
    children({
      draggableProps: {},
      dragHandleProps: {},
      innerRef: jest.fn(),
    }),
  Draggable: ({ children }) =>
    children({
      draggableProps: {},
      dragHandleProps: {},
      innerRef: jest.fn(),
    }),
}));

describe("TrafficGame", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders start game button initially", () => {
    render(<TrafficGame onGameWon={() => {}} />);
    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  test("starts game when start button is clicked", () => {
    render(<TrafficGame onGameWon={() => {}} />);
    fireEvent.click(screen.getByText("Start Game"));
    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Moves: 0/15")).toBeInTheDocument();
  });

  test("loads saved progress from localStorage", () => {
    localStorage.getItem.mockReturnValue(JSON.stringify({ level: 2 }));
    render(<TrafficGame onGameWon={() => {}} />);
    fireEvent.click(screen.getByText("Start Game"));
    expect(screen.getByText("Level 2")).toBeInTheDocument();
  });

  test("saves progress when level is completed", () => {
    render(<TrafficGame onGameWon={() => {}} />);
    fireEvent.click(screen.getByText("Start Game"));

    // Simulate winning the level
    act(() => {
      const game = screen.getByTestId("traffic-game");
      fireEvent.dragEnd(game, {
        draggableId: "player",
        source: { droppableId: "1-2" },
        destination: { droppableId: "5-2" },
      });
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "trafficGameProgress",
      expect.stringContaining('"level":2')
    );
  });

  test("allows undoing moves", () => {
    render(<TrafficGame onGameWon={() => {}} />);
    fireEvent.click(screen.getByText("Start Game"));

    // Initially undo button should be disabled
    expect(screen.getByText("Undo")).toBeDisabled();

    // Make a move
    act(() => {
      const game = screen.getByTestId("traffic-game");
      fireEvent.dragEnd(game, {
        draggableId: "car1",
        source: { droppableId: "0-0" },
        destination: { droppableId: "0-1" },
      });
    });

    // Now undo button should be enabled
    expect(screen.getByText("Undo")).not.toBeDisabled();

    // Undo the move
    fireEvent.click(screen.getByText("Undo"));
    expect(screen.getByText("Moves: 0/15")).toBeInTheDocument();
  });

  test("shows win message with appropriate options", () => {
    render(<TrafficGame onGameWon={() => {}} />);
    fireEvent.click(screen.getByText("Start Game"));

    // Simulate winning within move limit
    act(() => {
      const game = screen.getByTestId("traffic-game");
      fireEvent.dragEnd(game, {
        draggableId: "player",
        source: { droppableId: "1-2" },
        destination: { droppableId: "5-2" },
      });
    });

    expect(screen.getByText(/Congratulations/)).toBeInTheDocument();
    expect(screen.getByText("Next Level")).toBeInTheDocument();
  });

  test("shows try again message when exceeding move limit", () => {
    render(<TrafficGame onGameWon={() => {}} />);
    fireEvent.click(screen.getByText("Start Game"));

    // Make 16 moves (exceeding the 15 move limit)
    for (let i = 0; i < 16; i++) {
      act(() => {
        const game = screen.getByTestId("traffic-game");
        fireEvent.dragEnd(game, {
          draggableId: "car1",
          source: { droppableId: "0-0" },
          destination: { droppableId: "0-1" },
        });
      });
    }

    // Simulate winning
    act(() => {
      const game = screen.getByTestId("traffic-game");
      fireEvent.dragEnd(game, {
        draggableId: "player",
        source: { droppableId: "1-2" },
        destination: { droppableId: "5-2" },
      });
    });

    expect(
      screen.getByText(/Try to solve it in fewer moves/)
    ).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });
});
