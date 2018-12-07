import * as React from 'react'

import GroupHeader from '~/components/group/GroupHeader'
import { ImagesStore, Image } from '~/stores/Images'
import { createStyles, injectSheet, WithSheet } from '~/Theme'

import ImageCard from '~/components/ImageCard'

const styles = createStyles(() => ({
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
}))

interface Props {
    index : number
    store : ImagesStore
}

const Group : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({ classes, index, store }) => {
    const images = React.useMemo(
        () =>
            store.images.reduce(
                (acc, img) => {
                    if (img.group === index) {
                        acc.push(img)
                    }

                    return acc
                },
                [] as Image[],
            ),
        [store.images],
    )

    if (images.length === 0) {
        return null
    }

    return (
        <div className={classes.container}>
            <GroupHeader addImages={store.addImages} group={index} />
            <div className={classes.images}>
                {images.map((img, i) => (
                    <ImageCard image={img} store={store} key={i} />
                ))}
            </div>
        </div>
    )
}

export default injectSheet(styles)(Group)
