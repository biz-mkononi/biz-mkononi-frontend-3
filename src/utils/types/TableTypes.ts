type Owner = {
  name?: string
}
type Employee = {
  name?: string
}
export type commonProperties = {
  name?: string
  phone?: string
  id?: string
  imageUrl?: string
  businessPhone?: string
  owner?: Owner
  employee?: Employee
}
