import {ChangeEvent, FC, useState} from 'react'
import {useAppDispatch} from '../../hooks/hooks'
import {getCityWeatherAsync} from '../../redux/citiesSlice'
import {AppBar, Box, Button, TextField, Toolbar} from '@mui/material'

const Header: FC = () => {
    const [searchCity, setSearchCity] = useState('')
    const dispatch = useAppDispatch()

    const handleAddCity = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(getCityWeatherAsync(searchCity))
        setSearchCity('')
    }

    return (
        <AppBar color="default">
            <Toolbar sx={{justifyContent: 'center'}}>
                <form onSubmit={handleAddCity}>
                    <Box sx={{display: 'flex', alignItems: 'stretch'}}>
                        <TextField type="text" label="enter city"
                            value={searchCity}
                            size="small" color="info"
                            onChange={(e) => setSearchCity(e.target.value)} />
                        <Button type="submit" color="inherit"
                            sx={{marginLeft: '10px'}}
                            disabled={!searchCity}>add city</Button>
                    </Box>
                </form>
            </Toolbar>
        </AppBar>
    )
}

export default Header