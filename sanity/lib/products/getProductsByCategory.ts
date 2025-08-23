import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {

    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
            *[
                _type == "product"
                && references(*[_type == "category" && slug.current == $categorySlug]._id)
            ] | order(name asc)
            `);

        try {
                // Use sanityFetch to send the query
                const products = await sanityFetch({
                    query: PRODUCTS_BY_CATEGORY_QUERY,
                    params: {
                        categorySlug,
                    },
                });
        
                // Return the list of categories, or an empty array id none are found
                return products.data || [];
            } catch (error) {
                console.error("Error fetching products by category:", error);
                return [];
            }
    
}