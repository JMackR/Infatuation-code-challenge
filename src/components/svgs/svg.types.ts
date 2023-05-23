
import React from "react";

export interface LocalSVGSource {
    SVG: React.FunctionComponent<React.SVGProps<SVGElement>>
    size?: {
        width: number | string
        height: number | string
    }
}

export interface SvgPropsBase {
    onPress?(): void
    onPressHint?: string
    tint?: string
    localSVG?: LocalSVGSource
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string
}
