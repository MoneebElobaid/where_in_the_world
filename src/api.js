import axios from "axios";

export async function getCountries() {
    const res = await axios.get("http://localhost:4000/countries");
    return res.data;
}