import { h, Component } from 'preact'

export default C =>
  class PopulationState extends Component {
    onAdd = vegetal => {
      const population = [
        { vegetal, representation: 0.1, layer: this.props.currentLayer || 'A' },
        ...this.props.population_unfilter,
      ]

      this.props.onChange(population)
    }

    onRemove = id => {
      const population = this.props.population_unfilter.filter(
        x => x.vegetal.id !== id
      )

      this.props.onChange(population)
    }

    onChangeRepresentation = (id, representation) => {
      const population = this.props.population_unfilter.map(
        x => (x.vegetal.id === id ? { ...x, representation } : x)
      )

      this.props.onChange(population)
    }

    render() {
      const population_id = {}
      this.props.population_unfilter.forEach(
        x => (population_id[x.vegetal.id] = true)
      )

      const options = this.props.vegetals.filter(x => !population_id[x.id])

      return (
        <C
          {...this.props}
          options={options}
          onAdd={this.onAdd}
          onRemove={this.onRemove}
          onChangeRepresentation={this.onChangeRepresentation}
        />
      )
    }
  }
