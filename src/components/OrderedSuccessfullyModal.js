import { createPortal } from "react-dom";

const OrderedSuccessfullyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return createPortal(
        <>
            <div className='font-mtavruli'>
                <input type="checkbox" id="my-details-modal-5" className="modal-toggle hidden" />
                <div className={`fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center bg-primary/50`}>
                    <div className="modal-box p-8 relative w-6/12 max-w-5xl bg-white rounded drop-shadow-lg">
                        <div className="w-fit absolute z-50 bg-primary p-1 top-3.5 right-3.5 rounded flex justify-end">
                            <label onClick={onClose} className="btn contents cursor-pointer">
                                <img alt='dkd' src='./ph_x-bold.svg' />
                            </label>
                        </div>
                        <div className="flex gap-4 justify-center flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 1024 1024"><path fill="#12cc44" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" /></svg>
                            <p className="text-center">თქვენი შეკვეთა მიღებულია!<br/>ჩვენ თქვენკენ მოვემართებით</p>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default OrderedSuccessfullyModal;