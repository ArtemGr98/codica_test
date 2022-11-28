import {fireEvent, render, screen} from '@testing-library/react'
import Header from '../Header/Header'
import {mockedDispatch} from './helpers'
import * as actions from '../../redux/citiesSlice'

describe('Header', () => {
    it('Header render', () => {
        const view = render(<Header/>)

        expect(view).toMatchSnapshot()
    })
    it('add city', () => {
        const dispatch = jest.fn()
        mockedDispatch.mockReturnValue(dispatch)
        const mockedAddCity = jest.spyOn(actions, 'getCityWeatherAsync')

        render(<Header/>)

        const input = screen.getByRole('textbox')

        expect(input).toHaveValue('')
        fireEvent.input(input, {target: {value: 'city'}})
        expect(input).toHaveValue('city')

        fireEvent.click(screen.getByRole('button'))

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(mockedAddCity).toHaveBeenCalledWith('city')
        expect(input).toHaveValue('')

        fireEvent.click(screen.getByRole('button'))
        expect(dispatch).toHaveBeenCalledTimes(1)
    })
})