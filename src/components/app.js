import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Home from "./home";


const BASE_URL = 'http://api.reactprototypes.com';
const API_KEY = '?key=c618_jCarlisle';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }

    async addItem (item) {
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

    async getListData(){
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
                <Route exact path='/' render={(props)=>{
                    return <Home add={this.addItem.bind(this)} list={this.state.items} getList={this.getListData.bind(this)} {...props} />
                }} />
            </div>
        );

    }
}
export default App;
