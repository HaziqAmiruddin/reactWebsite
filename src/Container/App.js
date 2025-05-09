import React, { Component } from "react";
import CardList from "../Component/CardList";
import {robots} from '../robots';
import SearchBox from '../Component/SearchBox';
import './App.css';
import Scroll from '../Component/Scroll';
import ErrorBoundary from "../Component/ErrorBoundary";

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
        const { robots, searchfield } = this.state;
        // const filteredRobots = this.state.robots.filter(robot =>{
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        })

        // if (robots.length === 0){
        return !robots.length ?
            <h1 className="">Loading</h1> :
                (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSerachChange}/>
                    <Scroll>
                    <ErrorBoundary>
                    <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                    </Scroll>
                </div>
                );
            }
}

export default App;