import * as React from 'react'

import { createStyles, injectSheet, WithSheet } from '~/Theme'
import { Image, ImagesStore } from '~/stores/Images'
import ImageOptions from '~/components/ImageOptions'
import SingleImage from '~/components/imageRenderers/SingleImage'
import DoubledFace from '~/components/imageRenderers/DoubledFace'

const styles = createStyles(() => ({
    container: {
        alignItems: 'center',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
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
    const renderedImage = image.isSingle ? <SingleImage image={image} /> : <DoubledFace image={image} />

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
