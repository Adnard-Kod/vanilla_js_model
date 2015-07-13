(function() {

  function Model () {
    this.myNode = document.querySelector('#artlist .pixgrid ul');
    this.overlay = document.createElement('div');
    this.overlayImg = document.createElement('img')
  }

  Model.prototype = {
    bindEvents: function() {

      this.myNode.addEventListener('click', function(e){
        this.createOverLay(e);
      }.bind(this), false);

      this.overlayImg.addEventListener('load', function(){
        this.centerOverlayImg(this.overlayImg);
      }.bind(this), false)

      this.overlayImg.addEventListener('click', function(){
        this.closeOverlay()
      }.bind(this), false)

      window.addEventListener('scroll', function() {
        this.overlayOnScroll()
      }.bind(this), false)

      window.addEventListener('resize', function(){
        this.positionImg()
      }.bind(this), false)
    },
    createOverLay: function(e){
      if(e.target.tagName === 'IMG') {
        this.overlay.className = 'overlay'
        document.body.appendChild(this.overlay);
        this.addOverlayImg(e);
      }
    },
    addOverlayImg: function(e) {
       var imageSrc = e.target.src;
       var id = imageSrc.slice(-1)
       this.overlayImg.src = 'http://lorempixel.com/850/600/sports/' + id
       this.overlayImg.className = "overlay-image"
       this.overlay.appendChild(this.overlayImg)
    },
    centerOverlayImg: function(img) {
      var myDifX = (window.outerWidth - img.width)/2;
      var myDifY = (window.outerHeight - img.height)/2;
      img.style.left = myDifX + 'px';
      img.style.top = myDifY + 'px';
      img.style.display = 'block';
      return img;
    },
    closeOverlay: function(){
      if(this.overlay){
        this.overlay.parentNode.removeChild(this.overlay)
      }
    },
    overlayOnScroll: function() {
      if(this.overlay){
        this.overlay.style.top = window.pageYOffset + 'px';
        this.overlay.style.left = window.pageXOffset + 'px';
      }
    },
    positionImg: function(){
      if(this.overlay){
        this.overlay.style.width = window.innerWidth + 'px';
        this.overlay.style.height = window.innerHeight + 'px';
        this.overlay.style.top = window.pageYOffset + 'px';
        this.overlay.style.left = window.pageXOffset + 'px';
        this.centerOverlayImg(this.overlayImg);
      }
    }
  }

  var model = new Model
  model.bindEvents();
})();