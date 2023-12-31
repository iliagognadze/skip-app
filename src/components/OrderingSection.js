import { useState, useRef, useEffect } from "react";
import Map from "./Map";
import OilDetailsModal from "./OilDetailsModal";
import { useLocation } from "react-router-dom";
import Instruction from "./Instruction";
import Autocomplete from "react-google-autocomplete";
import LoadingSpin from "./LoadingSpin";
import LoadingModal from "./LoadingModal";
import axios from "axios";
import 'es6-promise/auto';

import { getCurrentPosition } from "../functions/GetCurrentPosition";
import OrderedSuccessfullyModal from "./OrderedSuccessfullyModal";
import AutoComplete from "./AutoComplete";

const OrderingSection = (props) => {
  const apiBaseUrl = 'https://skipserviceapi.azurewebsites.net/api';

  const location = useLocation();

  let [readyToPay, setReadyToPay] = useState(false);
  let [address, setAddress] = useState("");

  let [prevOfNameField, setPrevOfNameField] = useState(null);
  let [prevOfSurnameField, setPrevOfSurnameField] = useState(null);
  let [prevOfPhoneNumberField, setPrevOfPhoneNumberField] = useState(null);
  let [prevOfAddressField, setPrevOfAddressField] = useState(null);
  let [prevOfCarNumberField, setPrevOfCarNumberField] = useState(null);

  let [choosenLat, setChoosenLat] = useState(null);
  let [choosenLng, setChoosenLng] = useState(null);

  let [isModalChecked, setCheckboxValue] = useState(false);
  let [itemData, setItemData] = useState(null);

  let [autoCompletionPlace, setAutoCompletionPlace] = useState(null);
  let [isCurrentPositionCalled, setCurrentPositionCalled] = useState(false);

  let [paymentLoading, setPaymentLoading] = useState(false);
  let [orderedSuccessfully, setOrderedSuccessfully] = useState(false);

  const nameFieldRef = useRef(null);
  const surnameFieldRef = useRef(null);
  const phoneNumberFieldRef = useRef(null);
  const addressFieldRef = useRef(null);
  const mailFieldRef = useRef(null);
  const additionalCommentFieldRef = useRef(null);
  const carNumberFieldRef = useRef(null);

  const [mapMarkerCenterOffset, setMapMarkerCenterOffset] = useState(0);

  const autocompleteRef = useRef(null);

  const isValidPhoneNumber = (number) => {
    var pattern = /^5\d{8}$/;
    return pattern.test(number);
  };

  const isCarNumberValid = (number) => {
    number = number.toUpperCase();
    var patternVersion1 = /^([A-Z]{2}-?\d{3}-?[A-Z]{2}|[A-Z]{3}-?\d{3})$/;
    var patternVersion2 = /^([A-Z]{2,3}-?\d{3}-?[A-Z]{2}|[A-Z]{3}-?\d{3})$/;

    return patternVersion1.test(number) || patternVersion2.test(number);
  };

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
      isValidPhoneNumber(phoneNumberFieldRef.current.value) &&
      addressFieldRef.current.value &&
      isCarNumberValid(carNumberFieldRef.current.value)
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
    let carNumber = carNumberFieldRef.current.value.toUpperCase();
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
      carNumber,
    };

    await postOrder(order);
  };

  const postOrder = async (order) => {
    try {
      const requestBody = order;
      setPaymentLoading(true);
      const response = await axios.post(
        `${apiBaseUrl}/orders`,
        requestBody
      );

      console.log(response);
      setPaymentLoading(false);
      setOrderedSuccessfully(true);
    } catch (error) {
      console.log(error.response.data.message);
      setPaymentLoading(false);
    }
  };

  const closeOrderedSuccessfullyModal = () => setOrderedSuccessfully(false);

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
      className={`font-mtavruli container mx-auto ${isFromCatalogue ? "my-8" : "my-0"
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
                  className="bg-white outline-none border-0 placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                  placeholder="სახელი"
                />
                <span className="text-red-500">*</span>
              </div>
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <div className="flex items-center justify-between">
                <input
                  ref={surnameFieldRef}
                  onChange={() =>
                    inputFieldChangeHandler(
                      surnameFieldRef,
                      prevOfSurnameField,
                      setPrevOfSurnameField
                    )
                  }
                  className="bg-white outline-none border-0 placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                  placeholder="გვარი"
                />
                <span className="text-red-500">*</span>
              </div>
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <div className="flex justify-between items-center">
                <div className="flex items-center w-full gap-2">
                  <span>+995</span>
                  <input
                    ref={phoneNumberFieldRef}
                    onChange={() =>
                      inputFieldChangeHandler(
                        phoneNumberFieldRef,
                        prevOfPhoneNumberField,
                        setPrevOfPhoneNumberField
                      )
                    }
                    type="tel"
                    inputMode="numeric"
                    onKeyDown={(event) => { if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') { event.preventDefault(); } }}
                    className="bg-white outline-none border-0 placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                    placeholder="ტელ. ნომერი"
                  />
                </div>
                <div className="flex items-center gap-2 py-1 justify-between">
                  {phoneNumberFieldRef.current &&
                    phoneNumberFieldRef.current.value &&
                    !isValidPhoneNumber(phoneNumberFieldRef.current.value) && (
                      <p className="bg-red-400 text-white pt-1 px-2 text-sm rounded-lg">
                        INVALID
                      </p>
                    )}
                  <span className="text-red-500 ">*</span>
                </div>
              </div>
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <div className="flex items-center justify-between">
                <input
                  ref={carNumberFieldRef}
                  onChange={() =>
                    inputFieldChangeHandler(
                      carNumberFieldRef,
                      prevOfCarNumberField,
                      setPrevOfCarNumberField
                    )
                  }
                  className="bg-white outline-none uppercase placeholder-gray-400 p-2 md:p-0 outline-0 w-full border-0 md:border-0 md:border-bottom-2 md:border-ownblack"
                  placeholder="მანქანის ნომერი (მაგ. AA-123-AA ან AAA-123)"
                />
                <div className="flex items-center gap-2 py-1 justify-between">
                  {carNumberFieldRef.current &&
                    carNumberFieldRef.current.value &&
                    !isCarNumberValid(carNumberFieldRef.current.value) && (
                      <p className="bg-red-400 text-white pt-1 px-2 text-sm rounded-lg">
                        INVALID
                      </p>
                    )}
                  <span className="text-red-500 ">*</span>
                </div>
              </div>
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <input
                ref={mailFieldRef}
                className="bg-white outline-none border-0 placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="მეილი"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <input
                ref={additionalCommentFieldRef}
                className="bg-white outline-none border-0 placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="დამატებითი კომენტარი"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
          </ul>
          <ul className="flex bg-white py-6 px-8 rounded-lg flex-col gap-5">
            <li>
              <div className="flex flex-items-center justify-between">
                <AutoComplete 
                  addressFieldRef={addressFieldRef}
                  prevOfAddressField={prevOfAddressField}
                  setPrevOfAddressField={setPrevOfAddressField}
                  onChange={inputFieldChangeHandler}
                  value={
                    addressFieldRef.current
                      ? addressFieldRef.current?.value
                      : "მიუთითე ლოკაცია"
                  }
                  onPlaceSelected={setAutoCompletionPlace}
                />
                {/* <Autocomplete
                  currentLocation={true}
                  className="bg-white placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                  apiKey={"AIzaSyDxQtc2nUDT6g4tg3y0TcP3pJU7mA0VbeQ"}
                  onPlaceSelected={(place) => {
                    console.log(place);
                    setAutoCompletionPlace(place);
                  }}
                  options={{
                    componentRestrictions: { country: "ge" },
                    fields: ["address_components", "geometry", "icon", "name"],
                    types: ["establishment"]
                  }}
                  value={
                    addressFieldRef.current
                      ? addressFieldRef.current?.value
                      : "მიუთითე ლოკაცია"
                  }
                  ref={addressFieldRef}
                  onChange={() => {
                    inputFieldChangeHandler(
                      addressFieldRef,
                      prevOfAddressField,
                      setPrevOfAddressField
                    );
                    console.log(addressFieldRef);
                  }}
                /> */}
                <div
                  className="w-8 outline-none border-0 h-7 mb-1 flex justify-center items-center rounded cursor-pointer h-100 bg-primary"
                  onClick={getCurrentPositionHandler}
                >
                  <img className="w-5" src="/myLocation.svg" alt="location" />
                </div>
              </div>
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <div className="justify-end rounded-lg md:static right-0">
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
        <div className="col-span-2 h-fit py-6 px-8 rounded bg-white md:block">
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
                <p>{itemData && itemData.price}₾</p>
              </div>
              <div className="flex justify-between text-ownblack">
                <p className="text-gray-400">სერვისის ღირებულება:</p>
                <p>{itemData && itemData.price}₾</p>
              </div>
            </div>
            <button
              id="paymentBtn"
              className={`rounded active:bg-primary button-click w-full py-4 text-white flex items-center justify-center ${readyToPay ? "bg-green-500" : "bg-gray-300"
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
      {orderedSuccessfully && (
        <OrderedSuccessfullyModal
          isOpen={true}
          onClose={closeOrderedSuccessfullyModal}
        />
      )}
    </div>
  );
};

export default OrderingSection;
