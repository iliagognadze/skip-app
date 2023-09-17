import { useState, useEffect, useRef } from "react";
import Instruction from "./Instruction";
import InputDropdown from "./InputDropdown.js";
import OilItem from "./OilItem";
import OilDetailsModal from "./OilDetailsModal.js";
import LoadingSpin from "./LoadingSpin";
import { Link } from "react-router-dom";

const Catalog = () => {
  const baseUrl = 'https://skipserviceapi.azurewebsites.net/api';

  let [searchterm, setSearchterm] = useState("");
  let [brands, setBrands] = useState([]);
  let [apiCategories, setApiCategories] = useState([]);
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
    oilBrandIds: brands.length > 0 ? brands : null,
    litersFrom: litersFrom,
    litersTo: litersTo,
    apiCategoryIds: apiCategories.length > 0 ? apiCategories : null,
    composition: composition,
    priceFrom: priceFrom,
    priceTo: priceTo,
  };

  const [oilsData, setOilsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(`${baseUrl}/engine-oils`);

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
    setApiCategories([]);
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
    setUrl(`${baseUrl}/engine-oils?${queryParams}`);
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
        <div className="text-left font-mtavruli text-white my-4">
          <p>კატალოგი</p>
          <p className="text-xs">აღმოაჩინე ძრავის ზეთები ჩვენთან ერთად</p>
        </div>
        <div className="md:flex-row flex flex-col md:grid grid-cols-12 gap-6 md:gap-3 text-left">
          <div
            id="checkboxDiv"
            className="col-span-3 h-fit px-5 py-6 bg-white rounded-lg"
          >
            <form className="text-ownblack bg-white rounded-lg font-mtavruli flex flex-col gap-3">
              <input
                ref={searchtermRef}
                className="outline-0 border-2 border-ownblack w-full rounded-lg px-2 py-1 placeholder-ownblack"
                placeholder="საძიებო სიტყვა"
                value={searchterm}
                onChange={searchtermChangeHandler}
              ></input>
              <InputDropdown
                apiUrl={`${baseUrl}/oil-brands`}
                label="ბრენდი"
                inputDropdownId={"brand"}
                choosenData={brands}
                onChooseData={setBrands}
              />
              <InputDropdown
                apiUrl={`${baseUrl}/api-categories`}
                label="სტანდარტი"
                inputDropdownId={"api-standard"}
                choosenData={apiCategories}
                onChooseData={setApiCategories}
              />
              <div className="flex flex-col">
                <input
                  ref={litersFromRef}
                  value={litersFrom}
                  onChange={litersFromChangeHandler}
                  onKeyDown={(event) => { if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') { event.preventDefault(); }}}
                  className="outline-0 placeholder-ownblack border-2 border-ownblack w-full rounded-t-lg px-2 py-1"
                  placeholder="ლიტრაჟი-დან"
                />
                <input
                  ref={litersToRef}
                  value={litersTo}
                  onChange={litersToChangeHandler}
                  onKeyDown={(event) => { if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') { event.preventDefault(); }}}
                  className="outline-0 placeholder-ownblack border-2 border-t-0 border-ownblack w-full rounded-b-lg px-2 py-1"
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
                  placeholder="ფასი-დან"
                  onKeyDown={(event) => { if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') { event.preventDefault(); }}}
                  className="border-2 placeholder-ownblack border-ownblack rounded-lg py-1 px-2"
                />
                <input
                  ref={priceToRef}
                  value={priceTo}
                  onChange={priceToChangeHandler}
                  placeholder="ფასი-მდე"
                  onKeyDown={(event) => { if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') { event.preventDefault(); }}}
                  className="border-2 placeholder-ownblack border-ownblack rounded-lg py-1 px-2"
                />
              </div>
              <div className="flex items-center gap-3 justify-between">
                <div
                  onClick={searchClickHandler}
                  className="bg-secondary w-full text-center cursor-pointer text-white rounded-lg py-1 px-2"
                >
                  მოძებნა
                </div>
                <div
                  onClick={clearHandler}
                  className="cursor-pointer border-red-500 bg-red-500 border-2 border-2 h-full rounded-lg py-1 px-2"
                >
                  <img src="heroicons-outline_trash_vector.svg" />
                </div>
              </div>
            </form>
          </div>
          <div
            className={`col-span-9 h-fit flex md:flex-row flex-col md:grid ${
              !isLoading && "grid-cols-4"
            } gap-4`}
          >
            {isLoading && <LoadingSpin />}
            {!isLoading &&
              (oilsData.length > 0 ? (
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
                ))
              ) : (
                <div className="w-100 col-span-9 flex flex-col mx-auto items-center justify-center text-white font-mtavruli text-center">
                  <p>არაფერი მოიძებნა</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <OilDetailsModal
        item={itemDetailsData}
        isModalChecked={isModalChecked}
        modalCheckSetter={setCheckboxValue}
      />
    </div>
  );
};

export default Catalog;
