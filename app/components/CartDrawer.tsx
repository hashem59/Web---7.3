import React, { useEffect, useState } from "react";
import { getProductBySlug } from "../data/products";

type CartItem = { slug: string; quantity: number };

export default function CartDrawer() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartProducts, setCartProducts] = useState<any[]>([]);

  // Helper to load cart from localStorage
  const loadCart = () => {
    const stored = localStorage.getItem("cart");
    let items: CartItem[] = [];
    try {
      items = stored ? JSON.parse(stored) : [];
    } catch {
      items = [];
    }
    setCartItems(items);
    setCartProducts(
      items
        .map((item) => {
          const product = getProductBySlug(item.slug);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean)
    );
  };

  useEffect(() => {
    loadCart();
    // Listen for cart updates from other tabs or custom events
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cart") loadCart();
    };
    const onCartUpdated = () => loadCart();
    window.addEventListener("storage", onStorage);
    window.addEventListener("cartUpdated", onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cartUpdated", onCartUpdated);
    };
  }, []);

  // Calculate subtotal
  const subtotal = cartProducts.reduce(
    (sum, p) => sum + (p?.price || 0) * (p?.quantity || 1),
    0
  );
  const delivery = subtotal > 50 ? 0 : 5;
  const total = subtotal + delivery;

  // Remove one unit of a product from cart
  const removeOne = (slug: string) => {
    let items = [...cartItems];
    const idx = items.findIndex((item) => item.slug === slug);
    if (idx !== -1) {
      if (items[idx].quantity > 1) {
        items[idx].quantity -= 1;
      } else {
        items.splice(idx, 1);
      }
      setCartItems(items);
      setCartProducts(
        items
          .map((item) => {
            const product = getProductBySlug(item.slug);
            return product ? { ...product, quantity: item.quantity } : null;
          })
          .filter(Boolean)
      );
      localStorage.setItem("cart", JSON.stringify(items));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="cartDrawer">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">
          Cart ({cartProducts.reduce((sum, p) => sum + (p?.quantity || 1), 0)}{" "}
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
          {cartProducts.map((product, idx) => (
            <div className="card mb-3" key={product.slug}>
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={product.thumbnails[0]}
                    className="img-fluid rounded-start"
                    alt={product.name}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h6 className="card-title">{product.name}</h6>
                    <p className="card-text text-primary fw-bold">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="d-flex align-items-center">
                      <span className="mx-2">{product.quantity}</span>
                      <button
                        className="btn btn-sm btn-link text-danger ms-auto"
                        onClick={() => removeOne(product.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      </div>
    </div>
  );
}
