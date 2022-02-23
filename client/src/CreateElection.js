import React, { Component } from "react";
import App from "./App";

class CreateElection extends Component {
  constructor(props) {
    super(props);

    this.onChangeElectionName = this.onChangeElectionName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // These state variables would maintain inputs of the form
    this.state = {
      electionname: "",
      description: "",
      candidates: [],
    };
  }

  // To store App.js instance
  app = null;

  // Connect application with Metamask and create smart-contract's instance
  async init() {
    this.app = new App();
    await this.app.init();
  }

  componentDidMount() {
    this.init();
  }

  onChangeElectionName(e) {
    this.setState({
      electionname: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  // Function to be called when the form is submitted
  async onSubmit(e) {
    e.preventDefault();

    // Structuring Election details from the form before submitting transaction to the smart-contract
    const electionDetails = {
      electionname: this.state.electionname,
      description: this.state.description,
      candidateObjects: document.getElementsByName("candidate").values(),
      candidates: [],
    };

    var i = 0;

    for (var value of electionDetails.candidateObjects) {
      electionDetails.candidates[i] = value.value;
      i++;
    }

    // Making transaction to the MainContract instance, for creating a new election
    await this.app.mainInstance.createElection(
      [electionDetails.electionname, electionDetails.description],
      electionDetails.candidates,
      { from: this.app.account[0] }
    );

    window.location = "/active";
  }

  render() {
    return (
      <div className="container card">
        <h3>투표 생성</h3>

        {/* New Election Form */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>주제</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="주제를 입력하세요."
              onChange={this.onChangeElectionName}
            />
          </div>

          <div className="form-group">
            <label>부제</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="부제를 입력하세요."
              onChange={this.onChangeDescription}
            ></input>
          </div>

          <table>
            <tr>
              <td id="1" className="form-group">
                <label>후보1</label>
                <td>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="예) 이성현"
                    name="candidate"
                  />
                </td>

                <br />
                <label>후보2</label>
                <td>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="예) 멋쟁이"
                    name="candidate"
                  />
                </td>

                <br />
                <label>후보3</label>
                <td>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="예) 멋쟁이"
                    name="candidate"
                  />
                </td>

                <br />
                <label>후보4</label>
                <td>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="예) 멋쟁이"
                    name="candidate"
                  />
                </td>

                <br />
                <label>후보5</label>
                <td>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="예) 멋쟁이"
                    name="candidate"
                  />
                </td>
              </td>
            </tr>
          </table>

          <br />

          <div>
            <button
              className="btn btn-success grid-item"
              style={{ width: 100 }}
              type="submit"
            >
              확인
            </button>
          </div>

          <br />
        </form>
      </div>
    );
  }
}

export default CreateElection;
