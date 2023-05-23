import { render, fireEvent } from '@testing-library/react-native'
import { SearchCard, SearchCardProps } from '../search-card'
import renderer from 'react-test-renderer'


describe('Search Card is displayed', () => {
    let props: SearchCardProps
    beforeEach(() => {
        props = {
            id: "1",
            fullName: "hello jim",
            createdAt: "02/02/2023",
            stargazersCount: 10,
            language: "react",
            url: "http://bob.com",
            avatarUrl: "https://fastly.picsum.photos/id/1059/200/300.jpg?hmac=YMMfXR3NQPHd070_dI4t9aZU990UmWDRKmklFNF6xMw",
            saveToFavorites: jest.fn(),
            isFav: true,
            testID: "1"
        }
    })
    it('displays the repo image', () => {
        const { getByTestId } = render(<SearchCard {...props} />)
        expect(getByTestId('avatar-url').props.children).toMatchSnapshot();
    });


    test("check fav icon is active", () => {
        const tree = renderer.create(<SearchCard {...props} isFav={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("check fav icon is inactive", () => {
        const tree = renderer.create(<SearchCard {...props} isFav={false} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('is Pressed', async () => {
        const { getByTestId } = render(<SearchCard {...props} />)
        const press = getByTestId(props.testID as string)
        fireEvent.press(press);
        expect(props.saveToFavorites).toHaveBeenCalledTimes(1)
    })
})

