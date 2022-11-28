import {render, screen, fireEvent} from '@testing-library/react'
import CityCard from '../Cities/CityCard'
import {CityCardWeatherI} from '../../types/types'
import {mockedDispatch} from './helpers'
import * as actions from './../../redux/citiesSlice'

const cityCardWeather: CityCardWeatherI = {
    name: 'city',
    temp: 2,
    country: 'UA',
    weather_main: 'snow',
    weather_description: 'snow',
    humidity: 98,
    pressure: 1000,
    feels_like: 0
}

describe('CityCard component', () => {
    it('CityCard render', () => {
        const view = render(<CityCard cityCardWeather={cityCardWeather}/>)

        expect(view).toMatchSnapshot()
    })
    it('should dispatch actions', () => {
        const dispatch = jest.fn()
        mockedDispatch.mockReturnValue(dispatch)
        const mockedRemoveCity = jest.spyOn(actions, 'removeCity')
        const mockedUpdateCity = jest.spyOn(actions, 'getCityWeatherAsync')

        render(<CityCard cityCardWeather={cityCardWeather}/>)

        fireEvent.click(screen.getByRole('button', {name: /delete/i}))
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(mockedRemoveCity).toHaveBeenCalledWith(cityCardWeather.name)

        fireEvent.click(screen.getByRole('button', {name: 'update'}))
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(mockedUpdateCity).toHaveBeenCalledWith(cityCardWeather.name)
    })
})