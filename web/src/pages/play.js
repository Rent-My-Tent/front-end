import ProgressBar from '../components/ProgressBar'

export default () => {

    const [progress, setProgress] = React.useState(10)

    const updateProgress = () => {
        setProgress(progress + 10)
    } 

    return (
        <div>
            <ProgressBar
                progress={progress}
                text={'1 of 4'}
                size={200}
                strokeWidth={14}
                circleOneStroke="#d9edfe"
                circleTwoStroke={'#000'}
            />
            <button onClick={ () => updateProgress() }>update</button>
        </div>
    )
}
