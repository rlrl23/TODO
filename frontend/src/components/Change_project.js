import React from 'react'
import { useParams } from 'react-router-dom'
class ChangeProjectForm extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            'id': this.props.projects.id,
            'name': '',
            'link': '',
            'users': [],
            'current_id': '',

        }
    }
    /* componentWillMount = () => {
        const id = useParams();
        const project = this.props.projects.get(id = id)
        this.setState({
            'id': id,
            'name': project.name,
            'link': project.link,
            'users': project.users,
        })
    }
    componentWillReceiveProps = () => {
        const id = useParams();
        const project = this.props.projects.get(id = id)
        this.setState({
            'id': id,
            'name': project.name,
            'link': project.link,
            'users': project.users,
        })
    } */
    handleIdChange(event) {
        let project = this.props.projects.filter((project) => project.id == event.target.value)[0]
        this.setState({
            'name': project.name,
            'link': project.link,
            'users': project.users,
            'current_id': event.target.value,
        })
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
        this.props.change_project(this.state.current_id, this.state.name, this.state.link, this.state.users)
        event.preventDefault()
    }
    render() {


        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form">
                    <label>Id
                        <select name="id" onChange={(event) => this.handleIdChange(event)}>
                            {this.props.projects.map((item) => <option value={item.id}>{item.id}</option>)}
                        </select> </label>
                    <label>Name
                        <input type="name" name="name" placeholder='name' value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    </label>
                    <label>Link
                        <input type="link" name="link" placeholder='link' value={this.state.link} onChange={(event) => this.handleChange(event)} />
                    </label>
                    <label>Users
                        <select multiple name="users" onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                        </select></label>

                    <input type="submit" value="Save changes" />
                </div></form>
        )
    }
}
export default ChangeProjectForm