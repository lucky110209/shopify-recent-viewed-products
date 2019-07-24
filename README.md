# shopify recent viewed products guide
To display recently viewed products in Shopify

# Install

Go to the corresponds folders, then copy the code from these file and insert into your current theme.

# Demo

https://hamsademo.myshopify.com/collections/adidas/products/adidas-kids-stan-smith

# Configuration

Configuration parameters are all optional.

You pass an object to Shopify.Products.showRecentlyViewed().

Example:

**Shopify.Products.showRecentlyViewed( { howManyToShow:4 } );**

* **howManyToShow** - how many recently viewed products to show / list. Default value: 3. A number. Optional.
* **howManyToStoreInMemory** - how many recently viewed products to store in memory (the handle of the product is stored in a cookie that lives for 3 months). Default value: 10. A number. Optional.
* **wrapperId** - the id of the element in which to render the recently viewed product template. If none is specified, the script will look for a div or ul (or whatever element) with id 'recently-viewed-products' in the document. A string. Optional. Careful: don't use '#', just put here the value of the id attribute.

* **onComplete** - A function to run when all recently viewed products have been rendered on the page. Totally optional. Use this if you need to do anything special when all is said and done. (You need a callback function here because Ajax calls are used to fetch information about the recently viewed products, to show a thumbnail, their price, etc.)

# Need help?

Contact me at vince@happypoints.io
