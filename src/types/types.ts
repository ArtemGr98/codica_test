import {IconButtonProps} from '@mui/material'

export interface CityCardWeatherI {
    name: string,
    temp: number,
    country: string,
    weather_main: string,

    weather_description: string,
    humidity: number,
    pressure: number,
    feels_like: number
}

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

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