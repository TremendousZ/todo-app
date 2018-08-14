import React from 'react';
import {Link} from 'react-router-dom';

export default (props)=> {
    console.log('Props:'   ,props);
    return (
        <li className={props.complete? "green lighten-2 collection-item black-text":"red lighten-2 collection-item black-text"}>
            <Link to={`/item-details/${props.id}`}>{props.title}</Link>
        </li>
    )
}

