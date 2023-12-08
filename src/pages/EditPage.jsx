import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [ product, setProduct] = useState({
        name: "",
        price: "",
        ingredients: "",
        image: "",
    })

    const getProduct = async () => {
        setIsLoading(true);
        try{
            const response = await axios.get('http://localhost:3000/api/products/'+id);
            setProduct({
                name: response.data.name,
                price: response.data.price,
                ingredients: response.data.ingredientes,
                image: response.data.image,
            })  
            setIsLoading(false);


        } catch (error){
            setIsLoading(false);
            console.log(error);
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            await axios.put('http://localhost:3000/api/products/'+id, product);
            alert('Update sucessfully');
            navigate('/');
        } catch (error){
            setIsLoading(false);
            console.log(error);
        }
    }


    useEffect(() => {
        getProduct();
    }, [])

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2x1 mb-4 block text-center">
                Update the product details
            </h2>
            <form onSubmit={updateProduct}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focu:outline-none focu:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter name"></input>
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focu:outline-none focu:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter price"></input>
                    </div>
                    <div>
                        <label>Ingredients</label>
                        <input type="text" value={product.ingredients} onChange={(e) => setProduct({...product, ingredients: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focu:outline-none focu:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter ingredients"></input>
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focu:outline-none focu:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter image url"></input>
                    </div>
                    <div>
                        { !isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-green-600 hover:cursor-pointer">Update</button>)}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPage;