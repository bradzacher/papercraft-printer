import * as classnames from 'classnames'
import * as React from 'react'

import { createStyles, injectSheet, WithSheet } from '~/Theme'

const styles = createStyles(() => ({
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between',
        marginTop: '0.25rem',
        width: '100%',
    },
    label: {
        width: '50%',
    },
    field: {
        width: '50%',
    },
    child: {
        width: '100%',
    },
}))

interface Props {
    label : string
}

const ImageField : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({ children, classes, label }) => {
    const onlyChild = React.Children.only(children)
    const child = React.cloneElement(onlyChild, {
        className: classnames(onlyChild.props.className, classes.child),
    })

    return (
        <label className={classes.container}>
            <div className={classes.label}>{label}</div>
            <div className={classes.field}>{child}</div>
        </label>
    )
}

export default injectSheet(styles)(ImageField)
