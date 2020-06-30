import React from "react";
import './ShowcaseLayout.css'
import Selection from 'react-ds';
import GridLayout from 'react-grid-layout';

export default class ShowcaseLayout extends React.PureComponent {
  
  constructor() {
    super();
 
    this.state = {
      ref: null,
      elRefs: [],
      selectedElements: [], // track the elements that are selected
    };
  }
  
  handleSelection = (indexes) => {
    this.setState({
      selectedElements: indexes,
    });
  };
 
  getStyle = (index) => {
    if (this.state.selectedElements.indexOf(index) > -1) {
      // Selected state
      return {
        background: '#2185d0',
        border: '5px solid #2185d0',
        color: 'white',
        opacity: '1'
      };
    }
    return {};
  };
  
  addElementRef = (ref) => {
    const elRefs = this.state.elRefs;
    elRefs.push(ref);
    this.setState({
      elRefs,
    });
  };
  
  renderSelection() {
    if (!this.state.ref || !this.state.elRefs) {
      return null;
    }
    return (
      <Selection
      target={ this.state.ref}
      elements={ this.state.elRefs }
      onSelectionChange={ this.handleSelection }
      ignoreTargets= {['.content']}
      style={ this.props.style }
      offset = {{
        top: this.state.ref.getBoundingClientRect().top + window.scrollY -32,
        left: this.state.ref.getBoundingClientRect().left + window.scrollX,
      }}
      />
      );
  }
  
  allstorage(){
    var values = [],
    pics = [],
		keys = Object.keys(localStorage).sort(),
    i = keys.length;
    
    while(i--) {
      if (keys[i].includes('image', 0)) {
        pics = JSON.parse(localStorage.getItem(keys[i]))
        values.push( pics ) 
      }
    }
    return values;
  }

  render() {
    var images = [],
    descript = [],
    filename = [];
    var photos = this.allstorage();
    for (let index = 0; index < photos.length; index++) {
      descript.push(photos[index].user)
      filename.push(photos[index].filename)
      images.push(photos[index].imageFile)
    }
 
    return (
      <div>
        <div ref={ (ref) => { this.setState({ ref }); } } className='item-container'>
          <GridLayout className="layout" width={1315} cols={5} >
            {images.map((value, index) => (
              <div key={`item-${index}`} className="item" ref={ this.addElementRef } style={ this.getStyle(index) } data-grid={{x: index%5, y: 1, w: 1, h: 1}} >
                <img className={`item-${index}`} src= {images[index]} alt= ""></img>
                <div class="content" title={filename[index]}>
                  <p> { descript[index] } </p>
                </div>
              </div>
            ))}
          </GridLayout>
          { this.renderSelection() }
        </div>
      </div>
    )
  }
}
