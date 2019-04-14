import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Yangframe extends Component{
    render(){
    if(this.props.size==="hide"){//unit 2 frames' play progress 
        return <iframe
                    src={
                      this.props.src
                    }
                    width="350px"
                    height="160px"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                  />
                }
        return  <iframe
        src={
          this.props.src
        }
        width="350px"
        height="350px"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
            />    
                }
            }