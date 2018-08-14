import React, {Component} from 'react';
import TodoItem from './todo_item';

class TodoList extends Component{
    render(){
        const listElements = this.props.list.map(item => {
            return <TodoItem key={item._id} id={item._id} title={item.title} complete={item.complete} />;
        });


        return (
                <ul className ='collection'>
                    {listElements}
                </ul>
        );
    }
}

export default TodoList;