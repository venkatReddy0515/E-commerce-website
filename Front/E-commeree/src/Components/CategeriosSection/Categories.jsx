import { useContext, useEffect, useState } from "react";
import "./../CardSection/cart.css";
import { ShopContext } from "../Main/ProductSection";
import ProductsById from "../Main/ProductsById";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faBars, faXmark, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

function Categories() {
    const { products, setSearch, searchActive } = useContext(ShopContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearchs] = useState('');
    const [filters, setFilters] = useState("All");
    const [sort, setSort] = useState("sort");

    useEffect(() => {
        handleFilters();
    }, [filters,search]);

    const handleFilters = () => {
        let filtered = products;

        if (filters !== "All") {
            filtered = filtered.filter(product => product.category.includes(filters));
        }
        if (search) {
            filtered = filtered.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }
        setFilteredProducts(filtered);
    };

    return (
        <>
            <div className="all">
                {searchActive &&
                    <div className="search-filed">
                        <div className="search-box">
                            <input
                                type="text"
                                name="search"
                                className="search"
                                placeholder="Search"
                                onChange={(e) => setSearchs(e.target.value)}
                                value={search}
                            />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => setSearch('')}
                            className="xclose"
                        />
                    </div>
                }
                <div className="filters">
                    <h3>FILTERS</h3>
                    <h3><span>All</span> COLLECTION</h3>
                    
                    <div className="select">
                        <select
                            name="filter"
                            id="filter"
                            onChange={(e) => setFilters(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Men's">Men's</option>
                            <option value="Women's">Women's</option>
                            <option value="Kids">Kid's</option>
                        </select>
                    </div>
                </div>
                <div className="product-routing">
                    {filteredProducts.length > 0 ?
                        filteredProducts.map(product => (
                            <ProductsById
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                rating={product.rating}
                                id={product._id}
                                key={product._id}
                            />
                        )) :
                        <div>
                            {
                                products.map(product => (
                                    <ProductsById
                                        name={product.name}
                                        image={product.image}
                                        price={product.price}
                                        rating={product.rating}
                                        id={product._id}
                                        key={product._id}
                                    />
                                    ))
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Categories;
