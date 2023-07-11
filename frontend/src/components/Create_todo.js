import React from 'react'

class CreateTodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'text': '',
            'project': props.projects[0].id,

        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        this.props.create_todo(this.state.text, this.state.project)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form">
                    <label>Text
                        <input type="text" name="text" placeholder='text' value={this.state.text} onChange={(event) => this.handleChange(event)} />
                    </label>
                    <label>Project
                        <select name="project" onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                        </select>
                    </label>

                    <input type="submit" value="Create" />
                </div></form>
        )
    }
}
export default CreateTodoForm