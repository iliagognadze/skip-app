import { useState, useRef, useEffect } from "react";
import MapModal from "./MapModal";
import Map from "./Map";
import OilDetailsModal from "./OilDetailsModal";
import { useLocation } from "react-router-dom";
import Instruction from "./Instruction";

const OrderingSection = (props) => {
  const location = useLocation();

  let [readyToPay, setReadyToPay] = useState(false);
  let [address, setAddress] = useState("");

  let [prevOfNameField, setPrevOfNameField] = useState(null);
  let [prevOfSurnameField, setPrevOfSurnameField] = useState(null);
  let [prevOfPhoneNumberField, setPrevOfPhoneNumberField] = useState(null);
  let [prevOfAddressField, setPrevOfAddressField] = useState(null);

  let [isModalChecked, setCheckboxValue] = useState(false);
  let [itemData, setItemData] = useState(null);

  let carModelString =
    props.inputData &&
    Object.entries(props.inputData).reduce((acc, [key, value], index) => {
      return acc + `${index > 2 ? ", " : " "}${value}`;
    }, "");

  const nameFieldRef = useRef(null);
  const surnameFieldRef = useRef(null);
  const phoneNumberFieldRef = useRef(null);
  const addressFieldRef = useRef(null);

  let isFromCatalogue =
    location.state && location.state.itemTitle !== undefined;

  const readyToPayHandler = (status) => {
    setReadyToPay(status);
  };

  useEffect(() => {
    console.log(location.state, "zdzd");
    if (isFromCatalogue) {
      setItemData(location.state.item);
    } else {
      setItemData(props.selectedOilEngine);
    }

    console.log(isFromCatalogue);
  }, []);

  const onAddressSelection = (address) => {
    console.log("address selected from map");
    setAddress(address);
    addressFieldRef.current.value = address;
    inputFieldChangeHandler(
      addressFieldRef,
      prevOfAddressField,
      setPrevOfAddressField
    );
  };

  const phoneValidator = () => {
    return phoneNumberFieldRef.current.value.length === 9;
  };

  const inputFieldChangeHandler = (ref, prevState, setPrev) => {
    let value = ref.current.value;
    console.log(`current value: ${value}, prev value: ${prevState}`);
    if (value && !prevState) {
      //props.onPercentChange(6.25, "+");
    }
    if (!value && prevState) {
      //props.onPercentChange(6.25, "-");
    }
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

  let data = props.inputData;

  let keysToWord = {
    manufacturer: "მწარმოებელი",
    model: "მოდელი",
    year: "წელი",
    engineType: "ძრავის ტიპი",
    fuelType: "საწვავის ტიპი",
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
              <input
                ref={nameFieldRef}
                onChange={() =>
                  inputFieldChangeHandler(
                    nameFieldRef,
                    prevOfNameField,
                    setPrevOfNameField
                  )
                }
                className="bg-white placeholder-gray-400 p-2 md:p-0 rounded-lg outline-0 w-full placeholder-ownblack border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="სახელი"
              />
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
                className="bg-white placeholder-gray-400 p-2 md:p-0 rounded-lg outline-0 w-full placeholder-ownblack border md:border-0 md:border-bottom-2 md:border-ownblack"
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
                className="bg-white placeholder-gray-400 p-2 md:p-0 rounded-lg outline-0 w-full placeholder-ownblack border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="ტელ. ნომერი (+995)"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <input
                className="bg-white placeholder-gray-400 p-2 md:p-0 rounded-lg outline-0 w-full placeholder-ownblack border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="მეილი"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <li>
              <input
                className="bg-white placeholder-gray-400 p-2 md:p-0 rounded-lg outline-0 w-full placeholder-ownblack border md:border-0 md:border-bottom-2 md:border-ownblack"
                placeholder="დამატებითი კომენტარი"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
          </ul>
          <ul className="flex bg-white py-6 px-8 rounded-lg flex-col gap-5">
            <li>
              <input
                ref={addressFieldRef}
                onChange={() =>
                  inputFieldChangeHandler(
                    addressFieldRef,
                    prevOfAddressField,
                    setPrevOfAddressField
                  )
                }
                className="bg-white placeholder-gray-400 p-2 md:p-0 rounded-lg outline-0 w-full placeholder-ownblack border md:border-0 md:border-bottom-2 md:border-ownblack"
                value={addressFieldRef.current?.value}
                placeholder="მისამართი"
              />
              <hr className="w-full border-1 border-ownblack" />
            </li>
            <div className="flex justify-end rounded-lg md:static right-0">
                <Map onAddressChange={onAddressSelection}/>
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
              className={`rounded w-full py-4 text-white flex justify-center ${
                readyToPay ? "bg-primary" : "bg-blue-300"
              } transition flextransition-width h-full`}
              disabled={!readyToPay}
            >გადახდა {itemData && itemData.price}₾</button>
          </div>
        </div>

        <div className="flex w-full md:hidden">
          <button
            className={`rounded w-full flex justify-center ${
              readyToPay ? "bg-primary" : "bg-gray-400"
            } transition flextransition-width h-full`}
            disabled={readyToPay}
          >
            <div className="flex items-center mr-3">
              <p className="text-white">გადახდა</p>
              <img className="ml-2 mb-1" src="./mdi_cash-fast.svg" />
            </div>
          </button>
        </div>
      </div>
      <OilDetailsModal
        item={itemData}
        isModalChecked={isModalChecked}
        modalCheckSetter={setCheckboxValue}
      />
    </div>
  );
};

export default OrderingSection;
