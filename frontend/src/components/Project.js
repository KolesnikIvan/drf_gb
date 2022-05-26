import React from 'react';

const ProjectItem = ({project}) => {
    return(
        <tr>
            <td>{project.uid}</td>
            <td>{project.name}</td>
            {/* <td>{project.link_to_repo}</td> */}
            {/* <td>{project.users}</td> */}
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            {/* <tr> */}
                <th>project_ID</th>
                <th>project_NAME</th>
                <th>LINK_to_project</th>
                {/* <th>project_USERS</th> */}
            {/* </tr> */}
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectList;