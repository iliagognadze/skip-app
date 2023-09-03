const Feedback = () => {
    return (
        <div className="flex flex-col md:grid gap-3 grid-cols-2 my-8 font-mtavruli text-left text-white">
            <div className="col-span-1">
                <div>
                    <h1 style={{ fontSize: 48 }} className="hidden md:block">ჩვენთვის თქვენი აზრი <br /> მნიშვნელოვანია</h1>
                    <h1 className="md:hidden text-xl text-center mb-4">ჩვენთვის თქვენი აზრი <br /> მნიშვნელოვანია</h1>
                </div>
            </div>
            <form action="/" className="relative col-span-1 flex flex-col text-sm justify-between">
                <textarea className="border-2 bg-primary text-white border-white-500 rounded p-2 h-full" placeholder="მოგვწერე შენი აზრი..."></textarea>
                <div className="absolute bottom-3 right-3">
                    <div className="flex items-center">
                        <div>
                            <input className="bg-white rounded-l py-1 mt-1 px-4 text-black" placeholder="შეიყვანეთ მეილი"/>
                        </div>
                        <div>
                            <button type="submit" className="p-1.5 px-4 group bg-secondary hover:border-primary hover:text-white mt-2 pb-0.5 rounded-r">
                                <img className="w-4 mb-1 ml-1 group-hover:hidden" src="/arrow-right-7b.png" />
                                <img className="w-4 mb-1 ml-1 hidden group-hover:block" src="/arrow-right-white.png" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Feedback;