import "./Home.css"
import Banner from "././../../assets/download.jpeg"
import LatestCollection from "./LatestCollection"
import BestSeller from "./BestSeller"
import PolicySection from "./Policy";
import ProductPage from "./ProductPage";
function Home(){
    return(
        <div>
            <div className="head">
                <div className="header">
                <div className="header-left">
                        <div className="left">
                            <hr/>
                        <h2>OUR BESTSELLERS</h2>
                        </div>
                        <h1>Lastest Arrivals</h1>
                        <div className="left">
                            
                            <h2>Shop now</h2>
                            <hr/>
                        </div>
                </div>
                    <div className="header-right">
                        <img src={Banner} alt="" />
                    </div>
                </div>
            </div>
            <LatestCollection/>
            <BestSeller/>
            <PolicySection/>
            <ProductPage/>
        </div>
    )
}
export default Home