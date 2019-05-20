import React, { Component } from "react";
import axios from "axios";
import { data } from "./data";
import _ from 'lodash';

const url = "http://reduxblog.herokuapp.com/api/posts/?key=BOBO1234";


export default class ProfileHome extends Component {
  state = {}


  componentDidMount() {
    axios.get(url).then(res => {
      if (res.data.length === 0) {
        this.seed()
      }
      else { this.setState(res.data) }
    })
  }

  seed = () => {
    for (var i = 0; i < 6; i++) {
      ((index) => {
        setTimeout(() => { axios.post(url, data[index]) }, 3000 * i);
      })(i);
    }
  }

  render() {
    return (
      <div>
        {
          this.state === null || this.state === undefined ? <div>Loading Shows....</div>
            :
            _.map(this.state, (value,i) =>
              value.categories !== "off-broadway"
                ?
                <div key={i}>
                  <div>{value.title}</div>
                  <img
                    src={value.content}
                  />
                </div>
                :
                <div />
            )
        }
      </div>
    )
  }
}
