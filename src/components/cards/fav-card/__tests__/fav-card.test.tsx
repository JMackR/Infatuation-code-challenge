import { render, fireEvent, screen } from '@testing-library/react-native'
import { FavCard, FavProps } from '../fav-card'

describe('Favorite Card is display ', () => {
    let props: FavProps
    beforeEach(() => {
        props = {
            id: "1",
            fullName: "hello jim",
            createdAt: "02/02/2023",
            stargazersCount: 10,
            language: "react",
            url: "http://bob.com",
            deleteFav: jest.fn()
        }
    })
    it('should swipe left', () => {
        render(<FavCard {...props} />)
        fireEvent(screen.getByText('Delete'), 'onSwipeLeft')
    })
    it('should delete card when pressed ', () => {
        const { getByTestId } = render(<FavCard {...props} />)
        const press = getByTestId('swipe-onPress')
        fireEvent.press(press);
        expect(props.deleteFav).toHaveBeenCalledTimes(1)
    })
})

