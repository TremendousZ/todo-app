import React from 'react';
import {Link} from 'react-router-dom';

export default (props)=> {
    console.log('Props:'   ,props);
    const {complete} = props;
    return (
        <li className={complete? "green collection-item":"red collection-item"}>
            <Link to={`/item-details/${props.id}`}>{props.title}</Link>
        </li>
    )
}
'collection-item'
