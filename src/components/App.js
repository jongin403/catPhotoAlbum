import Breadcrumb from './Breadcrumb.js'
import Nodes from './Nodes.js'

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: []
  }

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth
  })

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    }
  })
  
  this.setState = (nextState) => {
    this.state = nextState
    breadcrumb.setState(this.state.depth)
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    })
  }

  const init = () => {
    const nextState = {
      isRoot: false,
      nodes: [],
      depth: []
    }
    
    this.setState(nextState);
  }

  init()
}