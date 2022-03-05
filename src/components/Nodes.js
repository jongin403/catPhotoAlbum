export default function Nodes({ $app, initialState }) {
  this.state = initialState

  this.$target = document.createElement('ul')
  $app.appendChild(this.$target)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    this.$target.innerHTML = this.state.nodes.map(node => 
      `<li>${node.name}</li>`
    )    
  }

  this.render()
}