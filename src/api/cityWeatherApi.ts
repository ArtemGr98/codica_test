import {instance} from './instance'
import {CityWeatherResponseI} from '../types/types'

export const cityWeatherApi = {
    getCityWeather: (city: string, units: string, apiKey: string) => {
        return instance.get<CityWeatherResponseI>(`/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
            .then(res => res.data)
    }
}