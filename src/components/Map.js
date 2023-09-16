import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Map(props) {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxQtc2nUDT6g4tg3y0TcP3pJU7mA0VbeQ",
    libraries: ['places']
  });

  const options = {
    disableDefaultUI: false,
  };

  const autoCompletionPlace = props.autoCompletionPlace;
  const isCurrentPositionCalled = props.isCurrentPositionCalled;

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 41.7151377, lng: 44.827096 });
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  const getAddressFromLatLng = (location) => {
    if (isApiLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: location }, (results, status) => {
        if (status === "OK") {
          let addressString = `${results[0].formatted_address}, ${results[3].formatted_address}`;
          props.onAddressChange(addressString, location.lat, location.lng);
        }
      });
    } else {
      // Handle the case when the API is not yet loaded
      console.log("Google Maps API is not loaded yet.");
    }
  };

  const onMapLoad = React.useCallback((map) => {
    setMap(map);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        if (map) map.panTo({ lat: latitude, lng: longitude });
        getAddressFromLatLng({ lat: latitude, lng: longitude });
      },
      () => null
    );
    setIsApiLoaded(true);
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
    if (autoCompletionPlace && autoCompletionPlace.geometry.location) {
      const lat = autoCompletionPlace.geometry.location.lat();
      const lng = autoCompletionPlace.geometry.location.lng();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = lat;
          const longitude = lng;
          setCenter({ lat: latitude, lng: longitude });
          if (map) map.panTo({ lat: latitude, lng: longitude });
          getAddressFromLatLng({ lat: latitude, lng: longitude });
        },
        () => null
      );
    }
  }, [autoCompletionPlace]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        const latitude = lat;
        const longitude = lng;
        setCenter({ lat: latitude, lng: longitude });
        if (map) map.panTo({ lat: latitude, lng: longitude });
        getAddressFromLatLng({ lat: latitude, lng: longitude });
      });
    }

    props.setCurrentPositionCalled(false);
  }, [isCurrentPositionCalled]);

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
