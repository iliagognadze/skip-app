const Footer = () => {
    return (
        <div className="bg-primarybg font-mtavruli py-8">
            <div className="flex md:flex-row container flex-col justify-between gap-8 md:gap-0 text-left">
                <div className="">
                    <img className="mx-auto md:m-0 w-32" src="/skip_logo.svg" />
                    <p className="md:text-left text-center text-white text-xs mt-2">
                        შეცვალე ზეთი სახლიდან<br></br>გაუსვლელად
                    </p>
                </div>
                <div className="flex md:flex-row flex-col text-center md:text-right gap-2 md:gap-10">
                    <ul className="text-white flex flex-col gap-2 text-sm">
                        <li>
                            <a href="#">მთავარი</a>
                        </li>
                        <li>
                            <a href="#">სიახლეები</a>
                        </li>
                    </ul>
                    <ul className="text-white flex flex-col gap-2 text-sm">
                        <li>
                            <a href="#">ზეთის შეცვლა</a>
                        </li>
                        <li>
                            <a href="#">ჩვენს შესახებ</a>
                        </li>
                        <li>
                            <a href="#">კატალოგი</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-center gap-1.5">
                    <a href="#"><img src="/facebook-icon-white.png" /></a>
                    <a href="#"><img className="w-7" src="/tiktok-icon-white.png" /></a>
                    <a href="#"><img src="/instagram-icon-white.png" /></a>
                </div>
                <p className="text-white text-xs">ყველა უფლება დაცულია</p>
            </div>
        </div>
    );
}

export default Footer;