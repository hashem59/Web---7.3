import db from "../db.server";

function parseField(field) {
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch {
      return field;
    }
  }
  return field;
}

function mapProductRow(product) {
  if (!product) return null;
  return {
    id: product.id,
    slug: product.slug,
    category: product.category,
    name: product.name,
    price: product.price,
    pricePer: product.pricePer,
    image: parseField(product.image),
    thumbnails: parseField(product.thumbnails),
    rating: product.rating,
    reviews: product.reviews,
    notes: parseField(product.notes),
    description: product.description,
    details: parseField(product.details),
  };
}

async function getProductByField(field, value) {
  const product = await new Promise((resolve, reject) => {
    db.get(`SELECT * FROM products WHERE ${field} = ?`, [value], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
  return mapProductRow(product);
}

export const getProductBySlug = (slug) => getProductByField("slug", slug);
export const getProductById = (id) => getProductByField("id", id);
