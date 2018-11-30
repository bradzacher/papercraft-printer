import * as classnames from 'classnames'
import * as React from 'react'

import { createStyles, injectSheet, WithSheet } from '~/Theme'
import { Image, ImagesStore, CreatureSize } from '~/stores/Images'
import usePrintMediaQuery from '~/lib/usePrintMediaQuery'

const MAX_SIZE = {
    height: 42,
    width: 15,
}
const STAND_HEIGHT = 6

const styles = createStyles(() => ({
    container: {
        alignItems: 'center',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
        margin: '0.25rem',
        padding: '1rem',
    },
    fullImage: {
        maxHeight: `${MAX_SIZE.height}rem`,
        paddingTop: '1rem',
        width: `${MAX_SIZE.width}rem`,
    },

    doubledImage: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
        maxHeight: `${MAX_SIZE.height}rem`,
        paddingTop: '1rem',
        width: `${MAX_SIZE.width}rem`,
    },
    singleImage: {
        border: '1px solid black',
        maxHeight: `${(MAX_SIZE.height - STAND_HEIGHT) / 2}rem`,
        width: `${MAX_SIZE.width}rem`,
    },
    singleImageTop: {
        transform: 'rotateX(180deg)',
        // top border because it's upside-down
        borderTop: 'none',
    },
    singleImageStand: {
        border: '1px solid black',
        height: `${STAND_HEIGHT}rem`,
        width: `${MAX_SIZE.width}rem`,
    },
    singleImageStandBottom: {
        borderTop: 'none',
    },
    singleImageStandTop: {
        borderBottom: 'none',
    },

    printHide: {},
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
        printHide: {
            display: 'none',
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
    const onNumberChange = React.useCallback((el : React.SyntheticEvent<HTMLInputElement>, key : keyof Image) => {
        const value = parseFloat(el.currentTarget.value)
        if (isNaN(value)) {
            return
        }
        if (value < 0) {
            return
        }

        store.setProperty(image, key, value)
    }, [image, store])
    const onCountChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (el) => {
            onNumberChange(el, 'count')
        },
        [image, store],
    )
    const onIsSingleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (el) => {
            store.setProperty(image, 'isSingle', el.currentTarget.checked)
        },
        [image, store],
    )
    const onCreatureSizeChange = React.useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
        (el) => {
            store.setProperty(image, 'creatureSize', el.currentTarget.value as CreatureSize)
        },
        [image, store],
    )
    const onWidthChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (el) => {
            onNumberChange(el, 'realWidth')
        },
        [image, store],
    )
    const onHeightChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (el) => {
            onNumberChange(el, 'realHeight')
        },
        [image, store],
    )

    const isPrint = usePrintMediaQuery()

    const renderedImage = React.useMemo(
        () => {
            const printSizing = isPrint
                ? {
                    height: `${image.realHeight}${image.realUnits}`,
                    width: `${image.realWidth}${image.realUnits}`,
                }
                : {}

            if (image.isSingle) {
                const singleImagePrintSizing = isPrint
                    ? {
                        width: printSizing.width,
                    }
                    : {}

                return (
                    <div className={classes.doubledImage} style={printSizing}>
                        <div
                            className={classnames(classes.singleImageStand, classes.singleImageStandTop)}
                            style={singleImagePrintSizing}
                        />
                        <img
                            className={classnames(classes.singleImage, classes.singleImageTop)}
                            src={image.dataUrl}
                            style={singleImagePrintSizing}
                        />
                        <img className={classes.singleImage} src={image.dataUrl} style={singleImagePrintSizing} />
                        <div
                            className={classnames(classes.singleImageStand, classes.singleImageStandBottom)}
                            style={singleImagePrintSizing}
                        />
                    </div>
                )
            }

            return <img className={classes.fullImage} src={image.dataUrl} style={printSizing} />
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
        [image, isPrint],
    )

    return (
        <>
            <div className={classes.container}>
                <label className={classes.printHide}>
                    <span>Count</span>
                    <input type='number' onChange={onCountChange} min={1} value={image.count} />
                </label>
                <label className={classes.printHide}>
                    <input type='checkbox' onChange={onIsSingleChange} checked={image.isSingle} />
                    <span>Needs backing image?</span>
                </label>
                <label className={classes.printHide}>
                    <span>Creature Size</span>
                    <select value={image.creatureSize} onChange={onCreatureSizeChange}>
                        {Object.keys(CreatureSize).map(key => (
                            <option value={key} key={key}>{key}</option>
                        ))}
                    </select>
                </label>
                <label className={classes.printHide}>
                    <span>Printed Width</span>
                    <input type='number' onChange={onWidthChange} min={1} value={image.realWidth} />
                </label>
                <label className={classes.printHide}>
                    <span>Printed Height</span>
                    <input type='number' onChange={onHeightChange} min={1} value={image.realHeight} />
                </label>
                {renderedImage}
            </div>
            {printRenders}
        </>
    )
}

export default injectSheet(styles)(ImageCard)
