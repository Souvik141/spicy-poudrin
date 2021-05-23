import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from './elements/header.js'
import Cover from './scenes/cover.js'
import Footer from './elements/footer.js'
import Navigation from './elements/navigation.js'

const App = (props) => {
  return (
    <Router>
      <Header />
      <Route path='/:nav' component={Navigation} />
      <main className="scene">
        <div className='container'>
          <Route path='/cover' component={Cover} />
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App