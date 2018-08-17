import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import axios from 'axios';

class TodoItem extends Component {
    constructor(props){
        super(props);
  
    this.state = {
        itemDetails: {}
    }

}

async componentDidMount(){
    const item_id = this.props.id;
    const {BASE_URL,API_KEY} = config.api;
    
    const resp = await axios.get(`${BASE_URL}/todos/${item_id + API_KEY}`);
    this.setState({
        itemDetails: resp.data.todo
    });
}

    async toggleItemComplete(id){
        const { api: {BASE_URL,API_KEY}} = config;

        try{
            const resp = await axios.put(`${BASE_URL}/todos/${id + API_KEY}`);
            return resp.data.todo;
        } catch(err){
            console.log('Toggle Complete Error:', err.message);
        }

    }

    async deleteItem(id){
        const { api: {BASE_URL,API_KEY}} = config; 

        try{
            const resp = await axios.delete(`${BASE_URL}/todos/${id + API_KEY}`);
            console.log('delete response   :' , resp);
        } catch(err){
            console.log('Delete Error   :', err.message);
        }

    }

    
    render() {

        console.log('ITEM ID:', this.props.id);
    return (
        <li className={this.props.complete? "green lighten-2 collection-item black-text":"red lighten-2 collection-item black-text"}>
            <div className="row">
                <div className="col s8">
                    <Link to={`/item-details/${this.props.id}`}>{this.props.title}</Link>    
                </div>
                <div className="col s2">
                    <button className ='btn red ' onClick={this.props.delete.bind(this, this.props.id)} >Delete</button>    
                </div>
                <div className="col s2">
                    <button className ={`btn lighten-2 ${ this.props.complete ? "red":"green"}`} >{this.props.complete?"Restore":"Complete"}</button>   
                </div>
            </div>
        </li>
    )
    }
}
            
export default TodoItem;
