import React, { useEffect, useState } from "react";

const resources = {
  brand: {
    image: "/public/logo.png",
    alt: "G/ocery Shop",
    link: "/",
    height: 40,
  },
  search: {
    placeholder: "Search for products...",
    buttonIcon: "bi bi-search",
  },
  navIcons: [
    {
      href: "#",
      icon: "bi bi-person",
      label: "Account",
    },
    {
      href: "#",
      icon: "bi bi-heart",
      label: "Wishlist",
    },
    {
      href: "#",
      icon: "bi bi-cart",
      label: "Cart",
      badge: 0,
      badgeClass: "badge bg-primary rounded-pill",
      extra: {
        "data-bs-toggle": "offcanvas",
        "data-bs-target": "#cartDrawer",
      },
    },
  ],
};

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const stored = localStorage.getItem("cart");
    let items = [];
    try {
      items = stored ? JSON.parse(stored) : [];
    } catch {
      items = [];
    }
    // items is array of {slug, quantity}
    const count = items.reduce(
      (sum: number, item: any) => sum + (item.quantity || 0),
      0
    );
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cart") updateCartCount();
    };
    const onCartUpdated = () => updateCartCount();
    window.addEventListener("storage", onStorage);
    window.addEventListener("cartUpdated", onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cartUpdated", onCartUpdated);
    };
  }, []);

  return (
    <header className="sticky-top bg-white shadow-sm">
      <div className="navbar navbar-expand-lg py-3">
        <div className="container d-flex align-items-center justify-content-between position-relative">
          {/* Navbar toggler on the left (mobile) */}
          <button
            className="navbar-toggler order-1 d-lg-none me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Logo centered (mobile) */}
          <a
            className="navbar-brand mx-auto order-2 d-block d-lg-none position-absolute start-50 translate-middle-x"
            href={resources.brand.link}
            style={{ left: "50%", right: "auto" }}
          >
            <img
              src={resources.brand.image}
              alt={resources.brand.alt}
              height={resources.brand.height}
            />
          </a>
          {/* Logo left (desktop) */}
          <a
            className="navbar-brand d-none d-lg-block order-lg-1"
            href={resources.brand.link}
          >
            <img
              src={resources.brand.image}
              alt={resources.brand.alt}
              height={resources.brand.height}
            />
          </a>

          {/* Search bar (desktop only) */}
          <div
            className="d-none d-lg-flex mx-auto flex-grow-1 order-lg-2"
            style={{ maxWidth: 640 }}
          >
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder={resources.search.placeholder}
              />
              <button className="btn btn-primary" type="button">
                <i className={resources.search.buttonIcon}></i>
              </button>
            </div>
          </div>

          {/* Nav icons on the right */}
          <div className="d-flex align-items-center gap-3 order-3 ms-auto">
            {resources.navIcons.map((item, idx) => {
              if (item.icon === "bi bi-cart") {
                return (
                  <a
                    key={item.icon}
                    href={item.href}
                    className="text-dark text-decoration-none"
                    {...item.extra}
                  >
                    <i className={`${item.icon} fs-5`}></i>
                    <span className={item.badgeClass}>{cartCount}</span>
                  </a>
                );
              }
              return (
                <a
                  key={item.icon}
                  href={item.href}
                  className="text-dark text-decoration-none"
                  aria-label={item.label}
                >
                  <i className={`${item.icon} fs-5`}></i>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="shopDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Fruits & Vegetables
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Meat & Seafood
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Bakery
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dairy & Eggs
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Pantry
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      View All Categories
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="discoverDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Discover
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="discoverDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Seasonal Specials
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Recipe Inspiration
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Health & Wellness
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Deals
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Gift Cards
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
