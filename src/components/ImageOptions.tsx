import * as React from 'react'

import CheckboxField from '~/components/imageFIelds/CheckboxField'
import NumberField from '~/components/imageFIelds/NumberField'
import { Image, CreatureSize, ImagesStore, RealUnit } from '~/stores/Images'
import { createStyles, injectSheet, WithSheet } from '~/Theme'
import SelectField from '~/components/imageFIelds/SelectField'

const styles = createStyles(() => ({
    container: {
        alignItems: 'start',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between',
    },

    '@media print': {
        container: {
            display: 'none',
        },
    },
}))

interface Props {
    image : Image
    store : ImagesStore
}

const ImageOptions : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({ classes, image, store }) => (
    <div className={classes.container}>
        <NumberField image={image} label='Count' property='count' store={store} />
        <CheckboxField image={image} label='Needs backing image' property='isSingle' store={store} />
        <SelectField enumObj={CreatureSize} image={image} label='Creature Size' property='creatureSize' store={store} />
        <NumberField image={image} label='Printed Height' property='realHeight' store={store} />
        <NumberField image={image} label='Printed Width' property='realWidth' store={store} />
        <SelectField enumObj={RealUnit} image={image} label='Units' property='realUnits' store={store} />
    </div>
)

export default injectSheet(styles)(ImageOptions)
