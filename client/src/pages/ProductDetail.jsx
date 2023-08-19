import React, { useState } from 'react'

function ProductDetail() {
  const data = [
    {
      id: 1,
      url: "https://minimalist-e-commerce.vercel.app/static/media/9.c6d969e8587dd1042095.png",
    },
    {
      id: 2,
      url: "https://minimalist-e-commerce.vercel.app/static/media/10.01ad0d2d385553f6ea92.jpg",
    },
    {
      id: 3,
      url: "https://minimalist-e-commerce.vercel.app/static/media/comfy2.30dc70daece04724180b.webp",
    },
    {
      id: 4,
      url: "https://minimalist-e-commerce.vercel.app/static/media/12.ce8de8e38ff2dc475ed6.png",
    },
  ];

  const [productImage, setProductImage] = useState(data);
  const [value, setValue] = useState(0);

  const { url } = productImage[value];

  return (
    <section className='max-w-7xl  mx-auto grid grid-cols-1 lg:grid-cols-2'>
      <article>
        <img src={url} alt="" className='w-9/12 h-9/12 rounded-2xl' />
        <ul className='flex items-center justify-start gap-5 flex-wrap mt-5'>
          {
            productImage.map((item,index) => (
              <li onClick={() => setValue(index)} key={item.id}>
                <img src={item.url} alt="" className='w-20 rounded-xl' />
              </li>
            ))
          }
        </ul>
      </article>
      <article>
        <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut id quibusdam eveniet enim fugit laborum perferendis aliquam, amet itaque incidunt voluptatibus eaque. Dolorum pariatur perspiciatis at, error odit illum voluptate!</h1>
      </article>
    </section>
  )
}

export default ProductDetail