# YouthKitbag on Vercel

## Inventory, sell, buy, give away, recycle, report stolen - kids gear for sports, music, clubs, adventures and more.

This is a web application written using the [React JavaScript library](https://reactjs.org/), interacting with a [Node.js](https://nodejs.org/en/) API.

Both applications are running on the [Heroku Cloud Application platform](https://www.heroku.com/), with storage of data on [Mongo DB Atlas cloud](https://cloud.mongodb.com) and physical files such as images on [S3 Amazon Web Services](https://aws.amazon.com/).

### `code`

Code is hosted on [Github](https://github.com/pgmoir/youthkitbag-web) and is open source. Please feel free to star or fork the project, and submit issues and pull requests for improvements.

## Features

### `free tier`

This application has been developed using free tier services provided by the suppliers listed above.

### `bootstrap`

Like it or loathe it, this is a great library that takes the fuss out of making your web application work in a responsive manner across all browsers and platforms. The application uses the latest v4, with a handful of customised variables to ensure it meets AAA accesibility standards as much as possible. A limited set of extra styles have also been added.

### `client side image resizing`

To reduce the cost of storing images on the [S3 Amoazon Web Services platform](https://aws.amazon.com/) and to improve performance of page loading, images are resized on the client, keeping the highest quality possible before uploading via the API. While the S3 bucket needs to provide public access, images names are obfuscated to make them less detectable.

### `accesibility`

### `font awesome`
