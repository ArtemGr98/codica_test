import {FC, useState} from 'react'
import {useAppDispatch} from '../../hooks/hooks'
import {getCityWeatherAsync, removeCity} from '../../redux/citiesSlice'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    IconButtonProps,
    styled,
    Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props
    return <IconButton {...other} />
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

export interface CityWeatherDataI {
    name: string,
    temp: number,
    country: string,
    weather_main: string,

    weather_description: string,
    humidity: number,
    pressure: number,
    feels_like: number
}

interface CityCardProps {
    cityWeatherData: CityWeatherDataI
}


const CityCard: FC<CityCardProps> = ({cityWeatherData}) => {
    const {
        name, temp, country, weather_main,
        weather_description, humidity, feels_like, pressure
    } = cityWeatherData

    const [expanded, setExpanded] = useState(false)
    const dispatch = useAppDispatch()

    return (
        <Grid item xs={6} sm={4} md={3} lg={2}>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        {name} {country}
                    </Typography>
                    <Typography>{Math.round(temp)} ℃</Typography>
                    {
                        expanded ? <Typography>{weather_description}</Typography> :
                            <Typography>{weather_main}</Typography>
                    }

                    {expanded && <div>
                        <Typography>humidity: {humidity} %</Typography>
                        <Typography>pressure: {pressure} mm</Typography>
                        <Typography>feels_like: {Math.round(feels_like)} ℃</Typography>
                    </div>}
                </CardContent>
                <CardActions>
                    <Box>
                        <Button onClick={() => dispatch(getCityWeatherAsync(name))}>update</Button>
                        <IconButton aria-label="delete" onClick={() => dispatch(removeCity(name))}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>

                    <ExpandMore
                        expand={expanded}
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CityCard