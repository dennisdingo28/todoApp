import Todo from "./components/Todo";
import { TodoContextProvider } from "./context/TodoContext";

function App() {
  return (
    <div className="App min-h-screen bg-darkColor flex items-center justify-center">
      <TodoContextProvider>
        <Todo/>
      </TodoContextProvider>
    </div>
  );
}

export default App;
