import {useState, ChangeEvent} from 'react';
import LoadingModal from "./LoadingModal";
import axios from "axios";

const Feedback = () => {
    const [email, setEmail] = useState(null);
    const [textMessage, setTextMessage] = useState(null);

    const [isFeedbackLoading, setFeedbackLoading] = useState(false);

    const apiBaseUrl = 'https://skipserviceapi.azurewebsites.net/api';

    const isValidEmail = (email) => {
        // Regular expression for a valid email address
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    
        return emailRegex.test(email);
      };

    const postFeedback = async (email, textMessage) => {

        let feedbackRequest = {
            senderEmail: email,
            textMessage: textMessage
        }

        try {
          const requestBody = feedbackRequest;
          setFeedbackLoading(true);
          const response = await axios.post(
            `${apiBaseUrl}/feedback`,
            requestBody
          );
    
          console.log(response);
          setFeedbackLoading(false);
        } catch (error) {
          console.log(error.response.data.message);
          setFeedbackLoading(false);
        }
      };

      const handleFieldChnage = (e, setter) => {
        setter(e.target.value);
      };


    return (
        <div className="flex flex-col md:grid gap-3 grid-cols-2 my-8 font-mtavruli text-left text-white">
            <div className="col-span-1">
                <div>
                    <h1 style={{ fontSize: 48 }} className="hidden md:block">ჩვენთვის თქვენი აზრი <br /> მნიშვნელოვანია</h1>
                    <h1 className="md:hidden text-xl text-center mb-4">ჩვენთვის თქვენი აზრი <br /> მნიშვნელოვანია</h1>
                </div>
            </div>
            <div className="relative col-span-1 flex flex-col text-sm justify-between">
                <textarea onChange={(e) => handleFieldChnage(e, setTextMessage)} className="border-2 bg-primary text-white border-white-500 rounded p-2 h-full" placeholder="მოგვწერე შენი აზრი..."></textarea>
                <div className="md:absolute bottom-3 flex justify-center md:justify-start right-3">
                    <div className="flex items-center">
                        <div>
                            <input onChange={(e) => handleFieldChnage(e, setEmail)} className="bg-white rounded-l py-1 mt-1 px-4 text-black" placeholder="შეიყვანეთ მეილი"/>
                        </div>
                        <div>
                            <button type="submit" disabled={!(email && isValidEmail(email) && textMessage)} onClick={() => postFeedback(email, textMessage)} className={`p-1.5 px-4 group ${(email && isValidEmail(email) && email) ? 'bg-secondary' : 'bg-gray-200'} hover:border-primary hover:text-white mt-2 pb-0.5 rounded-r`}>
                                <img className="w-4 mb-1 ml-1 group-hover:hidden" src="/arrow-right-7b.png" />
                                <img className="w-4 mb-1 ml-1 hidden group-hover:block" src="/arrow-right-white.png" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isFeedbackLoading && <LoadingModal />}
        </div>
    );
}

export default Feedback;