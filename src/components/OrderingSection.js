import { useState, useRef, useEffect } from "react";
import Map from "./Map";
import OilDetailsModal from "./OilDetailsModal";
import { useLocation } from "react-router-dom";
import Instruction from "./Instruction";
import Autocomplete from "react-google-autocomplete";
import LoadingSpin from "./LoadingSpin";
import LoadingModal from "./LoadingModal";
import axios from "axios";

import { getCurrentPosition } from "../functions/GetCurrentPosition";

const OrderingSection = (props) => {
  const location = useLocation();

  let [readyToPay, setReadyToPay] = useState(false);
  let [address, setAddress] = useState("");

  let [prevOfNameField, setPrevOfNameField] = useState(null);
  let [prevOfSurnameField, setPrevOfSurnameField] = useState(null);
  let [prevOfPhoneNumberField, setPrevOfPhoneNumberField] = useState(null);
  let [prevOfAddressField, setPrevOfAddressField] = useState(null);

  let [choosenLat, setChoosenLat] = useState(null);
  let [choosenLng, setChoosenLng] = useState(null);

  let [isModalChecked, setCheckboxValue] = useState(false);
  let [itemData, setItemData] = useState(null);

  let [autoCompletionPlace, setAutoCompletionPlace] = useState(null);
  let [isCurrentPositionCalled, setCurrentPositionCalled] = useState(false);

  let [paymentLoading, setPaymentLoading] = useState(false);

  const nameFieldRef = useRef(null);
  const surnameFieldRef = useRef(null);
  const phoneNumberFieldRef = useRef(null);
  const addressFieldRef = useRef(null);
  const mailFieldRef = useRef(null);
  const additionalCommentFieldRef = useRef(null);

  let isFromCatalogue =
    location.state && location.state.itemTitle !== undefined;

  const readyToPayHandler = (status) => {
    setReadyToPay(status);
  };

  useEffect(() => {
    if (isFromCatalogue) {
      setItemData(location.state.item);
    } else {
      setItemData(props.selectedOilEngine);
    }
  }, []);

  const onAddressSelection = (address, lat, lng) => {
    setAddress(address);
    setChoosenLat(lat);
    setChoosenLng(lng);
    addressFieldRef.current.value = address;
    inputFieldChangeHandler(
      addressFieldRef,
      prevOfAddressField,
      setPrevOfAddressField
    );
  };

  const inputFieldChangeHandler = (ref, prevState, setPrev) => {
    setPrev(ref.current.value);
    if (
      nameFieldRef.current.value &&
      surnameFieldRef.current.value &&
      phoneNumberFieldRef.current.value &&
      addressFieldRef.current.value
    ) {
      readyToPayHandler(true);
    } else {
      readyToPayHandler(false);
    }
  };

  const [isAnimated, setIsAnimated] = useState(false);

  const handleClick = () => {
    setIsAnimated(!isAnimated);
  };

  const handlePayment = async () => {
    handleClick();
    let customerName = nameFieldRef.current.value;
    let customerSurname = surnameFieldRef.current.value;
    let customerPhoneNumber = phoneNumberFieldRef.current.value;
    let customerMail = mailFieldRef.current.value;
    let additionalComment = additionalCommentFieldRef.current.value;
    let locationName = addressFieldRef.current.value;
    let oilId = itemData.id;
    let oilPrice = itemData.price;

    let order = {
      customerName,
      customerSurname,
      customerPhoneNumber,
      customerMail,
      locationName,
      oilId,
      oilPrice,
      locationLat: choosenLat,
      locationLng: choosenLng,
      additionalComment,
    };

    await postOrder(order);
  };

  const postOrder = async (order) => {
    try {
      const requestBody = order;
      setPaymentLoading(true);
      const response = await axios.post(
        "https://localhost:44393/api/orders",
        requestBody
      );

      console.log(response);
      setPaymentLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setPaymentLoading(false);
    }
  };

  const getCurrentPositionHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let currentPosition = {
          lat: lat,
          lng: lng,
        };
        console.log(currentPosition);
        setChoosenLat(lat);
        setChoosenLng(lng);
      });
    }
    setCurrentPositionCalled(true);
  };

  return (
    <div
      className={`font-mtavruli container mx-auto ${
        isFromCatalogue ? "my-8" : "my-0"
      }`}
    >
      <div className="mb-8">
        <Instruction />
      </div>
      <div className="md:grid flex md:flex-row flex-col gap-4 grid-cols-7 font-mtavruli">
        <form className="col-span-5 text-ownblack flex flex-col gap-6 justify-between">
          <ul className="flex bg-white pt-6 pb-8 px-8 rounded-lg flex-col gap-5">
            <li className="text-ownblack">
              <div className="flex items-center justify-between">
                <input
                  ref={nameFieldRef}
                  onChange={() =>
                    inputFieldChangeHandler(
                      nameFieldRef,
                      prevOfNameField,
                      setPrevOfNameField
                    )
                  }
                  className="bg-white placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                  placeholder="სახელი"
                />
                <span className="text-red-500">*</span>
              </div>
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <input
                ref={surnameFieldRef}
                onChange={() =>
                  inputFieldChangeHandler(
                    surnameFieldRef,
                    prevOfSurnameField,
                    setPrevOfSurnameField
                  )
                }
                className="bg-white placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="გვარი"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <input
                ref={phoneNumberFieldRef}
                onChange={() =>
                  inputFieldChangeHandler(
                    phoneNumberFieldRef,
                    prevOfPhoneNumberField,
                    setPrevOfPhoneNumberField
                  )
                }
                className="bg-white placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="ტელ. ნომერი (+995)"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <input
                ref={mailFieldRef}
                className="bg-white placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="მეილი"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <input
                ref={additionalCommentFieldRef}
                className="bg-white placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="დამატებითი კომენტარი"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
          </ul>
          <ul className="flex bg-white py-6 px-8 rounded-lg flex-col gap-5">
            <li>
              <div className="flex flex-items-center justify-between">
                <Autocomplete
                  className="bg-white placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                  apiKey={"AIzaSyDxQtc2nUDT6g4tg3y0TcP3pJU7mA0VbeQ"}
                  onPlaceSelected={(place) => {
                    setAutoCompletionPlace(place);
                  }}
                  options={{
                    componentRestrictions: { country: "ge" },
                    fields: ["address_components", "geometry", "icon", "name"],
                    types: [ [ "address" ],  ["establishment" ],  ["point_of_interest" ], ["transit_station"] ]
                  }}
                  value={
                    addressFieldRef.current
                      ? addressFieldRef.current?.value
                      : "p"
                  }
                  ref={addressFieldRef}
                  onChange={() =>
                    inputFieldChangeHandler(
                      addressFieldRef,
                      prevOfAddressField,
                      setPrevOfAddressField
                    )
                  }
                />
                <div
                  className="w-4 h-4 bg-primary"
                  onClick={getCurrentPositionHandler}
                ></div>
              </div>
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <div className="flex justify-end rounded-lg md:static right-0">
            <Map
                onAddressChange={onAddressSelection}
                autoCompletionPlace={autoCompletionPlace}
                choosenLat={choosenLat}
                choosenLng={choosenLng}
                isCurrentPositionCalled={isCurrentPositionCalled}
                setCurrentPositionCalled={setCurrentPositionCalled}
              />
            </div>
          </ul>
        </form>
        <div className="col-span-2 h-fit py-6 px-8 rounded bg-white hidden md:block">
          <div className="flex flex-col gap-4">
            <div
              className="h-48 flex flex-col overflow-hidden justify-end bg-contain bg-no-repeat bg-center bg-white"
              style={{
                backgroundImage: `url(${itemData && itemData.imageUrl})`,
              }}
            ></div>
            <div className="flex flex-col text-ownblack text-left">
              <p className="">დასახელება:</p>
              <p>{itemData && itemData.name}</p>
            </div>
            <div className="flex flex-col text-ownblack text-left gap-4">
              <div className="flex justify-between text-ownblack">
                <p className="text-gray-400">ზეთის ღირებულება:</p>
                <p>+{itemData && itemData.price}₾</p>
              </div>
              <div className="flex justify-between text-ownblack">
                <p className="text-gray-400">სერვისის ღირებულება:</p>
                <p>+{itemData && itemData.price}₾</p>
              </div>
            </div>
            <button
              id="paymentBtn"
              className={`rounded active:bg-primary button-click w-full py-4 text-white flex items-center justify-center ${
                readyToPay ? "bg-green-500" : "bg-gray-300"
              } transition h-full`}
              disabled={!readyToPay}
              onClick={handlePayment}
            >
              <p>გადახდა {itemData && itemData.price}₾</p>
            </button>
          </div>
        </div>
      </div>
      <OilDetailsModal
        item={itemData}
        isModalChecked={isModalChecked}
        modalCheckSetter={setCheckboxValue}
      />
      {paymentLoading && <LoadingModal />}
    </div>
  );
};

export default OrderingSection;
