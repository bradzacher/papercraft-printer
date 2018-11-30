import * as classnames from 'classnames'
import * as React from 'react'
import Dropzone from 'react-dropzone'

import { createStyles, injectSheet, WithSheet } from '~/Theme'

const styles = createStyles(theme => ({
    dropzone: {
        backgroundColor: theme.palette.secondary,
        color: theme.palette.white,
        cursor: 'pointer',
        height: '4rem',
        lineHeight: '2rem',
        padding: '1rem',
        textAlign: 'center' as 'center',
    },
    '@media print': {
        dropzone: {
            display: 'none',
        },
    },
}))

interface Props {
    addImage : (image : string) => void
    className ?: string
}

type ImageSelector = React.FunctionComponent<Props & WithSheet<typeof styles>>
const ImageSelector : ImageSelector = ({ classes, className, addImage }) => {
    const onFileUpload = (files : File[]) => {
        if (files.length === 0) {
            return
        }

        const reader = new FileReader()
        reader.addEventListener('load', () => {
            addImage(reader.result as string)
        })
        reader.readAsDataURL(files[0])
    }

    return (
        <Dropzone
            accept='image/*'
            className={classnames(className, classes.dropzone)}
            onDropAccepted={onFileUpload}
            multiple={false}
        >
            Click to add images (or drop them here)...
        </Dropzone>
    )
}

export default injectSheet(styles)(ImageSelector)
