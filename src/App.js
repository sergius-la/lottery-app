import web3 from './web3'
import { Component } from 'react';
import {getManager, getPlayers, pickWinner, buyTicket, getBallance} from './lottery'

class App extends Component {
  
  state = {
    manager: "",
    players: [],
    ballance: "",
    value: '',
    message: ''
  }

  async componentDidMount() {
    const manager = await getManager()
    const players = await getPlayers()
    const ballance = await getBallance()

    this.setState({manager, players, ballance})
  }

  onSubmit = async (event) => {
    event.preventDefault()
    
    this.setState({message: "Waiting on transaction success..."})
    
    const accounts = await web3.eth.getAccounts()
    await buyTicket(accounts[0], this.state.value)

    this.setState({message: "You have been entered!"})
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts()

    this.setState({message: "Waiting on transaction success..."})
    await pickWinner(accounts[0])
    this.setState({message: "A winner has been picked!"})
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered, competing to win {this.state.ballance} ether!
        </p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value = {this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr/>
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr/>
        <h4>{this.state.message}</h4>
      </div>
    );
  }
}

export default App;
