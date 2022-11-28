import './App.css'
import Header from '../Header/Header'
import Cities from '../Cities/Cities'
import {Container} from '@mui/material'

function App() {
    return <>
        <Header />
        <Container sx={{mt: '5rem'}}>
            <Cities />
        </Container>
    </>
}

export default App
