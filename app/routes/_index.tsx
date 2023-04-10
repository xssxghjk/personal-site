import type { V2_MetaFunction } from "@remix-run/node";
import {Link} from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function _index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Hi, I'm Enes</h1>
      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link
            to="/travel"
            className="text-xl text-blue-600 underline"
        >
          Travel
        </Link>
      </div>
    </div>
  );
}
