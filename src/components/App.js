import Breadcrumb from './Breadcrumb.js'
import Nodes from './Nodes.js'
import ImageView from './ImageView.js'
import Loading from './Loading.js'

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false
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
  
  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath
  })

  const loading = new Loading({
    $app,
    initialState: this.state.isLoading
  })

  this.setState = (nextState) => {
    this.state = nextState
    breadcrumb.setState(this.state.depth)
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    })
    imageView.setState(this.state.selectedFilePath)
    loading.setState(this.state.isLoading)
  }

  const init = () => {
    const nextState = {
      isRoot: false,
      nodes: [],
      depth: [],
      selectedFilePath: null,
      isLoading: false
    }
    
    this.setState(nextState);
  }

  //init()
}