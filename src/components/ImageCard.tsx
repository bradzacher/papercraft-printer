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
        paddingRight: '3rem',
        position: 'relative' as 'relative',
    },
    delete: {
        cursor: 'pointer',
        position: 'absolute' as 'absolute',
        right: '0.5rem',
        top: '0.5rem',
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
    const onDelete = React.useCallback(
        () => {
            store.removeImage(image)
        },
        [store, image],
    )

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
                <svg width='16' height='16' viewBox='0 0 24 24' className={classes.delete} onClick={onDelete}>
                    {/* eslint-disable-next-line max-len */}
                    <path d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z' />
                </svg>
                <ImageOptions image={image} store={store} />
                {renderedImage}
            </div>
            {printRenders}
        </React.Fragment>
    )
}

export default injectSheet(styles)(ImageCard)
