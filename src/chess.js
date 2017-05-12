import ChessNode from './chessNode'

export default class Chess {
  constructor() {
    this.chessState = []
    const chessPieces =
    [
      [
        '\u265C', //black castle
        '\u265E', //black knight
        '\u265D', //black bishop
        '\u265B', //black queen
        '\u265A', //black king
        '\u265D', //black bishop
        '\u265E', //black knight
        '\u265C'  //black castle
      ],
      [
        '\u265F', //black pawn
        '\u265F', //black pawn
        '\u265F', //black pawn
        '\u265F', //black pawn
        '\u265F', //black pawn
        '\u265F', //black pawn
        '\u265F', //black pawn
        '\u265F', //black pawn
      ],
      [
        '\u2659', //white pawn
        '\u2659', //white pawn
        '\u2659', //white pawn
        '\u2659', //white pawn
        '\u2659', //white pawn
        '\u2659', //white pawn
        '\u2659', //white pawn
        '\u2659', //white pawn
      ],
      [
        '\u2656', //white castle
        '\u2658', //white knight
        '\u2657', //white bishop
        '\u2655', //white queen
        '\u2654', //white king
        '\u2657', //white bishop
        '\u2658', //white knight
        '\u2656'  //white castle
      ]
    ]

    for(let i = 0; i < 8; i++) {
      this.chessState[i] = [
        new ChessNode(),
        new ChessNode(),
        new ChessNode(),
        new ChessNode(),
        new ChessNode(),
        new ChessNode(),
        new ChessNode(),
        new ChessNode(),
      ]
    }

    this.chessState[0].forEach((chessNode,idx) => {
      chessNode.chessPiece = chessPieces[0][idx]
      chessNode.direction = 'down'
      chessNode.color = 'black'
    })
    this.chessState[1].forEach((chessNode,idx) => {
      chessNode.chessPiece = chessPieces[1][idx]
      chessNode.direction = 'down'
      chessNode.color = 'black'
    })
    this.chessState[6].forEach((chessNode,idx) => {
      chessNode.chessPiece = chessPieces[2][idx]
      chessNode.direction = 'up'
      chessNode.color = 'white'
    })
    this.chessState[7].forEach((chessNode,idx) => {
      chessNode.chessPiece = chessPieces[3][idx]
      chessNode.direction = 'up'
      chessNode.color = 'white'
    })
  }


  activateBlocks(positions) {
    positions.forEach(position => {
      const x = position[0]
      const y = position[1]
      this.chessState[x][y].active = true
    })
    return this
  }

  deactivateBlocks() {
    this.chessState.forEach((row, x) => {
      row.forEach((col,y) => {
        this.chessState[x][y].active = false
      })
    })
    return this
  }

  move(start, finish) {
    const [x1, y1] = [...start]
    const [x2, y2] = [...finish]

    if(this.chessState[x1][y1].chessPiece) {
      this.chessState[x2][y2].chessPiece = this.chessState[x1][y1].chessPiece
      this.chessState[x1][y1].chessPiece = null
      this.chessState[x2][y2].direction = this.chessState[x1][y1].direction
      this.chessState[x1][y1].direction = null
      this.chessState[x2][y2].color = this.chessState[x1][y1].color
      this.chessState[x1][y1].color = null
    }
    console.log(this.chessState)
    return this
  }

  movePawn(x, y, chessNode) {
    const possibleMoves = []

    if(this.chessState[x][y].direction === 'down') {
      if(x === 1) {
        if(!this.chessState[x+2][y].chessPiece){
            possibleMoves.push([x+2, y])
          }
      }
      if(x < 7) {
        if(!this.chessState[x+1][y].chessPiece) {
            possibleMoves.push([x+1, y])
          }
        if(y > 0 && this.chessState[x+1][y-1].chessPiece) { //edge case last columns
          if(!(this.chessState[x+1][y-1].chessPiece &&
            this.chessState[x+1][y-1].color === chessNode.color)) {
              possibleMoves.push([x+1, y-1])
            }
        }
        if(y < 7 && this.chessState[x+1][y+1].chessPiece) { //edge case last columns
          if(!(this.chessState[x+1][y+1].chessPiece &&
            this.chessState[x+1][y+1].color === chessNode.color)) {
              possibleMoves.push([x+1, y+1])
            }
        }
      }
    }

    if(this.chessState[x][y].direction === 'up') {
      if(x === 6) {
        possibleMoves.push([x-2, y])
      }
      if(x > 0) {
        possibleMoves.push([x-1, y])
        if(y > 0 && this.chessState[x-1][y-1].chessPiece !== null) { //edge case last columns
          possibleMoves.push([x-1, y-1])
        }
        if(y < 7 && this.chessState[x-1][y+1].chessPiece !== null) { //edge case last columns
          possibleMoves.push([x-1, y+1])
        }
      }
    }
    console.log('pawn',x, y, chessNode, possibleMoves)
    return this.filterMoves(x, y, chessNode, possibleMoves)
  }

  moveKnight(x, y, chessNode) {
    const possibleMoves = []

    if(x < 6) {
      if(y > 0) {
        if(!(this.chessState[x+2][y-1].chessPiece &&
          this.chessState[x+2][y-1].color === chessNode.color)) {
        possibleMoves.push([x+2, y-1])
        }
      }
      if(y < 7) {
        if(!(this.chessState[x+2][y+1].chessPiece &&
          this.chessState[x+2][y+1].color === chessNode.color)) {
        possibleMoves.push([x+2, y+1])
        }
      }
    }

    if(x > 1) {
      if(y > 0) {
        if(!(this.chessState[x-2][y-1].chessPiece &&
          this.chessState[x-2][y-1].color === chessNode.color)) {
        possibleMoves.push([x-2, y-1])
        }
      }
      if(y < 7) {
        if(!(this.chessState[x-2][y+1].chessPiece &&
          this.chessState[x-2][y+1].color === chessNode.color)) {
        possibleMoves.push([x-2, y+1])
        }
      }
    }

    if(y < 6) {
      if(x > 0) {
        if(!(this.chessState[x-1][y+2].chessPiece &&
          this.chessState[x-1][y+2].color === chessNode.color)) {
        possibleMoves.push([x-1, y+2])
        }
      }
      if(x < 7) {
        if(!(this.chessState[x+1][y+2].chessPiece &&
          this.chessState[x+1][y+2].color === chessNode.color)) {
        possibleMoves.push([x+1, y+2])
        }
      }
    }

    if(y > 1) {
      if(x > 0) {
        if(!(this.chessState[x-1][y-2].chessPiece &&
          this.chessState[x-1][y-2].color === chessNode.color)) {
        possibleMoves.push([x-1, y-2])
        }
      }
      if(x < 7) {
        if(!this.chessState[x+1][y-2].chessPiece &&
          this.chessState[x+1][y-2].color === chessNode.color) {
        possibleMoves.push([x+1, y-2])
        }
      }
    }

    return this.filterMoves(x, y, chessNode, possibleMoves)
  }

  moveCastle(x, y, chessNode) {
    const possibleMoves = []
    for(let i = x+1; i < 8; i++) {
      if(this.chessState[i][y].chessPiece &&
        this.chessState[i][y].color === chessNode.color) break // any allies blocking path
      possibleMoves.push([i, y])
    }
    for(let i = x-1; i >= 0; i--) {
      if(this.chessState[i][y].chessPiece &&
        this.chessState[i][y].color === chessNode.color) break // any allies blocking path
      possibleMoves.push([i, y])
    }
    for(let i = y+1; i < 8; i++) {
      if(this.chessState[x][i].chessPiece &&
        this.chessState[i][y].color === chessNode.color) break // any allies blocking path
      possibleMoves.push([x, i])
    }
    for(let i = y-1; i >= 0; i--) {
      if(this.chessState[x][i].chessPiece &&
        this.chessState[i][y].color === chessNode.color) break // any allies blocking path
      possibleMoves.push([x, i])
    }
    return this.filterMoves(x, y, chessNode, possibleMoves)
  }

  moveBishop(x, y, chessNode) {
    const possibleMoves = []

    for(let i = x+1, j = y+1; i < 8 && j < 8; i++, j++) {
      if(this.chessState[i][j].chessPiece &&
        this.chessState[i][j].color === chessNode.color) break
      possibleMoves.push([i,j])
    }
    for(let i = x+1, j = y-1; i < 8 && j >= 0; i++, j--) {
      if(this.chessState[i][j].chessPiece &&
        this.chessState[i][j].color === chessNode.color) break
      possibleMoves.push([i,j])
    }
    for(let i = x-1, j = y+1; i >= 0 && j < 8; i--, j++) {
      if(this.chessState[i][j].chessPiece &&
        this.chessState[i][j].color === chessNode.color) break
      possibleMoves.push([i,j])
    }
    for(let i = x-1, j = y+1; i >= 0 && j >= 0; i--, j--) {
      if(this.chessState[i][j].chessPiece &&
        this.chessState[i][j].color === chessNode.color) break
      possibleMoves.push([i,j])
    }

    return this.filterMoves(x, y, chessNode, possibleMoves)
  }

  moveQueen(x, y, chessNode) {
    const possibleMoves = [...this.moveBishop(x,y,chessNode), ...this.moveCastle(x,y,chessNode)]
    return this.filterMoves(x, y, chessNode, possibleMoves)
  }

  moveKing(x, y, chessNode) {
    const possibleMoves = []

    if(x > 0) possibleMoves.push([x-1, y])
    if(x < 7) possibleMoves.push([x+1, y])
    if(y > 0) possibleMoves.push([x, y-1])
    if(y < 7) possibleMoves.push([x, y+1])
    if(x > 0) possibleMoves.push([x-1, y-1])
    if(x > 0) possibleMoves.push([x-1, y+1])
    if(x < 7) possibleMoves.push([x+1, y-1])
    if(x < 7) possibleMoves.push([x+1, y+1])

    return this.filterMoves(x, y, chessNode, possibleMoves)
  }

  filterMoves(x, y, chessNode, possibleMoves ) {
    console.log ('filterMoves',x,y, chessNode, possibleMoves)
    return possibleMoves.filter( move => {
      return !this.chessState[move[0]][move[1]].chessPiece ||
      this.chessState[move[0]][move[1]].chessPiece &&
      this.chessState[move[0]][move[1]].color !== chessNode.color &&
      this.chessState[move[0]][move[1]].chessPiece !== '\u265A' &&
      this.chessState[move[0]][move[1]].chessPiece !== '\u2654'
    })
  }

  movePiece(x, y, chessNode) {
    console.log('movePiece', chessNode)
    switch (chessNode.chessPiece) {
      case '\u265F':
      case '\u2659':
        return this.movePawn(x, y, chessNode)
        break
      case '\u2658':
      case '\u265E':
        return this.moveKnight(x, y, chessNode)
        break
      case '\u2657':
      case '\u265D':
        return this.moveBishop(x, y, chessNode)
        break
      case '\u265C':
      case '\u2656':
        return this.moveCastle(x, y, chessNode)
        break
      case '\u2655':
      case '\u265B':
        return this.moveQueen(x, y, chessNode)
        break
      case '\u265A':
      case '\u2654':
        return this.moveKing(x, y, chessNode)
        break
      default:
        break
    }
  }

  checkWin(kingPositions) {
    const blackKingPos = kingPositions[0].slice()
    const whiteKingPos = kingPositions[1].slice()

    let [x, y] = [...blackKingPos]
    console.log('checkWin',blackKingPos, this.chessState[x][y])
    //black king
    //pawns
    if(x < 6 && this.chessState[x+1][y-1].chessPiece && this.chessState[x+1][y-1].chessPiece === '\u2659') {
      return 'Black in Check'
    }
    if(x < 6 && this.chessState[x+1][y+1].chessPiece && this.chessState[x+1][y+1].chessPiece === '\u2659') {
      return 'Black in Check'
    }
    //knights
    // if()

    // return 'Black in Check'
  }
}
