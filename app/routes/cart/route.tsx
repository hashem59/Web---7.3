import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import {
  getCartIdFromRequest,
  setCartIdInResponse,
  ensureCartId,
  getCart,
} from "./cart";
import crypto from "crypto";
import db from "../../db.server";
import { getProductById } from "~/utils/GetProductByField";

export const meta: MetaFunction = () => {
  return [{ title: "Cart" }, { name: "description", content: "Cart" }];
};

export async function action({ request }: ActionFunctionArgs) {
  // This route no longer handles add/update/delete actions.
  return json(
    { error: "Invalid cart action. Use /cart/add, /cart/update, or /cart/delete." },
    { status: 400 }
  );
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const response = new Response();
  const cartId = await getCartIdFromRequest(request);
  let cart = null;
  if (!cartId) {
    const newCartId = crypto.randomUUID();
    setCartIdInResponse(response, newCartId);
    cart = { items: [], count: 0 };
  } else {
    cart = await getCart(cartId);
    if (!cart) {
      await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO cart (cart_id) VALUES (?)",
          [cartId],
          function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
          }
        );
      });
      cart = { items: [], count: 0 };
    }
  }
  return json({ cart });
}
