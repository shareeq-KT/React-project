import React, { Component } from 'react';
import Header from '../header/header';
import ShowcaseLayout from '../ShowcaseLayout/ShowcaseLayout';

class main extends Component{ 
  render() {
    return (
      <div>
        <Header />
        <hr></hr>
        <ShowcaseLayout />
      </div>	
    );
  }
}

export default main;