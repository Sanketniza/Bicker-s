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
    

  return (
        <div className="mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {
                    product.map((company) => (
                        <CompanyCard
                            key={company.id}
                            id={company.id}
                            name={company.name}
                            price={company.price}
                            //images={company.images} // Ensure images prop is passed
                            images={op} 
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