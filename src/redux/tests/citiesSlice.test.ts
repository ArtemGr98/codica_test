import citiesReducer, {CitiesStateI, removeCity} from '../citiesSlice'

const initialCitiesState: CitiesStateI = {
    loading: false,
    error: undefined,
    apiKey: '1b0a340168db93a5a6d8f9db271a81ed',
    units: 'metric',
    citiesCards: []
}

const citiesState: CitiesStateI = {
    loading: false,
    error: undefined,
    apiKey: '1b0a340168db93a5a6d8f9db271a81ed',
    units: 'metric',
    citiesCards: [{
        temp: 12, humidity: 90,
        pressure: 1000,
        feels_like: 10,
        name: 'city',
        country: 'UA',
        weather_description: 'clear sky',
        weather_main: 'clear'
    }]
}

describe('citiesSlice', () => {
    it('should return default state when passed empty action', () => {
        const result = citiesReducer(undefined, {type: ''})

        expect(result).toEqual(initialCitiesState)
    })
    it('should remove city with "removeCity" action', () => {
        const action = {type: removeCity.type, payload: 'city'}
        const result = citiesReducer(citiesState, action)

        expect(result.citiesCards.length).toBe(0)
    })
})