import React from 'react'
import { Link } from 'react-router-dom'

const TodoItem = ({ todo, delete_todo, is_authenticated }) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.updated}
            </td>
            <td>
                {todo.user}
            </td>
            <td>  {String(todo.active)} </td>
            {is_authenticated() ? <td><button onClick={() => delete_todo(todo.id)} type='Button'>Delete</button></td> : <></>}
        </tr >
    )
}

const TodoList = ({ notes, delete_todo, is_authenticated }) => {
    return (
        <div>
            <table>
                <caption>ToDo</caption>
                <tr>
                    <th>
                        Text
                    </th>
                    <th>
                        Project
                    </th>
                    <th>
                        Created at
                    </th>
                    <th>
                        Updated at
                    </th><th>
                        User
                    </th><th>
                        Is active
                    </th>
                    <th></th>
                </tr>

                {notes.map((note) => <TodoItem todo={note} delete_todo={delete_todo} is_authenticated={is_authenticated} />)}
            </table>
            {is_authenticated() ? <Link to='create'>Create Todo</Link> : <></>}
        </div>
    )
}
export default TodoList