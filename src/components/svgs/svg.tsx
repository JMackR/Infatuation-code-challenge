import React from 'react'
import { LocalSVGSource, SvgPropsBase } from './svg.types'
import { TouchableOpacity } from 'react-native'

export const SVG = (props: SvgPropsBase) => {
  const { localSVG, tint, testID } = props
  const { SVG, size } = localSVG as LocalSVGSource
  if (props.onPress) {
    return (
      <TouchableOpacity onPress={props.onPress} testID={testID}>
        <SVG {...size} fill={tint} />
      </TouchableOpacity>
    )
  } else {
    return <SVG {...size} fill={tint} />
  }

}
