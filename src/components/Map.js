import React, { useState, useEffect, useLayoutEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const librariesForLoadScript = ["places"]

function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxQtc2nUDT6g4tg3y0TcP3pJU7mA0VbeQ",
    libraries: librariesForLoadScript,
  });

  const [mapMarkerCenterOffset, setMapMarkerCenterOffset] = useState(0);

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
          let addressString = "";
          if (results[0]) {
            addressString = results[0].formatted_address;
          }
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
    setIsApiLoaded(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        if (map) map.panTo({ lat: latitude, lng: longitude });
        getAddressFromLatLng({ lat: latitude, lng: longitude });
      },
      () => null
    );
  }, []);

  useLayoutEffect(() => {
    if (map) {
      const listener = map.addListener("bounds_changed", () => {
        getAddressFromLatLng({
          lat: map.getCenter().lat(),
          lng: map.getCenter().lng(),
        });
      });

      let mapElementWidth = document.getElementById("googleMap").getBoundingClientRect().width;
      let offset = (mapElementWidth / 2) - 23;
      setMapMarkerCenterOffset(offset);

      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

  useLayoutEffect(() => {
    if (map) 
    {
      alert("wow");
      map.panTo({ lat: center.lat, lng: center.lng })
    };
  }, [center])

  useLayoutEffect(() => {
    if (autoCompletionPlace && autoCompletionPlace.geometry && autoCompletionPlace.geometry.location) {
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
      alert(`${lat}, ${lng} from map hook`)
    }
  }, [autoCompletionPlace]);

  useLayoutEffect(() => {
    if (navigator.geolocation && isCurrentPositionCalled) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        const latitude = lat;
        const longitude = lng;
        setCenter({ lat: latitude, lng: longitude });
        if (map) map.panTo({ lat: latitude, lng: longitude });
        getAddressFromLatLng({ lat: latitude, lng: longitude });
        props.setCurrentPositionCalled(false);
        console.log(lat, lng);
      });
    }
  }, [isCurrentPositionCalled]);

  return (
    <div id="googleMap">
      {loadError ? (
        <div>Error loading Google Maps</div>
      ) : isLoaded ? (
        <GoogleMap
          options={options}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={20}
          onLoad={(map) => onMapLoad(map)}
        >
          <img
            id="marker"
            src="./pin_icon.svg"
            style={{ top: "45%", width: "56px", left: `${mapMarkerCenterOffset}px` }}
            className="absolute rounded-full"
          />
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Map;
