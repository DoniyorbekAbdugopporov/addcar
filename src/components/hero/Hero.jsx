import { Component } from "react";

export default class Hero extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      show: false,
      data: null,
    };
    this.handleReset = this.handleReset.bind(this);
  }
  handleClick(p) {
    alert("Click comp " + p);
  }
  handleReset() {
    console.log("ok");
    this.setState({ count: 0 });
  }
  render() {
    return (
      <div>
        <h2>
          {this.props.title} {this.state.count}
        </h2>
        <button
          className="border x-2"
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          Increment
        </button>
        <button
          disabled={this.state.count <= 0}
          className="border px-2 disabled:bg-slate-200"
          onClick={() => this.setState({ count: this.state.count - 1 })}
        >
          Decriment
        </button>
        {/* <button
          className="border px-2"
          onClick={() => this.setState({ count: (this.state.count = 0) })}
        >
          Reset
        </button> */}
        {this.state.count ? (
          <button className="border px-2" onClick={this.handleReset}>
            Reset
          </button>
        ) : (
          <></>
        )}
        <button className="border px-2" onClick={() => this.handleClick(5)}>
          click
        </button>
        <br />
        <button onClick={() => this.setState({show: !this.state.show})}>Show {this.state.show ? "Less" : "More"}</button>
        {
          this.state.show &&
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            obcaecati. Nobis deleniti vel sint? Qui minus veniam aliquid ullam
            illo aut fugiat consequuntur pariatur labore voluptatum nihil
            excepturi omnis in provident iste consectetur sequi, ab quas, magni
            vitae earum mollitia culpa perferendis! Quos voluptate velit
            laudantium voluptas fugiat in ad rerum sed explicabo delectus
            possimus, quas placeat magni. Deserunt, quibusdam? Porro
            consequatur, voluptatibus velit consectetur fugit quos nisi nulla
            temporibus corporis eius pariatur eligendi ad placeat ex dignissimos
            accusamus autem a voluptate? Esse corporis inventore incidunt rerum
            voluptatibus. Numquam tempora nobis vero veritatis sapiente
            exercitationem quasi, esse repellat ab at?
          </p>
        }
      </div>
    );
  }
}
