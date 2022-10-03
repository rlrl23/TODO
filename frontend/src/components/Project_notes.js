import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const ProjectNoteItem = ({ todo }) => {
    return (
        <tr>
            <td>
                {todo.text}
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
            <td>   {todo.active} </td>
        </tr >
    )
}

const ProjectNoteList = ({ notes }) => {
    let { id } = useParams();
    let filtered_notes = notes.filter((note) => note.project == id)

    return (
        <table>
            <caption>Todo for Project {id}</caption>
            <tr>
                <th>
                    Text
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

            {filtered_notes.map((todo) => <ProjectNoteItem todo={todo} />)}
        </table>
    )
}
export default ProjectNoteList