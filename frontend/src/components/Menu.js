/* import React from 'react';
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'token': props.token,
        }
    }
    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({ 'token': token })
    }
    is_authenticated() {
        return this.state.token != ''
    }
    logout() {
        this.set_token('')
    }
    render() {
        return (
            <header>
                <div class="container">
                    <a href="/" class="logo">LOGO_OF_TODO</a>
                    <nav>
                        <ul class='nav'>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/todo'>Todo</Link></li>
                            <li>{this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}</li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Menu */

import { Link } from 'react-router-dom'


const Menu = () => {

    return (<header>
        <div class="container">
            <a href="/" class="logo">LOGO_OF_TODO</a>
            <nav>
                <ul class='nav'>
                    <li>
                        <Link to='/users'>Users</Link>
                    </li>
                    <li><Link to='/projects'>Projects</Link></li>
                    <li><Link to='/todo'>Todo</Link></li>

                </ul>
            </nav>
        </div>
    </header>
    )
}
export default Menu