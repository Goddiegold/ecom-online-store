import {API} from "../../backend";

export const getProducts = async () =>
 await (await fetch(`${API}products/`,{method:"GET"})).json()