import * as React from 'react'

import Field from '~/components/imageFields/Field'
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
        <Field label={label}>
            <select value={image[property] as string} onChange={onChange}>
                {Object.keys(enumObj).map(key => (
                    <option value={enumObj[key]} key={key}>
                        {key}
                    </option>
                ))}
            </select>
        </Field>
    )
}

export default SelectField
