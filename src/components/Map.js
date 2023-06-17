import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxQtc2nUDT6g4tg3y0TcP3pJU7mA0VbeQ",
  });

  const options = {
    disableDefaultUI: true,
  };

  const autoCompletionPlace = props.autoCompletionPlace;

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 41.7151377, lng: 44.827096 });

  const getAddressFromLatLng = (location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
      if (status === "OK") {
        let addressString = `${results[0].formatted_address}, ${results[3].formatted_address}`;
        props.onAddressChange(addressString);
      } else {
        console.log(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  const onMapLoad = React.useCallback((map) => {
    setMap(map);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        map.panTo({ lat: latitude, lng: longitude });
        getAddressFromLatLng({ lat: latitude, lng: longitude });
      },
      () => null
    );
  }, []);

  useEffect(() => {
    if (map) {
      const listener = map.addListener("bounds_changed", () => {
        getAddressFromLatLng({
          lat: map.getCenter().lat(),
          lng: map.getCenter().lng(),
        });
      });

      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

  useEffect(() => {
    if (autoCompletionPlace) {
      const lat = autoCompletionPlace.geometry.location.lat();
      const lng = autoCompletionPlace.geometry.location.lng();
      console.log(autoCompletionPlace.name + " es ari mapidan");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = lat;
          const longitude = lng;
          setCenter({ lat: latitude, lng: longitude });
          map.panTo({ lat: latitude, lng: longitude });
          getAddressFromLatLng({ lat: latitude, lng: longitude });
        },
        () => null
      );
    }
  }, [autoCompletionPlace]);

  return isLoaded ? (
    <GoogleMap
      options={options}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={20}
      onLoad={(map) => onMapLoad(map)}
    >
      <img
        src="./pin_icon.svg"
        style={{ top: "45%" }}
        className="left-1/2 absolute rounded-full"
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
