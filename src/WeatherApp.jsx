import { useState } from "react"

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'd243209a79f42bf57c28bd0e247c9ca7'
    const difKelvin = 273.15
    const lenguaje = 'es'

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}&lang=${lenguaje}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error)
        }
    }

    return (
        <div className="container">
            <h1>Aplicación del Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingrese la ciudad o país a consultar"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                        <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                    </div>
                )
            }
        </div>
    )
}
