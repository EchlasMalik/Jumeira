import { Category } from "@/sanity.types"
import Link from "next/link"
import Image from "next/image"
import { imageUrl } from "@/lib/imageUrl"

function CategoryThumb({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug?.current}`}
      className="group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative aspect-square w-full h-full overflow-hidden">
        {category.image && (
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(category.image).url()}
            alt={category.title || "Category Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Text Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {category.title}
        </h2>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {category.description || "No description available"}
        </p>

        <div className="mt-3">
          <span className="text-sm font-medium text-blue-600 group-hover:underline">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CategoryThumb
