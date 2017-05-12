import {
  Grid,
  Row,
  Col,
  React
} from '../../globalImports'
import Chess from '../../src/chess'

export default class Chessboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chessboard: new Chess(),
      selecting: false,
      initialPos: null,
      possibleMoves: [],
      playerTurn: 'Player 1',
      winStatus: '',
      KingPos: [[0,4],[7,4]]
    }
    this.renderRow = this.renderRow.bind(this)
    this.renderGrid = this.renderGrid.bind(this)
    this.renderSelect = this.renderSelect.bind(this)
    this.renderMove = this.renderMove.bind(this)
    console.log(this.state.chessboard)
  }

  renderSelect(blocks, currentPos) {
    if(blocks) {
      if(!this.state.selecting || currentPos !== this.state.initialPos) {
        console.log('blocks', blocks)
        this.setState({
          chessboard: this.state.chessboard.deactivateBlocks()
        })
        this.setState({
          chessboard: this.state.chessboard.activateBlocks(blocks),
          selecting: true,
          possibleMoves: blocks
        })
      }
      else {
        this.setState({
          chessboard: this.state.chessboard.deactivateBlocks(),
          selecting: false,
          possibleMoves: []
        })
      }
    }
  }

  renderMove(x, y, chessNode) {
    if(this.state.selecting || (this.state.playerTurn === 'Player 1' && chessNode.color === 'black') ||
      (this.state.playerTurn === 'Player 2' && chessNode.color === 'white')) {
      this.renderSelect(this.state.chessboard.movePiece(x, y, chessNode))

      if(!this.state.possibleMoves.some(move => move[0] === x && move[1] === y)) {
        this.setState({
          initialPos: [x,y],
        })
      }
      else {
        this.setState({chessboard: this.state.chessboard.deactivateBlocks()})
        this.setState({
          chessboard: this.state.chessboard.move(this.state.initialPos,[x,y]),
          selecting: false,
          possibleMoves: [],
          playerTurn: this.state.playerTurn === 'Player 1' ? 'Player 2' : 'Player 1'
        })
        if(this.state.chessboard.chessState[x][y].chessPiece === '\u265A') {
          this.setState({
            KingPos: [[x,y],this.state.KingPos[1]]
          })
        }
        if(this.state.chessboard.chessState[x][y].chessPiece === '\u2654') {
          this.setState({
            KingPos: [this.state.KingPos[0],[x,y]]
          })
        }
      }
    }
    console.log(x,y,chessNode)
  }
  renderRow(num) {
    const row = this.state.chessboard.chessState[num]
    const active = []
    row.forEach((element,idx) => {
      active.push(row[idx].active? ' active': '')
    })

    return (
      <Row className="chess-row">
        <Col className={"chess-block" + active[0]} id={num + ',1'} md={1} onClick={() => this.renderMove(num, 0, row[0])}>{row[0].chessPiece}</Col>
        <Col className={"chess-block" + active[1]} id={num + ',2'} md={1} onClick={() => this.renderMove(num, 1, row[1])}>{row[1].chessPiece}</Col>
        <Col className={"chess-block" + active[2]} id={num + ',3'} md={1} onClick={() => this.renderMove(num, 2, row[2])}>{row[2].chessPiece}</Col>
        <Col className={"chess-block" + active[3]} id={num + ',4'} md={1} onClick={() => this.renderMove(num, 3, row[3])}>{row[3].chessPiece}</Col>
        <Col className={"chess-block" + active[4]} id={num + ',5'} md={1} onClick={() => this.renderMove(num, 4, row[4])}>{row[4].chessPiece}</Col>
        <Col className={"chess-block" + active[5]} id={num + ',6'} md={1} onClick={() => this.renderMove(num, 5, row[5])}>{row[5].chessPiece}</Col>
        <Col className={"chess-block" + active[6]} id={num + ',7'} md={1} onClick={() => this.renderMove(num, 6, row[6])}>{row[6].chessPiece}</Col>
        <Col className={"chess-block" + active[7]} id={num + ',8'} md={1} onClick={() => this.renderMove(num, 7, row[7])}>{row[7].chessPiece}</Col>
      </Row>
    )
  }

  renderGrid() {
    return (
      <Grid>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
        {this.renderRow(6)}
        {this.renderRow(7)}
      </Grid>
    )
  }

  renderGameState() {
    return (
      <h1>
        {'Turn: ' + this.state.playerTurn + this.state.chessboard.checkWin(this.state.KingPos)}
      </h1>
    )
  }

  render() {
    return(
      <div className="chessboard">
        {this.renderGameState()}
        {this.renderGrid()}
      </div>
    )
  }
}
