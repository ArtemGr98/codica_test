import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {cityWeatherApi} from '../api/cityWeatherApi'
import {RootState} from './store'
import {AxiosError} from 'axios'
import {findIndexCity, getLocalStorageCities} from './helpers'
import {CityCardWeatherI, CityWeatherResponseI} from '../types/types'

export interface CitiesStateI {
    loading: boolean,
    error: undefined | string,
    apiKey: string,
    units: string,
    citiesCards: CityCardWeatherI[]
}

const initialState: CitiesStateI = {
    loading: false,
    error: undefined,
    apiKey: '1b0a340168db93a5a6d8f9db271a81ed',
    units: 'metric',
    citiesCards: []
}

export const getCityWeatherAsync = createAsyncThunk<CityWeatherResponseI,
    string, { state: RootState, rejectValue: string }>(
        'cities/getCityWeatherAsync',
        async (city, {getState, rejectWithValue}) => {
            try {
                const {units, apiKey} = getState().cities
                const response = await cityWeatherApi.getCityWeather(city, units, apiKey)

                const cities = getLocalStorageCities()
                const isNewCity = findIndexCity(cities, response.name)

                if (isNewCity === -1) {
                    cities.push({name: response.name})
                    localStorage.setItem('cities', JSON.stringify(cities))
                }
                return response
            } catch (err) {
                const error: AxiosError<string> = err as any
                return rejectWithValue(error.message)
            }
        }
    )

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        removeCity: (state, action: PayloadAction<string>) => {
            const removeCityIndex = findIndexCity(state.citiesCards, action.payload)
            state.citiesCards.splice(removeCityIndex, 1)

            const cities = getLocalStorageCities()
            const removeLSIndex = findIndexCity(cities, action.payload)
            cities.splice(removeLSIndex, 1)
            cities.length ?
                localStorage.setItem('cities', JSON.stringify(cities)) :
                localStorage.removeItem('cities')
        },
        resetError: (state) => {
            state.error = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCityWeatherAsync.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(getCityWeatherAsync.fulfilled, (state, {payload}) => {
                state.loading = false

                const objCityWeather = {
                    name: payload.name,
                    temp: payload.main.temp,
                    humidity: payload.main.humidity,
                    pressure: payload.main.pressure,
                    feels_like: payload.main.feels_like,
                    country: payload.sys.country,
                    weather_main: payload.weather[0].main,
                    weather_description: payload.weather[0].description
                }

                const isNewCity = findIndexCity(state.citiesCards, payload.name)
                isNewCity === -1 ?
                    state.citiesCards.push(objCityWeather) :
                    state.citiesCards[isNewCity] = objCityWeather
            })
            .addCase(getCityWeatherAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const {removeCity, resetError} = citiesSlice.actions
export default citiesSlice.reducer
