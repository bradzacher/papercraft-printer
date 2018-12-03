import * as React from 'react'

import Group from '~/components/group'
import { createStyles, injectSheet, WithSheet } from '~/Theme'
import useImagesStore from '~/stores/Images'

const styles = createStyles(() => ({
    container: {
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
    },
}))

const Content : React.FunctionComponent<WithSheet<typeof styles>> = ({ classes }) => {
    const store = useImagesStore()

    return (
        <div className={classes.container}>
            {store.groups.map((_, idx) => (
                <Group store={store} index={idx} key={idx} />
            ))}
        </div>
    )
}

export default injectSheet(styles)(Content)
