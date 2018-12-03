import * as classnames from 'classnames'
import * as React from 'react'

import { createStyles, injectSheet, WithSheet } from '~/Theme'

const styles = createStyles(theme => ({
    stand: {
        backgroundColor: theme.palette.white,
        border: `1px solid ${theme.palette.grey}`,
        flexGrow: 0,
        flexShrink: 0,
        height: '5rem',
        width: '100%',
    },
    standBottom: {
        borderTop: 'none',
    },
    standTop: {
        borderBottom: 'none',
    },
}))

interface Props {
    isTop ?: boolean
}

const Stand : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({ classes, isTop }) => (
    <div
        className={classnames(classes.stand, {
            [classes.standTop]: isTop,
            [classes.standBottom]: !isTop,
        })}
    />
)

export default injectSheet(styles)(Stand)
