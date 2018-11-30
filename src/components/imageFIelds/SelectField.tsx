import * as React from 'react'
import { Image, ImagesStore } from '~/stores/Images'

interface Props {
    image : Image
    enumObj : Record<number, string>
    label : string
    property : keyof Image
    store : ImagesStore
}

const SelectField : React.FunctionComponent<Props> = ({ image, enumObj, label, property, store }) => {
    const onChange = React.useCallback(
        (el : React.SyntheticEvent<HTMLSelectElement>) => {
            store.setProperty(image, property, el.currentTarget.value)
        },
        [image, store],
    )

    return (
        <label>
            <span>{label}</span>
            <select value={image[property] as string} onChange={onChange}>
                {Object.keys(enumObj).map(key => (
                    <option value={key} key={key}>
                        {key}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default SelectField
