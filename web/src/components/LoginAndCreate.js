import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import sanityClient from "../../sanityClient";
import { Store } from "../context";
import Input from "../components/Input";
import ProgressSteps, { Step } from "../components/ProgressSteps";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import Button, { SIZE } from "../components/Button";
import { FileUploader } from "baseui/file-uploader";
import Label from "../components/Label";
import Modal from "react-modal";
import { Block } from "baseui/block";
import RenderTentsList from "../components/RenderTentsList";
import { H1, H2, H3, H4, H5, H6 } from "baseui/typography";
import { ALIGN } from "baseui/header-navigation";
import SearchField from "../components/SearchField";
import Countdown from "react-countdown";
import { createTent, uploadImage, updateTent } from "../utils";
export default () => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [tentName, setTentName] = useState("");
  const [isUploading, setIsUploading] = useState(null);
  const [imageSrc, setImageSrc] = useState();
  const [resend, setReSend] = useState(false);
  const [showCountDown, setShowCountDown] = useState(true);
  const timeoutId = useRef(null);
  const tentId = useRef(null);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setReSend(true);
      return <span>__:__</span>;
    } else {
      // Render a countdown
      return (
        <span className="counter">
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const reset = () => {
    setIsUploading(false);
  };


  const startProgress = () => {
    setIsUploading(true);
  };

  const emailAddressClickHandler = async () => {
    setCurrentStep(1);
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      const didToken = await magic.auth.loginWithMagicLink({
        email,
        showUI: false,
      });
      setCurrentStep(2);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
        body: JSON.stringify(email),
      });
      console.log("Step 3");
      if (res.status === 200) {
        // Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const tentNameClickHandler = async () => {
    console.log(email);
    const id = await createTent(email);
    tentId.current = id;
    updateTent(tentId.current, { name: tentName })
    console.log(tentId.current)
    setCurrentStep(3)
  };

  const uploadFileHandler = (acceptedFile, rejectedFile) => {
    const filename = `${tentId.current}-1`;
    const id = tentId.current;
    console.log(id)
    const file = acceptedFile[0]
    uploadImage(id, filename, file)
      .then(({ data }) => {
        console.log(data.images)
               router.push('/new-tent')
       setIsUploading(false)      
      })
      .catch((err) => console.log("uploading fila"));

    startProgress();
  };

  return (
    <>
      <div className="box_index light-red">
        <ProgressSteps current={currentStep}>
          <Step>
            <div className="full-with-column">
              <H5>
                <b>Sell your tent</b> and then feel good about it joining a
                circular economy
              </H5>
              <br />
              <br />
              <br />
              <br />
              <Input
                backgroundColor={"#DB8971"}
                placeholder="Enter Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                endEnhancer={
                  <Button size={SIZE.large} onClick={emailAddressClickHandler}>
                    Click
                  </Button>
                }
              />
            </div>
          </Step>
          <Step>
            <div className="full-with-column">
              <H5>
                Please confirm your email address and come back to this page
              </H5>
              <br />
              <br />
              {showCountDown ? (
                <Countdown
                  date={Date.now() + 60000}
                  renderer={renderer}
                  onComplete={() => setShowCountDown(false)}
                />
              ) : (
                <span className="counter">__:__</span>
              )}
              <br />
              <Button disabled={!resend} onClick={emailAddressClickHandler}>
                Resend
              </Button>
            </div>
          </Step>
          <Step>
            <div className="full-with-column">
              <H5>it's time to give your tent a name</H5>
              <br />
              <br />
              <br />
              <Input
                backgroundColor={"#DB8971"}
                placeholder="Give your tent a name"
                value={tentName}
                onChange={(e) => setTentName(e.target.value)}
                endEnhancer={
                  <Button onClick={tentNameClickHandler}>Next!</Button>
                }
              />
              <div className="full-with rtl px-1">
                <Button
                  onClick={() => router.push("/new-tent")}
                  backgroundColor="#DD7052"
                  backgroundColorOnHover="#DB8971"
                >
                  Skip
                </Button>
              </div>
            </div>
          </Step>
          <Step>
            <FileUploader
              onCancel={reset}
              name="tentimage"
              onDrop={uploadFileHandler}
              progressMessage={isUploading ? "Uploading... hang tight" : ""}
            />
          </Step>
        </ProgressSteps>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};
