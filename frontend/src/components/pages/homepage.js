import React, { Component } from 'react';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 10,
      board: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);

    let size;

    switch(this.state.size) {
      case "10x10":
        size = 10;
        break;
      case "20x20":
        size = 20;
        break;
      case "30x30":
        size = 30;
        break;
      default:
        size = 10;
        break;
    }

    console.log('fetching');
    fetch('/new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        size: size,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        else {
          return null;
        }
      })
      .then(json => {
        if (json !== null) {
          console.log('setting state');
          this.setState({board: json});
          console.log(this.state);
        }
      });

    event.preventDefault();
  }

  options() {
    return (
     <div className="form-group">
      <label htmlFor="sel1">Select list:</label>
      <select name="size" className="form-control" id="sel1" value={this.state.size} onChange={this.handleChange}>
        <option>10x10</option>
        <option>20x20</option>
        <option>30x30</option>
      </select>
    </div>
    )
  }

  render() {
    return (
      <div>
        <form method="post" onSubmit={this.handleSubmit}>
          {this.options()}
          <input type="submit" className="btn btn-primary" value="Update (this will restart the game)" />
        </form>
      </div>
    );
  }
}

export default Homepage;
