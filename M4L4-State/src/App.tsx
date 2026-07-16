import './App.css'
import Greeting from './components/Greeting/Greeting'
import ItemList from './components/ItemList/ItemList'
import PageLayout from './components/PageLayout/PageLayout'

function App() {
  return (
    <PageLayout>
      <h1>Mi Aplicacion</h1>
      <p>Contenido principal.</p>

      <Greeting name='' />
      <ItemList />
    </PageLayout>
  )
}

export default App
