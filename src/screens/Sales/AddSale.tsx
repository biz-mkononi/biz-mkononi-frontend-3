import React, {useState, useEffect} from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonIcon from '@mui/icons-material/Person';
import ScaleIcon from '@mui/icons-material/Scale';
import {Card, Alert} from '@mui/material';
import {getCustomers} from '../../Data/Customers/Data';
import {getProducts} from '../../Data/Products/Data';
import '../Businesses/AddBusiness.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormsLayout from '../../Layout/FormsLayout';
import { useQuery } from '@tanstack/react-query';
import useAddSale from '../../hooks/sales/useAddSale';

interface Form {
  product: string;
  salePrice: number;
  quantity: number;
  productId: string;
}

type Customers = {
  name: string;
  gender: string;
  phone: string;
  email: string;
};
type Category = {
  name: string;
};
type Products = {
  name: string;
  category: Category;
  size: string;
  stock: string;
};
// eslint-disable-next-line
const AddSale = ({id}: any) => {
  const [forms, setForms] = useState<Form[]>([
    {product: '', salePrice: 0, quantity: 0, productId: ''},
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountCharged, setAmountCharged] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [customerId, setCustomer] = useState('');
  // eslint-disable-next-line
  const {data: customers} = useQuery<Customers[] | any, Error>({
    queryKey: ['customers', id],
    queryFn: () => getCustomers(id),
  });
   // eslint-disable-next-line
  const {data: products} = useQuery<Products[] | any, Error>({
    queryKey: ['products', id],
    queryFn: () => getProducts(id),
  });
  const {mutate,isLoading,isError} = useAddSale();
  useEffect(() => {
    //calculate the total
    let formTotal = 0;
    forms.forEach((form) => {
      formTotal += form.salePrice * form.quantity;
    });
    setTotalAmount(formTotal);
    setAmountCharged(formTotal);
    setAmountPaid(formTotal);
  }, [forms]);

  const handleAddForm = () => {
    setForms([
      ...forms,
      {product: '', salePrice: 0, quantity: 0, productId: ''},
    ]);
  };

  const handleRemoveForm = (index: number) => {
    const newForms = [...forms];
    newForms.splice(index, 1);
    setForms(newForms);
  };
  const handleProductChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newForms = [...forms];
    newForms[index].product = e.target.value;
    const selectedProduct = products.find(
      // eslint-disable-next-line
      (product:any) => product.name === e.target.value
    );
    if (selectedProduct) {
      newForms[index].salePrice = selectedProduct.sellingPrice;
      newForms[index].productId = selectedProduct.id;
    }
    setForms(newForms);
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newForms = [...forms];
    newForms[index].quantity = Number(e.target.value);
    setForms(newForms);
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomer(e.target.value);
  };
  const handleAmountChargedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAmountCharged(parseInt(e.target.value));
  };
  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPaid(parseInt(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = {
      saleItems: forms,
      amountCharged: totalAmount,
      customerId: customerId,
      amountPaid: amountPaid,
      businessId:id
    };

    mutate(post)
  };
  const balance = amountPaid - amountCharged;

  if (isError) {
    // eslint-disable-next-line
    console.log()
  }
  return (
    <FormsLayout title="Sale">
      <Card className="p-3">

        <form onSubmit={onSubmit}>
          <div className="row padding mt-3">
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label">
                Customer
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <PersonIcon />
                </span>
                <select
                  className="form-select"
                  onChange={handleCustomerChange}
                  name="category"
                  aria-label="Default select example"
                  id="basic-addon1">
                  <option selected>Select customer</option>
                  {
                    // eslint-disable-next-line
                  customers?.map((customer:any) => {
                    return (
                      <option value={customer.id} key={customer.id}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-lg-6"></div>
          </div>

          {forms.map((form, index) => (
            <React.Fragment key={index}>
              <Card
                sx={{
                  padding: '10px',
                  marginBottom: '50px',
                }}>
                <div className="row padding">
                  <div className="col-lg-6">
                    <label htmlFor="basic-url" className="form-label">
                      Product
                    </label>
                    <div className="input-group mb-5">
                      <span className="input-group-text" id="basic-addon1">
                        <ProductionQuantityLimitsIcon />
                      </span>
                      <select
                        className="form-select"
                        onChange={(e) => handleProductChange(e, index)}
                        value={form.product}
                        name="category"
                        aria-label="Default select example"
                        id="basic-addon1">
                        <option selected>Select product</option>
                        {
                          // eslint-disable-next-line
                        products?.map((product:any) => {
                          return (
                            <option key={product.name} value={product.name}>
                              {product.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="basic-url" className="form-label ">
                      Quantity
                    </label>
                    <div className="input-group mb-5">
                      <span className="input-group-text" id="basic-addon1">
                        <ScaleIcon />
                      </span>
                      <input
                        type="text"
                        onChange={(e) => handleQuantityChange(e, index)}
                        value={form.quantity}
                        name="location"
                        className="form-control"
                        placeholder="quantity"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <div className="row padding">
                  <div className="col-lg-6">
                    <label htmlFor="basic-url" className="form-label">
                      Item Price
                    </label>
                    <div className="input-group mb-5">
                      <span className="input-group-text" id="basic-addon1">
                        <AttachMoneyIcon />
                      </span>
                      <input
                        type="text"
                        value={form.salePrice}
                        name="locationDetails"
                        className="form-control"
                        placeholder="details"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <h2 className="mb-4 mt-5">
                      Subtotal : Ksh: {form.salePrice * form.quantity}
                    </h2>
                  </div>
                </div>
                <div className="row padding">
                  <div className="col-lg-6">
                    {index !== 0 && (
                      <button
                        className="btn btn-md btn-danger"
                        onClick={() => handleRemoveForm(index)}>
                        Remove Product
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </React.Fragment>
          ))}
          <div className="mt-3 mb-5">
            <button
              className="btn btn-info btn-md"
              type="button"
              onClick={handleAddForm}>
              Add Product
            </button>
          </div>

          <div className="row padding">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label ">
                Amount Charged
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <AttachMoneyIcon />
                </span>
                <input
                  type="text"
                  value={amountCharged}
                  onChange={handleAmountChargedChange}
                  name="location"
                  className="form-control"
                  placeholder="location"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <label htmlFor="basic-url" className="form-label">
                Amount Paid
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <AttachMoneyIcon />
                </span>
                <input
                  type="text"
                  value={amountPaid}
                  onChange={handleAmountPaidChange}
                  name="locationDetails"
                  className="form-control"
                  placeholder="details"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <h2 className="mb-4">Balance : Ksh: {balance}</h2>
            </div>
          </div>
          <div className="text-center mt-3">
             {isError && (
          <Alert
            variant="filled"
            severity="error">
            The current stock of the product you are trying to sell is lower, please add more stock and try again
          </Alert>
        )}
            <button
              type="submit"
              className="focus:outline-none mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading}>
              {' '}
              {isLoading ? 'Adding' : 'Add Sale'}{' '}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  );
};

export default AddSale;
