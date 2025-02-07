import "../../css/bike.css";
import { useEffect } from "react";

const PricingCard = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../../JavaScript/bike.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <main className="main flow">
        <h1 className="main-heading">Pricing</h1>
        <div className="cards">
          <div className="cards-inner">
            <div className="card">
              <h2 className="card__heading">Basic</h2>
              <p className="card__price">$9.99</p>
              <ul role="list" className="card__bullets flow">
                <li>Access to standard workouts and nutrition plans</li>
                <li>Email support</li>
              </ul>
              <a href="#" className="cta">Get Started!</a>
            </div>
            
            <div className="card">
              <h2 className="card__heading">Pro</h2>
              <p className="card__price">$19.99</p>
              <ul role="list" className="card__bullets flow">
                <li>Access to advanced workouts and nutrition plans</li>
                <li>Priority Email support</li>
                <li>Exclusive access to live Q&A sessions</li>
              </ul>
              <a href="#" className="cta">Upgrade to Pro!</a>
            </div>
            
            <div className="card">
              <h2 className="card__heading">Ultimate</h2>
              <p className="card__price">$29.99</p>
              <ul role="list" className="card__bullets flow">
                <li>Access to all premium workouts and nutrition plans</li>
                <li>24/7 Priority Email support</li>
                <li>1 on 1 virtual coaching session every month</li>
                <li>Exclusive content and early access to new features</li>
              </ul>
              <a href="#" className="cta">Go Ultimate!</a>
            </div>
          </div>
          
          <div className="overlay cards-inner"></div>      
        </div>
      </main>
    </>
  );
};

export default PricingCard;
