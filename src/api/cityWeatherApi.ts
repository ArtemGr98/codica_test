import {instance} from './instance'

export interface CityWeatherResponseI {
    main: {
        temp: number,
        humidity: number,
        pressure: number,
        feels_like: number
    },
    name: string,
    sys: {
        country: string
    },
    weather: [
        {
            description: string,
            main: string
        }
    ]
}

export const cityWeatherApi = {
    getCityWeather: (city: string, units: string, apiKey: string) => {
        return instance.get<CityWeatherResponseI>(`/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
            .then(res => res.data)
    }
}