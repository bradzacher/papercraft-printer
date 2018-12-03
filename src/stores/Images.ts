import * as React from 'react'

enum RealUnit {
    inch = 'in',
    mm = 'mm',
}
interface Image {
    dataUrl : string
    count : number
    group : number
    isSingle : boolean
    realWidth : number
    realHeight : number
    realUnits : RealUnit
}
type ImagesState = ReadonlyArray<Readonly<Image>>
type GroupsState = Array<Set<Image>>

interface ImagesStore {
    images : ImagesState
    groups : ReadonlyArray<ReadonlySet<Image>>
    addImages : (dataUrls : string[], group : number) => void
    removeImage : (image : Image) => void
    setProperty : <T extends keyof Image>(image : Image, key : T, value : Image[T]) => void
    setGroup : (image : Image, index : number) => void
}

const imagesFromStorage : ImagesState = JSON.parse(window.localStorage.getItem('images') || '[]')
const groupsFromStorage = imagesFromStorage.reduce(
    (acc, img) => {
        acc[img.group] = acc[img.group] || new Set()
        acc[img.group].add(img)

        return acc
    },
    [] as GroupsState,
)
if (groupsFromStorage.length === 0) {
    groupsFromStorage.push(new Set())
}

const useImagesStore = () : ImagesStore => {
    const [images, setImages] = React.useState<ImagesState>(imagesFromStorage)
    const [groups, setGroups] = React.useState<GroupsState>(groupsFromStorage)
    const setImagesWithStorage = React.useCallback(
        (newImages) => {
            window.localStorage.setItem('images', JSON.stringify(newImages))

            return setImages(newImages)
        },
        [setImages],
    )

    function setProperty<T extends keyof Image>(image : Image, key : T, value : Image[T]) {
        const idx = images.indexOf(image)
        if (idx !== -1) {
            const newImages = [...images]
            newImages[idx] = {
                ...image,
                [key]: value,
            }
            setImagesWithStorage(newImages)
        }
    }

    function setGroup(image : Image, newGroup : number) : void {
        groups[image.group].delete(image)
        groups[newGroup] = groups[newGroup] || new Set()
        groups[newGroup].add(image)

        setGroups([...groups])
        setProperty(image, 'group', newGroup)
    }

    return {
        images,
        groups,
        addImages: (dataUrls : string[], group : number = 0) : void => {
            const newImages = dataUrls.filter(dataUrl => !images.find(i => i.dataUrl === dataUrl))
            if (newImages.length > 0) {
                setImagesWithStorage([
                    ...images,
                    ...newImages.map(dataUrl => ({
                        dataUrl,
                        count: 1,
                        group,
                        isSingle: true,
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
                setImagesWithStorage(images.filter((_, i) => i !== idx))
            }
        },
        setProperty,
        setGroup,
    }
}

export default useImagesStore
export { Image, ImagesStore, RealUnit }
