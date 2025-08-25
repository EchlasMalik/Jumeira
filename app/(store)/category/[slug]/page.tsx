// app/category/[slug]/page.tsx
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client"
import { Category, Product } from "@/sanity.types"
import ProductGrid from "@/components/ProductGrid"

// Query: fetch the category and all products that reference it
const query = groq`
  *[_type == "category" && slug.current == $slug][0]{
    title,
    description,
    "products": *[_type == "product" && references(^._id)]{
      _id,
      name,
      slug,
      price,
      stock,
      description,
      image
    }
  }
`

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const category: (Category & { products: Product[] }) | null =
    await client.fetch(query, { slug })


  if (!category) {
    return <div className="p-6 text-center">Category not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.title}</h1>
        {category.description && (
          <p className="mt-2 text-gray-600">{category.description}</p>
        )}
      </div>

      {/* Products */}
      {category.products?.length > 0 ? (
        <ProductGrid products={category.products} />
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </div>
  )
}
