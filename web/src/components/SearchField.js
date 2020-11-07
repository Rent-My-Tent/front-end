import Input from '../components/Input'

import Button, { SIZE } from '../components/Button'
import { Grid, Cell } from 'baseui/layout-grid'
import { H5 } from 'baseui/typography'
export default (props) => {
    return (
        <div className="box_index light-green">
            <H5>
                <b>Own a tent for a few weeks </b> and then pass it on to get
                your money back{' '}
            </H5>
            <Input
                backgroundColor="#85B279"
                placeholder="Search tents..."
                endEnhancer={<Button size={SIZE.large}>Click</Button>}
            />
        </div>
    )
}
