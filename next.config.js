const path = require("path");
require("dotenv").config();

const development =
  "default-src 'self' https://m-one.kalbe.co.id:8243/t/ http://kpartner-auth-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-masterdata-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-datamaster-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://file-development-kf-asd-general-dev.apps.alpha.kalbe.co.id http://kpartner-suppliermanagement-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/Supplier http://kpartner-suppliermanagement-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/Supplier http://kpartner-suppliermanagement-staging-kf-asd-kpartner-staging.apps.alpha.kalbe.co.id http://kpartner-suggestionproject-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-budget-request-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-suppliermanagement-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-task-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-suggestion-contract-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-request-forecast-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-forecast-calculation-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-request-bid-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-contract-bidding-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-contract-approval-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-contract-lifecycle-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-print-out-setting-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id http://kpartner-datahistory-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id fonts.googleapis.com fonts.gstatic.com 'unsafe-eval'; style-src 'self' fonts.googleapis.com 'unsafe-inline'; font-src fonts.gstatic.com; img-src * blob: data:; frame-src youtube.com https://www.youtube.com;";

const env = `default-src ${process.env.NEXT_PUBLIC_API_MY_TASK} localhost:8080 ws://localhost:8080/ blob: http://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.js https://m-one.kalbe.co.id:8243/t/ ${process.env.NEXT_PUBLIC_API_MANUFACTURE_URL} ${process.env.NEXT_PUBLIC_API_UOM_URL} ${process.env.NEXT_PUBLIC_API_COMMENT_URL} ${process.env.NEXT_PUBLIC_API_ASSESSMENT_TASK} ${process.env.NEXT_PUBLIC_API_PROGRESS_APPROVAL_URL} ${process.env.NEXT_PUBLIC_API_REQUEST_FORECAST} ${process.env.NEXT_PUBLIC_API_MONITORING_CONTRACT} ${process.env.NEXT_PUBLIC_API_SUPPLIER_MANAGEMENT_URL} ${process.env.NEXT_PUBLIC_API_REGISTER_SUPPLIER} ${process.env.NEXT_PUBLIC_API_REQUEST_FORCAST} ${process.env.NEXT_PUBLIC_API_MASTER_COUNTRY} ${process.env.NEXT_PUBLIC_API_CONTRACT_APPROVAL} ${process.env.NEXT_PUBLIC_API_SUGGESTION_PROJECT} ${process.env.NEXT_PUBLIC_API_BID_COMPARISON} ${process.env.NEXT_PUBLIC_API_DATA_MASTER} ${process.env.NEXT_PUBLIC_API_REQUEST_BUDGET} ${process.env.NEXT_PUBLIC_API_BID_RESPONSE} ${process.env.NEXT_PUBLIC_API_REQUEST_BID} ${process.env.NEXT_PUBLIC_API_COMMENTS_DEV} ${process.env.NEXT_PUBLIC_API_STAGING_FC} ${process.env.NEXT_PUBLIC_API_STAGING_SC} ${process.env.NEXT_PUBLIC_API_STAGING_URL} ${process.env.NEXT_PUBLIC_API_USER_PROFILE} ${process.env.NEXT_PUBLIC_API_MASTER_TARGET_LT_SOURCING_URL} ${process.env.NEXT_PUBLIC_API_FILES_URL} ${process.env.NEXT_PUBLIC_API_FILES_STAGING_URL} ${process.env.NEXT_PUBLIC_API_MASTER_CLUSTERING_DOCUMENT_URL} ${process.env.NEXT_PUBLIC_API_MASTER_SITE_PRINT_OUT_URL} ${process.env.NEXT_PUBLIC_API_URL} ${process.env.NEXT_PUBLIC_API_AUTH_URL} fonts.googleapis.com fonts.gstatic.com 'unsafe-eval'; style-src 'self' fonts.googleapis.com 'unsafe-inline'; style-src-elem 'unsafe-inline' fonts.googleapis.com 'self'; font-src 'self' data: fonts.gstatic.com; img-src * blob: data:; frame-src youtube.com https://www.youtube.com;`;

const envNEW = `default-src ${process.env.NEXT_PUBLIC_API_MY_TASK} localhost:8080 ws://localhost:8080/ blob: http://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.js ${process.env.NEXT_PUBLIC_API_MANUFACTURE_URL} ${process.env.NEXT_PUBLIC_API_UOM_URL} ${process.env.NEXT_PUBLIC_API_COMMENT_URL} ${process.env.NEXT_PUBLIC_API_ASSESSMENT_TASK} ${process.env.NEXT_PUBLIC_API_PROGRESS_APPROVAL_URL} ${process.env.NEXT_PUBLIC_API_REQUEST_FORECAST} ${process.env.NEXT_PUBLIC_API_MONITORING_CONTRACT} ${process.env.NEXT_PUBLIC_API_SUPPLIER_MANAGEMENT_URL} ${process.env.NEXT_PUBLIC_API_REGISTER_SUPPLIER} ${process.env.NEXT_PUBLIC_API_REQUEST_FORCAST} ${process.env.NEXT_PUBLIC_API_MASTER_COUNTRY} ${process.env.NEXT_PUBLIC_API_CONTRACT_APPROVAL} ${process.env.NEXT_PUBLIC_API_SUGGESTION_PROJECT} ${process.env.NEXT_PUBLIC_API_BID_COMPARISON} ${process.env.NEXT_PUBLIC_API_DATA_MASTER} ${process.env.NEXT_PUBLIC_API_REQUEST_BUDGET} ${process.env.NEXT_PUBLIC_API_BID_RESPONSE} ${process.env.NEXT_PUBLIC_API_REQUEST_BID} ${process.env.NEXT_PUBLIC_API_COMMENTS_DEV} ${process.env.NEXT_PUBLIC_API_STAGING_FC} ${process.env.NEXT_PUBLIC_API_STAGING_SC} ${process.env.NEXT_PUBLIC_API_STAGING_URL} ${process.env.NEXT_PUBLIC_API_USER_PROFILE} ${process.env.NEXT_PUBLIC_API_MASTER_TARGET_LT_SOURCING_URL} ${process.env.NEXT_PUBLIC_API_FILES_URL} ${process.env.NEXT_PUBLIC_API_FILES_STAGING_URL} ${process.env.NEXT_PUBLIC_API_MASTER_CLUSTERING_DOCUMENT_URL} ${process.env.NEXT_PUBLIC_API_MASTER_SITE_PRINT_OUT_URL} ${process.env.NEXT_PUBLIC_API_URL} ${process.env.NEXT_PUBLIC_API_AUTH_URL} fonts.googleapis.com fonts.gstatic.com 'unsafe-eval'; style-src 'self' fonts.googleapis.com 'unsafe-inline'; style-src-elem 'unsafe-inline' fonts.googleapis.com 'self'; font-src 'self' data: fonts.gstatic.com; img-src * blob: data:; frame-src youtube.com https://www.youtube.com;`;

const securityHeaders = [
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Cache-Control",
    value: "public, maxage=60, stale-while-revalidate",
  },
  // {
  //   key: "X-Content-Type-Options",
  //   value: "nosniff",
  // },S
  {
    key: "Content-Security-Policy",
    value: env,
    //  "style-src 'self' 'unsafe-inline' ; connect-src * data: ws: wss:;",
    // "default-src * ; script-src * ; style-src 'self' 'unsafe-hashes' 'sha256-nMxMqdZhkHxz5vAuW/PAoLvECzzsmeAxD/BNwG15HuA=' ; img-src *",
    // "default-src 'self' kalbe.co.id *.kalbe.co.id googleapis.com *.googleapis.com gstatic.com *.gstatic.com; img-src 'self' ",
  },
];

const securityHeadersLogin = [
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Cache-Control",
    value: "public, maxage=60, stale-while-revalidate",
  },
  {
    key: "Content-Security-Policy",
    value: envNEW,
    //  "style-src 'self' 'unsafe-inline' ; connect-src * data: ws: wss:;",
    // "default-src * ; script-src * ; style-src 'self' 'unsafe-hashes' 'sha256-nMxMqdZhkHxz5vAuW/PAoLvECzzsmeAxD/BNwG15HuA=' ; img-src *",
    // "default-src 'self' kalbe.co.id *.kalbe.co.id googleapis.com *.googleapis.com gstatic.com *.gstatic.com; img-src 'self' ",
  },
];

module.exports = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker",
          },
        },
      ],
    });

    return config;
  },
  poweredByHeader: false,
  // async headers() {
  //   // if (process.env.NODE_ENV === "production") {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: securityHeaders,
  //     },
  //     {
  //       source: "/auth",
  //       headers: securityHeadersLogin,
  //     },
  //   ];
  // },
};
