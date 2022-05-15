import Navbar from './navbar'
import Footer from './footer'
// import SideMedia from './side-media'

function Layout({ children }) {

    return (
        <>
            <Navbar></Navbar>
            {/* <SideMedia></SideMedia> */}
            <div className="w-full relative">
                {children}
            </div>
            <Footer></Footer>
        </>
    );
}

export default Layout