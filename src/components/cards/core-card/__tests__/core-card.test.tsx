import { render, fireEvent, screen, } from '@testing-library/react-native'
import { CoreCard, } from '../core-card'
import { CoreTypes } from '../../../../hooks'

describe('Core Card is displayed ', () => {
    let props: CoreTypes
    beforeEach(() => {
        props = {
            id: "1",
            fullName: "hello jim",
            createdAt: "02/02/2023",
            stargazersCount: 10,
            language: "react",
            url: "http://bob.com",

        }
    })
    it('should render fullName', () => {
        const { getByText, } = render(<CoreCard {...props} />)
        expect(getByText(props.fullName as string)).toBeDefined()
    })
    it('should render stargazersCount', () => {
        const { getByTestId } = render(<CoreCard {...props} />)
        expect(getByTestId('stargazersCount').props.children).toEqual(props.stargazersCount as number)
    })
    it('should render language', () => {
        const { getByTestId } = render(<CoreCard {...props} />)
        expect(getByTestId('language').props.children).toEqual(props.language as string)
    })
    it('should render url', () => {
        const { getByTestId } = render(<CoreCard {...props} />)
        expect(getByTestId('url').props.children).toEqual(props.url as string)
    })
    it('should render createdAt', () => {
        const { getByTestId } = render(<CoreCard {...props} />)
        expect(getByTestId('createdAt').props.children).toEqual(new Date(props.createdAt).getFullYear() as number)
    })
})

