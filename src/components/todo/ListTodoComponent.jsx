import { useEffect, useState, useCallback } from "react";
import { retriveAllTodosForUsernameApi, deleteTodosApi } from './api/TodoApiService';
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // for better date formatting

function ListTodoComponent() {
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState();

    const refreshTodos = useCallback(() => {
        retriveAllTodosForUsernameApi(username)
            .then(response => setTodos(response.data))
            .catch(error => console.error("Failed to fetch todos:", error));
    }, [username]);

    useEffect(() => {
        refreshTodos();
    }, [refreshTodos]);

    function deleteTodo(id) {
        deleteTodosApi(username, id)
            .then(() => {
                setMessage(`Todo with ID ${id} deleted successfully`);
                refreshTodos();
            })
            .catch(error => console.error("Delete failed:", error));
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`);
    }

    function addNewTodo() {
        navigate(`/todo/-1`);
    }

    // Optional: Add colored status badges
    function renderStatus(status) {
        const className = {
            Completed: "badge bg-success",
            Pending: "badge bg-warning text-dark",
            Rejected: "badge bg-danger"
        }[status] || "badge bg-secondary";

        return <span className={className}>{status}</span>;
    }

    return (
        <div className="container">
            <h2 className="my-4">Things You Want To Do</h2>
            {message && <div className="alert alert-success">{message}</div>}

            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{renderStatus(todo.done)}</td>
                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                            <td>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => updateTodo(todo.id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-success mt-4" onClick={addNewTodo}>Add Todo</button>
        </div>
    );
}

export default ListTodoComponent;
