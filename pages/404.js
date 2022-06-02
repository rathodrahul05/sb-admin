import Link from "next/link";
import React from "react";
import FullLayout from "../src/layouts/FullLayout";

export default function PageNotFound() {
  return (
    <div className="container-fluid">
      {/* <!-- 404 Error Text --> */}
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <p className="lead text-gray-800 mb-5">Page Not Found</p>
        <p className="text-gray-500 mb-0">
          It looks like you found a glitch in the matrix...
        </p>
        <Link href="/">
          <a>&larr; Back to Dashboard</a>
        </Link>
      </div>
    </div>
  );
}

PageNotFound.getLayout = function PageLayout(page) {
  return (
    <>
      <FullLayout>{page}</FullLayout>
    </>
  );
};
