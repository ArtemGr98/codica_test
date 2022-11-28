export const findIndexCity = (cities: { name: string }[], name: string) => {
    return cities.length ? cities.findIndex(city => city.name === name) : -1
}

export const getLocalStorageCities = () => {
    let cities: { name: string }[] = []

    if (localStorage.getItem('cities')) {
        cities = JSON.parse(localStorage.getItem('cities') as string)
    }
    return cities
}