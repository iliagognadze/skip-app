import { Link } from "react-router-dom";
import Feedback from "./Feedback";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 my-12 font-mtavruli">
      <div className="container flex items-center justify-between grid md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="text-white text-xxl" style={{ fontSize: 54 }}>
            დასკიპე დრო<br />
            <Link
              to="/catalog"
              style={{ fontSize: 32 }}
              className="bg-secondary text-black p-1 rounded-lg pt-3 px-3"
            >
              გამოიძახე ახლავე
            </Link>
          </h1>
        </div>
        <div>
          <img src="time_flies.svg" />
        </div>
      </div>
      <div className="bg-primarybg py-12 ">
        <div className="flex text-white grid md:grid-cols-3 gap-12 md:gap-0">
          <div className="flex items-center flex-col gap-4">
            <p className="text-lg">შეარჩიე ზეთი</p>
            <img className="md:h-64 h-20" src="/choosing.svg" />
          </div>
          <div className="flex items-center flex-col gap-4">
            <p className="text-lg">გააფორმე შეკვეთა</p>
            <img className="md:h-64 h-20" src="/accept_order.svg" />
          </div>
          <div className="flex items-center flex-col gap-4">
            <p className="text-lg ">
              შეცვალე ზეთი
              <br />
              სახლიდან გაუსვლელად
            </p>
            <img className="md:h-64 h-20" src="/success_fromhome.svg" />
          </div>
        </div>
      </div>
      <div className="container">
        <Feedback />
      </div>
    </div>
  );
};

export default HomePage;
