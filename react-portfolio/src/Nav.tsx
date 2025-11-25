import { NavLink } from "react-router-dom"

function Nav() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/projects">Projects</NavLink></li>
                <li><NavLink to="/blog">Blog</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav