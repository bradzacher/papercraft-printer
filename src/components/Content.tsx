import * as React from 'react'

import ImageCard from '~/components/ImageCard'
import ImageSelector from '~/components/ImageSelector'
import { createStyles, injectSheet, WithSheet } from '~/Theme'
import useImagesStore, { CreatureSize } from '~/stores/Images'

const styles = createStyles(theme => ({
    container: {
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
    },
    images: {
        alignItems: 'start',
        display: 'flex',
        flexDirection: 'row' as 'row',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'flex-start',
    },
    heading: {
        fontSize: '120%',
        fontWeight: 'bold' as 'bold',
    },
    '@media print': {
        heading: {
            display: 'none',
        },
    },
}))

const Content : React.FunctionComponent<WithSheet<typeof styles>> = ({ classes }) => {
    const store = useImagesStore()

    return (
        <div className={classes.container}>
            <ImageSelector addImage={store.addImage} />
            {Object.keys(CreatureSize).map((key) => {
                const imagesFiltered = store.images.filter(i => i.creatureSize === key)

                if (imagesFiltered.length === 0) {
                    return null
                }

                return (
                    <React.Fragment key={key}>
                        <div className={classes.heading}>{key}</div>
                        <div className={classes.images} key={key}>
                            {imagesFiltered.map((img, i) => (
                                <ImageCard image={img} store={store} key={i} />
                            ))}
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default injectSheet(styles)(Content)
