import { Link } from 'react-router-dom'

const Menu = () => {
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
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Menu