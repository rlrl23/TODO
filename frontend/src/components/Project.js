import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const ProjectItem = ({ project, delete_project, change_project }) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <Link to={`${project.id}/notes`}>Notes</Link>
            </td>
            <td><Link to={`change/${project.id}`}>Change</Link></td>
            <td><button onClick={() => delete_project(project.id)} type='Button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({ projects, delete_project, is_authenticated, change_project }) => {
    const [name, setName] = useState('');
    projects = projects.filter((project) => project.name.toLowerCase().includes(name.toLowerCase()))
    return (
        <div>
            <label>Find
                <input type="name" name="name" placeholder='name' value={name} onChange={(event) => setName(event.target.value)} />
            </label>

            <table>

                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Link
                    </th>
                    <th>
                        Users
                    </th>
                    <th>
                        Notes
                    </th>
                    <th></th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} delete_project={delete_project} change_project={change_project} />)}
            </table>
            {is_authenticated() ? <Link to='create'>Create Project</Link> : <p></p>}
        </div >
    )
}

export default ProjectList