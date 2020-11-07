import { useState, useEffect, useRef } from 'react'
import sanityClient from '../../sanityClient'
import { useRouter } from 'next/router'
import { Cell, Grid } from 'baseui/layout-grid'
import Input from '../components/Input'
import ProgressSteps, { Step } from '../components/ProgressSteps'
import ProgressBar from '../components/ProgressBar'
import Button, { SIZE } from '../components/Button'
import { FileUploader } from 'baseui/file-uploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import helpers from '../utils/helpers'

import { H1, H2, H3, H4, H5, H6 } from 'baseui/typography'
import Countdown from 'react-countdown'
import { createTent, uploadImage, updateTent, authUser } from '../utils'

export default () => {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(2)
    const [email, setEmail] = useState('ariannargesi@gmail.com')
    const [tentName, setTentName] = useState('')
    const [isUploading, setIsUploading] = useState(null)
    const [resend, setResend] = useState(false)
    const [progress, setProgress] = React.useState(10)
    const [showCountDown, setShowCountDown] = useState(true)
    const tentId = useRef(null)

    const renderCountdown = ({ minutes, seconds, completed }) => {
        if (completed) {
            setResend(true)
            return <span>__:__</span>
        } else {
            return (
                <span className="countdown">
                    {minutes}:{seconds}
                </span>
            )
        }
    }

    async function setTentId() {
        const query = `*[ _type == 'tent' && published == false && owner == '${email}' ]`
        const result = await sanityClient.fetch(query)
        if (result.length === 0) {
            console.log('create a new tent')
            const id = await createTent(email)
            tentId.current = id
        } else {
            console.log('tent already exits')
            const id = result[0]._id
            tentId.current = id
            setTentName(result[0].name)
        }
    }

    useEffect(() => {
        generateIdentifire()
    }, [])

    const generateIdentifire = async () => {
        setTentId()
        helpers.getSampleName((name) => {
            console.log(name)
            setTentName(name)
            updateTent(tentId.current, { name })
                .then((result) => console.log(result))
                .catch((error) => console.log(error))
        })
    }

    const cancelHandler = () => setIsUploading(false)

    const startProgress = () => setIsUploading(true)

    const emailSubmitHandler = async () => {
        setCurrentStep(1)
        authUser(email, () => {
            setCurrentStep(2)
        })
    }

    const uploadFileHandler = (acceptedFile, rejectedFile) => {
        const filename = `${tentId.current}-1`
        const id = tentId.current
        const file = acceptedFile[0]
        uploadImage(id, filename, file)
            .then(({ data }) => {
                router.push('/new-tent')
                setIsUploading(false)
            })
            .catch((err) => () => console.log(err))
        startProgress()
    }

    return (
        <>
            <div className="box_index light-red">
                {/* start here */}

                <div style={{ width: '550px',display: 'flex', border: '1px solid blue', justifyContent:'space-around'}}>
                    <div style={{ width: '90px'}}>
                        <ProgressBar
                            progress={currentStep * 20 }
                            size={80}
                            strokeWidth={8}
                            circleOneStroke="#fff"
                            circleTwoStroke={'#38d738'}
                        />
                    </div>
                    <div style={{width: '340px', display: 'flex', alignItems: 'center'}}>
                       <ProgressSteps current={currentStep}>
                           <Step/>
                           <Step/>
                           <Step>
                               <H5>Name your tent</H5>
                           </Step>
                           <Step>
                               <H5>Upload an image</H5>
                           </Step>
                       </ProgressSteps>
                    </div>
                   
                </div>
                <hr/>
                {/* end here */}
                <ProgressSteps current={currentStep}>
                    <Step>
                        <div className="full-with-column">
                            <H5>
                                <b>Sell your tent</b> and then feel good about
                                it joining a circular economy
                            </H5>
                            <br />
                            <br />
                            <br />
                            <br />
                            <Input
                                backgroundColor={'#DB8971'}
                                placeholder="Enter Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                endEnhancer={
                                    <Button
                                        size={SIZE.large}
                                        onClick={emailSubmitHandler}
                                    >
                                        Continue
                                    </Button>
                                }
                            />
                        </div>
                    </Step>
                    <Step>
                        <div className="full-with-column">
                            <H5>
                                Please confirm your email address and come back
                                to this page
                            </H5>
                            {showCountDown ? (
                                <Countdown
                                    date={Date.now() + 60000}
                                    renderer={renderCountdown}
                                    onComplete={() => setShowCountDown(false)}
                                />
                            ) : (
                                <span className="counter">__:__</span>
                            )}
                            <br />
                            <Button
                                disabled={!resend}
                                onClick={emailSubmitHandler}
                            >
                                Resend
                            </Button>
                        </div>
                    </Step>
                    <Step>
                        <div className="full-with-column">
                            <br />
                            <br />
                            <br />
                            <br />
                            <Input
                                backgroundColor={'#DB8971'}
                                placeholder="Give your tent a name"
                                value={tentName}
                                endEnhancer={
                                    <FontAwesomeIcon
                                        icon={faRedo}
                                        onClick={() => generateIdentifire()}
                                        style={{ cursor: 'pointer' }}
                                    />
                                }
                            />
                            <div className="full-with rtl px-1">
                                <Button
                                    onClick={() => setCurrentStep(3)}
                                    backgroundColor="#DD7052"
                                    backgroundColorOnHover="#DB8971"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </Step>
                    <Step>
                        <FileUploader
                            onCancel={cancelHandler}
                            name="tentimage"
                            onDrop={uploadFileHandler}
                            progressMessage={
                                isUploading ? 'Uploading... hang tight' : ''
                            }
                        />
                        <div className="full-with px-1">
                            <Button
                                disabled={isUploading != null}
                                onClick={() => setCurrentStep(2)}
                                backgroundColor="#DD7052"
                                backgroundColorOnHover="#DB8971"
                            >
                                Back
                            </Button>
                        </div>
                    </Step>
                </ProgressSteps>
            </div>
        </>
    )
}
