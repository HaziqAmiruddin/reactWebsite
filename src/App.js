import React, { Component } from "react";
import CardList from "./CardList";
import {robots} from './robots';
import SearchBox from './SearchBox';
import './App.css';
import Scroll from './Scroll';

class App extends Component {
    constructor(){
        super()
        this.state = {
                robots: [],
                searchfield: ''
            }
        }
    
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(user => this.setState({robots: robots}));
        
    }
    
    onSerachChange = (event) => {
        this.setState({searchfield: event.target.value})
        // console.log(event.target.value);
        // console.log(filteredRobots);
    }

    render(){
        const filteredRobots = this.state.robots.filter(robots =>{
            return robots.name.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase());
        })

        if (this.state.robots.length === 0){
            return <h1 className="">Loading</h1>
        }else{
            return(
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSerachChange}/>
                    <Scroll>
                    <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;