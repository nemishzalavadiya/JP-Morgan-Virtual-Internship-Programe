import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';
// instead of using node 11.0.0 and npm, I have used 10.18.0 because the node-gpy donot support python 3 in node v11.0.0 
// so i transfered to lower version otherwise i have to install python 2 which i donot need.
/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if(this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    } 
  }
// Making change to the graph every 1000 ms is costly and computationly high so i provided more delay to improve performance.
  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x=0;
    const interval = setInterval(()=>{
        DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
           data: [...this.state.data, ...serverResponds],
           showGraph:true,
        });
      });
      x++;
      if(x>5000){
        clearInterval(interval);
      }
    },100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
