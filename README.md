# imageBeforeAfter

## About

This is a simple implementation of a compare slider, which can be used to compare two images. 

## Usage

Please have a look at *demo.html*. In the scripts section of that file you see how you can activate the slider. 
````
<script src="../dist/mibreitImageBeforeAfter.min.js" type="text/javascript"></script>
<script>
  window.addEventListener('load', function(){
    var imageToCompare = document.querySelectorAll(".imageBeforeAfter > img")[0];
    mibreitimageBeforeAfter.createimageCompareSlider(imageToCompare);
  });
</script>
````

For it to work, it's important to set up the two images you want to compare properly:
 - Use a div container in which you place the two images. The following style should be applied to the container
  ````
    .imageBeforeAfter {
      width: 100%;
      overflow: hidden;
    }
  ````
  - The first image you add to this container, will be the one that is hidden by the slider. In a before-and-after style comparison, it would be the before image. The following css will set up the images properly:
  ````
    .imageBeforeAfter img:first-child
    {
      position: absolute;
      top: 0;
      left: 0;
      z-index:1;
    }

    .imageBeforeAfter img:last-child
    {
      position: relative;
    }

    .imageBeforeAfter img {
      width: 100%;
      height: auto;
      -webkit-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
  ````