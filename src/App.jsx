import { useState, useEffect } from 'react'
import Card from './Card'
import './App.css'

function App() {

  const [prodotti, setProdotti] = useState([])
  const [value, setValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState("")

  const api = "https://fakestoreapi.com/products"



  useEffect(() => {
    async function getData() {
      let data = await fetch(api).then(res => res.json())

      setProdotti(data)
    }
    getData()
  }, [])



  // debounc 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, 300)
    return () => clearTimeout(timeout) 
  }, [value])


  let dataFiltrati = prodotti.filter(d => d.title.includes(debouncedValue.toLocaleLowerCase))


  function handleChange(e) {
    setValue(e.target.value)
  }


  return (
    <>
      <div className="container">
        <h1>Qui puoi ricercare i prodotti</h1>
        <input className="input_label" type="text" value={value} onChange={handleChange} placeholder='scrivi per ricercare un prodotto' />
        <details>
          <summary>Ecoo i prodotti</summary>
          {dataFiltrati.map(cur => (
            <Card
              title={cur.title}
              description={cur.description}
              price={cur.price}
            />
          ))}
        </details>

      </div>
    </>
  )
}

export default App
