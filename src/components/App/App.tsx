import './App.css'
import Header from '../Header/Header'
import Cities from '../Cities/Cities'
import {Alert, CircularProgress, Container, LinearProgress, Modal} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {useState} from 'react'
import {resetError} from '../../redux/citiesSlice'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

function App() {
    const [isOpen, setIsOpen] = useState(true)
    const {loading, error} = useAppSelector(state => state.cities)

    const dispatch = useAppDispatch()

    const handleOpen = () => {
        setIsOpen(false)
        dispatch(resetError())
        setIsOpen(true)
    }

    return <>
        {error && <Modal
            open={isOpen}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Alert sx={style} severity="error">{error}</Alert>
        </Modal>}

        <Header />
        {loading && <LinearProgress />}
        <Container sx={{mt: '1rem'}}>
            <Cities />
        </Container>
    </>
}

export default App
