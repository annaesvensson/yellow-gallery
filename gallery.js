// Gallery extension, https://github.com/annaesvensson/yellow-gallery

var initGalleryFromDOM = function() {

    // Parse gallery items from DOM
    var parseElements = function(element) {
        var thumbElements = element.childNodes, items = [],
            el, childElements, size, item;
        for (var i=0; i<thumbElements.length; i++) {
            el = thumbElements[i];
            if (el.nodeType!==1) continue;
            childElements = el.children;
            if (el.getAttribute("data-size")) {
                size = el.getAttribute("data-size").split("x");
            } else {
                size = [0, 0];
            }
            item = {
                src: el.getAttribute("href"),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                caption: el.getAttribute("data-caption")
            };
            if (childElements.length>0) {
                item.msrc = childElements[0].getAttribute("src");
            }
            item.el = el;
            items.push(item);
        }
        return items;
    };
    
    // Parse options from DOM
    var parseOptions = function(element, namesUpperCase) {
        var options = {};
        for (var i=0; i<element.attributes.length; i++) {
            var attribute = element.attributes[i], key, value;
            if (attribute.nodeName.substr(0, 5)=="data-") {
                key = attribute.nodeName.substr(5);
                for (var j=0; j<namesUpperCase.length; j++) {
                    if (key==namesUpperCase[j].toLowerCase()) {
                        key = namesUpperCase[j];
                        break;
                    }
                }
                switch (attribute.nodeValue) {
                    case "true":    value = true; break;
                    case "false":   value = false; break;
                    default: value = attribute.nodeValue;
                }
                options[key] = value;
            }
        }
        return options;
    };
    
    // Create gallery template if necessary
    var createTemplate = function(selector) {
        var template = document.querySelectorAll(selector)[0];
        if (!template) {
            var elementDiv = document.createElement("div");
            elementDiv.className = selector.substr(1);
            elementDiv.setAttribute("tabindex", -1);
            elementDiv.innerHTML =
            "<div class=\"pswp__bg\"></div>"+
            "<div class=\"pswp__scroll-wrap\">"+
            "<div class=\"pswp__container\">"+
            "<div class=\"pswp__item\"></div>"+
            "<div class=\"pswp__item\"></div>"+
            "<div class=\"pswp__item\"></div>"+
            "</div>"+
            "<div class=\"pswp__ui pswp__ui--hidden\">"+
            "<div class=\"pswp__top-bar\">"+
            "<div class=\"pswp__counter\"></div>"+
            "<button class=\"pswp__button pswp__button--close\" title=\"Close\"></button>"+
            "<button class=\"pswp__button pswp__button--share\" title=\"Share\"></button>"+
            "<button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>"+
            "<button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>"+
            "<div class=\"pswp__preloader\">"+
            "<div class=\"pswp__preloader__icn\">"+
            "<div class=\"pswp__preloader__cut\">"+
            "<div class=\"pswp__preloader__donut\"></div>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "<div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">"+
            "<div class=\"pswp__share-tooltip\"></div>"+
            "</div>"+
            "<button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous\"></button>"+
            "<button class=\"pswp__button pswp__button--arrow--right\" title=\"Next\"></button>"+
            "<div class=\"pswp__caption\">"+
            "<div class=\"pswp__caption__center\"></div>"+
            "</div>"+
            "</div>"+
            "</div>";
            template = document.body.appendChild(elementDiv);
        }
        return template;
    };
    
    // Handle when user clicks on gallery
    var onClickGallery = function(e) {
        e.stopPropagation();
        e.preventDefault();
        var clickedElement = e.target;
        for (; clickedElement; clickedElement=clickedElement.parentNode) {
            if (clickedElement.tagName=="A") break;
        }
        if (clickedElement) {
            var clickedGallery = clickedElement.parentNode;
            var childNodes = clickedElement.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
            for (var i=0; i<numChildNodes; i++) {
                if (childNodes[i].nodeType!==1) continue;
                if (childNodes[i] == clickedElement) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if (index>=0) openPhotoSwipe(index, clickedGallery);
        }
    };
    
    // Open gallery
    var openPhotoSwipe = function(index, element) {
        var gallery,
        template = createTemplate(".pswp"),
        items = parseElements(element),
        options = parseOptions(element,
           ["galleryUID", "mainClass", "thumbSquare",
            "showHideOpacity", "showAnimationDuration", "hideAnimationDuration",
            "bgOpacity", "allowPanToNext", "pinchToClose", "closeOnScroll", "escKey", "arrowKeys",
            "closeEl", "captionEl", "fullscreenEl", "zoomEl", "shareEl", "counterEl",
            "arrowEl", "preloaderEl", "tapToClose", "tapToToggleControls", "clickToCloseNonZoomable"]);
        if (!options.hasOwnProperty("fullscreenEl")) {
            options.fullscreenEl = false;
        }
        if (!options.hasOwnProperty("shareEl")) {
            options.shareEl = false;
        }
        if (!options.hasOwnProperty("history")) {
            options.history = false;
        }
        if (!options.hasOwnProperty("thumbSquare")) {
            options.thumbSquare = true;
        }
        options.getThumbBoundsFn = function(index) {
            var thumbnail = items[index].el.children[0], rect;
            if (thumbnail) {
                rect = thumbnail.getBoundingClientRect();
            } else {
                rect = items[index].el.getBoundingClientRect();
            }
            return { x:rect.left, y:rect.top + window.pageYOffset, w:rect.width };
        };
        options.addCaptionHTMLFn = function(item, captionEl, isFake) {
            if (item.caption) {
                captionEl.children[0].innerText = item.caption;
                item.title = true;
            } else {
                captionEl.children[0].innerText = "";
                item.title = false;
            }
            return item.title;
        };
        if (options.thumbSquare) {
            options.showHideOpacity = true;
            options.showAnimationDuration = 0;
            for (var i=0; i<items.length; i++) {
                items[i].msrc = false;
            }
        }
        options.index = parseInt(index, 10);
        gallery = new PhotoSwipe(template, PhotoSwipeUI_Default, items, options);
        gallery.listen("imageLoadComplete", function (index, item) {
           if (item.w==0 || item.h==0) {
               var img = new Image();
               img.src = item.src;
               item.w = img.naturalWidth;
               item.h = img.naturalHeight;
               gallery.updateSize(true);
           }
        });
        gallery.init();
    };
    
    // Initialise gallery and bind events
    var elements = document.querySelectorAll(".gallery");
    for (var i=0, l=elements.length; i<l; i++) {
        elements[i].onclick = onClickGallery;
    }
};

window.addEventListener("DOMContentLoaded", initGalleryFromDOM, false);
