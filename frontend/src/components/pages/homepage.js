import React, { Component } from 'react';
import "../../assets/css/custom.min.css";

class Homepage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gameIsRunning: false,
      sizeString: "10x10",
      size: 10,
      board: undefined,
      localBoard: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log(name);
    console.log(value);

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);

    let size;

    switch(this.state.sizeString) {
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

    let newBoard = [];
    for (let i = 0; i < size; i++) {
      newBoard[i] = [];
      for (let j = 0; j < size; j++) {
        newBoard[i][j] = "_";
      }
    }

    console.log(size);
    this.setState({
      localBoard: newBoard,
      size: size,
      gameIsRunning: true
    });

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
          fetch('/board', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(res => {
              if (res.status === 200) {
                return res.json();
              } else {
                return null;
              }
            })
            .then(json => {
              if (json !== null) {
                this.setState({board: json});
              }
            });
        }
      });

    event.preventDefault();
  }

  onClick(x, y) {
    console.log(x, y);
    fetch('/click', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        x: x,
        y: y
      }),
    })
      .then(res => {
        if (res.status === 200) {
          let localBoard = this.state.localBoard;
          localBoard[x][y] = this.state.board.basins[x][y];
          this.setState({localBoard: localBoard});
        }
        else {
          let localBoard = this.state.localBoard;
          localBoard[x][y] = "B";
          this.setState({
            localBoard: localBoard,
            gameIsRunning: false
          });

          alert('You hit a basin! Game over!');
        }
      });
  }

  getRow(num) {
    if (this.state.board === undefined) {
      return [];
    }

    let row = [];
    const size = this.state.size;

    for (let i = 0; i < size; i++) {
      if (this.state.gameIsRunning) {
        row.push((
          <div className="boardCell" key={num + i}>
            <button onClick={() => this.onClick(i, num)}>
              {this.state.localBoard[i][num]}
            </button>
          </div>
        ));
      } else {
        row.push((
          <div className="boardCell" key={num + i}>
            <button disabled onClick={() => this.onClick(i, num)}>
              {this.state.localBoard[i][num]}
            </button>
          </div>
        ));
      }
    }

    return row;
  }

  board() {
    let rows = [];

    if (this.state.board === undefined) {
      return (
        <div>
        </div>
      )
    }

    for (let i = 0; i < this.state.size; i++) {
      rows.push((
        <div className="row" key={i}>
          {this.getRow(i)}
        </div>
      ));
    }

    return (
      <div className="theBoard">
        <div className="container">
          {rows}
        </div>
      </div>
    )
  }

  options() {
    return (
     <div className="button" class="form-group">
      <div class="container"  className="optionsLabel">
        <div class="row justify-content-center">
          <div class="col-auto">
            <label htmlFor="sel1"><b>Select Board:</b></label>
          </div>
          <div class="col-auto">
            <select name="sizeString" className="form-control" id="sel1" value={this.state.sizeString} onChange={this.handleChange}>
              <option>10x10</option>
              <option>20x20</option>
              <option>30x30</option>
            </select>
          </div>
          <div class="col-auto">
            <input type="submit" className="btn btn-light" value="Start" />
          </div>
         </div>
      </div>
    </div>
    )
  }

  render() {
    return (
      <div>
          <form method="post" onSubmit={this.handleSubmit}>
            {this.options()}
          </form>


        <div class="row justify-content-center">
          {this.board()}
        </div>
      </div>
    );
  }
}

export default Homepage;
