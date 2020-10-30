import {useState, useEffect} from 'react'
import { Grid, Cell } from 'baseui/layout-grid'
import sanityClient from '../../sanityClient' 
import Carousel from 'nuka-carousel';
import { Button } from 'baseui/button'
export default ({name, modal}) => {

    const [state, setState] = useState(null)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    useEffect(() => {
        const query = `*[ _type == 'tent' && published == true ]`
        sanityClient.fetch(query).then(result => {
            setState(result[0])
        })
    }, [])

    return (
        <div>
            { !modal && <pre>{JSON.stringify(state, null, 2)}</pre>}
            { state && modal &&
                <Grid>
                    <Cell span={6}>
                    <Carousel>
                        {state.images.map(item => {
                            return (
                                    <img src={item.url}/>
                            )
                        })}
                    </Carousel>
                    </Cell>
                    <Cell span={6}>
                        <h1>Name: {state.name}</h1>
                        <h2>Identifier: {state.identifire}</h2>
                        <p>Description:{state.description}</p>
                        <span>Rate: 4/5</span>
                        <br/>
                        <br/>
                        <Button>Reserve it right now</Button>
                    </Cell>

                </Grid>
            }
        </div>
    )
}