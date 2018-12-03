import * as classnames from 'classnames'
import * as React from 'react'

import Stand from '~/components/imageRenderers/Stand'
import { createStyles, injectSheet, WithSheet } from '~/Theme'
import { Image } from '~/stores/Images'

const styles = createStyles(theme => ({
    doubledImage: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
        paddingTop: '1rem',
    },
    singleImage: {
        border: `1px solid ${theme.palette.grey}`,
        flexGrow: 1,
        width: '100%',
    },
    singleImageTop: {
        transform: 'rotateX(180deg)',
        // top border because it's upside-down
        borderTop: 'none',
    },

    '@media print': {
        doubledImage: {
            padding: 0,
        },
    },
}))

interface Props {
    image : Image
}

const DoubledFace : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({ classes, image }) => {
    const printSizing = {
        height: `${image.realHeight}${image.realUnits}`,
        width: `${image.realWidth}${image.realUnits}`,
    }

    return (
        <div key={image.realUnits} className={classes.doubledImage} style={printSizing}>
            <Stand isTop />
            <img className={classnames(classes.singleImage, classes.singleImageTop)} src={image.dataUrl} />
            <img className={classes.singleImage} src={image.dataUrl} />
            <Stand isTop={false} />
        </div>
    )
}

export default injectSheet(styles)(DoubledFace)
