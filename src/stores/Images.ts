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
    inch = 'in',
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
    addImages : (dataUrls : string[]) => void
    removeImage : (image : Image) => void
    setProperty : <T extends keyof Image>(image : Image, key : T, value : Image[T]) => void
}

const useImagesStore = () : ImagesStore => {
    const [images, setImages] = React.useState<ImagesState>([])

    function setProperty<T extends keyof Image>(image : Image, key : T, value : Image[T]) {
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
        addImages: (dataUrls : string[]) : void => {
            const newImages = dataUrls.filter(dataUrl => !images.find(i => i.dataUrl === dataUrl))
            if (newImages.length > 0) {
                setImages([
                    ...images,
                    ...newImages.map(dataUrl => ({
                        dataUrl,
                        count: 1,
                        isSingle: false,
                        creatureSize: CreatureSize.Medium,
                        realWidth: 1,
                        realHeight: 3,
                        realUnits: RealUnit.inch,
                    })),
                ])
            }
        },
        removeImage: (image : Image) : void => {
            const idx = images.indexOf(image)
            if (idx !== -1) {
                setImages(images.filter((_, i) => i !== idx))
            }
        },
        setProperty,
    }
}

export default useImagesStore
export { CreatureSize, Image, ImagesStore, RealUnit }
