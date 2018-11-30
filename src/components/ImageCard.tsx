import * as classnames from 'classnames'
import * as React from 'react'

import { createStyles, injectSheet, WithSheet } from '~/Theme'
import { Image, ImagesStore } from '~/stores/Images'
import usePrintMediaQuery from '~/lib/usePrintMediaQuery'
import ImageOptions from '~/components/ImageOptions'

const STAND_HEIGHT = 6

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
    fullImage: {
        paddingTop: '1rem',
    },

    doubledImage: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
        paddingTop: '1rem',
    },
    singleImage: {
        border: '1px solid black',
        flexGrow: 1,
        width: '100%',
    },
    singleImageTop: {
        transform: 'rotateX(180deg)',
        // top border because it's upside-down
        borderTop: 'none',
    },
    singleImageStand: {
        border: '1px solid black',
        flexGrow: 0,
        flexShrink: 0,
        height: `${STAND_HEIGHT}rem`,
        width: '100%',
    },
    singleImageStandBottom: {
        borderTop: 'none',
    },
    singleImageStandTop: {
        borderBottom: 'none',
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
        fullImage: {
            padding: 0,
        },
        doubledImage: {
            padding: 0,
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
    const isPrint = usePrintMediaQuery()

    const renderedImage = React.useMemo(
        () => {
            const printSizing = {
                height: `${image.realHeight}${image.realUnits}`,
                width: `${image.realWidth}${image.realUnits}`,
            }

            if (image.isSingle) {
                return (
                    <div key={image.realUnits} className={classes.doubledImage} style={printSizing}>
                        <div className={classnames(classes.singleImageStand, classes.singleImageStandTop)} />
                        <img className={classnames(classes.singleImage, classes.singleImageTop)} src={image.dataUrl} />
                        <img className={classes.singleImage} src={image.dataUrl} />
                        <div className={classnames(classes.singleImageStand, classes.singleImageStandBottom)} />
                    </div>
                )
            }

            return <img key={image.realUnits} className={classes.fullImage} src={image.dataUrl} style={printSizing} />
        },
        [image, isPrint],
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
                <ImageOptions image={image} store={store} />
                {renderedImage}
            </div>
            {printRenders}
        </React.Fragment>
    )
}

export default injectSheet(styles)(ImageCard)
