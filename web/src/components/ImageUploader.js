import { useState, useRef, useEffect } from 'react'
import { LocaleProvider } from 'baseui'
import { StatefulPagination } from 'baseui/pagination'
import { FileUploader } from 'baseui/file-uploader'

const localeOverrideHu = {
    fileuploader: {
        dropFilesToUpload: 'Drop',
        or: '',
        browseFiles: 'Browse',
        retry: 'retry',
        cancel: '',
    },
}

export default (props) => {
    const { defaultSrc } = props
    const [showProgress, setShowProgress] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [imageSrc, setImageSrc] = useState()

    const timeoutid = useRef(null)

    useEffect(() => {
        if (defaultSrc) {
            setImageSrc(defaultSrc)
            setIsUploaded(true)
        }
    }, [defaultSrc])

    const removeImageHanlder = () => {
        setImageSrc(null)
        setIsUploaded(false)
        if (props.onRemove) props.onRemove()
    }

    const reset = () => {
        setShowProgress(false)
        setIsUploaded(true)
        clearTimeout(timeoutid.current)
    }

    const startProgress = () => {
        setShowProgress(true)
        timeoutid.current = setTimeout(reset, 4000)
    }

    const renderFileUploader = (
        <FileUploader
            overrides={{
                Root: {
                    style: ({ $theme }) => {
                        return {
                            height: '130px',
                            overflow: 'hidden'
                        }
                    },
                },
                FileDragAndDrop: {
                    style: props => ({
                        border: 'none'
                    }),
                  },
            }}
            onCancel={reset}
            multiple={false}
            onDrop={(acceptedFile, rejectedFile) => {
                const file = acceptedFile[0]
                setImageSrc(URL.createObjectURL(file))
                if (props.onDrop) props.onDrop(file)
                startProgress()
            }}
            progressMessage={showProgress ? 'Uploading...' : ''}
        />
    )

    const renderImamge = (
        <div style={{ width: '100%', height: '130px', position: 'relative' }}>
            <img src={imageSrc} style={{ width: '100%', height: '100%' }} />
            <button
                onClick={removeImageHanlder}
                style={{ position: 'absolute', right: '10%', bottom: '10%' }}
            >
                remove
            </button>
        </div>
    )

    return (
        <LocaleProvider locale={localeOverrideHu}>
            {imageSrc && isUploaded ? renderImamge : renderFileUploader}
        </LocaleProvider>
    )
}
