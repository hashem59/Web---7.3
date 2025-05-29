import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  getCartIdFromRequest,
  setCartIdInResponse,
  ensureCartId,
  getCart,
} from "../cart/cart";
import crypto from "crypto";
import db from "../../db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const productId = formData.get("product_id");
  let response = new Response();
  const cartId = await ensureCartId(request, response);
  if (!productId) {
    return json({ error: "Missing product id" }, { status: 400 });
  }
  await new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, productId],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      }
    );
  });
  const cart = await getCart(cartId);
  return json(
    { cart, success: true, message: "Item removed from cart" },
    { headers: response.headers }
  );
}
