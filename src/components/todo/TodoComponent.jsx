import { useNavigate, useParams } from "react-router-dom";
import { createTodoApi, retriveTodosApi, updateTodosApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import './TodoComponent.css';

export default function TodoComponent() {
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [done, setDone] = useState('');

  const authContext = useAuth();
  const navigate = useNavigate();
  const username = authContext.username;

  const retriveTodos = useCallback(() => {
    if (id !== "-1") {
      retriveTodosApi(username, id)
        .then(response => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
          setDone(response.data.done);
        })
        .catch(error => console.log(error));
    }
  }, [id, username]);

  useEffect(() => {
    retriveTodos();
  }, [retriveTodos]);

  function onSubmit(values) {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: values.done
    }

    if (id === "-1") {
      createTodoApi(username, todo)
        .then(() => navigate('/todos'))
        .catch(error => console.log(error));
    } else {
      updateTodosApi(username, id, todo)
        .then(() => navigate('/todos'))
        .catch(error => console.log(error));
    }
  }

  function validate(values) {
    const errors = {};
    if (!values.description || values.description.length < 5) {
      errors.description = 'Enter at least 5 characters';
    }
    if (!values.targetDate || !moment(values.targetDate).isValid()) {
      errors.targetDate = 'Enter a valid target date';
    }
    return errors;
  }

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h1>Todo Details</h1>
        <Formik
          initialValues={{ description, targetDate, done }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form>
            <ErrorMessage name="description" component="div" className="alert alert-warning" />
            <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />

            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <Field type="text" className="form-control" name="description" id="description" placeholder="Enter task description" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="targetDate">Target Date</label>
              <Field type="date" className="form-control" name="targetDate" id="targetDate" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="done">Status</label>
              <Field as="select" className="form-control" name="done" id="done">
                <option value="" label="Select status" />
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </Field>
            </div>

            <button type="submit" className="btn btn-save">Save Todo</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
