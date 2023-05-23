import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import renderer from 'react-test-renderer'
import { TextEntry } from '../text-entry'
import { TextEntryProps } from '../text-entry-types'

describe('Text Entry', () => {
  let props: TextEntryProps
  beforeEach(() => {
    props = {
      hint: 'Test Hint',
    }
  })

  describe('has text', () => {
    beforeEach(() => {
      props = {
        text: '123672',
      }
    })
    it('should render the text', () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      expect(input).toBeDefined()
    })
  })

  describe('has label text', () => {
    beforeEach(() => {
      props = {
        hint: 'Test Hint',
      }
    })
    it('should render the text', () => {
      const { getByPlaceholderText } = render(<TextEntry {...props} />)
      expect(getByPlaceholderText(props.hint as string)).toBeDefined()
    })
  })

  describe('on text change', () => {
    beforeEach(() => {
      props = {
        text: 'Test Text',
        textChangeHandler: jest.fn(),
      }
    })
    it('should call textChangeHandler', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      fireEvent.changeText(input, { value: 'new value' })
      await waitFor(() => {
        expect(props.textChangeHandler).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('on focus', () => {
    beforeEach(() => {
      props = {
        text: 'default text',
        focusHandler: jest.fn(),
      }
    })
    it('should call focusHandler', async () => {
      const { getByTestId } = render(<TextEntry {...props} testID='text-entry' />)
      const input = getByTestId('text-entry')
      fireEvent(input, 'focus')
      await waitFor(() => {
        expect(props.focusHandler).toHaveBeenCalledTimes(1)
      })
    })
  })


})
