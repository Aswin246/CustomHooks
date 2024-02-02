import { useState, useEffect } from "react";
import axios from "axios";

function useTodos(n) {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const value = setInterval(() => {
      const fetchData = async () => {
        const response = await axios.get(
          "https://sum-server.100xdevs.com/todos"
        );
        setTodo(response.data.todos);
        setLoading(false);
      };
      fetchData();
    }, n * 1000);
    const fetchData = async () => {
      const response = await axios.get("https://sum-server.100xdevs.com/todos");
      setTodo(response.data.todos);
      setLoading(false);
    };
    fetchData();

    return () => {
      clearInterval(value);
    };
  }, [n]);
  return {
    todo: todo,
    loading: loading,
  };
}
function App() {
  // const [render, setRender] = useState(true);
  const { todo, loading } = useTodos(5);

  // useEffect(() => {
  //   setInterval(() => {
  //     setRender((r) => !r);
  //   }, 5000);
  // }, []);
  return (
    <>
      {/* {render ? <Component /> : <div>"Hello World"</div>} */}
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {todo.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
}

function Todo({ todo }) {
  return (
    <>
      <div>{todo.title}</div>
      <div>{todo.description}</div>
    </>
  );
}

// function Component() {
//   useEffect(() => {
//     console.log("Mounting");

//     return () => {
//       console.log("Un Mounting");
//     };
//   }, []);
//   return (
//     <>
//       <div>From the component</div>
//     </>
//   );
// }
export default App;
