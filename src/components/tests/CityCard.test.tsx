import {render, screen, fireEvent} from '@testing-library/react'
import CityCard, {CityWeatherDataI} from '../Cities/CityCard'
import {mockedDispatch} from './helpers'
import * as actions from './../../redux/citiesSlice'

const cityWeatherData: CityWeatherDataI = {
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
        const view = render(<CityCard cityWeatherData={cityWeatherData}/>)

        expect(view).toMatchSnapshot()
    })
    it('should dispatch actions', () => {
        const dispatch = jest.fn()
        mockedDispatch.mockReturnValue(dispatch)
        const mockedRemoveCity = jest.spyOn(actions, 'removeCity')
        const mockedUpdateCity = jest.spyOn(actions, 'getCityWeatherAsync')

        render(<CityCard cityWeatherData={cityWeatherData}/>)

        fireEvent.click(screen.getByRole('button', {name: /delete/i}))
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(mockedRemoveCity).toHaveBeenCalledWith(cityWeatherData.name)

        fireEvent.click(screen.getByRole('button', {name: 'update'}))
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(mockedUpdateCity).toHaveBeenCalledWith(cityWeatherData.name)
    })
})