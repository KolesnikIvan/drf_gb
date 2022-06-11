import React from 'react'

class TodoCreateForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {text: '', project: props.projects[0]?.uid}
    }

    handleEvent(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event){
        // console.log(this.state.text)
        // console.log(this.state.project)
        this.props.createTodo(this.state.project, this.state.text)
        event.preventDefault()
    }

    render(){
        return(
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                {/* <div className="form-group">
                    <label for="project">project</label>
                    <input type="text" className="form-control" name="project" value={this.state.project} onChange={(event)=>this.handleChange(event)}/>
                </div> */}
                <div className="form-group">
                    <label for="text">text</label>
                    {/* value={this.state.text} */}
                    <input type="text" className="form-control" name="text"  onChange={(event)=>this.handleChange(event)}/>
                    <select name='project' className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((item)=>
                        <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        )
    }
}
export default TodoCreateForm;