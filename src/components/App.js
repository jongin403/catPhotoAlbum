import Breadcrumb from './Breadcrumb.js'
import Nodes from './Nodes.js'
import ImageView from './ImageView.js'
import Loading from './Loading.js'
import { request } from './api.js'

const cache = {}

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
    initialState: [],
    onClick: async (node) => {
      try {
        this.setState({
          ...this.state,
          isRoot: false,
          isLoading: true          
        })
        if (node.type === 'DIRECTORY') {
          if (cache[node.id]) {
            this.setState({
                  ...this.state,
                  depth: [...this.state.depth, node],
                  nodes: cache[node.id],
                  isLoading: false
                })
          } else {
            const nextNodes = await request(node.id)
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
              isLoading: false
            })

            cache[node.id] = nextNodes
          }
        } else if (node.type === 'FILE') {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
            isLoading: false
          })
        }
      } catch(e) {
        // 에러처리하기
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state }
        nextState.depth.pop()
  
        const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id
  
        this.setState({
          ...nextState
        })
        
        if (prevNodeId === null) {
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: cache.rootNodes
          })
        } else {
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: cache[prevNodeId]
          })
        }       
      } catch(e) {
        // 에러처리하기
      }
    }
  })
  
  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
    modalClose: () => {
      this.setState({
        ...this.state,
        selectedFilePath: null
      })
    }
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

  const init = async() => {
    try {
      this.setState({
        ...this.state,
        isLoading: true
      })
      const rootNodes = await request()
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes
      })

      cache.rootNodes = rootNodes
    } catch(e) {
      // 에러처리 하기
    } finally {
      this.setState({
        ...this.state,
        isLoading: false
      })
    }
  }

  init()
}