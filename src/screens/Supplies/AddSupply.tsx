import React, {useState, useEffect} from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonIcon from '@mui/icons-material/Person';
import ScaleIcon from '@mui/icons-material/Scale';
import {Card} from '@mui/material';
import {getProducts} from '../../Data/Products/Data';
import '../Businesses/AddBusiness.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {getSuppliers} from '../../Data/Suppliers/Data';
import FormsLayout from '../../Layout/FormsLayout';
import { useQuery } from '@tanstack/react-query';
import useAddSupply from '../../hooks/supplies/useAddSupply';

interface Form {
  product: string;
  supplyPrice: number;
  quantity: number;
  productId: string;
}
type Category = {
  name: string;
};
type Products = {
  name: string;
  category: Category;
  size: string;
  stock: string;
};
type Suppliers = {
  name: string;
  email: string;
  phone: string;
};
// eslint-disable-next-line
const AddSupply = ({id}: any) => {
  const [forms, setForms] = useState<Form[]>([
    {product: '', supplyPrice: 0, quantity: 0, productId: ''},
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountCharged, setAmountCharged] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [supplierId, setSupplierId] = useState('');
  const {mutate,isLoading} = useAddSupply();
  // eslint-disable-next-line
  const {data: suppliers} = useQuery<Suppliers[] | any, Error>({
    queryKey: ['suppliers', id],
    queryFn: () => getSuppliers(id),
  });
  // eslint-disable-next-line
  const {data: products} = useQuery<Products[] | any, Error>({
    queryKey: ['products', id],
    queryFn: () => getProducts(id),
  });
  useEffect(() => {
    //calculate the total
    let formTotal = 0;
    forms.forEach((form) => {
      formTotal += form.supplyPrice * form.quantity;
    });
    setTotalAmount(formTotal);
    setAmountCharged(formTotal);
    setAmountPaid(formTotal);
  }, [forms]);

  const handleAddForm = () => {
    setForms([
      ...forms,
      {product: '', supplyPrice: 0, quantity: 0, productId: ''},
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
      newForms[index].supplyPrice = selectedProduct.buyingPrice;
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

  const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSupplierId(e.target.value);
    console.log(e.target.value);
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
      supplyItems: forms,
      amountCharged: totalAmount,
      supplierId: supplierId,
      amountPaid: amountPaid,
      businessId:id
    };

    mutate(post)
  };
  const balance = amountPaid - amountCharged;

  return (
    <FormsLayout title="Supply">
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <div className="row padding mt-3">
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label">
                Supplier
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <PersonIcon />
                </span>
                <select
                  className="form-select"
                  onChange={handleSupplierChange}
                  name="category"
                  aria-label="Default select example"
                  id="basic-addon1">
                  <option selected>Select Supplier</option>
                  {
                    // eslint-disable-next-line
                  suppliers?.map((supplier:any) => {
                    return (
                      <option value={supplier.id} key={supplier.id}>
                        {supplier.name}
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
                        value={form.supplyPrice}
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
                      Subtotal : Ksh: {form.supplyPrice * form.quantity}
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
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading}>
              {' '}
              {isLoading ? 'Adding' : 'Add Supply'}{' '}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  );
};

export default AddSupply;
