import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-[#1A103C] overflow-hidden flex flex-col min-h-screen">
                <Header />
                <div className="py-8 max-w-7xl mx-auto w-full px-4">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
