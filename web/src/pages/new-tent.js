// Libraris
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
// BaseWeb UI Components
import { Grid, Cell } from 'baseui/layout-grid'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { StatefulTextarea } from 'baseui/textarea'
import { Button } from 'baseui/button'
import { Accordion, Panel } from 'baseui/accordion'
import { accordion } from '../../StylesOverrides'
import { Combobox } from 'baseui/combobox'
import { toaster, ToasterContainer } from 'baseui/toast'

import ImageUploader from '../components/ImageUploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faDollarSign } from '@fortawesome/free-solid-svg-icons'
// Customs
import helpers from '../utils/helpers'
import sanityClient from '../../sanityClient'
import { useUser } from '../utils/hooks'
import useCountrys from '../hooks/useCountrys'
import { createTent, updateTent, uploadImage, removeArrayItem } from '../utils'
import useCountries from '../hooks/useCountrys'

export default (props) => {
    const user = useUser({ redirectTo: '/' })
    const [tentName, setTentName] = useState('')
    const { register, errors, handleSubmit } = useForm()
    const [images, setImages] = useState([{}])
    const [country, setCountry] = useState('')
    const [urlPreview, setUrlPreview] = useState('')
    const [toastKey, setToastKey] = React.useState(null)
    const [city, setCity] = useState('')
    const [countrysList] = useCountries()
    const tentId = useRef(null)

    useEffect(() => {
        // set current document id
        async function setTentId() {
            const query = `*[ _type == 'tent' && published == true && owner == '${user.email}' ]`
            const result = await sanityClient.fetch(query)
            if (result.length === 0) {
                const id = await createTent(user.email)
                tentId.current = id
            } else {
                const id = result[0]._id
                tentId.current = id
                if (result[0].images.length > 0) {
                    setImages(result[0].images)
                }
                setTentName(result[0].name)
            }
        }
        if (user) setTentId()
    }, [user])

    console.log()

    const generateIdentifire = () => {
        helpers.getSampleName((name) => {
            setTentName(name)
            setUrlPreview( 'http:// localhost:3000/' + name.replaceAll(' ', '-'))
        })
    }

    const showToast = () =>
        setToastKey(toaster.positive('submitted successfully'))

    const renderForm = (
        <form
            onSubmit={handleSubmit((data) => {
                data.age = Number(data.age)
                data.price = Number(data.age)
                updateTent(tentId.current, data)
                    .then((result) => {
                        showToast()
                    })
                    .catch((error) => console.log(error))
            })}
        >
            <FormControl label="Url preview">
                <Input
                    name="url"
                    value={urlPreview}
                />
            </FormControl>

            <FormControl label="Identifier">
                <Input
                    endEnhancer={
                        <FontAwesomeIcon
                            icon={faRedo}
                            onClick={() => generateIdentifire()}
                            style={{ cursor: 'pointer' }}
                        />
                    }
                    name="name"
                    value={tentName}
                    inputRef={register}
                />
            </FormControl>

            <FormControl
                label="Description"
                caption={errors.description && 'description its not valid'}
            >
                <StatefulTextarea
                    name="description"
                    inputRef={register({ required: true, minLength: 16 })}
                />
            </FormControl>
            <FormControl
                label="Brand"
                caption={errors.brand && 'brand its not valid'}
            >
                <Input
                    name="brand"
                    inputRef={register({
                        required: true,
                        minLength: 3,
                        maxLength: 32,
                    })}
                />
            </FormControl>
            <FormControl
                label="Age"
                caption={errors.age && 'age its not valid'}
            >
                <Input
                    name="age"
                    type="number"
                    inputRef={register({ required: true, min: 0, max: 100 })}
                />
            </FormControl>
            <Grid>
                <Cell span={6}></Cell>
                <Cell span={6}>
                    <FormControl label="Price">
                        <Input
                            endEnhancer={
                                <FontAwesomeIcon icon={faDollarSign} />
                            }
                            inputRef={register}
                            name="price"
                            type="number"
                        />
                    </FormControl>
                </Cell>
            </Grid>
            <Input type="submit" />
        </form>
    )

    const renderImageUploaders = () => {
        return (
            <Grid gridGaps={35}>
                {images.map(({ url }, index) => {
                    return (
                        <Cell span={4} key={index}>
                            <ImageUploader
                                defaultSrc={url}
                                onDrop={(file) => {
                                    const filename = `${tentId.current}-${index}`
                                    const id = tentId.current
                                    uploadImage(id, filename, file)
                                        .then(({ data }) => {
                                            setImages(data.images)
                                        })
                                        .catch((err) => console.log('Error'))
                                }}
                                onRemove={() => {
                                    const newArr = removeArrayItem(
                                        [...images],
                                        index
                                    )
                                    setImages(newArr)
                                    updateTent(tentId.current, { newArr })
                                }}
                            />
                        </Cell>
                    )
                })}

                {images.length < 9 && (
                    <Cell span={4}>
                        {' '}
                        <Button
                            $style={{ height: '130px', width: '100%' }}
                            disabled={
                                (images.length === 0 ||
                                    (images.length < 9 &&
                                        _.isEmpty(images[images.length - 1]) ===
                                            false)) === true
                                    ? false
                                    : true
                            }
                            onClick={() => setImages([...images, {}])}
                        >
                            {' '}
                            Add Image{' '}
                        </Button>
                    </Cell>
                )}
            </Grid>
        )
    }

    return (
        <main style={{ backgroundColor: 'white' }}>
            <Accordion overrides={accordion}>
                <Panel title="tent details" expanded>
                    <Grid>
                        <Cell span={6}>{renderForm}</Cell>
                        <Cell span={6}>{renderImageUploaders()}</Cell>
                    </Grid>
                </Panel>
            </Accordion>
            <ToasterContainer autoHideDuration={2000} />
        </main>
    )
}
