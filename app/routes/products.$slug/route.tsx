import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import ProductsList from "../../components/ProductsList";

export const meta: MetaFunction = () => {
  return [
    { title: "Product Details" },
    { name: "description", content: "Product Details" },
  ];
};

import { productsPlaceholders } from "../../data/products";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const product = productsPlaceholders.find(
    (product) => product.slug === params.slug
  );
  return json(product);
}

export default function Product() {
  const product = useLoaderData<typeof loader>();
  const [mainImage, setMainImage] = useState(product?.image[0]);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    setMainImage(product?.image[0]);
  }, [product]);
  if (!product) {
    return (
      <section className="product-details py-5">
        <div className="container">
          <h2>Product not found</h2>
        </div>
      </section>
    );
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <section className="product-details py-5 bg-red-500">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Fruits & Vegetables</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="product-image-container">
                <img
                  src={mainImage}
                  className="img-fluid rounded main-product-image"
                  alt={product.name}
                />
                <div className="thumbnail-container mt-3 d-flex gap-2">
                  {product.thumbnails.map((thumb, idx) => (
                    <img
                      key={idx}
                      src={thumb}
                      className="img-thumbnail thumbnail-img"
                      alt={`Thumbnail ${idx + 1}`}
                      style={{
                        cursor: "pointer",
                        border:
                          mainImage === thumb ? "2px solid #007bff" : undefined,
                      }}
                      onClick={() => setMainImage(thumb)}
                      tabIndex={0}
                      role="button"
                      aria-pressed={mainImage === thumb}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setMainImage(thumb);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="product-info">
                <h1 className="product-title mb-2">{product.name}</h1>
                <div className="product-rating mb-3">
                  <div className="d-flex align-items-center">
                    <div className="text-warning me-2">
                      {Array.from({ length: Math.floor(product.rating) }).map(
                        (_, i) => (
                          <i className="bi bi-star-fill" key={i}></i>
                        )
                      )}
                      {product.rating % 1 !== 0 && (
                        <i className="bi bi-star-half"></i>
                      )}
                    </div>
                    <span className="text-muted">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="product-price mb-3">
                  <h2 className="text-primary mb-0">
                    ${product.price.toFixed(2)}
                  </h2>
                  <small className="text-muted">{product.pricePer}</small>
                </div>
                <div className="product-notes mb-4">
                  {product.notes.map((note, idx) => (
                    <div className="d-flex align-items-center mb-2" key={idx}>
                      <i className={note.icon + " me-2"}></i>
                      <span>{note.text}</span>
                    </div>
                  ))}
                </div>
                <div className="product-actions mb-4">
                  <div className="quantity-picker d-none mb-3">
                    <div className="d-flex align-items-center">
                      <label className="me-2">Quantity:</label>
                      <div className="input-group" style={{ width: 150 }}>
                        <button
                          className="btn btn-outline-secondary decrease-qty"
                          type="button"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center qty-input"
                          value="1"
                          min="1"
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                        <button
                          className="btn btn-outline-secondary increase-qty"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button className="btn btn-primary btn-lg confirm-add-to-cart">
                        <i className="bi bi-cart-plus me-2"></i>Add to Cart
                      </button>
                      <button className="btn btn-outline-secondary cancel-add-to-cart">
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div className="add-to-cart-button">
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary btn-lg show-quantity-picker"
                        onClick={() => {
                          const stored = localStorage.getItem("cart");
                          let cart: Array<{ slug: string; quantity: number }> =
                            [];
                          try {
                            cart = stored ? JSON.parse(stored) : [];
                          } catch {
                            cart = [];
                          }
                          // Find if product is already in cart
                          const idx = cart.findIndex(
                            (item: any) => item.slug === product.slug
                          );
                          if (idx !== -1) {
                            cart[idx].quantity += 1;
                          } else {
                            cart.push({ slug: product.slug, quantity: 1 });
                          }
                          localStorage.setItem("cart", JSON.stringify(cart));
                          setAdded(true);
                          setTimeout(() => setAdded(false), 1200);
                          // Open the cart drawer
                          if (
                            typeof window !== "undefined" &&
                            (window as any).bootstrap &&
                            document
                          ) {
                            const drawer =
                              document.getElementById("cartDrawer");
                            if (drawer) {
                              const offcanvas = (
                                window as any
                              ).bootstrap.Offcanvas.getOrCreateInstance(drawer);
                              offcanvas.show();
                            }
                          }
                          // Notify cart drawer to re-render
                          window.dispatchEvent(new Event("cartUpdated"));
                        }}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        {added ? "Added!" : "Add to Cart"}
                      </button>
                      <button className="btn btn-outline-primary">
                        <i className="bi bi-heart me-2"></i>Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-description">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="product-tabs mt-5">
            <ul className="nav nav-tabs" id="productTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="details-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#details"
                  type="button"
                  role="tab"
                  aria-controls="details"
                  aria-selected="true"
                >
                  Product Details
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="ingredients-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#ingredients"
                  type="button"
                  role="tab"
                  aria-controls="ingredients"
                  aria-selected="false"
                >
                  Ingredients
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="storage-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#storage"
                  type="button"
                  role="tab"
                  aria-controls="storage"
                  aria-selected="false"
                >
                  Storage
                </button>
              </li>
            </ul>
            <div
              className="tab-content p-4 border border-top-0 rounded-bottom"
              id="productTabsContent"
            >
              <div
                className="tab-pane fade show active"
                id="details"
                role="tabpanel"
                aria-labelledby="details-tab"
              >
                <h4>Product Details</h4>
                <p>{product.details.text}</p>
                <ul>
                  {product.details.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="ingredients"
                role="tabpanel"
                aria-labelledby="ingredients-tab"
              >
                <h4>Ingredients</h4>
                <ul>
                  {product.details.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
                <p>{product.details.ingredientsNote}</p>
              </div>
              <div
                className="tab-pane fade"
                id="storage"
                role="tabpanel"
                aria-labelledby="storage-tab"
              >
                <h4>Storage Instructions</h4>
                <p>{product.details.storage}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related products section */}
      {product &&
        (() => {
          const related = productsPlaceholders.filter(
            (p) => p.category === product.category && p.slug !== product.slug
          );
          return related.length > 0 ? (
            <ProductsList title="Related Products" products={related} />
          ) : null;
        })()}
    </div>
  );
}
