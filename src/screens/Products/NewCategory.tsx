import React, { useState } from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import { Card } from '@mui/material';
import '../Businesses/AddBusiness.css';
import FormsLayout from '../../Layout/FormsLayout';
import useAddCategory from '../../hooks/Categories/useAddCategory';
import { toast } from 'react-toastify';
// eslint-disable-next-line
const NewCategory = ({ id }: any) => {
  const initialState = { name: '', description: '', image: {} };

  const [formData, setFormData] = useState(initialState);
  //TODO: const [displayImage, setDisplayImage] = useState('');
  const { mutateAsync, isLoading } = useAddCategory();
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
  //     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  //     setDisplayImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = {
      name: formData.name,
      description: formData.description,
      businessId: id,
      // image: formData.image,
    };
    await mutateAsync(post)
      .then(() => {
        toast.success('Category added successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch(() => {
        toast.error('There was an error adding the category', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  return (
    <FormsLayout title="Category">
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <label htmlFor="basic-url" className="form-label ">
            Name
          </label>
          <div className="input-group mb-5">
            <span className="input-group-text" id="basic-addon1">
              <CategoryIcon />
            </span>
            <input
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
              className="form-control"
              onChange={handleDescriptionChange}
              name="description"
              aria-label="With textarea"
            ></textarea>
          </div>
          {/*TODO: <Image
            handleFileChange={handleFileChange}
            displayImage={displayImage}
            label="Category"
          /> */}
          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Adding' : 'Add Category'}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  );
};

export default NewCategory;
