import * as React from 'react'

import { createStyles, injectSheet, WithSheet } from '~/Theme'
import { Image, ImagesStore } from '~/stores/Images'
import ImageOptions from '~/components/ImageOptions'
import FaceAndBack from '~/components/imageRenderers/FaceAndBack'
import FaceOnly from '~/components/imageRenderers/FaceOnly'

const styles = createStyles(theme => ({
    container: {
        alignItems: 'center',
        boxShadow: theme.shadow.card,
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'stretch',
        margin: '0.25rem',
        padding: '1rem',
    },

    printShow: {
        display: 'none',
    },
    '@media print': {
        container: {
            boxShadow: 'none',
            padding: 0,
            margin: 0,
        },
        printShow: {
            display: 'block',
        },
    },
}))

interface Props {
    image : Image
    store : ImagesStore
}

const ImageCard : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({ classes, image, store }) => {
    const renderedImage = image.isSingle ? <FaceAndBack image={image} /> : <FaceOnly image={image} />

    const printRenders = React.useMemo(
        () => {
            const extra = []
            for (let i = 1; i < image.count; i += 1) {
                const cloned = React.cloneElement(renderedImage)
                extra.push(
                    <div className={classes.printShow} key={i}>
                        {cloned}
                    </div>,
                )
            }

            return extra
        },
        [renderedImage, image.count],
    )

    return (
        <React.Fragment>
            <div className={classes.container}>
                <ImageOptions image={image} store={store} />
                {renderedImage}
            </div>
            {printRenders}
        </React.Fragment>
    )
}

export default injectSheet(styles)(ImageCard)
