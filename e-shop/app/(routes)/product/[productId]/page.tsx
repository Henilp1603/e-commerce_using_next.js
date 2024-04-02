import React from 'react'
import getProducts from '@/actions/getProducts'
import getProduct from "@/actions/getProduct"
import Container from '@/components/ui/Container'
import ProductList from '@/components/ProductList'
import Gallery from '@/components/gallery/Gallery'
import Info from '@/components/ui/Info'

interface ProductPageprops{
    params:{
        productId:string
    }
}
const ProductPage:React.FC<ProductPageprops> = async({params}) => {
    const product =await getProduct(params.productId)
    const suggestedProducts=await getProducts({
        categoryId:product?.category?.id
    })



  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10">
            <Gallery images={product.images} />
            <div className="mt-10 px-8 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  )
}

export default ProductPage