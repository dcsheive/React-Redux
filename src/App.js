import React from 'react';
import './App.css';
import Terms from './Terms.js';


function App() {
  return (
    <div>
      <NameForm></NameForm>
    </div>

  );
}


export default App;
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      value: "",
      terms: ["React"]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  componentDidMount(query = "React") {
    fetch("http://hn.algolia.com/api/v1/search?query=" + query)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.hits
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    this.componentDidMount(this.state.value)
    this.state.terms.push(this.state.value)
    event.preventDefault();
  }

  render() {
    let error = this.state.error;
    let isLoaded = this.state.isLoaded;
    let items = this.state.items;
    let terms = this.state.terms;

    if (error) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <div>Error: {error.message}</div>);
        </div>
      )
    } else if (!isLoaded) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <div>Loading...</div>;
        </div>
      )
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <ul>
            {items.map(item => (
              <li key={item.title}>
                {item.title}
              </li>
            ))}
          </ul>
          <h1>Searched Terms</h1>
                <ul>
                    {terms.map(item => (
                        <li key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
        </div>

      );
    }
  }
}