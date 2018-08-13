import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import axios from 'axios';


class ItemDetails extends Component{
    state = {
        itemDetails: null
    }

    async componentDidMount(){
        const {item_id} = this.props.match.params;
        const {BASE_URL,API_KEY} = config.api;
        
        const resp = await axios.get(`${BASE_URL}/todos/${item_id + API_KEY}`);
        this.setState({
            itemDetails: resp.data.todo
        });
    }
    
    async handleDelete(){
        console.log('delete item:   ', this.state.itemDetails._id);
        await this.props.delete(this.state.itemDetails._id);

        this.props.history.push('/');
    }

    render(){

        const {itemDetails} =this.state;
        console.log(itemDetails);

        if(!itemDetails){
            return <h1 className ='grey-text'>Loading...</h1>;
        }


        return (
            <div>
                <h1 className='center'>Item Details</h1>
                <div className="row">
                    <div className="col s12 right-align">
                    <Link to='/' className='btn indigo darken-2'>Back to List</Link>
                    </div>
                </div>
            
                <h4><em>Title:</em> {itemDetails.title}</h4>
                <h4><em>Details:</em> {itemDetails.details}</h4>
                <div>
                    <div className="row">
                        <div className="col s6 center">
                        <button className="btn blue">Toggle Complete</button>
                        </div>

                        <div className="col s6 center">
                        <button onClick= {this.handleDelete.bind(this)} className="btn red darken-2">Delete</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ItemDetails;

