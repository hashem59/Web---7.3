import { ActionFunctionArgs, json } from "@remix-run/node";
import { ensureCartId, getCart } from "../cart/cart";
import db from "../../db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const productId = formData.get("product_id");
  const quantity = parseInt(formData.get("quantity") as string, 10) || 1;
  let response = new Response();
  const cartId = await ensureCartId(request, response);
  if (!productId) {
    return json({ error: "Missing product id" }, { status: 400 });
  }
  const product = await new Promise<any>((resolve, reject) => {
    db.get("SELECT id FROM products WHERE id = ?", [productId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
  if (!product) {
    return json({ error: "Product not found" }, { status: 404 });
  }
  const prodId = product.id;
  const existingItem = await new Promise<any>((resolve, reject) => {
    db.get(
      "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, prodId],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
  if (existingItem) {
    await new Promise((resolve, reject) => {
      db.run(
        "UPDATE cart_items SET quantity = quantity + ?, last_updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [quantity, existingItem.id],
        function (err) {
          if (err) return reject(err);
          resolve(this.changes);
        }
      );
    });
  } else {
    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cartId, prodId, quantity],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  }
  const cart = await getCart(cartId);
  return json(
    { cart, success: true, message: "Item added to cart" },
    { headers: response.headers }
  );
}
