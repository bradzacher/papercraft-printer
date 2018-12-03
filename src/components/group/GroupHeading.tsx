import * as React from 'react'

import { createStyles, injectSheet, WithSheet } from '~/Theme'

const styles = createStyles(() => ({
    heading: {
        fontSize: '120%',
        fontWeight: 'bold' as 'bold',
        padding: '1rem',
    },
    '@media print': {
        heading: {
            display: 'none',
        },
    },
}))

interface Props {
    index : number
}

const GroupHeading : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({ classes, index }) => (
    <div className={classes.heading}>Group {index}</div>
)

export default injectSheet(styles)(GroupHeading)
