# Eleventy Plugin - Images

Dynamically resizes images on the fly with Sharp. Rather than preprocessing all the images in an assets folder this plugin will wait until the shortcode is used and only process the images required in your templates.

If the same image is used across multiple pages the image processing will only be done once. 

Install:

```
npm install @jamshop/eleventy-plugin-images
```

### Usage

In `.eleventy.js` (minimal configuration here in favour of a flexible shortcode).

```js
eleventyConfig.addPlugin(imagePlugin, {
  siteRoot: "_site", // The directory you compile 11ty to. Sorry, I need this to construct URLs 
  input: "src/images/", // The input directory this is where we look for source images
  output: "_site/assets/", // The output directory (must be in the siteRoot)
});
``` 

In templates:

```
{% image filename, alt_text, width, height, gravity %}
```

#### Single dimension (no crop)
````
{% image "test-image.jpg", "a beach from above" 200 %}
````

#### Crop center (default)

````
{% image "test-image.jpg", "a beach from above", 200, 150 %}
````

#### Crop south

````
{% image "test-image.jpg", "a beach from above", 200, 150, "south" %}
````

#### Crop north

````
{% image "test-image.jpg", "a beach from above", 200, 150, "north" %}

````

#### URL only  

```
{% imageURL "test-image.jpg", 500, 250, "south" %}{% imageURL "test-image.jpg", 500, 250, "south" %}
```
