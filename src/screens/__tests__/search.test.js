import { render, fireEvent, waitFor, screen, } from '@testing-library/react-native'
import { SearchScreen } from '../search'
import { Alert } from 'react-native'
import { SearchCard } from '../../components/cards/search-card'
import fetchMock from 'jest-fetch-mock'

jest.spyOn(Alert, 'alert')

let mockFavData = []
jest.mock('../../hooks/useFavorites.ts', () => ({
    useFavorites: () => {
        return {
            Get: () => jest.fn(),
            Post: () => jest.fn(),
            favs: mockFavData
        }

    }
}))

let mockLoading = false
let mockData = []
let mockError = undefined
jest.mock('../../hooks/useSearch.ts', () => ({
    useSearch: () => ({
        fetchData: () => jest.fn(),
        loading: mockLoading,
        error: mockError,
        data: mockData
    })
}))


describe('check is all elements are displayed when app is loaded no search', () => {
    beforeEach(() => {
        mockLoading = false
    })

    it("should render all expected elements", async () => {
        const { getAllByText, queryAllByTestId, getByPlaceholderText } = render(<SearchScreen />);
        expect(queryAllByTestId('loading-text').length).toBe(0)
        expect(getAllByText("The Infatuation").length).toBe(1)
        expect(getAllByText("You haven't searched any repos yet").length).toBe(1)
        expect(getAllByText("Why not try to find a repo you like?").length).toBe(1)
        expect(getAllByText("Start Searching").length).toBe(1)
        getByPlaceholderText('Search')
        expect(screen).toMatchSnapshot()
    })

})

describe('check is all elements are displayed during loading state', () => {
    beforeEach(() => {
        mockLoading = true
    });

    it("should display loading text after entering text of react", async () => {
        const { queryByTestId, queryAllByTestId, } = render(<SearchScreen />);
        fireEvent.changeText(queryByTestId('search'), 'react')
        await waitFor(() => expect(queryAllByTestId('loading-text').length).toBe(1))
        expect(screen).toMatchSnapshot()
    })
})

describe('check is all elements are displayed when search results are returned', () => {
    beforeEach(() => {
        mockLoading = false
        mockData = [{
            id: "1",
            fullName: "jim/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "10",
            avatarUrl: "http://hellobob.com/images/1",
            isFav: true
        }, {
            id: "2",
            fullName: "jimBOB/react",
            url: "http://go-get-bob.com",
            createdAt: "02/02/2022",
            language: 'react',
            stargazersCount: "10",
            avatarUrl: "http://hellobob.com/images/1",
            isFav: true
        }]
    });

    it('display row data of repo results and no Start Searching button', async () => {
        const { getByLabelText, queryAllByTestId, queryAllByText, } = render(<SearchScreen />)
        expect(queryAllByTestId('loading-text').length).toBe(0)
        expect(queryAllByTestId(/repo-item/i).length).toBe(2)
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

    it('display row data of repo results and no Start Searching button', async () => {
        const { getByTestId, queryAllByTestId, queryAllByText, } = render(<SearchScreen />)
        expect(queryAllByTestId('loading-text').length).toBe(0)
        expect(queryAllByTestId(/repo-item/i).length).toBe(0)
        expect(queryAllByText("Start Searching").length).toBe(1)
        expect(queryAllByTestId("error-message").length).toBe(1)
        expect(getByTestId("error-message").props.children).toEqual("Houston we have a problem.")
        expect(screen).toMatchSnapshot()
    })
})


describe('Search Screen Error from api', () => {
    test('render error message if error thrown from api', async () => {
        fetchMock.mockRejectOnce(new Error('Houston we have a problem.'));
        const { getByTestId, toJSON, getByText } = render(<SearchScreen />);

        await waitFor(() => {
            return getByTestId('error-message');
        });

        expect(getByText('Houston we have a problem.'));
    });
});
describe('Search Card Row', () => {
    test('is pressable', () => {
        const onPress = jest.fn();
        const { getByText, getByTestId } = render(
            <SearchCard index={0} item={{
                id: "1",
                fullName: "jim/react",
                url: "http://go-get-bob.com",
                createdAt: "02/02/2022",
                language: 'react',
                stargazersCount: "10",
                avatarUrl: "http://hellobob.com/images/1",
                isFav: true
            }} testID='1' saveToFavorites={onPress} />
        );

        fireEvent.press(getByTestId('1'));
        expect(onPress).toHaveBeenCalled();
    });
});
describe('check for max favs', () => {
    beforeEach(() => {
        mockLoading = false
        mockData = Array.from(Array(10).keys())
    });

    it('check if user tries to select more than 10 repos', async () => {
        const { getByTestId, queryAllByTestId, findByTestId, getAllByRole } = render(<SearchScreen />)
        await waitFor(async () => {
            fireEvent.press(getByTestId(`repo-item1`), { id: 1 });
            const rows = queryAllByTestId(/repo-item/i).length
            if (rows <= 10) {
                expect(Alert.alert).toHaveBeenCalledWith("YO", `C'mon man, you can't have more than 10 favs per person`, [{ text: 'OK', }])
            }
        })
    })

})