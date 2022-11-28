import * as reduxHooks from '../../hooks/hooks'
import * as helpersRedux from '../../redux/helpers'

export const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')
export const mockedUseSelector = jest.spyOn(reduxHooks, 'useAppSelector')

export const mockedGetLocalStorageCities = jest.spyOn(helpersRedux, 'getLocalStorageCities')