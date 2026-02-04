import React, { useEffect, useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import { Card } from '@mui/material';
import '../Businesses/AddBusiness.css';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  getSingleCategory,
  updateSingleCategory,
} from '../../Data/Categories/Data';
import FormsLayout from '../../Layout/FormsLayout';

interface data {
  name: '';
  description: '';
}
// eslint-disable-next-line
const UpdateCategories = ({ id }: any) => {
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  //TODO: const [displayImage, setDisplayImage] = useState('');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const params = useParams();

  useEffect(() => {
    getSingleCategory(setData, params.id, setIsloading, setFormData, id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //TODO: const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({...formData, [e.target.name]: e.target.files[0]});
  //     setDisplayImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSingleCategory(formData, navigate, params.id, setIsUpdating, id);
  };
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <FormsLayout title="Category" update>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <label htmlFor="basic-url" className="form-label ">
                Name
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <BusinessIcon />
                </span>
                <input
                  defaultValue={data.name}
                  type="text"
                  onChange={handleChange}
                  name="name"
                  className="form-control"
                  placeholder="name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <label htmlFor="basic-url" className="form-label ">
                Description
              </label>
              <div className="input-group mb-3">
                <textarea
                  defaultValue={data.description}
                  className="form-control"
                  onChange={handleDescriptionChange}
                  name="description"
                  aria-label="With textarea"
                ></textarea>
              </div>
              {/*TODO: <Image
                handleFileChange={handleFileChange}
                update
                displayImage={displayImage}
                label="Category"
                data={data}
              /> */}
              <div className="text-center mt-3">
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isUpdating ? true : false}
                >
                  {isUpdating ? 'updating' : 'Update Category'}
                </button>
              </div>
            </form>
          </Card>
        </FormsLayout>
      )}
    </>
  );
};

export default UpdateCategories;
