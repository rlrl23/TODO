import React from 'react'

class CreateProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'link': '',
            'users': [],

        }
    }
    handleChange(event) {
        if (event.target.name != 'users') {
            this.setState({ [event.target.name]: event.target.value });
        }
        else {
            let users = []
            for (let i = 0; i < event.target.selectedOptions.length; i++) {
                users.push(event.target.selectedOptions.item(i).value);
            }
            this.setState({ 'users': users })
        }
    }
    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.link, this.state.users)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form">
                    <label>Name
                        <input type="name" name="name" placeholder='name' value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    </label>
                    <label>Link
                        <input type="link" name="link" placeholder='link' value={this.state.link} onChange={(event) => this.handleChange(event)} />
                    </label>
                    <label>Users
                        <select multiple name="users" onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                        </select>
                    </label>
                    <input type="submit" value="Create" />
                </div></form>
        )
    }
}
export default CreateProjectForm