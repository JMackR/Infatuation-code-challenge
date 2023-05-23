import { render, fireEvent } from '@testing-library/react-native'
import { EmptyState, EmptyStateProps } from '../empty-state'

describe('Empty state is display ', () => {
    let props: EmptyStateProps
    beforeEach(() => {
        props = {
            title: 'hello',
            message: "hi bob",
            actionLabel: "do something",
            onAction: jest.fn()
        }
    })
    it('should render title', () => {
        const { getByTestId, } = render(<EmptyState {...props} />)
        expect(getByTestId('title').props.children).toEqual(props.title as string)
    })
    it('should render message', () => {
        const { getByText } = render(<EmptyState {...props} />)
        expect(getByText(props.message as string)).toBeDefined()
    })
    it('should render actionLabel', () => {
        const { getByText } = render(<EmptyState {...props} />)
        expect(getByText(props.actionLabel as string)).toBeDefined()
    })
    it('is Pressed', async () => {
        const { getByTestId } = render(<EmptyState {...props} />)
        const button = getByTestId('button')
        fireEvent.press(button);
        expect(props.onAction).toHaveBeenCalledTimes(1)

    })
})

