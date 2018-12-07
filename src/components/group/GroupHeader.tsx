import * as classnames from 'classnames'
import * as React from 'react'
import Dropzone from 'react-dropzone'

import { createStyles, injectSheet, WithSheet } from '~/Theme'

const styles = createStyles(theme => ({
    dropzone: {
        backgroundColor: theme.palette.secondary,
        color: theme.palette.white,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column' as 'column',
        padding: '1rem',
        textAlign: 'center' as 'center',
    },
    heading: {
        fontSize: '120%',
        fontWeight: 'bold' as 'bold',
        padding: '1rem',
    },
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between',
    },
    '@media print': {
        dropzone: {
            display: 'none',
        },
    },
}))

interface Props {
    addImages : (image : string[], group : number) => void
    className ?: string
    group : number
}

const ImageSelector : React.FunctionComponent<Props & WithSheet<typeof styles>> = ({
    addImages,
    classes,
    className,
    group,
}) => {
    const onFileUpload = async (files : File[]) => {
        if (files.length === 0) {
            return
        }

        const dataUrls = await Promise.all(
            files.map(
                file =>
                    new Promise<string>((resolve) => {
                        const reader = new FileReader()
                        reader.addEventListener('load', () => {
                            resolve(reader.result as string)
                        })

                        reader.readAsDataURL(file)
                    }),
            ),
        )

        addImages(dataUrls, group)
    }

    return (
        <Dropzone
            accept='image/*'
            className={classnames(className, classes.dropzone)}
            onDropAccepted={onFileUpload}
            multiple
        >
            <div className={classes.row}>
                <div className={classes.heading}>Group {group}</div>
                <div>Click to add images (or drop them here)...</div>
            </div>
        </Dropzone>
    )
}

export default injectSheet(styles)(ImageSelector)
