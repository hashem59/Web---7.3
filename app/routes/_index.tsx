import type { MetaFunction } from "@remix-run/node";
import { productsPlaceholders } from "../data/products";
import ProductsList from "../components/ProductsList";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {resources.carousel.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : undefined}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {resources.carousel.map((item, idx) => (
            <div
              className={`carousel-item${idx === 0 ? " active" : ""}`}
              key={item.title}
              style={{ backgroundColor: item.backgroundColor }}
            >
              <div className="container py-4 py-lg-0">
                <div className="d-flex flex-column flex-lg-row align-items-center">
                  {/* Text Section */}
                  <div
                    className="w-100 w-lg-50 d-flex align-items-center justify-content-center order-2 order-lg-1 mb-3 mb-lg-0"
                    style={{ height: "auto" }}
                  >
                    <div
                      className="carousel-content p-4 rounded w-100 text-center text-lg-start"
                      style={{ color: item.textColor }}
                    >
                      <h1
                        className="display-4 fw-bold mb-4"
                        style={{ color: item.textColor }}
                      >
                        {item.title}
                      </h1>
                      <p
                        className="lead mb-4"
                        style={{ color: item.textColor }}
                      >
                        {item.description}
                      </p>
                      <a
                        href={item.buttonLink}
                        className="btn btn-primary btn-lg"
                      >
                        {item.button}
                      </a>
                    </div>
                  </div>
                  {/* Image Section */}
                  <div
                    className="w-100 w-lg-50 d-flex align-items-center justify-content-center order-1 order-lg-2"
                    style={{ height: "auto" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="category-nav py-4">
        <div className="container">
          <div className="row g-3 text-center">
            {resources.categories.map((cat) => (
              <div className="col-6 col-md-3" key={cat.title}>
                <a href={cat.link} className="text-decoration-none text-dark">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="img-fluid mb-2"
                  />
                  <p className="mb-0">{cat.title}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recommended-products py-5">
        <div className="container">
          <ProductsList
            title={resources.recommendedProducts.title}
            products={resources.recommendedProducts.products}
          />
        </div>
      </section>

      <section className="weekly-specials py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="display-6 mb-3">{resources.weeklySpecials.title}</h2>
          <a
            href={resources.weeklySpecials.buttonLink}
            className="btn btn-light btn-lg"
          >
            {resources.weeklySpecials.button}
          </a>
        </div>
      </section>

      <section className="seasonal-promotions py-5">
        <div className="container">
          <div className="row g-4">
            {resources.seasonalPromotions.promotions.map((promo) => (
              <div className="col-md-6" key={promo.title}>
                <div className="card bg-light">
                  <div className="card-body text-center p-5">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="img-fluid mb-3"
                    />
                    <h3>{promo.title}</h3>
                    <p>{promo.description}</p>
                    <a href={promo.buttonLink} className="btn btn-primary">
                      {promo.button}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recipe-inspiration py-5 bg-light">
        <div className="container">
          <h2 className="mb-4">Recipe Inspiration</h2>
          <div className="row g-4">
            {resources.recipeInspiration.map((recipe) => (
              <div className="col-md-4" key={recipe.title}>
                <div className="card h-100">
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{recipe.description}</p>
                    <a
                      href={recipe.buttonLink}
                      className="btn btn-outline-primary"
                    >
                      {recipe.button}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="info-highlights py-5">
        <div className="container">
          <div className="row g-4 text-center">
            {resources.infoHighlights.map((info) => (
              <div className="col-md-4" key={info.title}>
                <i className={`${info.icon} fs-1 text-primary`}></i>
                <h4 className="mt-3">{info.title}</h4>
                <p>{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const resources = {
  carousel: [
    {
      image: "/public/images/home-slide-1.png",
      title: "Fresh Food Delivered Daily",
      description:
        "Get your groceries delivered to your doorstep with our fast and reliable service.",
      button: "Shop Now",
      buttonLink: "#",
      backgroundColor: "#EDC191",
      textColor: "#000000",
    },
    {
      image: "/public/images/home-slide-2.png",
      title: "100% Organic Products",
      description:
        "Discover our selection of premium organic products for a healthier lifestyle.",
      button: "Explore Organic",
      buttonLink: "#",
      backgroundColor: "#C9E02F",
      textColor: "#000000",
    },
    {
      image: "https://placehold.co/1920x800/dc3545/FFFFFF?text=Weekly+Specials",
      title: "Save Up To 50%",
      description:
        "Check out our weekly specials and deals on your favorite products.",
      button: "View Specials",
      buttonLink: "#",
      backgroundColor: "#EDC191",
      textColor: "#000000",
    },
  ],
  categories: [
    {
      image: "/public/images/organic-banana.png",
      title: "Fruits & Vegetables",
      link: "#",
    },
    {
      image: "/public/images/coll--meat-and-sea-food.png",
      title: "Meat & Seafood",
      link: "#",
    },
    {
      image: "/public/images/coll--bakery.png",
      title: "Bakery",
      link: "#",
    },
    {
      image: "/public/images/coll--dairy-and-eggs.png",
      title: "Dairy & Eggs",
      link: "#",
    },
  ],
  recommendedProducts: {
    title: "Recommended Products",
    products: [0, 4, 8, 11].map((idx) => productsPlaceholders[idx]),
  },
  weeklySpecials: {
    title: "Save up to 50% on Weekly Specials",
    button: "View All Specials",
    buttonLink: "#",
  },
  seasonalPromotions: {
    title: "Seasonal Promotions",
    promotions: [
      {
        image: "public/images/easter-specials.png",
        title: "Easter Specials",
        description: "Celebrate Easter with our special deals",
        button: "Shop Now",
        buttonLink: "#",
      },
      {
        image: "public/images/back-to-school.png",
        title: "Back to School",
        description: "Get ready for the new school year",
        button: "Shop Now",
        buttonLink: "#",
      },
    ],
  },
  recipeInspiration: [
    {
      image: "/public/images/healthy-meals.jpg",
      title: "Healthy Breakfast Bowl",
      description:
        "Start your day with this nutritious and delicious breakfast bowl.",
      button: "View Recipe",
      buttonLink: "#",
    },
    {
      image: "public/images/markus-winkler-hTZesigJSwg-unsplash.jpg",
      title: "Quick Lunch Ideas",
      description: "Fast and healthy lunch recipes for busy weekdays.",
      button: "View Recipe",
      buttonLink: "#",
    },
    {
      image: "public/images/babs-gorniak-ls_8yZKSqXE-unsplash.jpg",
      title: "Family Dinner Favorites",
      description: "Delicious dinner recipes the whole family will love.",
      button: "View Recipe",
      buttonLink: "#",
    },
  ],
  infoHighlights: [
    {
      icon: "bi bi-truck",
      title: "Free Delivery",
      description: "On orders over $50",
    },
    {
      icon: "bi bi-arrow-return-left",
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: "bi bi-headset",
      title: "24/7 Support",
      description: "Always here to help",
    },
  ],
};

<style>{`
  @media (min-width: 992px) {
    .carousel-item {
      min-height: 400px;
    }
  }
`}</style>;
