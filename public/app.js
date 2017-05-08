import { React } from '../globalImports'
import Chessboard from './components/chessboard'
import './app.scss'

export default class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="default-container">
        <Chessboard />
      </div>
    )
  }
}
