import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full bg-[#f8f8f8] text-black">
            {/* 1. Phần nội dung chính  */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
                {/* Cột 1: GET HELP */}
                <div className="pb-6 md:pb-0 md:px-8 first:pl-0">
                    <h3 className="font-bold text-lg mb-3 tracking-wider uppercase">
                        GET HELP
                    </h3>
                    <ul className="space-y-2 text-sm font-medium text-gray-800">
                        <li>
                            <Link to="/" className="hover:underline transition-all">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search?keyword=nike" className="hover:underline transition-all">
                                Nike
                            </Link>
                        </li>
                        <li>
                            <Link to="/search?keyword=adidas" className="hover:underline transition-all">
                                Adidas
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline transition-all">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Cột 2: SUPPORT */}
                <div className="py-6 md:py-0 md:px-8">
                    <h3 className="font-bold text-lg mb-3 tracking-wider uppercase">
                        SUPPORT
                    </h3>
                    <ul className="space-y-2 text-sm font-medium text-gray-800">
                        <li>
                            <Link to="#" className="hover:underline transition-all">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline transition-all">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline transition-all">
                                Help
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline transition-all">
                                Phone
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Cột 3: REGISTER */}
                <div className="pt-6 md:pt-0 md:px-8">
                    <h3 className="font-bold text-lg mb-3 tracking-wider uppercase">
                        REGISTER
                    </h3>
                    <ul className="space-y-2 text-sm font-medium text-gray-800">
                        <li>
                            <Link to="/register" className="hover:underline transition-all">
                                register
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:underline transition-all">
                                login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* 2. Dòng Copyright */}
            <div className="bg-[#d8d8d8] py-4 text-center text-sm font-normal text-gray-800 border-t border-gray-300">
                © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.
            </div>
        </footer>
    );
}