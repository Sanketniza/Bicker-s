import { CompanyCard } from './CompanyCard';

import PropTypes from 'prop-types';

export function CompanyCardGrid({ product }) {

    const op = [
        'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg',
            'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg',
    ]
    
    // console.log("CompanyCardGrid product : ", product);
    // console.log("CompanyCardGrid", JSON.stringify(product, null, 2));
    // console.log("CompanyCardGrid", product.map(company => company._id));
    

// product.forEach(company => console.log("product di ", company.id));


  return (
        <div className="mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {
                    product.map((company) => (
                        <CompanyCard
                            key={company._id}
                            id={company._id}
                            name={company.title}
                            price={company.price}
                            images={op}
                            // images={[{ id: company._id, url: company.imageUrl }]} // Ensure images prop is passed as array of objects
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
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            images: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure images prop is defined
        })

    ).isRequired,

};