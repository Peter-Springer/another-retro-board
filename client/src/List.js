import React, {Component} from 'react'

class List extends Component {

  render() {
    return (
      <section className="list-container">
        <h3 className="list-header">{this.props.columnName}</h3>
        <input
          className="list-input"
          placeholder={this.props.columnInstructions}
        />
        {this.props.data.map((data, i) => {
            return <div key={i}>{data}</div>
        }
        )}
      </section>
    )
  }
}

export default List
