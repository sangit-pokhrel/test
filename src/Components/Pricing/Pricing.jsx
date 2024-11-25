import PricingList from "./PricingList";
import { LeftLine, RightLine } from "../../design/Pricing";

const Pricing = () => {
  return (
    <div className="overflow-hidden  bg-n-8" id="pricing">
      <div className="container relative z-2">
        <div className="relative">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
