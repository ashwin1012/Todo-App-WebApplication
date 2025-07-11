import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retriveTodosApi, updateTodosApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState, useCallback } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import moment from "moment"

export default function TodoComponent() {
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const authContext = useAuth();
    const navigate=useNavigate();
    const username = authContext.username;

    // useEffect(
    //     () => retriveTodos(), 
    //     [id]
    //  )

    // function retriveTodos() {
    //     if(id != -1){
    //         retriveTodosApi(username, id)
    //             .then(response => {
    //                 setDescription(response.data.description);
    //                 setTargetDate(response.data.targetDate);
    //             })
    //             .catch(error => console.log(error));
    //         }
    // }

    const retriveTodos = useCallback(() => {
    if (id !== "-1") {
        retriveTodosApi(username, id)
            .then(response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
            })
            .catch(error => console.log(error));
    }
    }, [id, username]);

    useEffect(() => {
        retriveTodos();
    }, [retriveTodos]);

   function onSubmit(values) {
        console.log("Form submitted with values:", values);
        const todo={
            id: id,
            username: username,
            description: values.description ,
            targetDate: values.targetDate ,
            done : false
        }

        console.log(todo)
        if(id===-1){
            createTodoApi(username,todo)
            .then(response => {
                navigate('/todos')
                })
            .catch(error => console.log(error));
        }else{
            updateTodosApi(username,id,todo)
            .then(response => {
                navigate('/todos')
                })
            .catch(error => console.log(error));
        }
    }

    function validate(values) {
        let errors ={
        }
        if(values.description.length<5){
            errors.description = 'Enter atleast 5 characters'
        }

     if (values.targetDate === null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
           errors.targetDate = 'Enter a target date';
        }

        console.log("Form submitted with values:", values);
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik 
                initialValues={{ description, targetDate }}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
                >
                        <Form>
                            <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                            />
                            <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                            />
                            <fieldset className="form-group mb-3">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group mb-3">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate" />
                            </fieldset>
                            <div>
                            <button className="btn btn-primary" type="submit">Save</button>
                            </div>
                        </Form>
                </Formik>
            </div>
        </div>
    );
}
