import LocationOn from '@mui/icons-material/LocationOn';
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
type Props = {
  handleSelect: (place: any) => void;
};
const Location = ({handleSelect}: Props) => {
  return (
    <>
      <label htmlFor="basic-url" className="form-label ">
        Location
      </label>
      <div className="input-group mb-5">
        <span className="input-group-text" id="basic-addon1">
          <LocationOn />
        </span>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyAeiInK3UvyBWonodEd0HswfhQ5WFhCvNQ"
          selectProps={{
            placeholder: 'business location',
            className: 'places',
            onChange: handleSelect,
          }}
          aria-describedby="basic-addon1"
        />
      </div>
    </>
  );
};

export default Location;
