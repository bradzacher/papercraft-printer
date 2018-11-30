import * as React from 'react'

enum CreatureSize {
    Tiny = 'Tiny',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    Huge = 'Huge',
    Gargantuan = 'Gargantuan',
}
enum RealUnit {
    inch = 'inch',
    mm = 'mm',
}
interface Image {
    dataUrl : string
    count : number
    isSingle : boolean
    creatureSize : CreatureSize
    realWidth : number
    realHeight : number
    realUnits : RealUnit
}
type ImagesState = ReadonlyArray<Readonly<Image>>

interface ImagesStore {
    images : ImagesState
    addImage : (dataUrl : string) => void
    removeImage : (image : Image) => void
    setProperty : <T extends keyof Image>(image : Image, key : T, value : Image[T]) => void
}

const useImagesStore = () : ImagesStore => {
    const [images, setImages] = React.useState<ImagesState>([])

    function set<T extends keyof Image>(image : Image, key : T, value : Image[T]) {
        const idx = images.indexOf(image)
        if (idx !== -1) {
            const newImages = [...images]
            newImages[idx] = {
                ...image,
                [key]: value,
            }
            setImages(newImages)
        }
    }

    return {
        images,
        addImage: (dataUrl : string) : void => {
            if (images.findIndex(i => i.dataUrl === dataUrl) === -1) {
                setImages([
                    ...images,
                    {
                        dataUrl,
                        count: 1,
                        isSingle: false,
                        creatureSize: CreatureSize.Medium,
                        realWidth: 23,
                        realHeight: 66.5,
                        realUnits: RealUnit.mm,
                    },
                ])
            }
        },
        removeImage: (image : Image) : void => {
            const idx = images.indexOf(image)
            if (idx !== -1) {
                setImages(images.filter((_, i) => i !== idx))
            }
        },
        setProperty: set,
    }
}

export default useImagesStore
export { CreatureSize, Image, ImagesStore }
