import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
export const addBusinessItems = [
  {
    items: [
      {
        labelName: 'Business Name',
        icon: BusinessIcon,
        name: 'name',
      },
      {
        labelName: 'Business Email',
        icon: EmailIcon,
        name: 'businessEmail',
      },
      {
        labelName: 'Business Phone',
        icon: PhoneIcon,
        name: 'businessPhone',
      },
      {
        labelName: 'Location',
        icon: LocationOnIcon,
        name: 'location',
      },
      {
        labelName: 'Location Details',
        icon: LocationOnIcon,
        name: 'locationDetails',
      },
      {
        labelName: 'Description',
        name: 'description',
      },
    ],
    select: [
      {
        labelName: 'Product Type',
        icon: ProductionQuantityLimitsIcon,
        name: 'productType',
        option1: 'select a product type',
        option2: 'PRODUCT',
        option3: 'SERVICE',
        option4: 'SERVICE_PRODUCT',
      },
    ],
  },
];
