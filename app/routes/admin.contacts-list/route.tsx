import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "../../db.server";

export const meta: MetaFunction = () => [
  { title: "Contact Form Submissions" },
  { name: "description", content: "List of all contact form submissions" },
];

export async function loader({}: LoaderFunctionArgs) {
  const submissions = await new Promise<any[]>((resolve, reject) => {
    db.all(
      "SELECT id, name, email, phone, subject, message, privacy, created_at FROM contact_forms ORDER BY created_at DESC",
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
  return json({ submissions });
}

export default function ContactFormList() {
  const { submissions } = useLoaderData<typeof loader>();
  return (
    <div className="container py-5">
      <h1 className="mb-4">Contact Form Submissions</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Privacy</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-muted">
                  No submissions found.
                </td>
              </tr>
            ) : (
              submissions.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.subject}</td>
                  <td style={{ maxWidth: 300, wordBreak: "break-word" }}>
                    {s.message}
                  </td>
                  <td>{s.privacy ? "Yes" : "No"}</td>
                  <td>{s.created_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
