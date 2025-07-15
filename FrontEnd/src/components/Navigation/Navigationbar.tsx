import { Link } from 'react-router-dom';

const Navigationbar = () => {
    return (
        <nav className='flex justify-center items-center h-16 bg-slate-200'>
            <ul className='flex content-center space-x-8'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='add'>Add</Link></li>
                <li><Link to='search'>Search</Link></li>
            </ul>
        </nav>
    )
}

export default Navigationbar;