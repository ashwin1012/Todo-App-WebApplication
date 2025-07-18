import { useEffect, useState, useCallback } from "react";
import { retriveAllTodosForUsernameApi, deleteTodosApi, updateTodosApi } from './api/TodoApiService';
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodoComponent() {
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState()

    const refreshTodos = useCallback(() => {
        retriveAllTodosForUsernameApi(username)
            .then(response => setTodos(response.data))
            .catch(error => console.log(error))
    }, [username])

    useEffect(() => {
        refreshTodos();
    }, [refreshTodos]);

    function deleteTodo(id) {
        deleteTodosApi(username, id)
            .then(() => {
                setMessage(`Delete of todo with id= ${id} successful`)
                refreshTodos()
            })
            .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate(`/todo/-1`)
    }

    function handleDoneChange(e, id) {
    const selectedValue = e.target.value;

    const updatedDone = selectedValue; 
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = {
        ...todoToUpdate,
        done: updatedDone
    };

    updateTodosApi(username, id, updatedTodo)
        .then(() => {
            setMessage(`Updated todo status for id=${id}`);
            refreshTodos();
        })
        .catch(error => console.log(error));
}



    return (
        <div className='container'>
            <h2>Things You Want Todo!</h2>
            {message && <div className="alert alert-warning">{message}</div>}

            <table className='table'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Done</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="btn btn-success m-5" onClick={addNewTodo}>Add Todo</div>
        </div>
    )
}

export default ListTodoComponent;
