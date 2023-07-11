import React from 'react'
import { Link } from 'react-router-dom'

const ProjectItem = ({ project }) => {
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

        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table>
            <caption>Projects</caption>
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

            </tr>

            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
export default ProjectList