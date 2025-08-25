'use client'
import { Category } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";
import CategoryThumb from "./CategoryThumb";

function CategoryGrid({ categories }: {categories: Category[]}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {categories?.map((category) => {
                return (
                    <AnimatePresence key={category._id}>
                        <motion.div
                            layout
                            initial={{ opacity: 0.2}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            className="flex justify-center"
                        >
                        <CategoryThumb key={category._id} category={category} />
                        </motion.div>
                    </AnimatePresence>
                )
            })}

        </div>
    );
}

export default CategoryGrid