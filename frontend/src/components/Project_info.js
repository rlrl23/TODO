import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.link}
            </td>
        </tr>
    )
}
const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}
const NoteItem = ({ todo }) => {
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

const ProjectInfo = ({ notes, users, projects }) => {
    let { id } = useParams();
    let filtered_notes = notes.filter((note) => note.project == id)
    let filtered_projects = projects.filter((project) => project.id == id)
    let users_id = filtered_projects[0].users.join()
    let filtered_users = users.filter((user) => users_id.includes(parseInt(user.id)))
    return (
        <div>
            <p></p>
            <table>
                <caption>Project</caption>
                <p></p>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Link
                    </th></tr>
                {filtered_projects.map((project) => <ProjectItem project={project} />)}
            </table>
            <p></p>
            <table>
                <caption>Working on</caption>
                <p></p>
                <tr>
                    <th>
                        Username
                    </th>
                    <th>
                        First name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Email
                    </th></tr>
                {filtered_users.map((user) => <UserItem user={user} />)}
            </table>
            <p></p>
            <table>
                <caption>To do</caption>
                <p></p>
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

                {filtered_notes.map((todo) => <NoteItem todo={todo} />)}
            </table>
        </div>
    )
}
export default ProjectInfo