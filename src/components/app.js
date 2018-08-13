import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import NotFound from './404';
import Home from "./home";
import ItemDetails from './item_details';
import config from '../config';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }

    async addItem (item) {
        const { api: {BASE_URL,API_KEY}} = config;
        
        try{
            if(!item.title){
                throw new Error('Missing Title');
            }
            if(!item.details){
                throw new Error('missing details');
            }
            
            await axios.post(`${BASE_URL}/todos${API_KEY}`,item);
        
            this.getListData();
    } catch(err){
        console.log('something went wrong', err.message)
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

    async getListData(){
        const { api: {BASE_URL,API_KEY}} = config; 
        console.log(config);

        const resp = await axios.get(`${BASE_URL}/todos${API_KEY}`);
        this.setState({
            items:resp.data.todos
        });
    }    
    // getListData(){
    //     // This is where you would call the server for data

    //     const response = axios.get(`${BASE_URL}/todos${API_KEY}`).then((resp) =>{
    //         this.setState({
    //             items: resp.data.todos
    //         });
            
    //     }).catch((err) => {
    //         console.log('there was an error', err.message);
    //     });
    //     this.setState({
    //         items: listData
    //     });
    // }

    render(){
        return (
            <div className ='container'>
                <Switch>
                    <Route exact path='/' render={(props)=>{
                        return <Home add={this.addItem.bind(this)} list={this.state.items} getList={this.getListData.bind(this)} {...props} />
                    }} />
                    <Route path='/item-details/:item_id' render={ routeProps => {
                        return <ItemDetails delete={this.deleteItem.bind(this)} {...routeProps} />
                    }} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );

    }
}
export default App;
