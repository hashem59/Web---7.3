import { createCookie, redirect } from "@remix-run/node";
import db from "../../db.server";
import { getProductById } from "~/utils/GetProductByField";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
  console.warn(
    "🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production."
  );
  secret = "default-secret";
}

let cookie = createCookie("cart", {
  secrets: [secret],
  // 30 days
  maxAge: 30 * 24 * 60 * 60,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

export async function getCartIdFromRequest(
  request: Request
): Promise<string | null> {
  let cartId = await cookie.parse(request.headers.get("Cookie"));
  return cartId ?? null;
}

export async function setCartIdInResponse(response: Response, cartId: string) {
  response.headers.set("Set-Cookie", await cookie.serialize(cartId));
}

import crypto from "crypto";

export async function ensureCartId(
  request: Request,
  response: Response
): Promise<string> {
  let cartId = await getCartIdFromRequest(request);
  if (!cartId) {
    cartId = crypto.randomUUID();
    await new Promise((resolve, reject) => {
      db.run("INSERT INTO cart (cart_id) VALUES (?)", [cartId], function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      });
    });
    await setCartIdInResponse(response, cartId);
    return cartId;
  }
  const cart = await new Promise<any>((resolve, reject) => {
    db.get("SELECT * FROM cart WHERE cart_id = ?", [cartId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
  if (!cart) {
    await new Promise((resolve, reject) => {
      db.run("INSERT INTO cart (cart_id) VALUES (?)", [cartId], function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      });
    });
  }
  return cartId;
}

// Utility to get cart with items and count
export async function getCart(cartId: string) {
  // Get cart row
  const cart = await new Promise<any>((resolve, reject) => {
    db.get("SELECT * FROM cart WHERE cart_id = ?", [cartId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
  // Get cart items
  const cartItems =
    (await new Promise<any[]>((resolve, reject) => {
      db.all(
        "SELECT * FROM cart_items WHERE cart_id = ?",
        [cartId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    })) || [];
  // Attach product info
  const itemsProducts = await Promise.all(
    cartItems.map(async (item: any) => {
      const product = await getProductById(item.product_id);
      return { ...item, product };
    })
  );
  // Calculate count
  const count = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  return { ...cart, items: itemsProducts, count };
}
