export default function Breadcrumb({ $app, initialState }) {
  this.state = initialState

  this.$target = document.createElement('nav')
  this.$target.className = 'Breadcrumb'
  $app.appendChild(this.$target)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    console.log(`Breadcrumb render`)
  }
}