import { Fragment } from 'react'
import './App.css'
import { CurrencyConvertor } from './components/CurrencyConvertor'

function App() {
  return (
    <Fragment>
      <div className='container'>
        <CurrencyConvertor/>
      </div>
    </Fragment>
  )
}

export default App
