import React from 'react'


class ProjectCreateForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {name:'', link_to_repo:''}
    }

    handleEvent(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        // console.log(this.state.name)
        // console.log(this.state.link_to_repo)
        this.props.createProject(this.state.name, this.state.link_to_repo)
        event.preventDefault()
    }

    render(){
        return(
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">name</label>
                    {/* value={this.state.name} */}
                    <input type="text" className="form-control" name="name"  onChange={(event)=>this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label for="link_to_repo">text</label>
                    {/* value={this.state.link_to_repo} */}
                    <input type="text" className="form-control" name="link_to_repo"  onChange={(event)=>this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        )
    }
}

export default ProjectCreateForm;