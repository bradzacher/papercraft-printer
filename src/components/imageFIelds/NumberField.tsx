import * as React from 'react'
import { Image, ImagesStore } from '~/stores/Images'

interface Props {
    image : Image
    label : string
    property : keyof Image
    store : ImagesStore
}

const NumberField : React.FunctionComponent<Props> = ({ image, label, property, store }) => {
    const onChange = React.useCallback(
        (el : React.SyntheticEvent<HTMLInputElement>) => {
            const value = parseFloat(el.currentTarget.value)
            if (isNaN(value)) {
                return
            }
            if (value < 0) {
                return
            }

            store.setProperty(image, property, value)
        },
        [image, store],
    )

    return (
        <label>
            <span>{label}</span>
            <input type='number' onChange={onChange} min={1} value={image[property] as number} />
        </label>
    )
}

export default NumberField
