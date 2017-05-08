import {
  Grid,
  Row,
  Col,
  React
} from '../../globalImports'

export default class Chessboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chessboard:
      [
        [
          '\u265C',
          '\u265E',
          '\u265D',
          '\u265B',
          '\u265A',
          '\u265D',
          '\u265E',
          '\u265C'
        ],
        [
          '\u265F',
          '\u265F',
          '\u265F',
          '\u265F',
          '\u265F',
          '\u265F',
          '\u265F',
          '\u265F',
        ],
        [],
        [],
        [],
        [],
        [
          '\u2659',
          '\u2659',
          '\u2659',
          '\u2659',
          '\u2659',
          '\u2659',
          '\u2659',
          '\u2659',
        ],
        [
          '\u2656',
          '\u2658',
          '\u2657',
          '\u2655',
          '\u2654',
          '\u2657',
          '\u2658',
          '\u2656'
        ]
      ]
    }


  }

  renderRow(num) {
    const row = this.state.chessboard[num-1]
    return (
      <Row className="chess-row">
        <Col className="chess-block" md={1}>{row[0]}</Col>
        <Col className="chess-block" md={1}>{row[1]}</Col>
        <Col className="chess-block" md={1}>{row[2]}</Col>
        <Col className="chess-block" md={1}>{row[3]}</Col>
        <Col className="chess-block" md={1}>{row[4]}</Col>
        <Col className="chess-block" md={1}>{row[5]}</Col>
        <Col className="chess-block" md={1}>{row[6]}</Col>
        <Col className="chess-block" md={1}>{row[7]}</Col>
      </Row>
    )
  }

  renderGrid() {
    return (
      <Grid>
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
        {this.renderRow(6)}
        {this.renderRow(7)}
        {this.renderRow(8)}
      </Grid>
    )
  }


  render() {
    return(
      <div className="chessboard">
        {this.renderGrid()}
      </div>
    )
  }
}
