import { useState, useEffect, useRef } from "react";
import Instruction from "./Instruction";
import InputDropdown from "./InputDropdown.js";
import OilItem from "./OilItem";
import OilDetailsModal from "./OilDetailsModal";
import LoadingSpin from "./LoadingSpin";
import { Link } from "react-router-dom";

const Catalog = () => {
  let [searchterm, setSearchterm] = useState("");
  let [brands, setBrands] = useState([]);
  let [viscosity, setViscosity] = useState([]);
  let [litersFrom, setLitersFrom] = useState("");
  let [litersTo, setLitersTo] = useState("");
  let [composition, setComposition] = useState([]);
  let [priceFrom, setPriceFrom] = useState("");
  let [priceTo, setPriceTo] = useState("");
  let [isModalChecked, setCheckboxValue] = useState(false);
  let [itemDetailsData, setItemDetailsData] = useState(null);

  let searchtermRef = useRef(null);
  let litersFromRef = useRef(null);
  let litersToRef = useRef(null);
  let priceFromRef = useRef(null);
  let priceToRef = useRef(null);

  let choosenInformation = {
    searchterm: searchterm,
    oilBrandIds: brands,
    litersFrom: litersFrom,
    litersTo: litersTo,
    viscosityIds: viscosity,
    composition: composition,
    priceFrom: priceFrom,
    priceTo: priceTo,
  };

  const [oilsData, setOilsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("https://localhost:44393/api/engine-oils");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setOilsData(json, setIsLoading(false));
        console.log(json);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    fetchData();
  }, [url]);

  const clearHandler = () => {
    clearCheckboxes();
    setSearchterm("");
    setBrands([]);
    setLitersFrom("");
    setLitersTo("");
    setViscosity([]);
    setComposition([]);
    setPriceFrom("");
    setPriceTo("");
  };

  const searchtermChangeHandler = () => {
    setSearchterm(searchtermRef.current.value);
  };

  const litersFromChangeHandler = () => {
    setLitersFrom(litersFromRef.current.value);
  };

  const litersToChangeHandler = () => {
    setLitersTo(litersToRef.current.value);
  };

  const priceFromChangeHandler = () => {
    setPriceFrom(priceFromRef.current.value);
  };

  const priceToChangeHandler = () => {
    setPriceTo(priceToRef.current.value);
  };

  const detailsOpenHandler = (e, itemData) => {
    e.stopPropagation();
    e.preventDefault();
    setItemDetailsData(itemData);
    console.log(itemData);
    setCheckboxValue(!isModalChecked);
  };

  const searchClickHandler = async () => {
    const queryParams = new URLSearchParams();

    for (const key in choosenInformation) {
      if (choosenInformation.hasOwnProperty(key)) {
        const value = choosenInformation[key];
        if (Array.isArray(value) && value.length > 0) {
          //let commaSeparatedValues = value.map((value) => value.id).join(",");
          value.forEach((element) => {
            queryParams.append(key, element.id);
          });
        } else {
          if (value != null && value != "") {
            queryParams.append(key, value);
          }
        }
      }
    }

    const queryStringGPT = queryParams.toString();
    console.log(queryStringGPT);
    setUrl(`https://localhost:44393/api/engine-oils?${queryParams}`);
  };

  function clearCheckboxes() {
    const checkboxDiv = document.getElementById("checkboxDiv");

    const checkboxes = checkboxDiv.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  return (
    <div className="bg-primary">
      <div className="container py-10">
        <Instruction />
        <div className="md:flex-row flex flex-col md:grid grid-cols-12 gap-6 md:gap-3 text-left">
          <div
            id="checkboxDiv"
            className="col-span-3 h-fit px-3 py-4 bg-white rounded"
          >
            <form className="text-ownbrown flex flex-col gap-3">
              <input
                ref={searchtermRef}
                className="outline-0 border-2 border-ownbrown w-full rounded px-2 py-1 placeholder-ownbrown"
                placeholder="საძიებო სიტყვა"
                value={searchterm}
                onChange={searchtermChangeHandler}
              ></input>
              <InputDropdown
                apiUrl={"https://localhost:44393/api/oil-brands"}
                label="ბრენდი"
                inputDropdownId={"brand"}
                choosenData={brands}
                onChooseData={setBrands}
              />
              <InputDropdown
                apiUrl={"https://localhost:44393/api/viscosity-ratings"}
                label="სიბლანტე"
                inputDropdownId={"siblante"}
                choosenData={viscosity}
                onChooseData={setViscosity}
              />
              <div className="flex flex-col">
                <input
                  ref={litersFromRef}
                  value={litersFrom}
                  onChange={litersFromChangeHandler}
                  type="number"
                  className="outline-0 placeholder-ownbrown border-2 border-ownbrown w-full rounded-t px-2 py-1"
                  placeholder="ლიტრაჟი-დან"
                />
                <input
                  ref={litersToRef}
                  value={litersTo}
                  onChange={litersToChangeHandler}
                  type="number"
                  className="outline-0 placeholder-ownbrown border-2 border-t-0 border-ownbrown w-full rounded-b px-2 py-1"
                  placeholder="ლიტრაჟი-მდე"
                />
              </div>
              <InputDropdown
                label="კომპოზიცია"
                inputDropdownId={"composition"}
                choosenData={composition}
                onChooseData={setComposition}
              />
              <div className="flex items-center grid grid-cols-2 gap-3 justify-between">
                <input
                  ref={priceFromRef}
                  value={priceFrom}
                  onChange={priceFromChangeHandler}
                  type="number"
                  placeholder="ფასი-დან"
                  tpye="number"
                  className="border-2 placeholder-ownbrown border-ownbrown rounded py-1 px-2"
                />
                <input
                  ref={priceToRef}
                  value={priceTo}
                  onChange={priceToChangeHandler}
                  type="number"
                  placeholder="ფასი-დან"
                  tpye="number"
                  className="border-2 placeholder-ownbrown border-ownbrown rounded py-1 px-2"
                />
              </div>
              <div className="flex items-center gap-3 justify-between">
                <div
                  onClick={searchClickHandler}
                  className="bg-primary w-full text-center cursor-pointer text-white rounded py-1 px-2"
                >
                  მოძებნა
                </div>
                <div
                  onClick={clearHandler}
                  className="border-2 cursor-pointer border-ownbrown h-full rounded py-1 px-2"
                >
                  <img src="heroicons-outline_trash.svg" />
                </div>
              </div>
            </form>
          </div>
          <div
            className={`col-span-9 flex md:flex-row flex-col md:grid ${
              !isLoading && "grid-cols-4"
            } gap-4`}
          >
            {isLoading && <LoadingSpin />}
            {!isLoading &&
              oilsData.map((item, i) => (
                <Link
                  className="h-fit"
                  key={item.id}
                  to="/ordering"
                  state={{ item: item, itemTitle: "rasaidi" }}
                >
                  <OilItem
                    itemData={item}
                    onDetails={detailsOpenHandler}
                    isFromCatalog={true}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;