import React from 'react'

const TodoItem = ({ todo }) => {
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
        </tr >
    )
}

const TodoList = ({ notes }) => {
    return (
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
            </tr>

            {notes.map((note) => <TodoItem todo={note} />)}
        </table>
    )
}
export default TodoList