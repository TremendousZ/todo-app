import React, {Component} from 'react';

class AddItem extends Component{
    state = {
        title: '',
        details: ''
    }

    handleInputChange = (event) =>{
        const{name, value} = event.target;
        this.setState({
            [name]:value
        });
    }

    handleSubmit =( event ) =>{
        console.log('values    ', this.state);
        event.preventDefault();
        this.props.add(this.state);
        this.setState({
            title: '',
            details: ''
        });
    }

    render(){
        const{title,details} = this.state;

        return (
            <form onSubmit = {this.handleSubmit}>
               <div className = 'row'>
                <div className = 'col s6'>
                    <label>Title</label>
                    <input type='text' value={title} name ='title' onChange={this.handleInputChange} />
                </div>
            
                <div className = 'col s6'>
                    <label>Details</label>
                    <input type='text' value={details} name ='details' onChange={this.handleInputChange} />
                </div>
                </div>
                <div className='row'>
                    <div className = 'col s12 right-align'>
                        <button className = 'btn indigo'>Add Item</button>
                    </div>
                </div>
              
            </form>
        )
    }
}
export default AddItem;