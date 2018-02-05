import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Explore from '../Explore/Explore';
import Playlists from '../Playlists/Playlists';
import Player from '../Player/Player';


export default class Root extends Component {
  render() {
    return(
      <div>
        <Navbar history={this.props.history}/>
        <Switch>
         
          <Route 
            exact 
            path="/" 
            component={() => (<Redirect to="/explore"/>)}
          />
          
          <Route 
            exact 
            path="/explore" 
            component={() => (<Redirect to="/explore/trance"/>)}
          />
          
          <Route path="/explore/:genre" component={Explore}/>
          <Route exact path="/playlists" component={Playlists}/>
        </Switch>
        <Player />
      </div>
    )
  }
}

