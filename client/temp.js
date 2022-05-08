const [searchProduct, setSearchProduct] = useState('');
const [searchedProduct, setSearchedProduct] = useState([]);
const [filter, setFilter] = useState("All");
const [currentPage, setCurrentPage] = useState(1);
const [count, setCount] = useState(1);

useEffect(() => {
getAllProductSearch(searchProduct, currentPage, filter).then(({count, rows}) => {
    setSearchedProduct(rows);
    setCount(count)
})
}, [currentPage])

useEffect(() => {
getAllProductSearch(searchProduct, 1, filter).then(({count, rows}) => {
    setSearchedProduct(rows);
    setCount(count);
    setCurrentPage(1);
})
}, [filter])