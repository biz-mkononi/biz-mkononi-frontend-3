import React, {ReactNode} from 'react';
interface AuthLayoutProps {
  children: ReactNode;
  business?: boolean;
  title: string;
  isActive?: boolean;
  isActive2?: boolean;
  onClickActive?: () => void;
  onClickActive2?: () => void;
  update?: boolean;
}

const FormsLayout: React.FC<AuthLayoutProps> = ({
  children,
  business,
  title,
  isActive,
  isActive2,
  onClickActive2,
  onClickActive,
  update,
}) => {
  return (
    <div className="add-business container p-4 ">
      {!isActive && (
        <h2 className="mb-3">
          {' '}
          {update ? 'Update' : 'Add'} {title}
        </h2>
      )}
      {business && (
        <div className="row padding">
          <div className="col-lg-6">
            <div>
              <button
                className={
                  isActive
                    ? 'btn btn-primary active-button btn-md m-2 mb-3'
                    : 'btn btn-outline btn-md m-2 mb-3'
                }
                onClick={onClickActive}>
                My Business List
              </button>
              <button
                className={
                  isActive2
                    ? 'btn btn-primary active-button btn-md m-2 mb-3'
                    : 'btn btn-outline btn-md m-2 mb-3'
                }
                onClick={onClickActive2}>
                Add Business
              </button>
            </div>
          </div>
        </div>
      )}
      <hr className="light mb-3" />
      {!isActive && (
        <p className="mb-4">
          {' '}
          {update ? 'Update the' : 'Add a new'} {title}
        </p>
      )}
      {children}
    </div>
  );
};

export default FormsLayout;
