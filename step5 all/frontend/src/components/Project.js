import React from 'react';
import{Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return(
        <tr>
            {/* <td>{project.uid}</td> */}
            <td>{project.name}</td>
            {/* <td>{project.link_to_repo}</td> */}
            {/* <td>{project.users}</td> */}
            <td><button onClick={()=>deleteProject(project.uid)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                {/* <th>project_ID</th> */}
                <th>project_NAME</th>
                {/* <th>LINK_to_project</th> */}
                {/* <th>project_USERS</th> */}
                <th></th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>CreateP</Link>
        </div>
    )
}

export default ProjectList;