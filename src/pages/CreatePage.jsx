import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreatePage = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async(e) => {
        e.preventDefault();
        if(name === "" || price === "" || ingredients === "" || image === ""){
            alert('Please fill out all input completely');
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post("http://localhost:3000/api/products", {name: name, price: price, ingredients: ingredients, image: image});
            alert('Save sucessfully: ' +response.data.name);
            setIsLoading(false);
            navigate("/");
        } catch (error){
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2x1 mb-4 block text-center">
                Add a new product
            </h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focu:outline-none focu:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter name"></input>
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focu:outline-none focu:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter price"></input>
                    </div>
                    <div>
                        <label>Ingredients</label>
                        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focu:outline-none focu:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter ingredients"></input>
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focu:outline-none focu:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter image url"></input>
                    </div>
                    <div>
                        { !isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-green-600 hover:cursor-pointer">Save</button>)}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePage;