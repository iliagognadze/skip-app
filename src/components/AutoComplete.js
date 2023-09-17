import { useRef, useEffect, useLayoutEffect } from "react";
const AutoComplete = (props) => {
    let autoCompleteRef = useRef();
    const inputRef = useRef();

    const options = {
        componentRestrictions: { country: "ge" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    };

    useLayoutEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        props.addressFieldRef.current = inputRef.current;

        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            alert("hello worrld" + place);
            props.onPlaceSelected(place);
            console.log({ place, inputRef });
        });
    }, []);
    
    return (
        <div className="w-full">
            <input className="bg-white placeholder-gray-400 p-2 md:p-0 outline-0 w-full border md:border-0 md:border-bottom-2 md:border-ownblack"
                ref={inputRef}
                value={props.value}
                onChange={() => props.onChange(inputRef, props.prevOfAddressField, props.setPrevOfAddressField)}
            />
        </div>
    );
};
export default AutoComplete;