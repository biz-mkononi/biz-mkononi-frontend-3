/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import React from 'react';
import LocationOn from '@mui/icons-material/LocationOn';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import { useFormContext, Controller } from 'react-hook-form';

type LocationProps = {
  name: string;
};

const Location: React.FC<LocationProps> = ({ name }) => {
  const { control, setValue } = useFormContext();

  // Function to handle place selection and extract coordinates
  const handleSelect = async (place: any) => {
    if (place) {
      try {
        const results = await geocodeByPlaceId(place.value.place_id);
        const { lat, lng } = results[0].geometry.location;

        setValue('latitude', lat());
        setValue('longitude', lng());
        setValue(name, place.label); // Save the location label
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }
  };

  return (
    <>
      <label htmlFor="location" className="form-label">
        Location
      </label>
      <div className="input-group mb-5">
        <span className="input-group-text" id="basic-addon1">
          <LocationOn />
        </span>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <GooglePlacesAutocomplete
              apiKey="AIzaSyAeiInK3UvyBWonodEd0HswfhQ5WFhCvNQ"
              selectProps={{
                ...field,
                placeholder: 'Business location',
                className: 'places',
                onChange: (place) => {
                  handleSelect(place);
                  field.onChange(place.label);
                },
              }}
              aria-describedby="basic-addon1"
            />
          )}
        />
      </div>
    </>
  );
};

export default Location;
