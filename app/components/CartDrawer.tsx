import React from "react";
import { useFetcher } from "@remix-run/react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const fetcher = useFetcher({ key: "add-to-cart" });
  const cartProducts = fetcher.data?.cart?.items || [];

  // Calculate subtotal
  const subtotal = cartProducts.reduce(
    (sum: number, p: any) =>
      sum + (p?.product?.price || 0) * (p?.quantity || 1),
    0
  );
  const delivery = subtotal > 50 ? 0 : 5;
  const total = subtotal + delivery;

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    fetcher.submit(
      {
        product_id: productId,
        quantity: newQuantity.toString(),
      },
      { method: "post", action: "/cart/update" }
    );
  };

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="cartDrawer">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">
          Cart (
          {cartProducts.reduce(
            (sum: number, p: any) => sum + (p?.quantity || 1),
            0
          )}{" "}
          items)
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div className="offcanvas-body d-flex flex-column">
        <div className="alert alert-info">
          {subtotal > 50
            ? "You have unlocked free delivery!"
            : "Unlock free delivery on orders over $50"}
        </div>
        <div className="cart-items flex-grow-1 overflow-auto">
          {cartProducts.length === 0 && (
            <div className="text-center text-muted py-5">
              Your cart is empty.
            </div>
          )}
          {cartProducts.map((item: any, idx: number) => (
            <div className="card mb-3" key={item.product.slug}>
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={item.product.thumbnails[0]}
                    className="img-fluid rounded-start"
                    alt={item.product.name}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h6 className="card-title">{item.product.name}</h6>
                    <p className="card-text text-primary fw-bold">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="d-flex align-items-center">
                      <fetcher.Form
                        method="post"
                        action="/cart/update"
                        style={{ display: "inline-flex", alignItems: "center" }}
                      >
                        <input
                          type="hidden"
                          name="product_id"
                          value={item.product.id}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          name="quantity-decrease"
                          disabled={
                            item.quantity <= 1 || fetcher.state === "submitting"
                          }
                          style={{ minWidth: 32 }}
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          min={1}
                          className="form-control form-control-sm mx-1 text-center"
                          style={{ width: 50 }}
                          onChange={(e) =>
                            updateQuantity(
                              item.product.id,
                              parseInt(e.target.value)
                            )
                          }
                          disabled={fetcher.state === "submitting"}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          name="quantity-increase"
                          disabled={fetcher.state === "submitting"}
                          style={{ minWidth: 32 }}
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </fetcher.Form>
                      <fetcher.Form
                        method="post"
                        action="/cart/delete"
                        style={{ display: "inline" }}
                      >
                        <input
                          type="hidden"
                          name="product_id"
                          value={item.product.id}
                        />
                        <button
                          type="submit"
                          className="btn btn-sm btn-link text-danger ms-2"
                          disabled={fetcher.state === "submitting"}
                        >
                          Remove
                        </button>
                      </fetcher.Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartProducts.length > 0 && (
          <div className="cart-summary mt-auto">
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery</span>
              <span>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold">Total</span>
              <span className="fw-bold">${total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary w-100"
              disabled={cartProducts.length === 0}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
