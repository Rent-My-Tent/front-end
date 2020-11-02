import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Input from "../components/Input";
import ProgressSteps, { Step } from "../components/ProgressSteps";
import Button, { SIZE } from "../components/Button";
import { FileUploader } from "baseui/file-uploader";
import { H1, H2, H3, H4, H5, H6 } from "baseui/typography";
import Countdown from "react-countdown";
import { createTent, uploadImage, updateTent, authUser } from "../utils";

export default () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [tentName, setTentName] = useState("");
  const [isUploading, setIsUploading] = useState(null);
  const [resend, setResend] = useState(false);
  const [showCountDown, setShowCountDown] = useState(true);
  const tentId = useRef(null);

  const renderCountdown = ({ minutes, seconds, completed }) => {
    if (completed) {
      setResend(true);
      return <span>__:__</span>;
    } else {
      return (
        <span className="countdown">
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const cancelHandler = () => setIsUploading(false);

  const startProgress = () => setIsUploading(true);

  const emailSubmitHandler = async () => {
    setCurrentStep(1);
    authUser(email, () => {
      setCurrentStep(2)
    })
  };

  // give your tent a name
  const tentNameClickHandler = async () => {
    tentId.current = await createTent(email);
    updateTent(tentId.current, { name: tentName });
    setCurrentStep(3);
  };
  const uploadFileHandler = (acceptedFile, rejectedFile) => {
    const filename = `${tentId.current}-1`;
    const id = tentId.current;
    const file = acceptedFile[0];
    uploadImage(id, filename, file)
      .then(({ data }) => {
        router.push("/new-tent");
        setIsUploading(false);
      })
      .catch((err) => () => console.log(err));
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
              <br/>
              <br/>
              <br/>
              <br/>
              <Input
                backgroundColor={"#DB8971"}
                placeholder="Enter Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                endEnhancer={
                  <Button size={SIZE.large} onClick={emailSubmitHandler}>
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
              <Button disabled={!resend} onClick={emailSubmitHandler}>
                Resend
              </Button>
            </div>
          </Step>
          <Step>
            <div className="full-with-column">
              <H5>it's time to give your tent a name</H5>
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
              onCancel={cancelHandler}
              name="tentimage"
              onDrop={uploadFileHandler}
              progressMessage={isUploading ? "Uploading... hang tight" : ""}
            />
          </Step>
        </ProgressSteps>
      </div>
    </>
  );
};
