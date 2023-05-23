import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { SVG } from '../svg'
import { LocalSVGSource, SvgPropsBase } from '../svg.types'

const localSVGSource: LocalSVGSource = {
  SVG: () => <svg>This is a local SVG</svg>,
  size: {
    width: 30,
    height: 30,
  }
}
describe('SVG Snapshot Tests', () => {
  let props: SvgPropsBase
  beforeEach(() => {
    props = {
      onPress: jest.fn(),
    }
  })
  test('SVG renders localSVG ', () => {
    const tree = render(<SVG localSVG={localSVGSource} />)
    expect(tree).toMatchSnapshot()
  })

  test('SVG renders localSVG with overwritten width/height', () => {
    const tree = render(<SVG localSVG={{ SVG: localSVGSource.SVG, size: { width: 120, height: 120 } }} />)
    expect(tree).toMatchSnapshot()
  })

  test('SVG renders tintable localSVG with white tint', () => {
    const tree = render(<SVG localSVG={localSVGSource} tint='#ffffff' />)
    expect(tree).toMatchSnapshot()
  })

  test('SVG renders tintable localSVG with black tint', () => {
    const tree = render(<SVG localSVG={localSVGSource} tint='#000000' />)
    expect(tree).toMatchSnapshot()
  })

  test('SVG is pressable', () => {
    const { getByTestId } = render(<SVG localSVG={localSVGSource} {...props} testID={'hibob'} />)
    fireEvent.press(getByTestId('hibob'));
    expect(props.onPress).toHaveBeenCalledTimes(1)
  })

})

