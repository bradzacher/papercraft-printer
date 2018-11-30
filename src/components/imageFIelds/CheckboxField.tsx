import * as React from 'react'
import { Image, ImagesStore } from '~/stores/Images'

interface Props {
    image : Image
    label : string
    property : keyof Image
    store : ImagesStore
}

const CheckboxField : React.FunctionComponent<Props> = ({ image, label, property, store }) => {
    const onChange = React.useCallback(
        (el : React.SyntheticEvent<HTMLInputElement>) => {
            store.setProperty(image, property, el.currentTarget.checked)
        },
        [image, store],
    )

    return (
        <label>
            <input type='checkbox' onChange={onChange} checked={image[property] as boolean} />
            <span>{label}</span>
        </label>
    )
}

export default CheckboxField
