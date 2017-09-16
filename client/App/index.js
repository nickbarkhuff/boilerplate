import "./style.scss";

import React from "react";
import events from "./events";

class App extends React.Component{
    constructor(){
        super();

        this.state = {};

        this.dispatch = this.dispatch.bind(this);
        window.dispatch = this.dispatch;
    }

    dispatch(event, data){
        if(events[event])
            this.setState(events[event](this.state, data, this.dispatch));
        else
            console.log(`No such event: "${event}"`);
    };

    render(){
        return (
            <div id="app">App</div>
        );
    }
}

export default App;
