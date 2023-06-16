const Instruction = () => {

    const ulItemVerticalMargin = 1;

    return (
        <div className="bg-secondary mx-auto md:grid md:grid-cols-8 text-left flex p-4 font-mtavruli rounded-lg md:rounded">
            <ul className="text-white flex flex-col justify-around text-sm md:text-base md:col-span-5 col-span-12 pl-2">
                <li className={`flex items-center my-${ulItemVerticalMargin}`}>
                    <img className="w-2 mb-1 mr-2" src="/circle_svg.svg" />
                    შეარჩიე კატალოგში სასურველი მანქანის მოდელი
                </li>
                <li className={`flex items-center my-${ulItemVerticalMargin}`}>
                    <img className="w-2 mb-1 mr-2" src="/circle_svg.svg" />
                    შეარჩიე ჩვენს მიერ შემოთავაზებული ზეთებიდან შენთვის საუკეთესო
                </li>
                <li className={`flex items-center my-${ulItemVerticalMargin}`}>
                    <img className="w-2 mb-1 mr-2" src="/circle_svg.svg" />
                    გააფორმე შეკვეთა
                </li>
                <li className={`flex items-center my-${ulItemVerticalMargin}`}>
                    <img className="w-2 mb-1 mr-2" src="/circle_svg.svg" />
                    შეცვალე ზეთი სახლიდან გაუსვლელად
                </li>
            </ul>
            <div className="bg-white col-span-3 p-2 rounded md:visible md:flex hidden">
                <p className="text-ownblack p-2 text-xl">
                    მანქანის ძრავის ზეთის შეცვლა რეგულარული პროცესია და მისი გადავადება ავტომობილის სარემონტო ხარჯებს ზრდის.
                </p>
            </div>
        </div>
    );
}

export default Instruction;