import { Card, StyledBody, StyledAction } from 'baseui/card'

export default (props) => {
    return (
        <Card
            overrides={{ Root: { style: { width: '300px' } } }}
            headerImage={props.imageUrl}
            title={props.title}
        ></Card>
    )
}
