import { useState, useEffect, useCallback } from 'react'
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



  // debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, 300)
    return () => clearTimeout(timeout) 
  }, [value])


  const dataFiltrati = prodotti.filter(d =>
    d.title.toLowerCase().includes(debouncedValue.toLowerCase())
  )

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);


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
