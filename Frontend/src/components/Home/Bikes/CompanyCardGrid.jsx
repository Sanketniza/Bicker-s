import { CompanyCard } from './CompanyCard';

import PropTypes from 'prop-types';

export function CompanyCardGrid({ product }) {

   
    
    // console.log("CompanyCardGrid product : ", product);
    // console.log("CompanyCardGrid", JSON.stringify(product, null, 2));
    // console.log("CompanyCardGrid", product.map(company => company._id));
    

// product.forEach(company => console.log("product di ", company.id));


  return (
        <div className="mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                
                {
                    product.map((item) => (
                    <CompanyCard
                        key={item._id}
                        id={item._id}
                        name={item.title || "Unknown Product"} // Map title to name
                        price={item.price || 0} // Default to 0 if price is undefined
                        images={item.images || []} // Ensure images is always an array
                    />
                ))
                }
                
            </div>
        </div>
    );
}

CompanyCardGrid.propTypes = {
  product: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      images: PropTypes.array
    })
  ).isRequired,
};