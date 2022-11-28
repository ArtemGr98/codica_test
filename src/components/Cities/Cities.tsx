import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {useEffect} from 'react'
import {getCityWeatherAsync} from '../../redux/citiesSlice'
import CityCard from './CityCard'
import {Grid} from '@mui/material'
import {getLocalStorageCities} from '../../redux/helpers'

const Cities = () => {
    const dispatch = useAppDispatch()
    const cities = getLocalStorageCities()

    useEffect(() => {
        cities && cities.forEach(city => dispatch(getCityWeatherAsync(city.name)))
    }, [dispatch])

    const {citiesCards} = useAppSelector(state => state.cities)

    return (
        <Grid container spacing={2}>
            {citiesCards && citiesCards.map(city =>
                <CityCard key={city.name} cityCardWeather={city} />)}
        </Grid>
    )
}

export default Cities