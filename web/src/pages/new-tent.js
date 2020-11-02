import { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import _ from 'lodash'
import { Grid, Cell } from "baseui/layout-grid";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { StatefulTextarea } from "baseui/textarea";
import { Button } from 'baseui/button'
import { accordion } from "../../StylesOverrides";
import { FileUploader } from "baseui/file-uploader";
import ImageUploader from "../components/ImageUploader";
import helpers from "../utils/helpers";
import sanityClient from "../../sanityClient";
import { Store } from "../context";
import { useUser } from "../utils/hooks";
import { createTent, updateTent, uploadImage, removeArrayItem } from '../utils'
import {Accordion, Panel} from 'baseui/accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faDollarSign} from '@fortawesome/free-solid-svg-icons'
export default (props) => {

  const user = useUser({ redirectTo: "/" });
  const { state, dispatch } = useContext(Store);
  const [tentName, setTentName] = useState("");
  const [tentIdentifire, setTentIdentifire] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const [images, setImages] = useState([{}]);
  const tentId = useRef(null);


  
  useEffect(() => {
    // set current document id 
    async function setTentId() {

      const query = `*[ _type == 'tent' && published == false && owner == '${user.email}' ]` 

      const result = await sanityClient.fetch(query);
      console.log(result[0])
      if (result.length === 0) {
        const id = await createTent(user.email);
        tentId.current = id;
      } else {
        const id = result[0]._id;
        tentId.current = id;
        if(result[0].images.length > 0) {
          console.log('here 1')
          setImages(result[0].images)
        }
      }
    }
    if (user) setTentId();
  }, [user]);

  useEffect(() => {
    const tent_name = localStorage.getItem("tent-name");
    setTentName(tent_name);
    generateIdentifire();
  }, []);



   
  const submitHanlder = (data) => {
    data.age = Number(data.age)
    data.price = Number(data.age)
    updateTent(tentId.current, data);
  };

  const generateIdentifire = () => {
    helpers
      .getSampleName()
      .then((result) => setTentIdentifire(result))
      .catch((error) => console.log(error));
  };


  const renderForm = (
    <form onSubmit={handleSubmit(submitHanlder)}>
      <FormControl
        label="Tent name"
        caption={errors.name && "name its not valid"}
      >
        <Input
          name="name"
          inputRef={register({ required: true, minLength: 3, maxLength: 64 })}
        />
      </FormControl>
      <FormControl
        label="Description"
        caption={errors.description && "description its not valid"}
      >
        <StatefulTextarea
          name="description"
          inputRef={register({ required: true, minLength: 16 })}
        />
      </FormControl>
      <FormControl
        label="Brand"
        caption={errors.brand && "brand its not valid"}
      >
        <Input
          name="brand"
          inputRef={register({ required: true, minLength: 3, maxLength: 32 })}
        />
      </FormControl>
      <FormControl
        label="Age"
        caption={errors.age && "age its not valid"}
      >
        <Input
          name="age"
          type="number"
          inputRef={register({ required: true, min: 0, max: 100 })}
        />
      </FormControl>
      <Grid>
        <Cell span={6}>
      <FormControl label="Identifier">
        <Input 
          endEnhancer={<FontAwesomeIcon  
            icon={faRedo}
            onClick={() => generateIdentifire()}
            style={{cursor: 'pointer'}}
            />}
          name="identifire"
          value={tentIdentifire} 
          inputRef={register} />
      </FormControl>
      </Cell>
      <Cell span={6}>
        <FormControl
          label="Price"
        >
          <Input
          endEnhancer={<FontAwesomeIcon  
            icon={faDollarSign}
          />}
            inputRef={register}
            name="price"
            type="number"
          />
        </FormControl>
      </Cell>
      </Grid>
      <Input type="submit" />
    </form>
  );
  

  const renderImageUploaders = () => {
    return (
      <Grid gridGaps={35}>
        {  images.map(({url}, index) => { 
           return (
             <Cell span={4} key ={index}>
               <ImageUploader
                    defaultSrc={url}
                    onDrop={ file => {
                      const filename = `${tentId.current}-${index}`
                      const id = tentId.current 
                      uploadImage(id, filename, file)
                      .then(({data}) => {
                        setImages(data.images)
                        console.log('here 2')
                      })
                      .catch(err => console.log("Error"))
                    }}
                    onRemove={() => {
                    // remove image from images array 
                    const newArr = removeArrayItem([...images], index)
                    setImages(newArr)
                    console.log('here 3')
                    // remove image url form document
                    updateTent(tentId.current, {newArr})
                    // TODO: remove image from server 
                    }}
                  />   
             </Cell>
           )
        })}
        
        { images.length < 9 && <Cell span={4}> <Button $style={{height: '130px', width: '100%'}} disabled={(images.length === 0 || (images.length < 9 && _.isEmpty(images[images.length-1]) === false)) === true ? false : true} onClick={() => setImages([ ...images, {} ])} > Add Image </Button></Cell> }
      </Grid>
    )
  }  
  

  return (
    <main style={{backgroundColor: "white"}}>
      <Accordion overrides={accordion}>
        <Panel title="tent details" open> 
      <Grid>
        <Cell span={6}>{renderForm}</Cell>
        <Cell span={6}>{renderImageUploaders()}</Cell>
      </Grid>
       </Panel>
      </Accordion> 
    </main>
  );
};

// custom file uploader 
// 