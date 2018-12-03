import * as React from 'react'

import { createStyles, injectSheet, WithSheet } from '~/Theme'
import { Image } from '~/stores/Images'

const styles = createStyles(theme => ({
    fullImage: {
        paddingTop: '1rem',
    },
    '@media print': {
        fullImage: {
            paddingTop: 0,
        },
    },
}))

interface Props {
    image : Image
}

const FaceAndBack : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({ classes, image }) => {
    const printSizing = {
        height: `${image.realHeight}${image.realUnits}`,
        width: `${image.realWidth}${image.realUnits}`,
    }

    return <img key={image.realUnits} className={classes.fullImage} src={image.dataUrl} style={printSizing} />
}

export default injectSheet(styles)(FaceAndBack)
