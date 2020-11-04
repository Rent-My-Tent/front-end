import { useState, useEffect, useRef } from "react";
import { Grid, Cell } from "baseui/layout-grid";
import sanityClient from "../../sanityClient";
import Carousel from "nuka-carousel";
import { Button } from "baseui/button";
import { useUser } from "../utils/hooks";
import Router from "next/router";
import { newReservation } from "../utils";
import Modal from "react-modal";
import LoginForm from "../components/login-form";
import DatePicker from "react-datepicker";
import { addDays, isWithinInterval } from "date-fns";

Modal.setAppElement("#__next");
// Modal styles
const customStyles = {
  content: {
    width: "300px",
    height: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Carousel setting
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

async function fetchTentData(name, callback) {
  const query = `*[ _type == 'tent' && published == true && name == '${name}']`;
  const result = await sanityClient.fetch(query);
  callback(result[0]);
}

async function fetchReservationsData(id, callback) {
  const query = `*[ _type == 'reservation' && tentId == '${id}']`;
  const result = await sanityClient.fetch(query);
  callback(result);
}

export default ({ name, showAsModal }) => {
  const user = useUser();
  const [state, setState] = useState(null);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setDatePicker] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchTentData(name, (data) => setState(data));
  }, []);

  useEffect(() => {
    if (state) {
      fetchReservationsData(state._id, (data) => setReservations(data));
    }
  }, [state]);

  const onDatePickerChangeHandler = (date) => {
    setStartDate(date)
    newReservation(
      state._id,
      user.email,
      date.toDateString(),
      addDays(date, 14).toDateString()
    )
      .then((result) => console.log("reservation was succesfull"))
      .catch((error) => "reservation failed")
      .finally(() => {
        toggleDatePicker();
      });
  };

  const toggleDatePicker = () => {
    setDatePicker(!showDatePicker);
  };

  const onReservClickHandler = () => {
    if (!user) setModal(true);
    else {
      toggleDatePicker();
    }
  };

  const filterDate = (date) => {
    let bool = true;

    reservations.map((item) => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);

      const value = isWithinInterval(date, { start: startDate, end: endDate });
      if (value) {
        bool = false;
      }
    });
		
    return bool;
  };

  return (
    <div>
      {!showAsModal && <pre>{JSON.stringify(state, null, 2)}</pre>}
      {state && showAsModal && (
        <Grid>
          <Cell span={6}>
            <Carousel>
              {state.images.map((item) => {
                return <img key={item.url} src={item.url} />;
              })}
            </Carousel>
          </Cell>
          <Cell span={6}>
            <h1>Name: {state.name}</h1>
            <h2>Identifier: {state.identifire}</h2>
            <p>Description:{state.description}</p>
            <span>Rate: 4/5</span>
            <br />
            <br />
            <Button onClick={onReservClickHandler}>Reserve it right now</Button>
            <br />
            {showDatePicker && (
              <DatePicker
                selected={startDate}
                onChange={onDatePickerChangeHandler}
                monthsShown={2}
                filterDate={filterDate}
                minDate={new Date()}
                maxDate={addDays(new Date(), 70)}
                open
              />
            )}
          </Cell>
          <Modal isOpen={modal} style={customStyles}>
            <LoginForm
              onLoginSucess={() => {
                setModal(false);
              }}
            />
          </Modal>
        </Grid>
      )}
    </div>
  );
};
