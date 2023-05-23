import { render, fireEvent, act, waitFor, screen, cleanup, } from '@testing-library/react-native'
import { FavoritesScreen } from '../favorites'
import { useFavorites } from '../../hooks'
import { Alert } from 'react-native'
import { FavCard } from '../../components'

jest.spyOn(Alert, 'alert')

let mockLoading = false
let mockData = []
let mockError = undefined
jest.mock('../../hooks/useFavorites.ts', () => ({
    useFavorites: () => {
        return {
            Get: () => jest.fn(),
            Post: () => mockPost,
            data: mockData,
            error: mockError,
            loading: mockLoading
        }

    }
}))


describe('check is all elements are displayed when favorites screen is mounted', () => {
    beforeEach(() => {
        mockLoading = false
        mockData = []
    })

    it("should render all expected elements", async () => {
        const { getAllByText, queryAllByTestId } = render(<FavoritesScreen />);
        expect(queryAllByTestId('loading-text').length).toBe(0)
        expect(getAllByText("The Infatuation").length).toBe(1)
        expect(getAllByText("You haven't favorited any repos yet").length).toBe(1)
        expect(getAllByText("Why not try to find a repo you like?").length).toBe(1)
        expect(getAllByText("Start Searching").length).toBe(1)
        expect(screen).toMatchSnapshot()
    })

})

describe('check is all elements are displayed during loading state', () => {
    beforeEach(() => {
        mockLoading = true
    });

    it("should display loading text after entering text of react", async () => {
        const { queryAllByTestId, } = render(<FavoritesScreen />);
        await waitFor(() => expect(queryAllByTestId('loading-text').length).toBe(1))
        expect(screen).toMatchSnapshot()
    })
})

describe('check is all elements are displayed on favorites screen', () => {
    beforeEach(() => {
        mockLoading = false
        mockData = [{
            id: "1",
            fullName: "jim/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "10",
        }, {
            id: "2",
            fullName: "jimBOB/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "10",
        }]
    });

    it('display row data of repo results from storage', async () => {
        const { queryAllByTestId, queryAllByText, } = render(<FavoritesScreen />)
        expect(queryAllByTestId('loading-text').length).toBe(0)
        expect(queryAllByTestId(/fav-item/i).length).toBe(2)
        expect(queryAllByText("Start Searching").length).toBe(0)
        expect(screen).toMatchSnapshot()
    })
})

describe('display error message', () => {
    beforeEach(() => {
        mockLoading = false
        mockError = "Houston we have a problem."
        mockData = []
    });

    it('display error state elements', async () => {
        const { getByTestId, queryAllByTestId, queryAllByText, } = render(<FavoritesScreen />)
        expect(queryAllByTestId('loading-text').length).toBe(0)
        expect(queryAllByTestId(/fav-item/i).length).toBe(0)
        expect(queryAllByText("Start Searching").length).toBe(1)
        expect(queryAllByTestId("error-message").length).toBe(1)
        expect(getByTestId("error-message").props.children).toEqual("Houston we have a problem.")
        expect(screen).toMatchSnapshot()
    })
})

describe('sorting by stargazers count', () => {

    it('should sort in descending order', () => {
        const array = [{
            id: "1",
            fullName: "jimBOB/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "1",
            avatarUrl: "http://hellobob.com/images/1",
            isFav: true
        }, {
            id: "2",
            fullName: "jimBOB/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "2",
            avatarUrl: "http://hellobob.com/images/1",
            isFav: true
        }, {
            id: "3",
            fullName: "jimBOB/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "3",
            avatarUrl: "http://hellobob.com/images/1",
            isFav: true
        }]
        const sortingFunction = (a, b) => a.stargazersCount - b.stargazersCount
        expect(array).toStrictEqual([...array].sort(sortingFunction))
    })
    it('should sort in ascending order', () => {
        const array = [{
            id: "1",
            fullName: "jimBOB/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "3",
            avatarUrl: "http://hellobob.com/images/1",
            isFav: true
        }, {
            id: "2",
            fullName: "jimBOB/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "2",
            avatarUrl: "http://hellobob.com/images/1",
            isFav: true
        }, {
            id: "3",
            fullName: "jimBOB/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "1",
            avatarUrl: "http://hellobob.com/images/1",
            isFav: true
        }]
        const sortingFunction = (a, b) => b.stargazersCount - a.stargazersCount
        expect(array).toStrictEqual([...array].sort(sortingFunction))
    })
})


