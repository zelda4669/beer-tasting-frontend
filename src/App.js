import './App.css'

function Brewery({ item }) {
  console.log('in component', item)
  return (
    <div>
      <p>{item.name}</p>
      <p>{item.location}</p>
      <p>Tasted? {item.tasted}</p>
    </div>
  )
}

function App() {
  const breweries = [
    {
      'name': 'Postdoc',
      'location': 'Redmond',
      'tasted': true,
      'id': 1
    },
    {
      'name': 'Aslan',
      'location': 'Bellingham',
      'tasted': false,
      'id': 2
    },
    {
      'name': 'Nunchucks',
      'location': 'Lynnwood',
      'tasted': false,
      'id': 3
    }
  ]

  console.log('in app', breweries[0])

  return (
    <Brewery item={breweries[0]} />
  )
}

export default App
