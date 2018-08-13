import React from 'react';
import {Link} from 'react-router-dom';

export default (props)=> {
    return (
        <li className='collection-item'>
            <Link to='/item-details'>{props.title}</Link>
        </li>
    )
}