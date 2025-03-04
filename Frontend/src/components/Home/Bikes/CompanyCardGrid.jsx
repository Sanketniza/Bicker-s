import { CompanyCard } from './CompanyCard';

export function CompanyCardGrid({ companies }) {

  return (
    
        <div className="mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {
                    companies.map((company) => (
                        <CompanyCard
                            key={company.id}
                            id={company.id}
                            name={company.name}
                            images={company.images}
                            price={company.price}
                        />
                    ))
                }
            </div>
        </div>
    );
}
// Compare this snippet from Frontend/src/components/Home/Bikes/CompanyCardGrid.jsx: