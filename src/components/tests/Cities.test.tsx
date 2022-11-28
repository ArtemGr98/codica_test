import {render} from '@testing-library/react'
import Cities from '../Cities/Cities'
import {mockedDispatch, mockedGetLocalStorageCities, mockedUseSelector} from './helpers'

describe('Cities', () => {
    it('should create Cities with empty citiesCards', () => {
        mockedGetLocalStorageCities.mockReturnValue([])
        mockedUseSelector.mockReturnValue([])
        const view = render(<Cities/>)

        expect(view).toMatchSnapshot()
    })

    it('should create Cities with citiesCards', () => {
        mockedDispatch.mockReturnValue(jest.fn())
        mockedGetLocalStorageCities.mockReturnValue([{name: 'city'}])

        mockedUseSelector.mockReturnValue([{
            main: {temp: 2, humidity: 90, pressure: 1000, feels_like: 0},
            name: 'city',
            sys: {country: 'ua'},
            weather: [{description: 'light snow', main: 'snow'}]
        }])
        const view = render(<Cities/>)

        expect(view).toMatchSnapshot()
    })
})