import axios from "axios";

export async function getCountries() {
    const res = await axios.get("/api/countries");
    return res.data;
}