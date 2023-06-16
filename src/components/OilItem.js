import OilDetailsModal from "./OilDetailsModal.js";

const OilItem = (props) => {
    let item = props.itemData;

    let itemImageWrapperStyle = {
        backgroundImage: `url(${item.imageUrl})`
    }

    const selectionHandler = () => {
        if (!props.isFromCatalog) {
            props.onPercentChange(25, '+');
            props.onSelection();
        }
    }

    return (
        <div className="drop-shadow-lg font-mtavruli flex md:flex-col p-4 h-fit rounded-lg bg-white md:hover:bg-gray-200 transition cursor-pointer" onClick={() => selectionHandler(item)}>
            <p className={`text-xs ${item.productType == "premium" ? 'bg-yellow-400 text-ownblack' : 'bg-gray-500 text-white'} pt-1 px-2 rounded w-fit absolute uppercase`}>{item.productType}</p>
            <div className="w-full h-32 bg-contain mt-2 bg-center bg-no-repeat" style={itemImageWrapperStyle}>

            </div>
            <div className="flex-col justify-between">
                <p className="text-sm text-left my-3">{item.name}</p>
                <div className="flex justify-between items-center">
                    <button onClick={(e) => props.onDetails(e, item)} className="bg-primary text-white text-xs p-1 px-2 rounded-lg pt-2">დეტალები</button>
                    <p>{item.price}₾</p>
                </div>
            </div>
        </div>
    );
}

export default OilItem;