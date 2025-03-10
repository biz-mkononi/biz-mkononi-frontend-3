/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import LocationOn from '@mui/icons-material/LocationOn';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import { useFormContext, Controller } from 'react-hook-form';

type LocationProps = {
  name: string;
};

const Location: React.FC<LocationProps> = ({ name }) => {
  const { control, setValue, watch } = useFormContext();
  const [initialized, setInitialized] = useState(false);

  // Get the current location value
  const locationValue = watch(name);

  // Format location for the component's select
  const formatLocationForSelect = (location: string) => {
    return location ? { label: location, value: location } : null;
  };

  // Initialize component once with API data
  useEffect(() => {
    if (!initialized && locationValue) {
      setInitialized(true);
    }
  }, [locationValue, initialized]);

  const handleSelect = async (place: any) => {
    if (!place?.value?.place_id) return;

    try {
      const results = await geocodeByPlaceId(place.value.place_id);
      if (results.length > 0 && results[0].geometry?.location) {
        const { lat, lng } = results[0].geometry.location;
        setValue('latitude', lat());
        setValue('longitude', lng());
        setValue(name, place.label);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
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
                placeholder: 'Business location',
                className: 'places',
                value: formatLocationForSelect(field.value),
                onChange: (place) => {
                  if (place) {
                    handleSelect(place);
                    field.onChange(place.label);
                  } else {
                    field.onChange('');
                    setValue('latitude', 0);
                    setValue('longitude', 0);
                  }
                },
                isClearable: true,
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
