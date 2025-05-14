import React from "react";

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string[];
};

type ProductsListProps = {
  title: string;
  products: Product[];
};

export default function ProductsList({ title, products }: ProductsListProps) {
  return (
    <section className="recommended-products py-5">
      <div className="container">
        <h2 className="mb-4">{title}</h2>
        <div className="row g-4">
          {products.map((prod) => (
            <div className="col-6 col-md-3" key={prod.id}>
              <div className="card h-100">
                <a
                  href={`/products/${prod.slug}`}
                  className="text-decoration-none"
                >
                  <img
                    src={prod.image[0]}
                    className="card-img-top"
                    alt={prod.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-dark">{prod.name}</h5>
                    <p className="card-text text-primary fw-bold">
                      ${prod.price.toFixed(2)}
                    </p>
                    <button className="btn btn-outline-primary w-100">
                      View Product
                    </button>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
