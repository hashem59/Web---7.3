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
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE cart_items SET quantity = ?, last_updated_at = CURRENT_TIMESTAMP WHERE cart_id = ? AND product_id = ?",
      [quantity, cartId, productId],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      }
    );
  });
  const cart = await getCart(cartId);
  return json(
    { cart, success: true, message: "Cart item updated" },
    { headers: response.headers }
  );
}
